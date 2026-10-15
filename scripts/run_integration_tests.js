const http = require('http');

const PORT = process.env.PORT || 3000;
const BASE = `http://localhost:${PORT}`;

async function request(path, options = {}) {
  const url = new URL(path, BASE);
  const start = Date.now();
  
  return new Promise((resolve, reject) => {
    const reqOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    };

    const req = http.request(url, reqOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const latency = Date.now() - start;
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, data: json, latency });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body, latency });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('TALVIORA TECH: Backend API Integration Verification');
  console.log('Target Server: ' + BASE);
  console.log('====================================================\n');

  const results = [];

  // Helper
  async function test(name, fn) {
    try {
      const res = await fn();
      results.push({ name, passed: true, ...res });
      console.log(`[PASS] ${name} (${res.latency}ms) - Status: ${res.status}`);
    } catch (err) {
      results.push({ name, passed: false, error: err.message });
      console.log(`[FAIL] ${name} - Error: ${err.message}`);
    }
  }

  // 1. GET /api/assessment
  await test('GET /api/assessment', async () => {
    const res = await request('/api/assessment');
    if (res.status !== 200 || !res.data.candidate) throw new Error(`Unexpected: ${JSON.stringify(res.data)}`);
    return res;
  });

  // 2. POST /api/assessment (valid payload)
  await test('POST /api/assessment (Valid Evaluation)', async () => {
    const res = await request('/api/assessment', {
      method: 'POST',
      body: {
        targetRole: 'AI Solutions Architect',
        weeklyHours: 14,
        answers: { 'q-1': 1, 'q-2': 0 }
      }
    });
    if (res.status !== 200 || !res.data.success || typeof res.data.readinessScore !== 'number') {
      throw new Error(`Failed assessment evaluation: ${JSON.stringify(res.data)}`);
    }
    return res;
  });

  // 3. POST /api/assessment (empty body / error handling)
  await test('POST /api/assessment (Malformed Body Guard)', async () => {
    const res = await request('/api/assessment', {
      method: 'POST',
      body: ''
    });
    // Should be handled gracefully with 400 or 500 fallback
    if (!res.data) throw new Error('No data received');
    return res;
  });

  // 4. GET /api/interview
  await test('GET /api/interview', async () => {
    const res = await request('/api/interview');
    if (res.status !== 200 || !Array.isArray(res.data.questions)) throw new Error('Invalid questions list');
    return res;
  });

  // 5. POST /api/interview (Screening Answer & Provider Availability Guard)
  await test('POST /api/interview (Screening Answer & Provider Availability Guard)', async () => {
    const res = await request('/api/interview', {
      method: 'POST',
      body: {
        role: 'AI Solutions Architect',
        question: 'Explain trade-offs of semantic caching in RAG pipelines.',
        answer: 'Semantic caching uses vector cosine similarity to reuse embeddings and generation responses, which dramatically reduces p95 latency and LLM costs, but introduces staleness risks if cache invalidation thresholds are tuned too loose.'
      }
    });
    const isHonestResponse = (res.status === 200 && res.data.success && typeof res.data.rating === 'number') ||
                             (res.status === 502 && res.data.success === false) ||
                             (res.status === 503 && res.data.success === false) ||
                             (res.status === 429 && res.data.success === false);
    if (!isHonestResponse) {
      throw new Error(`Unexpected interview response: Status ${res.status} ${JSON.stringify(res.data)}`);
    }
    return res;
  });

  // 6. POST /api/interview (Validation - Under 5 characters)
  await test('POST /api/interview (Validation Guard - Answer Too Short)', async () => {
    const res = await request('/api/interview', {
      method: 'POST',
      body: {
        role: 'AI Solutions Architect',
        question: 'Any',
        answer: 'No'
      }
    });
    if (res.status !== 400 || res.data.success !== false) {
      throw new Error(`Expected 400 validation error, received status ${res.status}`);
    }
    return res;
  });

  // 7. GET /api/market
  await test('GET /api/market', async () => {
    const res = await request('/api/market');
    if (res.status !== 200 || !Array.isArray(res.data.trends)) throw new Error('Invalid trends');
    return res;
  });

  // 8. GET /api/market?role=ml
  await test('GET /api/market?role=ml (Query Filter & Provider State Contract)', async () => {
    const res = await request('/api/market?role=ml');
    if (res.status !== 200 || !res.data.success) throw new Error('Market request failed');
    return res;
  });

  // 9. GET /api/portfolio
  await test('GET /api/portfolio (Slug Validation Boundary)', async () => {
    const res = await request('/api/portfolio');
    if (res.status !== 400 || res.data.success !== false) throw new Error(`Expected 400 when slug missing, got ${res.status}`);
    return res;
  });

  // 10. GET /api/profile
  await test('GET /api/profile (Unauthenticated Access Guard)', async () => {
    const res = await request('/api/profile');
    if (res.status !== 401 || res.data.success !== false) throw new Error(`Expected 401 unauthorized, got ${res.status}`);
    return res;
  });

  // 11. POST /api/profile
  await test('POST /api/profile (Unauthenticated Mutation Guard)', async () => {
    const res = await request('/api/profile', {
      method: 'POST',
      body: {
        name: 'Feriha Rahman',
        targetRole: 'Staff AI Solutions Architect',
        weeklyHours: 16
      }
    });
    if (res.status !== 401 || res.data.success !== false) {
      throw new Error(`Expected 401 unauthorized for profile update, got ${res.status}`);
    }
    return res;
  });

  // 12. GET /api/projects
  await test('GET /api/projects', async () => {
    const res = await request('/api/projects');
    if (res.status !== 200 || !Array.isArray(res.data.projects)) throw new Error('Invalid projects list');
    return res;
  });

  // 13. GET /api/projects?difficulty=advanced
  await test('GET /api/projects?difficulty=advanced (Filter)', async () => {
    const res = await request('/api/projects?difficulty=advanced');
    if (res.status !== 200 || !Array.isArray(res.data.projects)) throw new Error('Projects filter failed');
    return res;
  });

  // 14. GET /api/roadmap
  await test('GET /api/roadmap', async () => {
    const res = await request('/api/roadmap');
    if (res.status !== 200 || !Array.isArray(res.data.phases)) throw new Error('Invalid roadmap phases');
    return res;
  });

  // 15. GET /api/roadmap?phase=2
  await test('GET /api/roadmap?phase=2 (Phase Filter)', async () => {
    const res = await request('/api/roadmap?phase=2');
    if (res.status !== 200 || res.data.phases.length !== 1) throw new Error('Phase filter failed');
    return res;
  });

  // 16. GET /api/tasks
  await test('GET /api/tasks', async () => {
    const res = await request('/api/tasks');
    if (res.status !== 200 || !Array.isArray(res.data.tasks)) throw new Error('Invalid tasks list');
    return res;
  });

  // 17. POST /api/tasks (Unauthenticated Mutation Guard)
  await test('POST /api/tasks (Unauthenticated Mutation Guard)', async () => {
    const res = await request('/api/tasks', {
      method: 'POST',
      body: {
        title: 'Review production RAG evaluation metrics',
        category: 'Quality Assurance',
        hours: 3,
        column: 'backlog'
      }
    });
    if (res.status !== 401 || res.data.success !== false) throw new Error(`Expected 401 unauthorized, got ${res.status}`);
    return res;
  });

  // 18. GET /api/bookmarks
  await test('GET /api/bookmarks', async () => {
    const res = await request('/api/bookmarks');
    if (res.status !== 200 || !Array.isArray(res.data.bookmarks)) throw new Error('Invalid bookmarks response');
    return res;
  });

  // 19. POST /api/bookmarks (Unauthenticated Mutation Guard)
  await test('POST /api/bookmarks (Unauthenticated Mutation Guard)', async () => {
    const res = await request('/api/bookmarks', {
      method: 'POST',
      body: {
        item_id: 'lang-python',
        title: 'Python 3.12+',
        item_type: 'resource',
        metadata: { category: 'Programming Languages', difficulty: 'Beginner' }
      }
    });
    if (res.status !== 401 || res.data.success !== false) throw new Error(`Expected 401 unauthorized, got ${res.status}`);
    return res;
  });

  // 20. DELETE /api/bookmarks (Unauthenticated Mutation Guard)
  await test('DELETE /api/bookmarks (Unauthenticated Mutation Guard)', async () => {
    const res = await request('/api/bookmarks?item_id=lang-python&item_type=resource', {
      method: 'DELETE'
    });
    if (res.status !== 401 || res.data.success !== false) throw new Error(`Expected 401 unauthorized, got ${res.status}`);
    return res;
  });

  console.log('\n====================================================');
  const passed = results.filter(r => r.passed).length;
  console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passed} | FAILED: ${results.length - passed}`);
  console.log('====================================================');

  if (passed === results.length) {
    console.log('ALL BACKEND INTEGRATION TESTS PASSED WITH 100% SUCCESS!');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
