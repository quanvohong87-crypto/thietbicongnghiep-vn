import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_IMG = 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\.user_uploaded\\media_1793239453461.png';

const DEST_PATHS = [
  path.resolve(__dirname, 'frontend/images/sanitary_glazing_robot.jpg'),
  path.resolve(__dirname, 'backend/uploads/sanitary_glazing_robot.jpg'),
  path.resolve(__dirname, 'Anh/Rendered_Clean/sanitary_glazing_robot.jpg'),
  path.resolve(__dirname, 'Anh/Rendered_Clean/Wed day chuyen phun men/sanitary_glazing_robot.jpg'),
  path.resolve(__dirname, 'Anh/Rendered_Clean/Wed day chuyen phun men/dc phun men2.jpg')
];

if (!fs.existsSync(SRC_IMG)) {
  console.error('[ERROR] Source image not found:', SRC_IMG);
  process.exit(1);
}

for (const dest of DEST_PATHS) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(SRC_IMG, dest);
  console.log(`[COPIED] -> ${dest} (${fs.statSync(dest).size} bytes)`);
}

console.log('[SUCCESS] Replaced robot glazing image successfully!');
