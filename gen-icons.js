const sharp = require('sharp');
const fs = require('fs');

async function convert() {
  // Convert icon-192.svg to icon-192.png
  await sharp('icon-192.svg')
    .resize(192, 192)
    .png()
    .toFile('icon-192.png');
  console.log('Created icon-192.png');

  // Convert icon-512.svg to icon-512.png
  await sharp('icon-512.svg')
    .resize(512, 512)
    .png()
    .toFile('icon-512.png');
  console.log('Created icon-512.png');

  // Also create a maskable version for better PWA support
  await sharp('icon-512.svg')
    .resize(512, 512, { fit: 'contain', background: { r: 10, g: 10, b: 10, alpha: 1 } })
    .png()
    .toFile('icon-512-maskable.png');
  console.log('Created icon-512-maskable.png');
}

convert().catch(console.error);