import crypto from 'crypto';

export function hashCedula(cedula) {
  return crypto.createHash('sha256').update(cedula.trim().toUpperCase()).digest('hex').substring(0, 16);
}

export function parseCompactSMS(text) {
  // AV#TIPO:EDIF#GRAVEDAD:CRIT+ATRAP:SI#LOC:VALENCIA#TLF:0412XXXXXXX
  const match = text.match(/AV#TIPO:([^#]+)#GRAVEDAD:([^#]+)#LOC:([^#]+)#TLF:([^#]+)/);
  if (!match) return null;
  return {
    tipo: match[1],
    gravedad: match[2],
    loc: match[3],
    tlf: match[4],
  };
}

export function generateCaseId() {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = (now.getMonth() + 1).toString().padStart(2, '0');
  const d = now.getDate().toString().padStart(2, '0');
  const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `VE-${y}${m}${d}-${rnd}`;
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}