import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRONTEND_IMG_DIR = path.resolve(__dirname, 'frontend/images');
const UPLOADS_DIR = path.resolve(__dirname, 'backend/uploads');

if (!fs.existsSync(FRONTEND_IMG_DIR)) fs.mkdirSync(FRONTEND_IMG_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const ASSETS = {
  'welding_robot_cell.jpg': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/BMW_Leipzig_MEDIA_050719_Download_Karosseriebau_max.jpg/1280px-BMW_Leipzig_MEDIA_050719_Download_Karosseriebau_max.jpg',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80'
  ],
  'cnc_machining_center.jpg': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/CNC_milling_machine.jpg/1280px-CNC_milling_machine.jpg',
    'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
  ],
  'tool_trolley_cabinet.jpg': [
    'https://upload.wikimedia.org/wikipedia/commons/f/f1/Tool_trolley.jpg',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
  ],
  'agv_automated_vehicle.jpg': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/AGV_con_carro.jpg/1280px-AGV_con_carro.jpg',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
  ],
  'automatic_bowl_feeder.jpg': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Bowl_Feeder.jpg/1280px-Bowl_Feeder.jpg',
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80'
  ],
  'cmm_measuring_machine.jpg': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Beyond_CrystaC.jpg/960px-Beyond_CrystaC.jpg',
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80'
  ]
};

async function downloadAsset(filename, urls) {
  const destFront = path.join(FRONTEND_IMG_DIR, filename);
  const destUpload = path.join(UPLOADS_DIR, filename);

  for (const url of urls) {
    try {
      console.log(`Trying ${filename} from: ${url}`);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'ITCTechnologyCrawler/1.0 (trunghn@thietbicongnghiep-vn.com.vn; Windows NT 10.0)',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
      });
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        if (buffer.length > 5000) {
          fs.writeFileSync(destFront, buffer);
          fs.writeFileSync(destUpload, buffer);
          console.log(`[SUCCESS] Downloaded ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
          return true;
        }
      } else {
        console.warn(`HTTP ${res.status} for ${url}`);
      }
    } catch (err) {
      console.warn(`Error fetching ${url}: ${err.message}`);
    }
  }

  // Fallback to existing AI image if all fail
  const fallbackSource = filename.includes('cart') || filename.includes('trolley')
    ? path.join(FRONTEND_IMG_DIR, 'industrial_trolley_cart.jpg')
    : path.join(FRONTEND_IMG_DIR, 'welding_jig_fixture.jpg');

  if (fs.existsSync(fallbackSource) && !fs.existsSync(destFront)) {
    fs.copyFileSync(fallbackSource, destFront);
    fs.copyFileSync(fallbackSource, destUpload);
    console.log(`[FALLBACK] Copied fallback image for ${filename}`);
    return true;
  }
  return false;
}

async function run() {
  console.log('--- Starting Industrial Asset Download ---');
  for (const [filename, urls] of Object.entries(ASSETS)) {
    await downloadAsset(filename, urls);
  }
  console.log('--- Finished Asset Download ---');
}

run();
