const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ts = require("typescript");

console.log("================================================================");
console.log("TALVIORA TECH: Assessment Suite & Pedagogical Verification");
console.log("================================================================\n");

// Read and transpile career-data.ts
const dataFilePath = path.join(__dirname, "../lib/career-data.ts");
const content = fs.readFileSync(dataFilePath, "utf8");

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
const { assessmentQuestionsList } = sandboxModule.exports;

assert(Array.isArray(assessmentQuestionsList), "assessmentQuestionsList must be an array");
assert.strictEqual(assessmentQuestionsList.length, 8, "Must have exactly 8 comprehensive diagnostic questions");
console.log(`[PASS] Verified ${assessmentQuestionsList.length} assessment diagnostic questions.`);

// 1. Verify 5 Required Categories Representation
const categoriesFound = new Set(assessmentQuestionsList.map((q) => q.questionType));
const requiredCategories = [
  "Foundational Knowledge",
  "Practical Problem-Solving",
  "Code Reading & Debugging",
  "Scenario-Based",
  "Advanced Challenge",
];

requiredCategories.forEach((cat) => {
  assert(categoriesFound.has(cat), `Required category "${cat}" must be represented in questions.`);
  const count = assessmentQuestionsList.filter((q) => q.questionType === cat).length;
  console.log(`  [PASS] Category "${cat}" represented (${count} question(s)).`);
});

// 2. Verify Field Integrity for Every Question
let verifiedOptionsCount = 0;
assessmentQuestionsList.forEach((q, idx) => {
  console.log(`\nVerifying Question ${idx + 1}: "${q.title}" [${q.difficulty} • ${q.questionType}]`);

  assert(q.id === idx + 1, `Question ID must be sequential (${idx + 1})`);
  assert(q.title && q.title.length > 5, "Title must be informative");
  assert(q.question && q.question.length > 20, "Question prompt must be substantive and clear");
  assert(q.expectedTask && q.expectedTask.length > 10, "expectedTask must be explicitly stated");
  assert(["explain", "choose", "compare", "debug", "write"].includes(q.taskType), "taskType must be valid");
  assert(["Foundational", "Intermediate", "Advanced"].includes(q.difficulty), "difficulty must be valid");
  assert(q.explanation && q.explanation.length > 20, "explanation must be educational and substantive");
  assert(Array.isArray(q.options) && q.options.length === 4, "Must have exactly 4 readable answer options");

  console.log(`  ✓ Expected Task: "${q.expectedTask}"`);
  console.log(`  ✓ Task Type: ${q.taskType} | Difficulty: ${q.difficulty}`);
  console.log(`  ✓ Explanation present (${q.explanation.length} chars)`);

  // Check options
  const weights = q.options.map((o) => o.weight);
  const maxWeight = Math.max(...weights);
  assert.strictEqual(maxWeight, 25, "Optimal option must have max weight 25");

  q.options.forEach((opt) => {
    assert(["A", "B", "C", "D"].includes(opt.label), "Option label must be A, B, C, or D");
    assert(opt.text && opt.text.length > 5, "Option text must be readable and clear");
    assert(Array.isArray(opt.skillTags) && opt.skillTags.length > 0, "Option must have associated skillTags");
    verifiedOptionsCount++;
  });
});

console.log(`\n[PASS] All ${verifiedOptionsCount} options across 8 questions verified.`);

// 3. Test Scoring Algorithm
console.log("\nTesting Scoring Logic Simulation:");

// Perfect Score Scenario (All 'A' options)
const perfectAnswers = { "1": "A", "2": "A", "3": "A", "4": "A", "5": "A", "6": "A", "7": "A", "8": "A" };
const skillScores = new Map();

for (const question of assessmentQuestionsList) {
  const selected = question.options.find((o) => o.label === perfectAnswers[String(question.id)]);
  const maxWeight = Math.max(...question.options.map((o) => o.weight), 1);
  for (const skill of selected.skillTags) {
    const list = skillScores.get(skill) || [];
    list.push(Math.round((selected.weight / maxWeight) * 100));
    skillScores.set(skill, list);
  }
}

const evaluatedSkills = Object.fromEntries(
  Array.from(skillScores.entries(), ([skill, scores]) => [
    skill,
    Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
  ])
);

const scoreValues = Object.values(evaluatedSkills);
const overallScore = Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length);

assert.strictEqual(overallScore, 100, "Perfect answers should score 100%");
console.log(`  [PASS] Optimal answer simulation yields ${overallScore}% across ${Object.keys(evaluatedSkills).length} skills.`);

// Proficient Learner Scenario (4 optimal, 4 partial)
const proficientAnswers = { "1": "A", "2": "B", "3": "A", "4": "B", "5": "A", "6": "C", "7": "A", "8": "B" };
const profScores = new Map();
for (const question of assessmentQuestionsList) {
  const selected = question.options.find((o) => o.label === proficientAnswers[String(question.id)]);
  const maxWeight = Math.max(...question.options.map((o) => o.weight), 1);
  for (const skill of selected.skillTags) {
    const list = profScores.get(skill) || [];
    list.push(Math.round((selected.weight / maxWeight) * 100));
    profScores.set(skill, list);
  }
}
const profOverall = Math.round(
  Array.from(profScores.values()).map(arr => arr.reduce((a, b) => a + b, 0) / arr.length).reduce((a, b) => a + b, 0) / profScores.size
);
assert(profOverall >= 70 && profOverall <= 90, `Proficient score (${profOverall}) must be between 70% and 90%`);
console.log(`  [PASS] Proficient learner simulation yields expected diagnostic score: ${profOverall}%.`);

// Developing Learner Scenario (2 optimal, 6 distractors)
const developingAnswers = { "1": "C", "2": "B", "3": "C", "4": "B", "5": "A", "6": "D", "7": "A", "8": "C" };
const devScores = new Map();
for (const question of assessmentQuestionsList) {
  const selected = question.options.find((o) => o.label === developingAnswers[String(question.id)]);
  const maxWeight = Math.max(...question.options.map((o) => o.weight), 1);
  for (const skill of selected.skillTags) {
    const list = devScores.get(skill) || [];
    list.push(Math.round((selected.weight / maxWeight) * 100));
    devScores.set(skill, list);
  }
}
const devOverall = Math.round(
  Array.from(devScores.values()).map(arr => arr.reduce((a, b) => a + b, 0) / arr.length).reduce((a, b) => a + b, 0) / devScores.size
);
assert(devOverall >= 40 && devOverall <= 70, `Developing score (${devOverall}) must be in range 40%-70%`);
console.log(`  [PASS] Developing learner simulation yields expected diagnostic score: ${devOverall}%.`);

console.log("\n================================================================");
console.log("ASSESSMENT SUITE RESULTS: PASSED ALL AUDITS 100%");
console.log("================================================================\n");
