import fs from 'node:fs';
import path from 'node:path';

const targetBase = 'd:\\Anti\\WebITC\\Anh\\Rendered_Clean';

const folders = [
  'Wed Thiết bị kiểm tra QC',
  'Wed buồng sấy mộc tự động',
  'Wed day chuyen duc',
  'Wed day chuyen phun men',
  'Wed thiết máy khuấy hồ'
];

for (const f of folders) {
  const dir = path.join(targetBase, f);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('Created dir:', dir);
  }
}
