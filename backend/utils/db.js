import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, '../data/database.json');
const BACKUP_FILE = path.resolve(__dirname, '../data/database.backup.json');

// Helper to hash password with salt
export function hashPassword(password, salt) {
  return crypto.createHash('sha256').update(password + salt).digest('hex');
}

export function generateToken(user) {
  const payload = {
    username: user.username,
    role: user.role,
    name: user.name,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  };
  const str = JSON.stringify(payload);
  const sig = crypto.createHmac('sha256', 'itc_technology_secret_key_2026').update(str).digest('hex');
  return Buffer.from(str).toString('base64url') + '.' + sig;
}

export function verifyToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [b64Payload, sig] = parts;
  try {
    const jsonStr = Buffer.from(b64Payload, 'base64url').toString('utf8');
    const expectedSig = crypto.createHmac('sha256', 'itc_technology_secret_key_2026').update(jsonStr).digest('hex');
    if (sig !== expectedSig) return null;
    const payload = JSON.parse(jsonStr);
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

// Atomic Database Read/Write
export function getDb() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database file:', err);
    // Try reading backup
    if (fs.existsSync(BACKUP_FILE)) {
      return JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf8'));
    }
    throw err;
  }
}

export function saveDb(data) {
  const tmpFile = DB_FILE + '.tmp';
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(tmpFile, json, 'utf8');
  fs.renameSync(tmpFile, DB_FILE);
  // Also keep a fresh backup
  try {
    fs.writeFileSync(BACKUP_FILE, json, 'utf8');
  } catch (e) {
    // backup error ignored
  }
}

// Helper to generate IDs
export function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}

// Helper to generate slug from Vietnamese text
export function toSlug(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
