import fs from 'node:fs';
import path from 'node:path';

const currentBrain = 'C:\\Users\\Zen\\.gemini\\antigravity-ide\\brain\\6c14200e-70e6-4465-8400-5f6729cb07ab';
const fImg = path.resolve('frontend/images');
const bUp = path.resolve('backend/uploads');

const list = [
  { s: path.join(currentBrain, 'pcb_test_jig_fct_1792812371913.jpg'), d: 'pcb_test_jig_fct.jpg' },
  { s: path.join(currentBrain, 'sanitary_glazing_robot_1792812390834.jpg'), d: 'sanitary_glazing_robot.jpg' },
  { s: path.join(currentBrain, 'sanitary_kiln_car_1792812407640.jpg'), d: 'sanitary_kiln_car.jpg' }
];

for (const item of list) {
  if (fs.existsSync(item.s)) {
    fs.copyFileSync(item.s, path.join(fImg, item.d));
    fs.copyFileSync(item.s, path.join(bUp, item.d));
    console.log(`Copied ${item.d}: ${fs.statSync(item.s).size} bytes`);
  } else {
    console.log(`Source not found: ${item.s}`);
  }
}
