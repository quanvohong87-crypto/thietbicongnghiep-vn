import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRAIN_DIR = 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd';
const TARGET_CLEAN_DIR = path.resolve(__dirname, 'Anh', 'Rendered_Clean');
const FRONTEND_IMG_DIR = path.resolve(__dirname, 'frontend', 'images');
const UPLOADS_DIR = path.resolve(__dirname, 'backend', 'uploads');

// Ensure all target directories exist
[TARGET_CLEAN_DIR, FRONTEND_IMG_DIR, UPLOADS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const imageMappings = [
  // 1. Wed Thiet bi kiem tra QC
  {
    src: 'qc_leak_tester_1793235501371.jpg',
    folder: 'Wed Thiết bị kiểm tra QC',
    origName: 'KT Ro khi ppa 2.jpg',
    webName: 'sanitary_qc_leak_tester.jpg'
  },
  {
    src: 'vacuum_leak_tester_1793235563345.jpg',
    folder: 'Wed Thiết bị kiểm tra QC',
    origName: 'May KT Ro khi pp hut CK 1.jpg',
    webName: 'sanitary_vacuum_leak_tester.jpg'
  },
  {
    src: 'toilet_seat_tester_1793235583523.jpg',
    folder: 'Wed Thiết bị kiểm tra QC',
    origName: 'may kiem tra độ ben 2.jpg',
    webName: 'sanitary_toilet_seat_tester.jpg'
  },

  // 2. Wed buong say moc tu dong
  {
    src: 'dryer_chambers_exterior_1793236140632.jpg',
    folder: 'Wed buồng sấy mộc tự động',
    origName: 'BS long hau 5.jpg',
    webName: 'sanitary_dryer_chambers.jpg'
  },
  {
    src: 'dryer_control_panel_1793236206102.jpg',
    folder: 'Wed buồng sấy mộc tự động',
    origName: 'HMI hien thi thong so bs 5.jpg',
    webName: 'sanitary_dryer_hmi_control.jpg'
  },
  {
    src: 'dryer_chamber_interior_1793236244559.jpg',
    folder: 'Wed buồng sấy mộc tự động',
    origName: 'IMG_1220.JPG',
    webName: 'sanitary_dryer_interior.jpg'
  },
  {
    src: 'dryer_installation_finished_1793236280946.jpg',
    folder: 'Wed buồng sấy mộc tự động',
    origName: 'buong say 2.jpg',
    webName: 'sanitary_dryer_installation.jpg'
  },
  {
    src: 'ceramic_repair_tools_1793236320357.jpg',
    folder: 'Wed buồng sấy mộc tự động',
    origName: 'dung cụ vá moc.jpg',
    webName: 'sanitary_repair_tools.jpg'
  },
  {
    src: 'oscillating_air_ducts_1793236368005.jpg',
    folder: 'Wed buồng sấy mộc tự động',
    origName: 'quạt đảo.JPG',
    webName: 'sanitary_oscillating_ducts.jpg'
  },

  // 3. Wed day chuyen duc
  {
    src: 'cad_casting_line_1793236409296.jpg',
    folder: 'Wed day chuyen duc',
    origName: '2.jpg',
    webName: 'sanitary_cad_casting_line.jpg'
  },
  {
    src: 'casting_line_orange_frame_1793236455742.jpg',
    folder: 'Wed day chuyen duc',
    origName: 'Dc Duc HC1.jpg',
    webName: 'sanitary_casting_orange_line.jpg'
  },
  {
    src: 'plaster_molds_closeup_1793236496424.jpg',
    folder: 'Wed day chuyen duc',
    origName: 'Dc Duc inax 25K -2.jpg',
    webName: 'sanitary_plaster_molds.jpg'
  },
  {
    src: 'casting_battery_line_view_1793236543980.jpg',
    folder: 'Wed day chuyen duc',
    origName: 'Dc Duc inax 25K.jpg',
    webName: 'sanitary_battery_casting_view.jpg'
  },

  // 4. Wed day chuyen phun men
  {
    src: '.user_uploaded/media_1793239453461.png',
    folder: 'Wed day chuyen phun men',
    origName: 'dc phun men2.jpg',
    webName: 'sanitary_glazing_robot.jpg'
  }
];

console.log('================================================================');
console.log(' DONG BO TOAN DIEN ANH RENDER VAO:');
console.log(' 1. Anh\\Rendered_Clean\\ (Luu tru thu muc sach dep)');
console.log(' 2. frontend\\images\\    (Hien thi giao dien Web)');
console.log(' 3. backend\\uploads\\    (Quan tri he thong API)');
console.log('================================================================\n');

let count = 0;
for (const item of imageMappings) {
  const srcPath = path.join(BRAIN_DIR, item.src);
  if (!fs.existsSync(srcPath)) {
    console.warn(`[NOT FOUND] ${srcPath}`);
    continue;
  }

  // 1. Copy to Rendered_Clean folder
  const cleanFolder = path.join(TARGET_CLEAN_DIR, item.folder);
  if (!fs.existsSync(cleanFolder)) fs.mkdirSync(cleanFolder, { recursive: true });
  fs.copyFileSync(srcPath, path.join(cleanFolder, item.origName));

  // 2. Copy to Web frontend & backend
  fs.copyFileSync(srcPath, path.join(FRONTEND_IMG_DIR, item.webName));
  fs.copyFileSync(srcPath, path.join(UPLOADS_DIR, item.webName));

  const sz = (fs.statSync(srcPath).size / 1024).toFixed(1);
  console.log(`[OK] [${item.folder}] -> ${item.origName} & ${item.webName} (${sz} KB)`);
  count++;
}

console.log('\n================================================================');
console.log(` THANH CONG! Da dong bo ${count} anh render chat luong cao.`);
console.log('================================================================');
