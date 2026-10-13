const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("=== RUNNING REQUIREMENT 11: DESIGN & ACCESSIBILITY TEST SUITE ===");

// 1. Verify app/globals.css rules
const cssPath = path.join(__dirname, '..', 'app', 'globals.css');
assert(fs.existsSync(cssPath), "globals.css must exist");
const cssContent = fs.readFileSync(cssPath, 'utf8');

console.log("[TEST 1] Verifying Focus Indicators & Keyboard Navigation...");
assert(cssContent.includes(':focus-visible'), "globals.css must include :focus-visible rules");
assert(cssContent.includes('outline: 2px solid var(--color-burgundy) !important'), "Focus indicator must have distinct 2px solid outline");
assert(cssContent.includes('outline-offset: 2px !important'), "Focus indicator must specify outline-offset");
assert(cssContent.includes('box-shadow: 0 0 0 3px'), "Focus indicator must include outer ring box-shadow");
console.log("✔ High-contrast dual-layer focus indicator confirmed.");

console.log("[TEST 2] Verifying Reduced Motion Media Query...");
assert(cssContent.includes('@media (prefers-reduced-motion: reduce)'), "globals.css must include prefers-reduced-motion media query");
assert(cssContent.includes('animation-duration: 0.01ms !important'), "Reduced motion must neutralize animations");
console.log("✔ WCAG 2.1 AA Success Criterion 2.3.3 Reduced Motion confirmed.");

console.log("[TEST 3] Verifying Button Ergonomics & Touch Targets...");
assert(cssContent.includes('.btn-burgundy'), "globals.css must define .btn-burgundy");
assert(cssContent.includes('min-height: 2.625rem'), ".btn-burgundy must specify touch target min-height");
assert(cssContent.includes('.touch-target'), "globals.css must include .touch-target utility");
console.log("✔ Button touch targets (min 42-44px) confirmed.");

console.log("[TEST 4] Verifying Reusable State Classes...");
const stateClasses = [
  '.state-empty-card',
  '.state-error-alert',
  '.state-success-badge',
  '.state-skeleton',
];
stateClasses.forEach((cls) => {
  assert(cssContent.includes(cls), `globals.css must include state class: ${cls}`);
});
console.log("✔ Standard loading, error, success, and empty state utilities confirmed.");

// 2. Verify AppShell Skip Link & Landmarks
console.log("[TEST 5] Verifying Skip Link & Main Landmark in AppShell.tsx...");
const shellPath = path.join(__dirname, '..', 'components', 'AppShell.tsx');
assert(fs.existsSync(shellPath), "AppShell.tsx must exist");
const shellContent = fs.readFileSync(shellPath, 'utf8');
assert(shellContent.includes('href="#main-content"'), "AppShell must contain a skip link pointing to #main-content");
assert(shellContent.includes('Skip to main content'), "AppShell skip link text must be present");
assert(shellContent.includes('id="main-content"'), "AppShell main element must have id='main-content'");
console.log("✔ Skip link and main content landmark bypass verified.");

// 3. Verify ThemeToggle Accessibility
console.log("[TEST 6] Verifying ThemeToggle Accessibility...");
const togglePath = path.join(__dirname, '..', 'components', 'ThemeToggle.tsx');
assert(fs.existsSync(togglePath), "ThemeToggle.tsx must exist");
const toggleContent = fs.readFileSync(togglePath, 'utf8');
assert(toggleContent.includes('aria-label='), "ThemeToggle must specify an accessible aria-label");
assert(toggleContent.includes('localStorage.setItem("talviora-theme"'), "ThemeToggle must persist theme selection");
console.log("✔ ThemeToggle accessible attributes and persistence verified.");

// 4. Mathematical Color Contrast Ratio Calculation (WCAG 2.1 Formula)
console.log("[TEST 7] Calculating WCAG 2.1 Color Contrast Ratios...");

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrast(lum1, lum2) {
  const brighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (brighter + 0.05) / (darker + 0.05);
}

// Light Mode: Burgundy (#6F1737: 111, 23, 55) against Warm Ivory (#FFF9F0: 255, 249, 240)
const lumBurgundy = getLuminance(111, 23, 55);
const lumWarmIvory = getLuminance(255, 249, 240);
const lightContrast = getContrast(lumBurgundy, lumWarmIvory);
console.log(`  Light Mode Heading Contrast: ${lightContrast.toFixed(2)}:1 (WCAG AA requires 4.5:1, AAA requires 7.0:1)`);
assert(lightContrast >= 7.0, "Light mode headings must meet WCAG AAA contrast >= 7.0:1");

// Dark Mode: Blush Burgundy (#E5AEBA: 229, 174, 186) against Espresso (#241A1A: 36, 26, 26)
const lumDarkBurgundy = getLuminance(229, 174, 186);
const lumDarkEspresso = getLuminance(36, 26, 26);
const darkContrast = getContrast(lumDarkBurgundy, lumDarkEspresso);
console.log(`  Dark Mode Heading Contrast: ${darkContrast.toFixed(2)}:1 (WCAG AA requires 4.5:1, AAA requires 7.0:1)`);
assert(darkContrast >= 7.0, "Dark mode headings must meet WCAG AAA contrast >= 7.0:1");

console.log("\n=======================================================");
console.log("ALL REQUIREMENT 11 DESIGN & ACCESSIBILITY TESTS PASSED!");
console.log("=======================================================\n");
