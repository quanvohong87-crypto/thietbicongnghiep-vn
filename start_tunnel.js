import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Ensure server is running on 3050
async function ensureServerRunning() {
  let isRunning = false;
  try {
    const res = await fetch('http://localhost:3050/api/settings', { signal: AbortSignal.timeout(1000) });
    if (res.ok) isRunning = true;
  } catch (e) {}

  if (!isRunning) {
    console.log('-> Đang khởi động ITC Server...');
    const srv = spawn(process.execPath, [path.join(__dirname, 'server.js')], {
      detached: true,
      stdio: 'ignore',
      cwd: __dirname
    });
    srv.unref();
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 600));
      try {
        const res = await fetch('http://localhost:3050/api/settings', { signal: AbortSignal.timeout(1000) });
        if (res.ok) {
          console.log('✓ Server local đã chạy tại: http://localhost:3050');
          break;
        }
      } catch (e) {}
    }
  } else {
    console.log('✓ Server local đang hoạt động tại: http://localhost:3050');
  }
}

async function runTunnel() {
  await ensureServerRunning();

  const cloudflaredPath = path.join(__dirname, 'cloudflared.exe');
  if (!fs.existsSync(cloudflaredPath)) {
    console.error('✗ Không tìm thấy file cloudflared.exe tại thư mục dự án');
    process.exit(1);
  }

  console.log('-> Đang kết nối Cloudflare Tunnel tới http://localhost:3050 ...');
  const tunnel = spawn(cloudflaredPath, ['tunnel', '--url', 'http://localhost:3050'], {
    cwd: __dirname
  });

  let tunnelUrl = null;

  function handleData(chunk) {
    const text = chunk.toString();
    const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
    if (match && !tunnelUrl) {
      tunnelUrl = match[0];
      fs.writeFileSync(path.join(__dirname, 'tunnel_url.txt'), tunnelUrl, 'utf8');
      console.log('\n=============================================================================');
      console.log('🎉 CLOUDFLARE TUNNEL ONLINE ĐÃ MỞ THÀNH CÔNG!');
      console.log(`🌐 Link Website Khách Hàng: ${tunnelUrl}`);
      console.log(`⚙️ Link Quản Trị CMS Admin: ${tunnelUrl}/admin`);
      console.log('=============================================================================\n');
    }
  }

  tunnel.stdout.on('data', handleData);
  tunnel.stderr.on('data', handleData);

  tunnel.on('close', (code) => {
    console.log(`Tunnel process exited with code ${code}`);
  });

  // Keep script alive
  setInterval(() => {}, 10000);
}

runTunnel();
