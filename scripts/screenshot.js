/*
Simple Puppeteer script to capture screenshots of sections.
Run:
  node scripts/screenshot.js
It writes files to ./screenshots/
*/

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function run() {
  try {
    const out = path.resolve(__dirname, '..', 'screenshots');
    if (!fs.existsSync(out)) fs.mkdirSync(out);
  // Attempt to use a system Chrome/Chromium binary if bundled Chromium fails to launch.
  const possiblePaths = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
    ];
  let exePath = null;
    for (const p of possiblePaths) { if (fs.existsSync(p)) { exePath = p; break; } }
    const launchOpts = {
      headless: 'new',
      args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage','--single-process','--no-zygote']
    };
    if (exePath) { launchOpts.executablePath = exePath; console.log('Using system browser at', exePath); }
    console.log('Launching browser...');
    const browser = await puppeteer.launch(launchOpts);
    const page = await browser.newPage();
    const url = 'http://localhost:8000/';
    // forward page console messages to node console for debugging
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      // diagnostic: check whether Chart.js loaded and charts were created
      const diag = await page.evaluate(() => {
        const chartDefined = typeof Chart !== 'undefined';
        const canvases = Array.from(document.querySelectorAll('canvas')).map(c => c.id || null);
        const instances = {};
        try {
          canvases.forEach(id => {
            const el = document.getElementById(id);
            if (!el) { instances[id] = 'missing-element'; return; }
            if (window.Chart && Chart.getChart) {
              const inst = Chart.getChart(el);
              instances[id] = !!inst;
            } else {
              instances[id] = 'no-Chart-getChart';
            }
          });
        } catch (e) { instances._error = e && e.toString(); }
        return { chartDefined, canvases, instances };
      });
      console.log('PAGE CHECK:', JSON.stringify(diag, null, 2));
  // Dashboard
  await page.setViewport({ width: 1400, height: 900 });
  await page.screenshot({ path: path.join(out, 'dashboard.png'), fullPage: true });
  // Q1
  await page.click('nav button:nth-child(2)');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(out, 'q1.png'), fullPage: true });
  // Q2
  await page.click('nav button:nth-child(3)');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(out, 'q2.png'), fullPage: true });
  // Conclusion
  await page.click('nav button:nth-child(5)');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(out, 'conclusion.png'), fullPage: true });
    await browser.close();
    console.log('Screenshots saved to', out);
  } catch (err) {
    console.error('SCRIPT ERROR:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

run();
