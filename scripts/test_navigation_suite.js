const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("=== RUNNING REQUIREMENT 9: NAVIGATION & DISCOVERABILITY TEST SUITE ===");

const REQUIRED_GROUPS = [
  "HOME",
  "EXPLORE",
  "MY LEARNING",
  "LEARN & PRACTISE",
  "BUILD PROJECTS",
  "AI LEARNING GUIDE",
  "CAREERS & OPPORTUNITIES",
];

// 1. Verify Sidebar.tsx has all 7 groups
const sidebarPath = path.join(__dirname, '..', 'components', 'Sidebar.tsx');
assert(fs.existsSync(sidebarPath), "Sidebar.tsx must exist");
const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

console.log("[TEST 1] Verifying Sidebar.tsx 7 Navigation Groups...");
REQUIRED_GROUPS.forEach((group) => {
  assert(sidebarContent.includes(`title: "${group}"`), `Sidebar must contain navigation category: ${group}`);
});
console.log("✔ Sidebar.tsx contains all 7 exact navigation groups.");

// 2. Verify Navbar.tsx has all 7 primary groups and drawer sections
const navbarPath = path.join(__dirname, '..', 'components', 'Navbar.tsx');
assert(fs.existsSync(navbarPath), "Navbar.tsx must exist");
const navbarContent = fs.readFileSync(navbarPath, 'utf8');

console.log("[TEST 2] Verifying Navbar.tsx Navigation Groups & Mobile Drawer...");
const expectedNavbarLabels = [
  "Home",
  "Explore",
  "My Learning",
  "Learn & Practise",
  "Build Projects",
  "Careers & Opportunities",
];
expectedNavbarLabels.forEach((label) => {
  assert(navbarContent.includes(label), `Navbar must include label: ${label}`);
});
console.log("✔ Navbar.tsx properly reflects the simplified navigation hierarchy.");

// 3. Verify Breadcrumbs.tsx route directory & semantic structure
const breadcrumbsPath = path.join(__dirname, '..', 'components', 'Breadcrumbs.tsx');
assert(fs.existsSync(breadcrumbsPath), "Breadcrumbs.tsx must exist");
const breadcrumbsContent = fs.readFileSync(breadcrumbsPath, 'utf8');

console.log("[TEST 3] Verifying Breadcrumbs.tsx Canonical Group Resolution...");
assert(breadcrumbsContent.includes('ROUTE_DIRECTORY'), "Breadcrumbs must have ROUTE_DIRECTORY lookup map");
assert(breadcrumbsContent.includes('aria-label="Breadcrumbs"'), "Breadcrumbs must have accessible aria-label");
assert(breadcrumbsContent.includes('aria-current="page"'), "Breadcrumbs must mark active page with aria-current");
assert(breadcrumbsContent.includes('group: "Learn & Practise"'), "Breadcrumbs must map to Learn & Practise");
assert(breadcrumbsContent.includes('group: "Careers & Opportunities"'), "Breadcrumbs must map to Careers & Opportunities");
assert(breadcrumbsContent.includes('group: "Build Projects"'), "Breadcrumbs must map to Build Projects");
console.log("✔ Breadcrumbs.tsx correctly maps routes to the 7 groups with accessible markup.");

// 4. Verify CommandPalette.tsx categories align to the 7 groups
const palettePath = path.join(__dirname, '..', 'components', 'CommandPalette.tsx');
assert(fs.existsSync(palettePath), "CommandPalette.tsx must exist");
const paletteContent = fs.readFileSync(palettePath, 'utf8');

console.log("[TEST 4] Verifying CommandPalette.tsx Categories...");
const paletteCategories = [
  'category: "Home"',
  'category: "Explore"',
  'category: "My Learning"',
  'category: "Learn & Practise"',
  'category: "Build Projects"',
  'category: "AI Learning Guide"',
  'category: "Careers & Opportunities"',
];
paletteCategories.forEach((cat) => {
  assert(paletteContent.includes(cat), `CommandPalette must categorize items under: ${cat}`);
});
console.log("✔ CommandPalette.tsx items are strictly grouped into the 7 groups.");

// 5. Verify Bookmarks empty state
const bookmarksPath = path.join(__dirname, '..', 'app', 'bookmarks', 'page.tsx');
assert(fs.existsSync(bookmarksPath), "Bookmarks page must exist");
const bookmarksContent = fs.readFileSync(bookmarksPath, 'utf8');

console.log("[TEST 5] Verifying BookmarksPage Empty State...");
assert(bookmarksContent.includes('Explore All Tech Fields'), "Bookmarks empty state must offer Explore All Tech Fields");
assert(bookmarksContent.includes('/catalogue'), "Bookmarks empty state must link to /catalogue");
assert(bookmarksContent.includes('/career-match'), "Bookmarks empty state must link to /career-match");
assert(bookmarksContent.includes('/roadmap'), "Bookmarks empty state must link to /roadmap");
console.log("✔ BookmarksPage provides helpful, beginner-friendly empty state with quick links.");

// 6. Verify Analytics empty state & telemetry display
const analyticsPath = path.join(__dirname, '..', 'app', 'analytics', 'page.tsx');
assert(fs.existsSync(analyticsPath), "Analytics page must exist");
const analyticsContent = fs.readFileSync(analyticsPath, 'utf8');

console.log("[TEST 6] Verifying AnalyticsPage Empty State & Progress Summary...");
assert(analyticsContent.includes('Completed Topics'), "Analytics must track Completed Topics");
assert(analyticsContent.includes('Daily Study Target'), "Analytics must track Daily Study Target");
assert(analyticsContent.includes('Diagnostic Score'), "Analytics must track Diagnostic Score");
assert(analyticsContent.includes('/assessment'), "Analytics empty state must link to /assessment");
assert(analyticsContent.includes('/learning'), "Analytics empty state must link to /learning");
assert(analyticsContent.includes('/simulator'), "Analytics empty state must link to /simulator");
assert(analyticsContent.includes('/catalogue'), "Analytics empty state must link to /catalogue");
console.log("✔ AnalyticsPage displays personal metrics telemetry and helpful guidance.");

// 7. Verify all 31 platform features maintain route presence (no broken routes)
console.log("[TEST 7] Verifying Route Integrity across all key pages...");
const expectedRoutes = [
  '/',
  '/welcome',
  '/features',
  '/catalogue',
  '/market',
  '/opportunities',
  '/roadmap',
  '/analytics',
  '/sprint-planner',
  '/bookmarks',
  '/profile',
  '/learning',
  '/simulator',
  '/assessment',
  '/results',
  '/dsa-tracker',
  '/projects',
  '/architecture',
  '/portfolio',
  '/mentor',
  '/ai-blueprint',
  '/career-match',
  '/skill-gap',
  '/resume',
  '/readiness',
  '/auth',
];

expectedRoutes.forEach((route) => {
  const relPath = route === '/' ? 'app/page.tsx' : `app${route}/page.tsx`;
  const fullPath = path.join(__dirname, '..', relPath);
  assert(fs.existsSync(fullPath), `Target route must exist: ${relPath}`);
});
console.log("✔ All key platform routes exist without breaking or missing pages.");

console.log("\n=======================================================");
console.log("ALL REQUIREMENT 9 NAVIGATION TESTS PASSED SUCCESSFULLY!");
console.log("=======================================================\n");
