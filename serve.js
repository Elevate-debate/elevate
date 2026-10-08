const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.zip': 'application/zip'
};

// Auto-sync extracted images whenever ETC Ov.zip is updated
function syncZipFiles() {
  const zipPath = path.join(__dirname, 'ETC Ov.zip');
  const targetDir = path.join(__dirname, 'images', 'overview');
  const manifestPath = path.join(targetDir, 'photos.json');

  if (fs.existsSync(zipPath)) {
    try {
      const zipStat = fs.statSync(zipPath);
      let needsSync = true;
      if (fs.existsSync(manifestPath)) {
        const manifestStat = fs.statSync(manifestPath);
        if (manifestStat.mtimeMs >= zipStat.mtimeMs) {
          needsSync = false;
        }
      }

      if (needsSync) {
        if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
        const { execSync } = require('child_process');
        execSync(`powershell -Command "Expand-Archive -Path 'ETC Ov.zip' -DestinationPath 'images/overview' -Force"`, { cwd: __dirname });

        const extracted = fs.readdirSync(targetDir)
          .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f))
          .map(f => ({
            url: `images/overview/${f}`,
            name: f,
            caption: f.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
          }));

        fs.writeFileSync(manifestPath, JSON.stringify(extracted, null, 2));
        console.log(`[Auto-Sync] Extracted ${extracted.length} photos from ETC Ov.zip to images/overview/`);
      }
    } catch (e) {
      console.warn('[Auto-Sync] Zip check failed:', e.message);
    }
  }
}
syncZipFiles();

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` Elevate the Circuit local server running!`);
  console.log(` Open in your browser: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});

