const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

function loadTypeScript(relativePath) {
  const sourcePath = path.join(__dirname, "..", relativePath);
  const source = fs.readFileSync(sourcePath, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: sourcePath,
  });
  const loadedModule = new Module(sourcePath, module);
  loadedModule.filename = sourcePath;
  loadedModule.paths = module.paths;
  loadedModule._compile(compiled.outputText, sourcePath);
  return loadedModule.exports;
}

const { generateRoadmapPlan, RoadmapGraphError } = loadTypeScript("lib/roadmap-engine.ts");
const { readJsonLimited } = loadTypeScript("lib/roadmap-http.ts");

function skill(id, sequenceHint, estimatedEffortMinutes = 60, masteryThreshold = 90) {
  return {
    id,
    slug: id,
    name: `Skill ${id}`,
    description: `Description for ${id}`,
    estimatedEffortMinutes,
    masteryThreshold,
    sequenceHint,
    learningObjectives: [`Objective ${id}`],
    completionCriteria: [`Complete ${id}`],
  };
}

function dependency(skillId, prerequisiteSkillId, dependencyType = "required", minimumMasteryThreshold = 67) {
  return { skillId, prerequisiteSkillId, dependencyType, minimumMasteryThreshold };
}

function plan(overrides = {}) {
  return generateRoadmapPlan({
    skills: [skill("a", 1), skill("b", 2), skill("c", 3)],
    dependencies: [dependency("b", "a"), dependency("c", "b")],
    targetSkillIds: ["c"],
    weeklyStudyMinutes: 300,
    ...overrides,
  });
}

test("creates a deterministic prerequisite-first plan and duration estimate", () => {
  const first = plan();
  const second = plan();
  assert.deepEqual(first, second);
  assert.deepEqual(first.steps.map((step) => step.skillId), ["a", "b", "c"]);
  assert.equal(first.totalLearningMinutes, 180);
  assert.equal(first.estimatedTotalMinutes, 216);
  assert.equal(first.estimatedDurationWeeks, 1);
  assert.match(first.steps[2].recommendedReason, /required prerequisites/);
});

test("adds required dependency closure but keeps recommended background optional", () => {
  const skills = [skill("base", 1), skill("target", 2), skill("optional", 3)];
  const result = plan({
    skills,
    dependencies: [dependency("target", "base"), dependency("target", "optional", "recommended", null)],
    targetSkillIds: ["target"],
  });
  assert.deepEqual(result.steps.map((step) => step.skillId), ["base", "target"]);
  const optional = result.steps[1].prerequisites.find((item) => item.skillId === "optional");
  assert.equal(optional.includedAsStep, false);
  assert.equal(optional.satisfied, false);
  assert.match(result.steps[1].recommendedReason, /does not block the step/);
});

test("skips prerequisite evidence only when it reaches the configured threshold, but requires target mastery", () => {
  const skills = [skill("a", 1), skill("b", 2), skill("c", 3)];
  const dependencies = [dependency("b", "a"), dependency("c", "b")];
  const belowMastery = plan({
    skills,
    dependencies,
    progress: [
      { skillId: "a", status: "mastered", masteryScore: 90 },
      { skillId: "b", status: "completed", masteryScore: 80 },
      { skillId: "c", status: "completed", masteryScore: 99 },
    ],
  });
  assert.deepEqual(belowMastery.steps.map((step) => step.skillId), ["c"]);

  const prerequisiteBelowThreshold = plan({
    skills,
    dependencies,
    progress: [
      { skillId: "a", status: "mastered", masteryScore: 90 },
      { skillId: "b", status: "completed", masteryScore: 60 },
    ],
  });
  assert.deepEqual(prerequisiteBelowThreshold.steps.map((step) => step.skillId), ["b", "c"]);

  const allMastered = plan({
    skills,
    dependencies,
    progress: skills.map((item) => ({ skillId: item.id, status: "mastered", masteryScore: 90 })),
  });
  assert.deepEqual(allMastered.steps, []);
  assert.equal(allMastered.estimatedDurationWeeks, 0);
});

test("orders independent skills by pathway hint and then slug", () => {
  const skills = [skill("zeta", 1), skill("beta", 1), skill("alpha", 3)];
  const result = plan({ skills, dependencies: [], targetSkillIds: ["zeta", "beta", "alpha"] });
  assert.deepEqual(result.steps.map((step) => step.skillId), ["beta", "zeta", "alpha"]);
});

test("rejects cyclic, missing, self, and duplicate dependency edges", () => {
  const skills = [skill("a", 1), skill("b", 2)];
  assert.throws(() => plan({ skills, dependencies: [dependency("a", "b"), dependency("b", "a")], targetSkillIds: ["a"] }), (error) => error instanceof RoadmapGraphError && error.code === "DEPENDENCY_CYCLE");
  assert.throws(() => plan({ skills, dependencies: [dependency("a", "missing")], targetSkillIds: ["a"] }), (error) => error.code === "MISSING_DEPENDENCY_SKILL");
  assert.throws(() => plan({ skills, dependencies: [dependency("a", "a")], targetSkillIds: ["a"] }), (error) => error.code === "SELF_DEPENDENCY");
  assert.throws(() => plan({ skills, dependencies: [dependency("b", "a"), dependency("b", "a")], targetSkillIds: ["b"] }), (error) => error.code === "DUPLICATE_DEPENDENCY");
});

test("rejects invalid weekly time and unsupported targets", () => {
  assert.throws(() => plan({ weeklyStudyMinutes: 29 }), (error) => error.code === "INVALID_STUDY_TIME");
  assert.throws(() => plan({ weeklyStudyMinutes: 2401 }), (error) => error.code === "INVALID_STUDY_TIME");
  assert.throws(() => plan({ targetSkillIds: [] }), (error) => error.code === "UNSUPPORTED_GOAL");
  assert.throws(() => plan({ targetSkillIds: ["not-published"] }), (error) => error.code === "UNSUPPORTED_GOAL");
});

test("enforces request size on streamed JSON bodies and rejects malformed JSON", async () => {
  const allowed = await readJsonLimited(new Request("http://localhost", {
    method: "POST",
    body: JSON.stringify({ action: "start" }),
  }), 32);
  assert.deepEqual(allowed, { ok: true, value: { action: "start" } });

  const oversized = await readJsonLimited(new Request("http://localhost", {
    method: "POST",
    body: JSON.stringify({ action: "start", extra: "this payload is too long" }),
  }), 20);
  assert.deepEqual(oversized, { ok: false, reason: "too_large" });

  const malformed = await readJsonLimited(new Request("http://localhost", {
    method: "POST",
    body: "{invalid",
  }), 32);
  assert.deepEqual(malformed, { ok: false, reason: "invalid_json" });
});

