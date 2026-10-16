const fs = require('fs');
const path = require('path');

const reportPath = process.argv[2] || path.join(__dirname, '..', 'scratch', 'lighthouse_baseline.json');
if (!fs.existsSync(reportPath)) {
  console.error("Report not found at:", reportPath);
  process.exit(1);
}

const raw = fs.readFileSync(reportPath, 'utf8');
const data = JSON.parse(raw);

console.log("================================================================================");
console.log("                      LIGHTHOUSE AUDIT RESULTS                                  ");
console.log("================================================================================");
console.log("Target URL:   ", data.finalDisplayedUrl);
console.log("Fetch Time:   ", data.fetchTime);
console.log("Form Factor:  ", data.configSettings?.formFactor || 'mobile (default)');
console.log("--------------------------------------------------------------------------------");

console.log("\n--- CATEGORY SCORES ---");
for (const [key, cat] of Object.entries(data.categories || {})) {
  const score = Math.round(cat.score * 100);
  console.log(`${cat.title.padEnd(25)}: ${score}/100`);
}

console.log("\n--- CORE WEB VITALS & TIMINGS ---");
const audits = data.audits || {};
const metrics = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
  'interactive'
];

metrics.forEach(m => {
  const a = audits[m];
  if (a) {
    console.log(`${a.title.padEnd(30)}: ${a.displayValue || a.numericValue} (Score: ${Math.round(a.score * 100)}/100)`);
  }
});

console.log("\n--- KEY OPPORTUNITIES & DIAGNOSTICS ---");
const opps = [
  'render-blocking-resources',
  'render-blocking-requests',
  'unused-javascript',
  'unused-css-rules',
  'unminified-javascript',
  'unminified-css',
  'efficient-animated-content',
  'uses-responsive-images',
  'offscreen-images',
  'uses-optimized-images',
  'modern-image-formats',
  'font-display',
  'layout-shift-elements'
];

opps.forEach(o => {
  const a = audits[o];
  if (a && a.score !== null && a.score < 1) {
    console.log(`\n[!] ${a.title} (Score: ${Math.round(a.score * 100)}/100)`);
    if (a.displayValue) console.log(`    Wasted: ${a.displayValue}`);
    if (a.details?.items?.length) {
      a.details.items.slice(0, 5).forEach(item => {
        const url = item.url || item.node?.snippet || item.source || JSON.stringify(item);
        const wasted = item.wastedMs ? `${item.wastedMs}ms` : item.wastedBytes ? `${Math.round(item.wastedBytes/1024)}KB` : '';
        console.log(`    - ${url.slice(0, 100)} ${wasted}`);
      });
    }
  }
});

console.log("\n================================================================================");
