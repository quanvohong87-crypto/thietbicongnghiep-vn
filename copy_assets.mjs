import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRONTEND_IMG_DIR = path.resolve(__dirname, 'frontend/images');
const UPLOADS_DIR = path.resolve(__dirname, 'backend/uploads');
const BRAIN_DIR_ELEC = 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\6c14200e-70e6-4465-8400-5f6729cb07ab';
const BRAIN_DIR_CERAMIC = 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\33c7ca08-35bc-4af1-8c2d-e790bf813125';

const imagesToCopy = [
  // Electronics Industry
  { src: path.join(BRAIN_DIR_ELEC, 'pcb_test_jig_fct_1792812371913.jpg'), dest: 'pcb_test_jig_fct.jpg' },
  { src: path.join(BRAIN_DIR_ELEC, 'smt_glue_dispenser_1792814686887.jpg'), dest: 'smt_glue_dispenser.jpg' },
  { src: path.join(BRAIN_DIR_ELEC, 'esd_cleanroom_workbench_1792814709131.jpg'), dest: 'esd_cleanroom_workbench.jpg' },
  { src: path.join(BRAIN_DIR_ELEC, 'selective_soldering_robot_1792814727730.jpg'), dest: 'selective_soldering_robot.jpg' },
  { src: path.join(BRAIN_DIR_ELEC, 'electronics_factory_showcase_1792814747767.jpg'), dest: 'electronics_factory_showcase.jpg' },
  // Sanitary Ware (Robotic Glazing & Workshop Equipment)
  { src: 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\baaef2f1-da0c-4880-82b2-e3e72394f0bd\\.user_uploaded\\media_1793239453461.png', dest: 'sanitary_glazing_robot.jpg' },
  { src: path.join(BRAIN_DIR_CERAMIC, 'sanitary_manual_glazing_1792868153481.jpg'), dest: 'sanitary_manual_glazing.jpg' },
  { src: path.join(BRAIN_DIR_CERAMIC, 'sanitary_kiln_car_1792868171702.jpg'), dest: 'sanitary_kiln_car.jpg' },
  { src: path.join(BRAIN_DIR_CERAMIC, 'sanitary_roller_conveyor_1792868189600.jpg'), dest: 'sanitary_roller_conveyor.jpg' },
  { src: path.join(BRAIN_DIR_CERAMIC, 'sanitary_flush_tester_1792868209231.jpg'), dest: 'sanitary_flush_tester_spm.jpg' },
  { src: path.join(BRAIN_DIR_CERAMIC, 'sanitary_flush_tester_1792868209231.jpg'), dest: 'sanitary_manual_tester.jpg' },
  { src: path.join(BRAIN_DIR_CERAMIC, 'sanitary_flush_tester_1792868209231.jpg'), dest: 'sanitary_flush_tester.jpg' },
  { src: path.join(BRAIN_DIR_CERAMIC, 'sanitary_factory_showcase_1792868230579.jpg'), dest: 'sanitary_factory_showcase.jpg' },
  { src: path.join(BRAIN_DIR_CERAMIC, 'art_manual_glaze_1792871478404.jpg'), dest: 'art_manual_glaze.jpg' },
  { src: path.join(BRAIN_DIR_CERAMIC, 'art_kiln_and_test_1792871519708.jpg'), dest: 'art_kiln_and_test.jpg' },
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

if (!fs.existsSync(FRONTEND_IMG_DIR)) fs.mkdirSync(FRONTEND_IMG_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

console.log('[ASSETS] Checking & copying local assets...');
for (const item of imagesToCopy) {
  const dest1 = path.join(FRONTEND_IMG_DIR, item.dest);
  const dest2 = path.join(UPLOADS_DIR, item.dest);
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, dest1);
    fs.copyFileSync(item.src, dest2);
    console.log(`[ASSET OK] ${item.dest} (${(fs.statSync(dest1).size / 1024).toFixed(1)} KB)`);
  } else if (fs.existsSync(dest1)) {
    console.log(`[ALREADY EXISTS] ${item.dest}`);
  } else {
    console.warn(`[WARNING] Source not found: ${item.src}`);
  }
}
console.log('[ASSETS] Ready!');
