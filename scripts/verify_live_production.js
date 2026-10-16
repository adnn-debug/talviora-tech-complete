const https = require('https');

const PRODUCTION_URL = 'https://talviora-ai-career-intelligence.vercel.app';

const ROUTES_TO_TEST = [
  '/',
  '/learning',
  '/catalogue',
  '/assessment',
  '/simulator',
  '/opportunities',
  '/projects',
  '/career-match',
  '/features',
  '/features/feature-12',
  '/auth',
  '/roadmap',
  '/dsa-tracker',
  '/sprint-planner',
  '/bookmarks',
  '/profile',
  '/privacy',
  '/terms',
  '/accessibility',
  '/api/assessment',
  '/api/interview',
  '/api/market',
  '/api/projects',
  '/api/roadmap',
  '/api/tasks',
  '/api/bookmarks',
  '/api/portfolio?slug=invalid-slug-check'
];

function fetchRoute(path) {
  return new Promise((resolve) => {
    const start = Date.now();
    const url = new URL(path, PRODUCTION_URL);
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const latency = Date.now() - start;
        resolve({
          path,
          status: res.statusCode,
          latency,
          vercelId: res.headers['x-vercel-id'],
          contentType: res.headers['content-type'],
          length: data.length,
          hasError: data.includes('Application error') || data.includes('Internal Server Error')
        });
      });
    }).on('error', (err) => {
      resolve({ path, status: 0, error: err.message });
    });
  });
}

async function runLiveVerification() {
  console.log('================================================================');
  console.log('TALVIORA TECH: Live Production Deployment Health Check');
  console.log('Target: ' + PRODUCTION_URL);
  console.log('Timestamp: ' + new Date().toISOString());
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  for (const route of ROUTES_TO_TEST) {
    const res = await fetchRoute(route);
    const isExpected = (route === '/api/portfolio?slug=invalid-slug-check' && (res.status === 404 || res.status === 503)) ||
                       (res.status === 200 && !res.hasError);

    if (isExpected) {
      passed++;
      console.log(`[PASS] ${route.padEnd(40)} Status: ${res.status} (${res.latency}ms) [${res.length} bytes]`);
    } else {
      failed++;
      console.log(`[FAIL] ${route.padEnd(40)} Status: ${res.status} (${res.latency}ms) - Error: ${res.hasError ? 'Server error in body' : 'Unexpected status'}`);
    }
  }

  console.log('\n================================================================');
  console.log(`RESULTS: ${passed}/${ROUTES_TO_TEST.length} Passed | ${failed} Failed`);
  console.log('================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runLiveVerification();
