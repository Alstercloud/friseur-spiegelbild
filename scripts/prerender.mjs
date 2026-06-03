// Statisches Prerendering der SPA-Routen mit Puppeteer.
// LAEUFT NUR in GitHub Actions (Phase 2) - NICHT im Hostinger-Build.
// Ablauf: zuerst `vite build` (Output: dist/public), dann `node scripts/prerender.mjs`.
// Schreibt pro Route eine statische index.html mit vollem, von React gerendertem HTML.
import http from 'node:http';
import { createReadStream, existsSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';
import puppeteer from 'puppeteer';

const DIST = resolve('dist/public');
const PORT = 4178;
// Routen, die als statisches HTML vorgerendert werden sollen:
const ROUTES = ['/', '/impressum', '/datenschutz', '/agb'];

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webp': 'image/webp', '.avif': 'image/avif',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.txt': 'text/plain', '.xml': 'application/xml',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const filePath = join(DIST, urlPath);
  if (existsSync(filePath) && statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
    createReadStream(filePath).pipe(res);
    return;
  }
  // SPA-Fallback auf index.html
  res.writeHead(200, { 'Content-Type': 'text/html' });
  createReadStream(join(DIST, 'index.html')).pipe(res);
});

await new Promise((r) => server.listen(PORT, r));
const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

for (const route of ROUTES) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 60000 });
  // kurze Reserve, damit React-Effekte (inkl. Meta-Injektion) abgeschlossen sind
  await new Promise((r) => setTimeout(r, 800));
  const html = await page.content();
  const outDir = route === '/' ? DIST : join(DIST, route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  console.log(`prerendered ${route} -> ${join(outDir, 'index.html')}`);
  await page.close();
}

await browser.close();
server.close();
console.log('Prerendering fertig.');
