const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'src', 'generated', 'prisma');
const target = path.join(__dirname, '..', 'dist', 'src', 'generated', 'prisma');

if (!fs.existsSync(source)) {
  throw new Error(`Generated Prisma client not found at ${source}`);
}

fs.rmSync(target, { force: true, recursive: true });
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.cpSync(source, target, { recursive: true });

console.log(`Copied generated Prisma client to ${target}`);
