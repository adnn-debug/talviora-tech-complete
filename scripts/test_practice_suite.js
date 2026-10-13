const assert = require("assert");
const fs = require("fs");
const path = require("path");

console.log("================================================================");
console.log("TALVIORA TECH: Practice Suite & Pedagogical Verification");
console.log("================================================================\n");

// Read and parse the practice exercises from lib/practice-exercises-data.ts
const dataFilePath = path.join(__dirname, "../lib/practice-exercises-data.ts");
const content = fs.readFileSync(dataFilePath, "utf8");

// Verify file existence and key exports
assert(content.includes("export const PRACTICE_EXERCISES"), "PRACTICE_EXERCISES export must exist");

// Simple TypeScript to JS transpilation for runtime verification
const vm = require("vm");
const ts = require("typescript");

const transpiled = ts.transpileModule(content, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});

const sandboxModule = { exports: {} };
const context = vm.createContext({
  module: sandboxModule,
  exports: sandboxModule.exports,
  console: console,
});

vm.runInContext(transpiled.outputText, context);
const { PRACTICE_EXERCISES } = sandboxModule.exports;

assert(Array.isArray(PRACTICE_EXERCISES), "PRACTICE_EXERCISES must be an array");
assert.strictEqual(PRACTICE_EXERCISES.length, 5, "Must have exactly 5 progressive exercises");
console.log(`[PASS] Found all ${PRACTICE_EXERCISES.length} progressive practice exercises.`);

let totalTestsRun = 0;
let totalTestsPassed = 0;

PRACTICE_EXERCISES.forEach((ex, exIdx) => {
  console.log(`\nVerifying Exercise ${exIdx + 1}: "${ex.title}" (${ex.level})`);

  // Step 1 verification: Learn the Idea
  assert(ex.conceptExplanation && ex.conceptExplanation.length > 20, "Must have conceptExplanation");
  assert(ex.realWorldAnalogy && ex.realWorldAnalogy.length > 20, "Must have realWorldAnalogy");
  assert(Array.isArray(ex.vocabulary) && ex.vocabulary.length >= 2, "Must have vocabulary definitions");
  console.log(`  [PASS] Step 1 (Learn the Idea): Concept, Analogy, and ${ex.vocabulary.length} Vocab items.`);

  // Step 2 verification: See How It Works
  assert(ex.workedExampleCode && ex.workedExampleCode.length > 20, "Must have workedExampleCode");
  assert(Array.isArray(ex.lineExplanations) && ex.lineExplanations.length >= 2, "Must have lineExplanations");
  console.log(`  [PASS] Step 2 (See How It Works): Worked code & ${ex.lineExplanations.length} line annotations.`);

  // Step 3 verification: Understand the Code
  assert(ex.inputExplanation && ex.inputExplanation.length > 10, "Must have inputExplanation");
  assert(ex.logicExplanation && ex.logicExplanation.length > 10, "Must have logicExplanation");
  assert(ex.outputExplanation && ex.outputExplanation.length > 10, "Must have outputExplanation");
  console.log(`  [PASS] Step 3 (Understand the Code): Input, Logic, Output verified.`);

  // Step 4 verification: Write Your Own Code
  assert(ex.taskPrompt && ex.taskPrompt.length > 20, "Must have taskPrompt");
  assert(ex.functionName && ex.functionName.length > 2, "Must have functionName");
  assert(Array.isArray(ex.requirements) && ex.requirements.length >= 2, "Must have requirements checklist");
  assert(ex.starterCode && ex.starterCode.length > 10, "Must have starterCode");
  assert(Array.isArray(ex.hints) && ex.hints.length >= 1, "Must have hints");
  assert(ex.solutionCode && ex.solutionCode.length > 10, "Must have solutionCode");
  console.log(`  [PASS] Step 4 (Write Your Own Code): Task prompt, starter code, and solution code.`);

  // Step 5 verification: Run and Test
  assert(Array.isArray(ex.testCases) && ex.testCases.length >= 3, "Must have at least 3 test cases");

  // Execute solution code against all test cases
  const runner = new Function(
    "console",
    `"use strict";
    ${ex.solutionCode}
    if (typeof ${ex.functionName} !== "undefined") {
      return ${ex.functionName};
    }
    return null;
    `
  );
  const fn = runner({ log: () => {}, warn: () => {}, error: () => {} });
  assert.strictEqual(typeof fn, "function", `Solution must define function ${ex.functionName}`);

  ex.testCases.forEach((tc, tcIdx) => {
    totalTestsRun++;
    const clonedInput = JSON.parse(JSON.stringify(tc.input));
    const result = fn(...clonedInput);
    assert.deepStrictEqual(
      JSON.parse(JSON.stringify(result)),
      JSON.parse(JSON.stringify(tc.expectedOutput)),
      `Test Case ${tcIdx + 1} (${tc.name}) failed for ${ex.functionName}`
    );
    totalTestsPassed++;
    console.log(`    ✓ ${tc.name} passed: Input ${JSON.stringify(tc.input)} => ${JSON.stringify(result)}`);
  });
});

console.log("\n================================================================");
console.log(`PRACTICE SUITE VERIFICATION: PASSED: ${totalTestsPassed}/${totalTestsRun}`);
console.log("ALL 5 PROGRESSIVE CODING EXERCISES & TEST CASES VERIFIED 100%!");
console.log("================================================================");
