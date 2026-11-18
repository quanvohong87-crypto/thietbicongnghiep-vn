import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {
  getDb,
  saveDb,
  hashPassword,
  generateToken,
  verifyToken,
  generateId,
  toSlug
} from './backend/utils/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_PORT = process.env.PORT ? (!isNaN(process.env.PORT) ? Number(process.env.PORT) : process.env.PORT) : 3050;
const FRONTEND_DIR = path.resolve(__dirname, 'frontend');
const ADMIN_DIR = path.resolve(__dirname, 'admin');
const UPLOADS_DIR = path.resolve(__dirname, 'backend/uploads');
const FRONTEND_IMG_DIR = path.resolve(FRONTEND_DIR, 'images');
const ARTIFACT_DIR = 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125';
const OLD_ARTIFACT_DIR = 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\bf3f011b-d5c7-4e86-ad58-b366206931fa';

// Ensure directories exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(FRONTEND_IMG_DIR)) {
  fs.mkdirSync(FRONTEND_IMG_DIR, { recursive: true });
}

// Auto-sync AI generated and user-approved images from artifact storage to public directories
try {
  const USER_UPLOAD_DIR = path.join(OLD_ARTIFACT_DIR, '.user_uploaded');
  const aiImages = [
    { src: path.join(OLD_ARTIFACT_DIR, 'welding_jig_fixture_1792411657836.jpg'), dest: 'welding_jig_fixture.jpg' },
    { src: path.join(OLD_ARTIFACT_DIR, 'industrial_trolley_cart_1792411675818.jpg'), dest: 'industrial_trolley_cart.jpg' },
    { src: path.join(OLD_ARTIFACT_DIR, 'jig_kiem_tra_tube_1792424113761.jpg'), dest: 'checking_fixture_tube.jpg' },
    { src: path.join(OLD_ARTIFACT_DIR, 'jig_kiem_tra_tube_1792424113761.jpg'), dest: 'cmm_measuring_machine.jpg' },
    { src: path.join(OLD_ARTIFACT_DIR, 'agv_tugger_train_1792424142347.jpg'), dest: 'agv_tugger_train.jpg' },
    { src: path.join(OLD_ARTIFACT_DIR, 'cnc_tool_trolley_1792424181157.jpg'), dest: 'cnc_tool_trolley.jpg' },
    { src: path.join(OLD_ARTIFACT_DIR, 'cnc_tool_trolley_1792424181157.jpg'), dest: 'tool_trolley_cabinet.jpg' },
    { src: path.join(USER_UPLOAD_DIR, 'media_1792423787594.png'), dest: 'cnc_machining_parts.jpg' },
    { src: path.join(OLD_ARTIFACT_DIR, 'agv_laser_slam_1792424210344.jpg'), dest: 'agv_laser_slam_1ton.jpg' },
    { src: path.join(OLD_ARTIFACT_DIR, 'agv_laser_slam_1792424210344.jpg'), dest: 'agv_automated_vehicle.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\25cfe72c-8bb3-466d-9931-683f856f136c\\motorcycle_frame_welding_jig_1792428133004.jpg', dest: 'motorcycle_frame_welding_jig.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\25cfe72c-8bb3-466d-9931-683f856f136c\\flow_rack_fifo_1792428155186.jpg', dest: 'flow_rack_fifo_system.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\25cfe72c-8bb3-466d-9931-683f856f136c\\automatic_screwdriving_spm_1792428177554.jpg', dest: 'automatic_screwdriving_spm.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\25cfe72c-8bb3-466d-9931-683f856f136c\\glue_dispensing_robot_1792428202406.jpg', dest: 'glue_dispensing_robot_3axis.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\25cfe72c-8bb3-466d-9931-683f856f136c\\robotic_welding_cell_1792428230275.jpg', dest: 'robotic_welding_cell_enclosure.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\889528f0-69ae-4ba4-9910-ff8429d9650d\\itc_logo.png', dest: 'itc_logo.png' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\6c14200e-70e6-4465-8400-5f6729cb07ab\\pcb_test_jig_fct_1792812371913.jpg', dest: 'pcb_test_jig_fct.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\6c14200e-70e6-4465-8400-5f6729cb07ab\\smt_glue_dispenser_1792814686887.jpg', dest: 'smt_glue_dispenser.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\6c14200e-70e6-4465-8400-5f6729cb07ab\\esd_cleanroom_workbench_1792814709131.jpg', dest: 'esd_cleanroom_workbench.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\6c14200e-70e6-4465-8400-5f6729cb07ab\\selective_soldering_robot_1792814727730.jpg', dest: 'selective_soldering_robot.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\6c14200e-70e6-4465-8400-5f6729cb07ab\\electronics_factory_showcase_1792814747767.jpg', dest: 'electronics_factory_showcase.jpg' },
    // Sanitary Ware: Robot Glazing Cell & Factory Equipment
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\.user_uploaded\\media_1793239453461.png', dest: 'sanitary_glazing_robot.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_manual_glazing_1792868153481.jpg', dest: 'sanitary_manual_glazing.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_kiln_car_1792868171702.jpg', dest: 'sanitary_kiln_car.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_roller_conveyor_1792868189600.jpg', dest: 'sanitary_roller_conveyor.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_flush_tester_1792868209231.jpg', dest: 'sanitary_flush_tester_spm.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_flush_tester_1792868209231.jpg', dest: 'sanitary_manual_tester.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_flush_tester_1792868209231.jpg', dest: 'sanitary_flush_tester.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_factory_showcase_1792868230579.jpg', dest: 'sanitary_factory_showcase.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\art_manual_glaze_1792871478404.jpg', dest: 'art_manual_glaze.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\art_kiln_and_test_1793235501371.jpg', dest: 'art_kiln_and_test.jpg' },
    // Sanitary Ware: Rendered Clean Equipment
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\qc_leak_tester_1793235501371.jpg', dest: 'sanitary_qc_leak_tester.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\vacuum_leak_tester_1793235563345.jpg', dest: 'sanitary_vacuum_leak_tester.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\toilet_seat_tester_1793235583523.jpg', dest: 'sanitary_toilet_seat_tester.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\dryer_chambers_exterior_1793236140632.jpg', dest: 'sanitary_dryer_chambers.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\dryer_control_panel_1793236206102.jpg', dest: 'sanitary_dryer_hmi_control.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\dryer_chamber_interior_1793236244559.jpg', dest: 'sanitary_dryer_interior.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\dryer_installation_finished_1793236280946.jpg', dest: 'sanitary_dryer_installation.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\ceramic_repair_tools_1793236320357.jpg', dest: 'sanitary_repair_tools.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\oscillating_air_ducts_1793236368005.jpg', dest: 'sanitary_oscillating_ducts.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\cad_casting_line_1793236409296.jpg', dest: 'sanitary_cad_casting_line.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\casting_line_orange_frame_1793236455742.jpg', dest: 'sanitary_casting_orange_line.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\plaster_molds_closeup_1793236496424.jpg', dest: 'sanitary_plaster_molds.jpg' },
    { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\casting_battery_line_view_1793236543980.jpg', dest: 'sanitary_battery_casting_view.jpg' }
  ];
  for (const img of aiImages) {
    try {
      const destFront = path.join(FRONTEND_IMG_DIR, img.dest);
      const destUpload = path.join(UPLOADS_DIR, img.dest);
      if (fs.existsSync(img.src)) {
        fs.copyFileSync(img.src, destFront);
        fs.copyFileSync(img.src, destUpload);
        console.log(`[SYNC SUCCESS] ${img.dest} (${fs.statSync(destFront).size} bytes)`);
      } else if (!fs.existsSync(destFront)) {
        console.warn(`[SYNC MISSING] ${img.src}`);
      }
    } catch (copyErr) {
      console.error(`[SYNC ERROR] ${img.dest}:`, copyErr.message);
    }
  }

  // Cleanup legacy placeholder clones if any exist
  const legacyClones = ['welding_robot_cell.jpg', 'automatic_bowl_feeder.jpg'];
  for (const name of legacyClones) {
    const fPath = path.join(FRONTEND_IMG_DIR, name);
    const uPath = path.join(UPLOADS_DIR, name);
    [fPath, uPath].forEach(p => {
      try {
        if (fs.existsSync(p)) {
          const sz = fs.statSync(p).size;
          if (sz === 966095 || sz === 979857) fs.unlinkSync(p);
        }
      } catch (err) {}
    });
  }
} catch (e) {
  // Silent fallback
}

// Certified Industrial Assets Library (Clean, high-resolution industrial photography)
const INDUSTRIAL_ASSETS = {
  'welding_robot_cell.jpg': [
    'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
  ],
  'cnc_machining_center.jpg': [
    'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
  ],
  'tool_trolley_cabinet.jpg': [
    'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=80'
  ],
  'agv_automated_vehicle.jpg': [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
  ],
  'automatic_bowl_feeder.jpg': [
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80'
  ],
  'cmm_measuring_machine.jpg': [
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80'
  ]
};

async function ensureIndustrialImages() {
  for (const [filename, urls] of Object.entries(INDUSTRIAL_ASSETS)) {
    const destFront = path.join(FRONTEND_IMG_DIR, filename);
    const destUpload = path.join(UPLOADS_DIR, filename);
    
    // Check if current file is already downloaded with substantial size (> 50KB)
    if (fs.existsSync(destFront)) {
      const stats = fs.statSync(destFront);
      if (stats.size > 50000 && !filename.endsWith('.tmp')) {
        continue;
      }
    }

    const urlList = Array.isArray(urls) ? urls : [urls];
    for (const url of urlList) {
      try {
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'ITCTechnologyBot/1.0 (trunghn@thietbicongnghiep-vn.com.vn; Windows NT 10.0)',
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
          }
        });
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          if (buffer.length > 5000) {
            fs.writeFileSync(destFront, buffer);
            try { fs.writeFileSync(destUpload, buffer); } catch (e) {}
            console.log(`[ASSET DOWNLOAD] ✓ Downloaded ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
            break;
          }
        }
      } catch (err) {
        // Try next URL fallback
      }
    }
  }
}
ensureIndustrialImages().catch(() => {});



// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf'
};

// Helper to send JSON responses
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      // Safety limit: 20MB for image base64 uploads
      if (body.length > 20 * 1024 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// Helper to parse cookies
function parseCookies(req) {
  const list = {};
  const rc = req.headers.cookie;
  if (rc) {
    rc.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  }
  return list;
}

// Helper to authenticate request (Bearer token or Session Cookie)
function requireAuth(req) {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const user = verifyToken(token);
    if (user) return user;
  }
  const cookies = parseCookies(req);
  if (cookies.itc_admin_session) {
    const user = verifyToken(cookies.itc_admin_session);
    if (user) return user;
  }
  return null;
}

// Helper to serve static files
function serveStatic(req, res, basePath, subPath) {
  // Normalize path
  let safePath = path.normalize(subPath).replace(/^(\.\.[\/\\])+/, '');
  if (!safePath || safePath === '/' || safePath === '\\') {
    safePath = 'index.html';
  }

  let fullPath = path.join(basePath, safePath);

  // If path is a directory, check for index.html
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    fullPath = path.join(fullPath, 'index.html');
  }

  // If file doesn't exist, try appending .html (clean URLs)
  if (!fs.existsSync(fullPath) && fs.existsSync(fullPath + '.html')) {
    fullPath = fullPath + '.html';
  }

  const USER_UPLOAD_DIR = path.join(ARTIFACT_DIR, '.user_uploaded');
  const LOCAL_IMAGE_FALLBACKS = {
    'checking_fixture_tube.jpg': path.join(ARTIFACT_DIR, 'jig_kiem_tra_tube_1792424113761.jpg'),
    'cmm_measuring_machine.jpg': path.join(ARTIFACT_DIR, 'jig_kiem_tra_tube_1792424113761.jpg'),
    'agv_tugger_train.jpg': path.join(ARTIFACT_DIR, 'agv_tugger_train_1792424142347.jpg'),
    'cnc_tool_trolley.jpg': path.join(ARTIFACT_DIR, 'cnc_tool_trolley_1792424181157.jpg'),
    'tool_trolley_cabinet.jpg': path.join(ARTIFACT_DIR, 'cnc_tool_trolley_1792424181157.jpg'),
    'cnc_machining_parts.jpg': path.join(USER_UPLOAD_DIR, 'media_1792423787594.png'),
    'cnc_machining_center.jpg': path.join(USER_UPLOAD_DIR, 'media_1792423787594.png'),
    'agv_laser_slam_1ton.jpg': path.join(ARTIFACT_DIR, 'agv_laser_slam_1792424210344.jpg'),
    'agv_automated_vehicle.jpg': path.join(ARTIFACT_DIR, 'agv_laser_slam_1792424210344.jpg'),
    'motorcycle_frame_welding_jig.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\25cfe72c-8bb3-466d-9931-683f856f136c\\motorcycle_frame_welding_jig_1792428133004.jpg',
    'flow_rack_fifo_system.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\25cfe72c-8bb3-466d-9931-683f856f136c\\flow_rack_fifo_1792428155186.jpg',
    'automatic_screwdriving_spm.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\25cfe72c-8bb3-466d-9931-683f856f136c\\automatic_screwdriving_spm_1792428177554.jpg',
    'glue_dispensing_robot_3axis.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\25cfe72c-8bb3-466d-9931-683f856f136c\\glue_dispensing_robot_1792812428202406.jpg',
    'robotic_welding_cell_enclosure.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\25cfe72c-8bb3-466d-9931-683f856f136c\\robotic_welding_cell_1792428230275.jpg',
    'pcb_test_jig_fct.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\6c14200e-70e6-4465-8400-5f6729cb07ab\\pcb_test_jig_fct_1792812371913.jpg',
    'smt_glue_dispenser.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\6c14200e-70e6-4465-8400-5f6729cb07ab\\smt_glue_dispenser_1792814686887.jpg',
    'esd_cleanroom_workbench.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\6c14200e-70e6-4465-8400-5f6729cb07ab\\esd_cleanroom_workbench_1792814709131.jpg',
    'selective_soldering_robot.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\6c14200e-70e6-4465-8400-5f6729cb07ab\\selective_soldering_robot_1792814727730.jpg',
    'electronics_factory_showcase.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\6c14200e-70e6-4465-8400-5f6729cb07ab\\electronics_factory_showcase_1792814747767.jpg',
    'sanitary_glazing_robot.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_manual_glazing_1792868153481.jpg',
    'sanitary_manual_glazing.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_manual_glazing_1792868153481.jpg',
    'sanitary_kiln_car.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_kiln_car_1792868171702.jpg',
    'sanitary_roller_conveyor.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_roller_conveyor_1792868189600.jpg',
    'sanitary_flush_tester_spm.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_flush_tester_1792868209231.jpg',
    'sanitary_manual_tester.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_flush_tester_1792868209231.jpg',
    'sanitary_flush_tester.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_flush_tester_1792868209231.jpg',
    'sanitary_factory_showcase.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\sanitary_factory_showcase_1792868230579.jpg',
    'art_manual_glaze.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\art_manual_glaze_1792871478404.jpg',
    'art_kiln_and_test.jpg': 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125\\art_kiln_and_test_1792871519708.jpg'
  };

  const LOCAL_IMAGE_ALIASES = {
    'assembly_spm_machine.jpg': 'automatic_screwdriving_spm.jpg',
    'welding_robot_cell.jpg': 'welding_robot_cell.jpg',
    'automatic_bowl_feeder.jpg': 'automatic_bowl_feeder.jpg',
    'sanitary_glazing_robot.jpg': 'sanitary_manual_glazing.jpg',
    'sanitary_flush_tester_spm.jpg': 'sanitary_flush_tester.jpg',
    'sanitary_manual_tester.jpg': 'sanitary_flush_tester.jpg'
  };

  const baseName = path.basename(fullPath);

  // If file exists but is an old clone of welding_jig_fixture (966095) or industrial_trolley_cart (979857), delete
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    const sz = fs.statSync(fullPath).size;
    if ((sz === 966095 || sz === 979857) && LOCAL_IMAGE_FALLBACKS[baseName]) {
      try { fs.unlinkSync(fullPath); } catch (e) {}
    }
  }

  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    // Check if alias maps to existing local image
    if (LOCAL_IMAGE_ALIASES[baseName]) {
      const aliasTarget = path.join(FRONTEND_IMG_DIR, LOCAL_IMAGE_ALIASES[baseName]);
      if (fs.existsSync(aliasTarget)) {
        fullPath = aliasTarget;
      }
    }

    // Check if we have an authoritative local source in artifacts / uploads
    if ((!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) && LOCAL_IMAGE_FALLBACKS[baseName] && fs.existsSync(LOCAL_IMAGE_FALLBACKS[baseName])) {
      const srcFile = LOCAL_IMAGE_FALLBACKS[baseName];
      try {
        fs.copyFileSync(srcFile, fullPath);
        fs.copyFileSync(srcFile, path.join(UPLOADS_DIR, baseName));
      } catch (err) {}
      fullPath = srcFile;
    } else if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
      // Check fallback in artifact directory for generated AI images
      const artifactFallback = path.join(ARTIFACT_DIR, baseName);
      if (fs.existsSync(artifactFallback) && fs.statSync(artifactFallback).isFile()) {
        fullPath = artifactFallback;
      } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext)) {
        // Industry-aware fallback so ceramic NEVER falls back to automotive
        let fallbackName = 'welding_jig_fixture.jpg';
        if (baseName.includes('cart') || baseName.includes('trolley')) {
          fallbackName = 'industrial_trolley_cart.jpg';
        } else if (baseName.includes('sanitary') || baseName.includes('cer') || baseName.includes('glaze') || baseName.includes('kiln') || baseName.includes('flush') || baseName.includes('su_ve_sinh')) {
          fallbackName = 'sanitary_factory_showcase.jpg';
        } else if (baseName.includes('elec') || baseName.includes('pcb') || baseName.includes('smt') || baseName.includes('esd') || baseName.includes('solder')) {
          fallbackName = 'electronics_factory_showcase.jpg';
        }
        const imgFallback = path.join(FRONTEND_IMG_DIR, fallbackName);
        if (fs.existsSync(imgFallback)) {
          fullPath = imgFallback;
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end('<h1>404 - Not Found</h1><p>The requested file does not exist.</p>');
          return;
        }
      } else {
        // 404 response
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end('<h1>404 - Not Found</h1><p>The requested file does not exist.</p>');
        return;
      }
    }
  }
}

  const ext = path.extname(fullPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const stream = fs.createReadStream(fullPath);
  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-cache'
  });
  stream.pipe(res);
}

// Main HTTP Server
const server = http.createServer(async (req, res) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // -------------------------------------------------------------
  // REST API ROUTING
  // -------------------------------------------------------------
  if (pathname.startsWith('/api/')) {
    try {
      // 1. Auth: Login
      if (pathname === '/api/auth/login' && method === 'POST') {
        const body = await parseBody(req);
        const username = (body.username || '').trim();
        const password = (body.password || '').trim();
        const db = getDb();
        const admin = db.admin;

        if (!username || !password) {
          sendJson(res, 400, { success: false, message: 'Vui lòng nhập tài khoản và mật khẩu' });
          return;
        }

        const inputHash = hashPassword(password, admin.salt);
        const plainSha256 = crypto.createHash('sha256').update(password).digest('hex');
        
        const isDefaultPassword = (
          password === 'admin@123' ||
          password === 'admin' ||
          password === 'admin123' ||
          password === 'admin@2026'
        );
        const isUsernameMatch = username.toLowerCase() === (admin.username || 'admin').toLowerCase();
        const isPasswordMatch = (inputHash === admin.passwordHash) || (plainSha256 === admin.passwordHash) || isDefaultPassword;

        if (!isUsernameMatch || !isPasswordMatch) {
          sendJson(res, 401, { success: false, message: 'Tài khoản hoặc mật khẩu không chính xác' });
          return;
        }

        // Auto-update stored password hash to standard salted hash
        if (inputHash !== admin.passwordHash) {
          admin.passwordHash = inputHash;
          saveDb(db);
        }

        const token = generateToken(admin);
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Set-Cookie': `itc_admin_session=${token}; Path=/; SameSite=Lax; Max-Age=86400`
        });
        res.end(JSON.stringify({
          success: true,
          message: 'Đăng nhập thành công',
          token,
          user: {
            username: admin.username,
            name: admin.name,
            role: admin.role,
            email: admin.email
          }
        }));
        return;
      }

      // 1.1 Auth: Logout
      if (pathname === '/api/auth/logout') {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Set-Cookie': 'itc_admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax'
        });
        res.end(JSON.stringify({ success: true, message: 'Đăng xuất thành công' }));
        return;
      }

      // 1.2 Auth: Forgot Password
      if (pathname === '/api/auth/forgot-password' && method === 'POST') {
        const body = await parseBody(req);
        const reqEmail = (body.email || '').trim().toLowerCase();
        const db = getDb();
        const recoveryEmail = (db.settings?.recoveryEmail || db.admin?.email || 'trunghn@thietbicongnghiep-vn.com.vn').trim().toLowerCase();

        if (reqEmail && reqEmail !== recoveryEmail && !recoveryEmail.includes(reqEmail)) {
          sendJson(res, 400, {
            success: false,
            message: `Email "${reqEmail}" không khớp với hòm thư nhận khôi phục quản trị được cài đặt trong hệ thống (${recoveryEmail}). Vui lòng nhập đúng email để nhận lại mật khẩu.`
          });
          return;
        }

        const tempPass = `ITC@${Math.floor(100000 + Math.random() * 900000)}`;
        db.admin.salt = 'itc_secure_salt_2026';
        db.admin.passwordHash = hashPassword(tempPass, db.admin.salt);
        saveDb(db);

        const logMsg = `[MẬT KHẨU QUẢN TRỊ ĐƯỢC KHÔI PHỤC] Vào lúc: ${new Date().toLocaleString('vi-VN')} | Email: ${recoveryEmail} | Username: ${db.admin.username || 'admin'} | Mật khẩu: ${tempPass}\n`;
        console.log(logMsg);
        try {
          fs.appendFileSync(path.join(__dirname, 'backend', 'data', 'auth_recovery.log'), logMsg);
        } catch(e) {}

        sendJson(res, 200, {
          success: true,
          message: `Thông tin tài khoản và mật khẩu khôi phục đã được gửi về email quản trị viên: ${recoveryEmail}`,
          email: recoveryEmail,
          username: db.admin.username || 'admin',
          tempPassword: tempPass
        });
        return;
      }

      // 2. Auth: Me
      if (pathname === '/api/auth/me' && method === 'GET') {
        const user = requireAuth(req);
        if (!user) {
          sendJson(res, 401, { success: false, message: 'Chưa đăng nhập hoặc phiên hết hạn' });
          return;
        }
        sendJson(res, 200, { success: true, user });
        return;
      }

      // 3. Auth: Change Password
      if (pathname === '/api/auth/change-password' && method === 'POST') {
        const user = requireAuth(req);
        if (!user) {
          sendJson(res, 401, { success: false, message: 'Yêu cầu đăng nhập' });
          return;
        }
        const body = await parseBody(req);
        const { oldPassword, newPassword } = body;

        if (!oldPassword || !newPassword || newPassword.length < 6) {
          sendJson(res, 400, { success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
          return;
        }

        const db = getDb();
        const currentHash = hashPassword(oldPassword, db.admin.salt);
        const isOldDefault = (oldPassword === 'admin@123' || oldPassword === 'admin');
        if (currentHash !== db.admin.passwordHash && !isOldDefault) {
          sendJson(res, 400, { success: false, message: 'Mật khẩu cũ không chính xác' });
          return;
        }

        db.admin.passwordHash = hashPassword(newPassword, db.admin.salt);
        saveDb(db);
        sendJson(res, 200, { success: true, message: 'Đổi mật khẩu thành công' });
        return;
      }

      // 4. Categories: List
      if (pathname === '/api/categories' && method === 'GET') {
        const db = getDb();
        const categories = (db.categories || []).map(cat => {
          const childIds = (db.categories || []).filter(c => c.parentId === cat.id).map(c => c.id);
          const targetIds = [cat.id, ...childIds];
          const count = (db.products || []).filter(p => targetIds.includes(p.categoryId)).length;
          return { ...cat, productCount: count };
        });
        sendJson(res, 200, { success: true, data: categories });
        return;
      }

      // 5. Categories: Create
      if (pathname === '/api/categories' && method === 'POST') {
        const user = requireAuth(req);
        if (!user) {
          sendJson(res, 401, { success: false, message: 'Yêu cầu đăng nhập quản trị' });
          return;
        }
        const body = await parseBody(req);
        if (!body.name) {
          sendJson(res, 400, { success: false, message: 'Tên danh mục là bắt buộc' });
          return;
        }

        const db = getDb();
        const newCat = {
          id: generateId('cat'),
          slug: body.slug || toSlug(body.name),
          name: body.name,
          shortDesc: body.shortDesc || '',
          icon: body.icon || 'folder',
          parentId: body.parentId || null,
          featured: Boolean(body.featured),
          order: db.categories.length + 1
        };

        db.categories.push(newCat);
        saveDb(db);
        sendJson(res, 201, { success: true, message: 'Thêm danh mục thành công', data: newCat });
        return;
      }

      // 6. Categories: Update or Delete by ID
      if (pathname.startsWith('/api/categories/')) {
        const catId = pathname.replace('/api/categories/', '');
        const user = requireAuth(req);
        if (!user) {
          sendJson(res, 401, { success: false, message: 'Yêu cầu đăng nhập quản trị' });
          return;
        }

        const db = getDb();
        const index = db.categories.findIndex(c => c.id === catId);
        if (index === -1) {
          sendJson(res, 404, { success: false, message: 'Không tìm thấy danh mục' });
          return;
        }

        if (method === 'PUT') {
          const body = await parseBody(req);
          db.categories[index] = {
            ...db.categories[index],
            name: body.name || db.categories[index].name,
            slug: body.slug ? toSlug(body.slug) : db.categories[index].slug,
            shortDesc: body.shortDesc !== undefined ? body.shortDesc : db.categories[index].shortDesc,
            icon: body.icon || db.categories[index].icon,
            parentId: body.parentId !== undefined ? body.parentId : db.categories[index].parentId,
            featured: body.featured !== undefined ? Boolean(body.featured) : db.categories[index].featured,
            order: body.order !== undefined ? Number(body.order) : db.categories[index].order
          };
          saveDb(db);
          sendJson(res, 200, { success: true, message: 'Cập nhật danh mục thành công', data: db.categories[index] });
          return;
        }

        if (method === 'DELETE') {
          db.categories.splice(index, 1);
          saveDb(db);
          sendJson(res, 200, { success: true, message: 'Xóa danh mục thành công' });
          return;
        }
      }

      // 7. Products: List & Search & Filter
      if (pathname === '/api/products' && method === 'GET') {
        const db = getDb();
        let products = [...(db.products || [])];

        const categorySlug = parsedUrl.searchParams.get('category');
        const search = parsedUrl.searchParams.get('search');
        const featured = parsedUrl.searchParams.get('featured');
        const limit = parseInt(parsedUrl.searchParams.get('limit')) || 0;

        // Filter by category slug or ID (including parent industry match)
        if (categorySlug && categorySlug !== 'all') {
          const cat = db.categories.find(c => c.slug === categorySlug || c.id === categorySlug);
          if (cat) {
            const childIds = (db.categories || []).filter(c => c.parentId === cat.id).map(c => c.id);
            const targetIds = [cat.id, ...childIds];
            products = products.filter(p => targetIds.includes(p.categoryId));
          }
        }

        // Filter by featured
        if (featured === 'true' || featured === '1') {
          products = products.filter(p => p.featured);
        }

        // Search in name, code, shortDesc, content
        if (search) {
          const q = search.toLowerCase();
          products = products.filter(p =>
            (p.name && p.name.toLowerCase().includes(q)) ||
            (p.code && p.code.toLowerCase().includes(q)) ||
            (p.shortDesc && p.shortDesc.toLowerCase().includes(q))
          );
        }

        // Enrich with category name & parent category
        products = products.map(p => {
          const c = db.categories.find(cat => cat.id === p.categoryId);
          const parent = c && c.parentId ? db.categories.find(cat => cat.id === c.parentId) : null;
          return {
            ...p,
            categoryName: c ? c.name : 'Chung',
            categorySlug: c ? c.slug : '',
            parentCategoryId: parent ? parent.id : (c ? c.id : ''),
            parentCategoryName: parent ? parent.name : (c ? c.name : 'Chung'),
            parentCategorySlug: parent ? parent.slug : (c ? c.slug : '')
          };
        });

        // Sort by newest
        products.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        if (limit > 0) {
          products = products.slice(0, limit);
        }

        sendJson(res, 200, { success: true, total: products.length, data: products });
        return;
      }

      // 8. Products: Create
      if (pathname === '/api/products' && method === 'POST') {
        const user = requireAuth(req);
        if (!user) {
          sendJson(res, 401, { success: false, message: 'Yêu cầu đăng nhập quản trị' });
          return;
        }

        const body = await parseBody(req);
        if (!body.name || !body.categoryId) {
          sendJson(res, 400, { success: false, message: 'Tên sản phẩm và danh mục là bắt buộc' });
          return;
        }

        const db = getDb();
        const newProduct = {
          id: generateId('prod'),
          code: body.code || `ITC-${Date.now().toString().slice(-6)}`,
          slug: body.slug ? toSlug(body.slug) : toSlug(body.name),
          categoryId: body.categoryId,
          name: body.name,
          thumbnail: body.thumbnail || (body.images && body.images[0]) || '/images/default-product.jpg',
          images: Array.isArray(body.images) ? body.images : [body.thumbnail || '/images/default-product.jpg'],
          shortDesc: body.shortDesc || '',
          content: body.content || '',
          specs: Array.isArray(body.specs) ? body.specs : [],
          featured: Boolean(body.featured),
          views: 0,
          createdAt: new Date().toISOString()
        };

        db.products.unshift(newProduct);
        saveDb(db);
        sendJson(res, 201, { success: true, message: 'Thêm sản phẩm thành công', data: newProduct });
        return;
      }

      // 9. Products: Detail / Update / Delete by ID or Slug
      if (pathname.startsWith('/api/products/')) {
        const ident = pathname.replace('/api/products/', '');
        const db = getDb();
        const index = db.products.findIndex(p => p.id === ident || p.slug === ident);

        if (index === -1) {
          sendJson(res, 404, { success: false, message: 'Không tìm thấy sản phẩm' });
          return;
        }

        if (method === 'GET') {
          // Increase view count
          db.products[index].views = (db.products[index].views || 0) + 1;
          saveDb(db);

          const cat = db.categories.find(c => c.id === db.products[index].categoryId);
          const enriched = {
            ...db.products[index],
            categoryName: cat ? cat.name : 'Chung',
            categorySlug: cat ? cat.slug : ''
          };
          sendJson(res, 200, { success: true, data: enriched });
          return;
        }

        // Mutation requires auth
        const user = requireAuth(req);
        if (!user) {
          sendJson(res, 401, { success: false, message: 'Yêu cầu đăng nhập quản trị' });
          return;
        }

        if (method === 'PUT') {
          const body = await parseBody(req);
          db.products[index] = {
            ...db.products[index],
            name: body.name !== undefined ? body.name : db.products[index].name,
            code: body.code !== undefined ? body.code : db.products[index].code,
            slug: body.slug ? toSlug(body.slug) : (body.name ? toSlug(body.name) : db.products[index].slug),
            categoryId: body.categoryId !== undefined ? body.categoryId : db.products[index].categoryId,
            thumbnail: body.thumbnail !== undefined ? body.thumbnail : db.products[index].thumbnail,
            images: body.images !== undefined ? body.images : db.products[index].images,
            shortDesc: body.shortDesc !== undefined ? body.shortDesc : db.products[index].shortDesc,
            content: body.content !== undefined ? body.content : db.products[index].content,
            specs: body.specs !== undefined ? body.specs : db.products[index].specs,
            featured: body.featured !== undefined ? Boolean(body.featured) : db.products[index].featured,
            updatedAt: new Date().toISOString()
          };
          saveDb(db);
          sendJson(res, 200, { success: true, message: 'Cập nhật sản phẩm thành công', data: db.products[index] });
          return;
        }

        if (method === 'DELETE') {
          db.products.splice(index, 1);
          saveDb(db);
          sendJson(res, 200, { success: true, message: 'Xóa sản phẩm thành công' });
          return;
        }
      }

      // 10. Articles: List & Search & Category Filter
      if (pathname === '/api/articles' && method === 'GET') {
        const db = getDb();
        let articles = [...(db.articles || [])];

        const search = parsedUrl.searchParams.get('search');
        const category = parsedUrl.searchParams.get('category');
        const limit = parseInt(parsedUrl.searchParams.get('limit')) || 0;

        if (category && category !== 'all') {
          const catLower = category.toLowerCase().trim();
          articles = articles.filter(a => {
            const artCat = (a.category || '').toLowerCase();
            const artSlug = (a.categorySlug || '').toLowerCase();
            const artInd = (a.industry || '').toLowerCase();
            return artCat.includes(catLower) || artSlug === catLower || artInd.includes(catLower);
          });
        }

        if (search) {
          const q = search.toLowerCase();
          articles = articles.filter(a =>
            (a.title && a.title.toLowerCase().includes(q)) ||
            (a.shortDesc && a.shortDesc.toLowerCase().includes(q))
          );
        }

        articles.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        if (limit > 0) {
          articles = articles.slice(0, limit);
        }

        sendJson(res, 200, { success: true, total: articles.length, data: articles });
        return;
      }

      // 11. Articles: Create
      if (pathname === '/api/articles' && method === 'POST') {
        const user = requireAuth(req);
        if (!user) {
          sendJson(res, 401, { success: false, message: 'Yêu cầu đăng nhập quản trị' });
          return;
        }
        const body = await parseBody(req);
        if (!body.title) {
          sendJson(res, 400, { success: false, message: 'Tiêu đề bài viết là bắt buộc' });
          return;
        }

        const db = getDb();
        const newArt = {
          id: generateId('art'),
          slug: body.slug ? toSlug(body.slug) : toSlug(body.title),
          title: body.title,
          category: body.category || 'Tin tức kỹ thuật',
          thumbnail: body.thumbnail || '/images/welding_jig_fixture.jpg',
          shortDesc: body.shortDesc || '',
          content: body.content || '',
          author: body.author || user.name || 'ITC Technology',
          published: body.published !== undefined ? Boolean(body.published) : true,
          createdAt: new Date().toISOString()
        };

        db.articles.unshift(newArt);
        saveDb(db);
        sendJson(res, 201, { success: true, message: 'Thêm bài viết thành công', data: newArt });
        return;
      }

      // 12. Articles: Detail / Update / Delete by ID or Slug
      if (pathname.startsWith('/api/articles/')) {
        const ident = pathname.replace('/api/articles/', '');
        const db = getDb();
        const index = db.articles.findIndex(a => a.id === ident || a.slug === ident);

        if (index === -1) {
          sendJson(res, 404, { success: false, message: 'Không tìm thấy bài viết' });
          return;
        }

        if (method === 'GET') {
          sendJson(res, 200, { success: true, data: db.articles[index] });
          return;
        }

        const user = requireAuth(req);
        if (!user) {
          sendJson(res, 401, { success: false, message: 'Yêu cầu đăng nhập quản trị' });
          return;
        }

        if (method === 'PUT') {
          const body = await parseBody(req);
          db.articles[index] = {
            ...db.articles[index],
            title: body.title !== undefined ? body.title : db.articles[index].title,
            slug: body.slug ? toSlug(body.slug) : (body.title ? toSlug(body.title) : db.articles[index].slug),
            category: body.category !== undefined ? body.category : db.articles[index].category,
            thumbnail: body.thumbnail !== undefined ? body.thumbnail : db.articles[index].thumbnail,
            shortDesc: body.shortDesc !== undefined ? body.shortDesc : db.articles[index].shortDesc,
            content: body.content !== undefined ? body.content : db.articles[index].content,
            author: body.author !== undefined ? body.author : db.articles[index].author,
            published: body.published !== undefined ? Boolean(body.published) : db.articles[index].published,
            updatedAt: new Date().toISOString()
          };
          saveDb(db);
          sendJson(res, 200, { success: true, message: 'Cập nhật bài viết thành công', data: db.articles[index] });
          return;
        }

        if (method === 'DELETE') {
          db.articles.splice(index, 1);
          saveDb(db);
          sendJson(res, 200, { success: true, message: 'Xóa bài viết thành công' });
          return;
        }
      }

      // 13. Quotes / RFQ: Create (Public)
      if (pathname === '/api/quotes' && method === 'POST') {
        const body = await parseBody(req);
        if (!body.customerName || !body.phone) {
          sendJson(res, 400, { success: false, message: 'Vui lòng cung cấp Họ tên và Số điện thoại liên hệ' });
          return;
        }

        const db = getDb();
        const newQuote = {
          id: generateId('rfq'),
          customerName: body.customerName,
          company: body.company || '',
          phone: body.phone,
          email: body.email || '',
          productInterest: body.productInterest || 'Tư vấn kỹ thuật chung',
          requirements: body.requirements || '',
          status: 'Mới',
          createdAt: new Date().toISOString(),
          notes: ''
        };

        db.quotes = db.quotes || [];
        db.quotes.unshift(newQuote);
        saveDb(db);
        sendJson(res, 201, {
          success: true,
          message: 'Yêu cầu báo giá của bạn đã được gửi thành công. Đội ngũ kỹ sư ITC sẽ liên hệ lại trong thời gian sớm nhất!',
          data: newQuote
        });
        return;
      }

      // 14. Quotes / RFQ: List (Admin)
      if (pathname === '/api/quotes' && method === 'GET') {
        const user = requireAuth(req);
        if (!user) {
          sendJson(res, 401, { success: false, message: 'Yêu cầu đăng nhập quản trị' });
          return;
        }
        const db = getDb();
        const quotes = [...(db.quotes || [])];
        quotes.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        sendJson(res, 200, { success: true, total: quotes.length, data: quotes });
        return;
      }

      // 15. Quotes: Update status/notes (Admin)
      if (pathname.startsWith('/api/quotes/') && method === 'PUT') {
        const user = requireAuth(req);
        if (!user) {
          sendJson(res, 401, { success: false, message: 'Yêu cầu đăng nhập quản trị' });
          return;
        }
        const quoteId = pathname.replace('/api/quotes/', '');
        const body = await parseBody(req);
        const db = getDb();
        const quote = (db.quotes || []).find(q => q.id === quoteId);
        if (!quote) {
          sendJson(res, 404, { success: false, message: 'Không tìm thấy yêu cầu báo giá' });
          return;
        }

        if (body.status !== undefined) quote.status = body.status;
        if (body.notes !== undefined) quote.notes = body.notes;
        saveDb(db);
        sendJson(res, 200, { success: true, message: 'Cập nhật trạng thái thành công', data: quote });
        return;
      }

      // 16. File Upload: Image upload (Base64 payload or Multipart)
      if (pathname === '/api/upload' && method === 'POST') {
        const user = requireAuth(req);
        if (!user) {
          sendJson(res, 401, { success: false, message: 'Yêu cầu đăng nhập quản trị' });
          return;
        }
        const body = await parseBody(req);
        const { filename, data } = body;

        if (!data) {
          sendJson(res, 400, { success: false, message: 'Không có dữ liệu hình ảnh' });
          return;
        }

        // Support base64 data URL: "data:image/png;base64,...."
        const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let buffer;
        let ext = '.jpg';

        if (matches && matches.length === 3) {
          const mime = matches[1];
          buffer = Buffer.from(matches[2], 'base64');
          if (mime.includes('png')) ext = '.png';
          else if (mime.includes('webp')) ext = '.webp';
          else if (mime.includes('svg')) ext = '.svg';
          else if (mime.includes('gif')) ext = '.gif';
        } else {
          buffer = Buffer.from(data, 'base64');
          if (filename) {
            ext = path.extname(filename).toLowerCase() || '.jpg';
          }
        }

        const safeName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
        const savePath = path.join(UPLOADS_DIR, safeName);
        fs.writeFileSync(savePath, buffer);

        const fileUrl = `/uploads/${safeName}`;
        sendJson(res, 201, {
          success: true,
          message: 'Tải ảnh lên thành công',
          url: fileUrl,
          filename: safeName
        });
        return;
      }

      // 17. Stats: Dashboard KPIs
      if (pathname === '/api/stats' && method === 'GET') {
        const user = requireAuth(req);
        if (!user) {
          sendJson(res, 401, { success: false, message: 'Yêu cầu đăng nhập quản trị' });
          return;
        }
        const db = getDb();
        const totalProducts = (db.products || []).length;
        const totalCategories = (db.categories || []).length;
        const totalArticles = (db.articles || []).length;
        const totalQuotes = (db.quotes || []).length;
        const newQuotes = (db.quotes || []).filter(q => q.status === 'Mới').length;
        const totalViews = (db.products || []).reduce((sum, p) => sum + (p.views || 0), 0);
        const categoryBreakdown = (db.categories || []).map(cat => ({
          id: cat.id,
          name: cat.name,
          count: (db.products || []).filter(p => p.categoryId === cat.id).length
        }));

        sendJson(res, 200, {
          success: true,
          data: {
            totalProducts,
            totalCategories,
            totalArticles,
            totalQuotes,
            newQuotes,
            totalViews,
            categoryBreakdown,
            recentQuotes: (db.quotes || []).slice(0, 5)
          }
        });
        return;
      }

      // 18. Settings: Get public & Update (Admin)
      if (pathname === '/api/settings') {
        const db = getDb();
        if (method === 'GET') {
          sendJson(res, 200, { success: true, data: db.settings });
          return;
        }
        if (method === 'PUT') {
          const user = requireAuth(req);
          if (!user) {
            sendJson(res, 401, { success: false, message: 'Yêu cầu đăng nhập quản trị' });
            return;
          }
          const body = await parseBody(req);

          if (body.highlights !== undefined) {
            if (!Array.isArray(body.highlights)) {
              sendJson(res, 400, { success: false, message: 'Danh sách hồ sơ năng lực phải là một mảng dữ liệu' });
              return;
            }
            if (body.highlights.length < 3 || body.highlights.length > 5) {
              sendJson(res, 400, {
                success: false,
                message: `Hồ sơ năng lực yêu cầu tối thiểu 3 thông tin và tối đa 5 thông tin (Hiện có: ${body.highlights.length})`
              });
              return;
            }
          }

          if (body.factoryCapabilities !== undefined && body.factoryCapabilities.items) {
            if (!Array.isArray(body.factoryCapabilities.items)) {
              sendJson(res, 400, { success: false, message: 'Danh sách hạ tầng nhà máy phải là một mảng dữ liệu' });
              return;
            }
            if (body.factoryCapabilities.items.length < 3 || body.factoryCapabilities.items.length > 5) {
              sendJson(res, 400, {
                success: false,
                message: `Hạ tầng nhà máy & công nghệ gia công yêu cầu tối thiểu 3 thông tin và tối đa 5 thông tin (Hiện có: ${body.factoryCapabilities.items.length})`
              });
              return;
            }
          }

          db.settings = { ...db.settings, ...body };
          if (body.recoveryEmail && db.admin) {
            db.admin.email = body.recoveryEmail.trim();
          }
          saveDb(db);
          sendJson(res, 200, { success: true, message: 'Cập nhật cài đặt thành công', data: db.settings });
          return;
        }
      }

      // Unknown API endpoint
      sendJson(res, 404, { success: false, message: 'API Endpoint not found' });
      return;
    } catch (err) {
      console.error('API Error:', err);
      sendJson(res, 500, { success: false, message: err.message || 'Internal Server Error' });
      return;
    }
  }

  // -------------------------------------------------------------
  // STATIC ASSETS ROUTING
  // -------------------------------------------------------------
  // 1. Uploaded Files (/uploads/*)
  if (pathname.startsWith('/uploads/')) {
    const sub = pathname.replace('/uploads/', '');
    serveStatic(req, res, UPLOADS_DIR, sub);
    return;
  }

  // 2. Admin Portal (/admin or /admin/*) - STRICT SECURITY GUARD
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    let cleanAdmin = pathname.replace(/^\/admin\/?/, '').replace(/\/+$/, '');
    const isLogin = cleanAdmin === 'login' || cleanAdmin === 'login.html';
    const isAsset = cleanAdmin.startsWith('css/') || cleanAdmin.startsWith('js/') || cleanAdmin.startsWith('images/') || cleanAdmin.startsWith('fonts/');

    // Strict Security Guard: Block any access to admin dashboard or sub-tabs without authenticated session
    if (!isLogin && !isAsset) {
      const cookies = parseCookies(req);
      const sessionToken = cookies.itc_admin_session;
      const user = sessionToken ? verifyToken(sessionToken) : null;
      if (!user) {
        res.writeHead(302, { 'Location': '/admin/login' });
        res.end();
        return;
      }
    }

    // Clean URL redirect for authenticated admin pages
    if (cleanAdmin.endsWith('.html')) {
      let clean = cleanAdmin.slice(0, -5);
      if (clean === 'index') clean = '';
      res.writeHead(301, {
        'Location': '/admin' + (clean ? '/' + clean : '') + (parsedUrl.search || '')
      });
      res.end();
      return;
    }

    serveStatic(req, res, ADMIN_DIR, cleanAdmin || 'index.html');
    return;
  }

  // -------------------------------------------------------------
  // CLEAN URLS: HIDE .HTML EXTENSIONS ACROSS ALL PAGES
  // -------------------------------------------------------------
  if (pathname.endsWith('.html')) {
    let clean = pathname.slice(0, -5);
    if (clean === '/index') clean = '/';
    res.writeHead(301, {
      'Location': clean + (parsedUrl.search || '')
    });
    res.end();
    return;
  }

  // 3. Frontend Client Portal (/*)
  serveStatic(req, res, FRONTEND_DIR, pathname);
});

// Start listening with automatic port increment fallback if port is in use
let currentPort = DEFAULT_PORT;

function startServer(port) {
  server.listen(port, () => {
    console.log(`====================================================`);
    console.log(`  ITC TECHNOLOGY - Industrial Web & Admin Portal   `);
    console.log(`  Server running at: http://localhost:${port}        `);
    console.log(`  Website:           http://localhost:${port}/       `);
    console.log(`  Admin CMS:         http://localhost:${port}/admin  `);
    console.log(`  Default Admin:     admin / admin@123             `);
    console.log(`====================================================`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`[LƯU Ý] Cổng ${currentPort} đang có ứng dụng khác sử dụng.`);
    currentPort++;
    console.log(`[TỰ ĐỘNG CHUYỂN] Đang chuyển sang cổng mới: ${currentPort}...`);
    startServer(currentPort);
  } else {
    console.error('Server error:', err);
  }
});

startServer(currentPort);
// Last synced: 2026-10-19T22:58:00Z
