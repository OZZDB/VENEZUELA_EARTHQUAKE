-- Habilitar extensiones
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla principal de reportes
CREATE TABLE IF NOT EXISTS reports (
    id BIGSERIAL PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('person', 'damage')),
    fields_json JSONB NOT NULL,
    photos_json JSONB,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending','sent','synced','verified')),
    source TEXT DEFAULT 'pwa' CHECK (source IN ('pwa','whatsapp','sms','admin')),
    wa_message_id TEXT UNIQUE,
    cedula_hash TEXT,
    case_id TEXT UNIQUE DEFAULT ('VE-' || TO_CHAR(NOW(), 'YYMMDD') || '-' || UPPER(SUBSTRING(GEN_RANDOM_UUID()::TEXT FROM 1 FOR 6))),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    synced_at TIMESTAMPTZ,
    verified_by TEXT,
    verified_at TIMESTAMPTZ
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(type);
CREATE INDEX IF NOT EXISTS idx_reports_cedula_hash ON reports(cedula_hash);
CREATE INDEX IF NOT EXISTS idx_reports_created ON reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_wa_msg ON reports(wa_message_id);
CREATE INDEX IF NOT EXISTS idx_reports_case_id ON reports(case_id);

-- RLS (Row Level Security)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Política: Service Role (backend) hace todo
CREATE POLICY "Service role full access" ON reports
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Política: Anon (frontend) solo INSERT + SELECT
CREATE POLICY "Anon can insert reports" ON reports
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anon can read reports" ON reports
    FOR SELECT TO anon USING (true);

-- Tabla usuarios admin (para dashboard)
CREATE TABLE IF NOT EXISTS admin_users (
    id BIGSERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'operator' CHECK (role IN ('operator','supervisor','admin')),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

-- Usuario admin por defecto (pass: 'cambiar123' → cambiar en primer login)
INSERT INTO admin_users (username, password_hash, role)
VALUES ('admin', CRYPT('cambiar123', GEN_SALT('bf', 12)), 'admin')
ON CONFLICT (username) DO NOTHING;

-- Función para prioridad en dashboard
CREATE OR REPLACE FUNCTION report_priority(r reports) RETURNS INT AS $$
BEGIN
    -- Crítico: atrapados confirmados + colapso
    IF r.fields_json->>'trapped' IN ('si_confirmado','SI') AND r.fields_json->>'damageLevel' = 'colapso'
    THEN RETURN 1;
    END IF;
    -- Alto: atrapados confirmados
    IF r.fields_json->>'trapped' IN ('si_confirmado','SI') THEN RETURN 2; END IF;
    -- Alto: colapso en vialidad/puente
    IF r.fields_json->>'damageLevel' = 'colapso' AND r.fields_json->>'structureType' IN ('vialidad','puente') THEN RETURN 3; END IF;
    -- Medio: grave + atrapados posibles
    IF r.fields_json->>'damageLevel' = 'grave' AND r.fields_json->>'trapped' = 'si_desconocido' THEN RETURN 4; END IF;
    -- Medio: persona herida/atrapada
    IF r.type = 'person' AND r.fields_json->>'status' IN ('herido','atrapado') THEN RETURN 5; END IF;
    -- Bajo: resto
    RETURN 10;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Vista para dashboard ordenada por prioridad
CREATE OR REPLACE VIEW reports_dashboard AS
SELECT 
    id, case_id, type, fields_json, photos_json, status, source,
    created_at, synced_at, verified_by,
    report_priority(reports.*) AS priority
FROM reports
WHERE status IN ('pending','sent','synced')
ORDER BY priority ASC, created_at DESC;

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_reports_updated_at
    BEFORE UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();