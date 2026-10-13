const http = require('http');

const PORT = 3005;
const BASE = `http://localhost:${PORT}`;

const ALL_ROUTES = [
  '/',
  '/accessibility',
  '/ai-blueprint',
  '/analytics',
  '/architecture',
  '/assessment',
  '/auth',
  '/bookmarks',
  '/career-match',
  '/catalogue',
  '/dashboard',
  '/dsa-tracker',
  '/learning',
  '/market',
  '/mentor',
  '/opportunities',
  '/portfolio',
  '/privacy',
  '/profile',
  '/projects',
  '/readiness',
  '/results',
  '/resume',
  '/roadmap',
  '/simulator',
  '/skill-gap',
  '/sprint-planner',
  '/terms',
  '/welcome',
];

function request(path, options = {}) {
  const url = new URL(path, BASE);
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const isApi = path.startsWith('/api/');
    const reqOptions = {
      method: options.method || 'GET',
      headers: {
        'Accept': isApi ? 'application/json' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        ...(isApi ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {}),
      },
    };

    const req = http.request(url, reqOptions, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        const latency = Date.now() - start;
        let json = null;
        try {
          json = JSON.parse(body);
        } catch {}
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: json,
          raw: body,
          latency,
        });
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runE2E() {
  console.log('================================================================');
  console.log('TALVIORA TECH: Autonomous Full-Stack E2E QA Verification Suite');
  console.log('Target Server: ' + BASE);
  console.log('Time: ' + new Date().toISOString());
  console.log('================================================================\n');

  const summary = {
    total: 0,
    passed: 0,
    failed: 0,
    failures: [],
  };

  async function assertTest(name, fn) {
    summary.total++;
    try {
      const res = await fn();
      summary.passed++;
      const latencyStr = res?.latency ? ` (${res.latency}ms)` : '';
      console.log(`[PASS] ${name}${latencyStr}`);
      return res;
    } catch (err) {
      summary.failed++;
      summary.failures.push({ name, error: err.message });
      console.log(`[FAIL] ${name} -> ERROR: ${err.message}`);
    }
  }

  // 1. Security Headers Verification
  console.log('--- Phase 1: Security Headers & Guardrails ---');
  await assertTest('Security Header: X-Frame-Options (DENY)', async () => {
    const res = await request('/');
    if (res.headers['x-frame-options'] !== 'DENY') {
      throw new Error(`Expected DENY, got: ${res.headers['x-frame-options']}`);
    }
    return res;
  });

  await assertTest('Security Header: X-Content-Type-Options (nosniff)', async () => {
    const res = await request('/');
    if (res.headers['x-content-type-options'] !== 'nosniff') {
      throw new Error(`Expected nosniff, got: ${res.headers['x-content-type-options']}`);
    }
    return res;
  });

  await assertTest('Security Header: Referrer-Policy', async () => {
    const res = await request('/');
    if (!res.headers['referrer-policy']) {
      throw new Error(`Missing referrer-policy header`);
    }
    return res;
  });

  await assertTest('Security Header: Permissions-Policy', async () => {
    const res = await request('/');
    if (!res.headers['permissions-policy']) {
      throw new Error(`Missing permissions-policy header`);
    }
    return res;
  });

  // 2. Custom 404 Route Verification
  console.log('\n--- Phase 2: Not-Found Error Boundary ---');
  await assertTest('404 Handling: /non-existent-page-qa-check', async () => {
    const res = await request('/non-existent-page-qa-check');
    if (res.status !== 404) {
      throw new Error(`Expected HTTP 404, received HTTP ${res.status}`);
    }
    if (!res.raw.includes('404') && !res.raw.includes('Not Found') && !res.raw.includes('Return to')) {
      throw new Error('Response did not contain expected 404 markup');
    }
    return res;
  });

  // 3. Complete Routes Inventory
  console.log(`\n--- Phase 3: Route Inventory Verification (${ALL_ROUTES.length} Routes) ---`);
  for (const route of ALL_ROUTES) {
    await assertTest(`Route GET ${route}`, async () => {
      const res = await request(route);
      if (res.status !== 200) {
        throw new Error(`HTTP Status ${res.status} on ${route}`);
      }
      if (typeof res.raw !== 'string' || res.raw.length < 50) {
        throw new Error(`Empty or truncated HTML payload on ${route}`);
      }
      if (res.raw.includes('Application error: a client-side exception has occurred')) {
        throw new Error(`Client exception found in rendered output of ${route}`);
      }
      return res;
    });
  }

  // 4. API Endpoints & State Contracts
  console.log('\n--- Phase 4: Full-Stack API Contracts & Edge Cases ---');

  // Assessment API
  await assertTest('API: GET /api/assessment', async () => {
    const res = await request('/api/assessment', { headers: { 'Content-Type': 'application/json' } });
    if (res.status !== 200 || !res.data?.candidate) throw new Error(`Invalid response`);
    return res;
  });

  await assertTest('API: POST /api/assessment (Happy Path)', async () => {
    const res = await request('/api/assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { targetRole: 'AI Solutions Architect', weeklyHours: 15, answers: { 'q-1': 1 } },
    });
    if (res.status !== 200 || !res.data?.success || typeof res.data?.readinessScore !== 'number') {
      throw new Error(`Malformed evaluation output`);
    }
    return res;
  });

  // Tasks API
  await assertTest('API: GET /api/tasks', async () => {
    const res = await request('/api/tasks', { headers: { 'Content-Type': 'application/json' } });
    if (res.status !== 200 || !Array.isArray(res.data?.tasks)) throw new Error(`Invalid tasks array`);
    return res;
  });

  await assertTest('API: POST /api/tasks (Create & Persist Sprint Task)', async () => {
    const res = await request('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { title: 'E2E QA Automated Test Task', category: 'Verification', hours: 3, column: 'backlog' },
    });
    if (res.status !== 200 || !res.data?.success || !res.data?.task?.id) {
      throw new Error(`Task creation failed: ${JSON.stringify(res.data)}`);
    }
    return res;
  });

  await assertTest('API: POST /api/tasks (Empty Title Validation Guard)', async () => {
    const res = await request('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { title: '', category: 'Verification' },
    });
    if (res.status !== 400 || res.data?.success !== false) {
      throw new Error(`Expected 400 validation error, got: ${res.status}`);
    }
    return res;
  });

  // Interview API
  await assertTest('API: GET /api/interview', async () => {
    const res = await request('/api/interview', { headers: { 'Content-Type': 'application/json' } });
    if (res.status !== 200 || !Array.isArray(res.data?.questions)) throw new Error(`Invalid interview list`);
    return res;
  });

  await assertTest('API: POST /api/interview (Short Answer 400 Boundary Check)', async () => {
    const res = await request('/api/interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { role: 'AI Architect', question: 'Explain RAG', answer: 'no' },
    });
    if (res.status !== 400 || res.data?.success !== false) {
      throw new Error(`Expected HTTP 400 for short answer, got HTTP ${res.status}`);
    }
    return res;
  });

  await assertTest('API: POST /api/interview (Legitimate Technical Answer)', async () => {
    const res = await request('/api/interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        role: 'AI Solutions Architect',
        question: 'Explain vector embeddings chunking trade-offs',
        answer: 'Smaller chunk sizes (e.g. 256 tokens) yield higher retrieval precision and granular semantic matches, whereas larger chunks (e.g. 1024 tokens) preserve broad context and document structure but risk diluted cosine distance similarity and noise during synthesis.',
      },
    });
    if (res.status !== 200 || !res.data?.verdict || typeof res.data?.rating !== 'number') {
      throw new Error(`Invalid interview evaluation: ${JSON.stringify(res.data)}`);
    }
    return res;
  });

  // Bookmarks API
  await assertTest('API: GET /api/bookmarks', async () => {
    const res = await request('/api/bookmarks');
    if (res.status !== 200 || !Array.isArray(res.data?.bookmarks)) throw new Error(`Invalid bookmarks`);
    return res;
  });

  await assertTest('API: POST /api/bookmarks (Sync Catalogue Tool)', async () => {
    const res = await request('/api/bookmarks', {
      method: 'POST',
      body: {
        item_id: 'pytorch',
        title: 'PyTorch Deep Learning',
        item_type: 'resource',
        metadata: { name: 'PyTorch' },
      },
    });
    if (res.status !== 200 || !res.data?.success) throw new Error(`Failed to pin bookmark`);
    return res;
  });

  await assertTest('API: DELETE /api/bookmarks (Unpin Catalogue Tool)', async () => {
    const res = await request('/api/bookmarks?item_id=pytorch&item_type=resource', {
      method: 'DELETE',
    });
    if (res.status !== 200 || !res.data?.success) throw new Error(`Failed to delete bookmark`);
    return res;
  });

  // Projects, Roadmap, Market, Portfolio, Profile
  await assertTest('API: GET /api/projects', async () => {
    const res = await request('/api/projects');
    if (res.status !== 200 || !Array.isArray(res.data?.projects)) throw new Error(`Invalid projects`);
    return res;
  });

  await assertTest('API: GET /api/roadmap', async () => {
    const res = await request('/api/roadmap');
    if (res.status !== 200 || !Array.isArray(res.data?.phases)) throw new Error(`Invalid roadmap`);
    return res;
  });

  await assertTest('API: GET /api/market', async () => {
    const res = await request('/api/market');
    if (res.status !== 200 || !Array.isArray(res.data?.trends)) throw new Error(`Invalid market`);
    return res;
  });

  await assertTest('API: GET /api/portfolio', async () => {
    const res = await request('/api/portfolio');
    if (res.status !== 200 || !res.data?.candidate) throw new Error(`Invalid portfolio`);
    return res;
  });

  await assertTest('API: GET /api/profile', async () => {
    const res = await request('/api/profile');
    if (res.status !== 200 || !res.data?.id) throw new Error(`Invalid profile`);
    return res;
  });

  console.log('\n================================================================');
  console.log(`RESULTS: ${summary.passed}/${summary.total} Passed (${summary.failed} Failed)`);
  console.log('================================================================\n');

  if (summary.failed > 0) {
    console.error('FAILURES:');
    summary.failures.forEach((f) => console.error(` - ${f.name}: ${f.error}`));
    process.exit(1);
  } else {
    console.log('SUCCESS: All E2E Quality Assurance assertions verified perfectly!');
    process.exit(0);
  }
}

runE2E().catch((err) => {
  console.error('Fatal E2E test runner exception:', err);
  process.exit(1);
});
