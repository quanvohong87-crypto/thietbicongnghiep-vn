import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const child = spawn(process.execPath, [path.join(__dirname, 'server.js')], {
  detached: true,
  stdio: 'ignore',
  cwd: __dirname
});
child.unref();

console.log(`✓ ITC Server launched in background with PID: ${child.pid}`);
