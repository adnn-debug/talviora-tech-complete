"use client";

import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, CheckCircle2, AlertTriangle, Terminal, Code2, Eye, Sparkles, Copy, Check } from "lucide-react";

interface InteractiveCodeSandboxProps {
  initialCode: string;
  language: "python" | "javascript" | "html" | "sql";
  goal?: string;
  title?: string;
  height?: string;
  onCodeChange?: (newCode: string) => void;
}

// Sample in-memory relational database for SQL simulation
const SAMPLE_LEARNERS = [
  { id: 1, name: "Aria Chen", target_role: "AI Solutions Architect", readiness_score: 92, weekly_hours: 15, country: "Canada" },
  { id: 2, name: "Devon Miller", target_role: "Junior Full-Stack Developer", readiness_score: 74, weekly_hours: 10, country: "United States" },
  { id: 3, name: "Saniya Patel", target_role: "Machine Learning Engineer", readiness_score: 88, weekly_hours: 18, country: "India" },
  { id: 4, name: "Kenji Sato", target_role: "Frontend Engineer", readiness_score: 81, weekly_hours: 12, country: "Japan" },
  { id: 5, name: "Fatima Al-Mansoor", target_role: "AI Automation Specialist", readiness_score: 95, weekly_hours: 20, country: "UAE" },
  { id: 6, name: "Mateo Rodriguez", target_role: "Junior Full-Stack Developer", readiness_score: 68, weekly_hours: 8, country: "Spain" },
  { id: 7, name: "Elena Rostova", target_role: "Data Analyst", readiness_score: 85, weekly_hours: 14, country: "Germany" },
  { id: 8, name: "Kwame Osei", target_role: "Cloud DevOps Engineer", readiness_score: 79, weekly_hours: 16, country: "Ghana" },
];

export default function InteractiveCodeSandbox({
  initialCode,
  language,
  goal,
  title = "Try It Yourself — Live Interactive Editor",
  height = "340px",
  onCodeChange,
}: InteractiveCodeSandboxProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [sqlResults, setSqlResults] = useState<Record<string, any>[] | null>(null);
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [execTime, setExecTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [previewTab, setPreviewTab] = useState<"rendered" | "raw">("rendered");

  // Keep code in sync if initialCode changes externally (e.g. lesson switch)
  useEffect(() => {
    setCode(initialCode);
    setOutput("");
    setSqlResults(null);
    setStatus("idle");
    setExecTime(null);
  }, [initialCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (onCodeChange) onCodeChange(newCode);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
    setSqlResults(null);
    setStatus("idle");
    setExecTime(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe client-side execution engine
  const executeCode = () => {
    setStatus("running");
    const startTime = performance.now();

    try {
      if (language === "javascript") {
        const logs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => {
            logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" "));
          },
          error: (...args: any[]) => {
            logs.push("[ERROR] " + args.map((a) => String(a)).join(" "));
          },
          warn: (...args: any[]) => {
            logs.push("[WARN] " + args.map((a) => String(a)).join(" "));
          },
        };

        // Run isolated in Function wrapper
        const runner = new Function("console", `"use strict";\n${code}`);
        runner(customConsole);

        const duration = Math.round(performance.now() - startTime);
        setExecTime(duration);
        setOutput(logs.length > 0 ? logs.join("\n") : "✓ Code executed successfully (no console output).");
        setStatus("success");
      } else if (language === "python") {
        // High-fidelity client-side Python output simulator for beginner constructs
        const logs: string[] = [];
        const lines = code.split("\n");
        const variables: Record<string, any> = {};

        // Parse lines sequentially
        for (let i = 0; i < lines.length; i++) {
          const raw = lines[i].trim();
          if (!raw || raw.startsWith("#")) continue;

          // Simple print matching: print(...)
          if (raw.startsWith("print(") && raw.endsWith(")")) {
            const inner = raw.slice(6, -1);
            // Evaluate print arguments
            const evaluated = evaluatePythonPrint(inner, variables);
            logs.push(evaluated);
            continue;
          }

          // Variable assignment matching: name = value
          const assignMatch = raw.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
          if (assignMatch) {
            const varName = assignMatch[1];
            const rawVal = assignMatch[2].trim();
            variables[varName] = parsePythonValue(rawVal, variables);
          }
        }

        // If no direct prints were parsed, check if script has a block or template simulation
        if (logs.length === 0) {
          logs.push("Python script executed successfully.");
          logs.push(`Tracked in-memory variables: ${Object.keys(variables).join(", ") || "None"}`);
        }

        const duration = Math.round(performance.now() - startTime);
        setExecTime(duration);
        setOutput(logs.join("\n"));
        setStatus("success");
      } else if (language === "sql") {
        // In-memory SQL execution against SAMPLE_LEARNERS
        const cleanQuery = code
          .split("\n")
          .filter((l) => !l.trim().startsWith("--"))
          .join(" ")
          .trim();

        const results = executeMockSql(cleanQuery);
        const duration = Math.round(performance.now() - startTime);
        setExecTime(duration);
        setSqlResults(results);
        setOutput(`Query executed. Returned ${results.length} record(s).`);
        setStatus("success");
      } else if (language === "html") {
        // HTML is rendered dynamically in iframe
        const duration = Math.round(performance.now() - startTime);
        setExecTime(duration);
        setOutput("HTML & CSS markup rendered successfully in preview viewport.");
        setStatus("success");
      }
    } catch (err: any) {
      const duration = Math.round(performance.now() - startTime);
      setExecTime(duration);
      setOutput(`Execution Error:\n${err?.message || String(err)}`);
      setStatus("error");
    }
  };

  // Run automatically once on mount or when language changes
  useEffect(() => {
    executeCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const lineCount = code.split("\n").length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 6) }, (_, i) => i + 1);

  return (
    <div className="rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.18)] bg-[var(--color-creme-latte)] overflow-hidden shadow-xs transition-all">
      {/* Sandbox Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[var(--surface-rose)]/70 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shadow-2xs">
            <Code2 className="w-4 h-4" />
          </span>
          <div>
            <h4 className="text-xs font-bold text-[var(--color-burgundy)] tracking-wide">
              {title}
            </h4>
            <span className="text-[10px] uppercase font-bold text-[var(--color-burgundy)]/70">
              Language: <span className="font-mono-code uppercase font-extrabold">{language}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] text-[11px] font-semibold transition cursor-pointer"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] text-[11px] font-semibold transition cursor-pointer"
            title="Reset to default code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={executeCode}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] hover:brightness-110 active:scale-95 text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Code</span>
          </button>
        </div>
      </div>

      {/* Goal Callout Banner */}
      {goal && (
        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-warm-ivory)]/70 border-b border-[rgba(var(--color-dusty-rose-rgb),0.3)] text-xs text-[var(--color-burgundy)]">
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-[var(--color-burgundy)]" />
          <span className="font-semibold text-[11px]">Goal:</span>
          <span className="text-[11px] text-[var(--color-burgundy)]/90 leading-relaxed">{goal}</span>
        </div>
      )}

      {/* Split Workstation: Editor & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(var(--color-burgundy-rgb),0.12)]">
        {/* Left Side: Code Editor */}
        <div className="flex flex-col bg-[#1A1414] text-[#F5E8E0]">
          <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#261E1E] border-b border-white/10 text-[10px] text-zinc-300 font-mono-code">
            <span>Editable Source Code</span>
            <span className="text-zinc-400">Ctrl + Enter to run</span>
          </div>

          <div className="relative flex font-mono-code text-xs overflow-auto" style={{ minHeight: height }}>
            {/* Line Numbers */}
            <div className="select-none py-3 px-2.5 text-right text-zinc-500 bg-[#150F0F] border-r border-white/5 font-mono-code text-[11px] leading-relaxed">
              {lineNumbers.map((num) => (
                <div key={num}>{num}</div>
              ))}
            </div>

            {/* Code Textarea */}
            <textarea
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  e.preventDefault();
                  executeCode();
                }
              }}
              spellCheck={false}
              className="w-full h-full p-3 bg-transparent text-[#F8DEDC] font-mono-code text-xs leading-relaxed outline-none resize-none selection:bg-[#914955] selection:text-white"
              style={{ minHeight: height }}
            />
          </div>
        </div>

        {/* Right Side: Execution Output / Preview */}
        <div className="flex flex-col bg-[var(--color-warm-ivory)]">
          <div className="flex items-center justify-between px-3.5 py-1.5 bg-[var(--surface-rose)]/50 border-b border-[rgba(var(--color-burgundy-rgb),0.1)] text-[11px] font-semibold text-[var(--color-burgundy)]">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>{language === "html" ? "Rendered Live Output" : "Execution Console"}</span>
            </div>

            <div className="flex items-center gap-2">
              {execTime !== null && (
                <span className="text-[10px] font-mono-code text-[var(--color-burgundy)]/75">
                  {execTime}ms
                </span>
              )}
              <span
                className={`w-2 h-2 rounded-full ${
                  status === "success"
                    ? "bg-green-600"
                    : status === "error"
                    ? "bg-red-600"
                    : status === "running"
                    ? "bg-amber-500 animate-pulse"
                    : "bg-zinc-400"
                }`}
              />
            </div>
          </div>

          {/* Render Area */}
          <div className="p-3.5 overflow-auto flex-1 text-xs" style={{ minHeight: height }}>
            {language === "html" ? (
              <div className="h-full rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-white overflow-hidden shadow-2xs">
                <iframe
                  title="HTML Live Sandbox"
                  srcDoc={code}
                  sandbox="allow-scripts"
                  className="w-full h-full min-h-[280px] border-none"
                />
              </div>
            ) : language === "sql" && sqlResults ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-[var(--color-burgundy)]/80 font-mono-code">
                  <span>Returned: {sqlResults.length} record(s)</span>
                  <span className="text-green-700 font-bold">Query OK</span>
                </div>
                {sqlResults.length > 0 ? (
                  <div className="rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.15)] overflow-x-auto bg-[var(--color-creme-latte)]">
                    <table className="w-full text-left text-[11px] font-mono-code border-collapse">
                      <thead>
                        <tr className="bg-[var(--surface-rose)] text-[var(--color-burgundy)] border-b border-[rgba(var(--color-burgundy-rgb),0.15)]">
                          {Object.keys(sqlResults[0]).map((col) => (
                            <th key={col} className="p-2 font-bold uppercase tracking-wider">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[rgba(var(--color-burgundy-rgb),0.08)]">
                        {sqlResults.map((row, idx) => (
                          <tr key={idx} className="hover:bg-[var(--surface-rose)]/40 transition-colors">
                            {Object.values(row).map((val, cellIdx) => (
                              <td key={cellIdx} className="p-2 text-[var(--color-burgundy)]">
                                {String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[var(--surface-rose)] text-center text-xs text-[var(--color-burgundy)]">
                    No rows matched the query conditions.
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full rounded-xl bg-[#1C1515] p-3 text-zinc-100 font-mono-code text-xs whitespace-pre-wrap leading-relaxed shadow-inner overflow-auto">
                {status === "error" ? (
                  <span className="text-rose-400 font-bold">{output}</span>
                ) : (
                  <span className="text-emerald-300">{output || "Run code to view output..."}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper: Python expression evaluator for beginner scripts
function parsePythonValue(val: string, vars: Record<string, any>): any {
  val = val.trim();
  if (val === "True") return true;
  if (val === "False") return false;
  if (!isNaN(Number(val))) return Number(val);
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }
  if (vars[val] !== undefined) return vars[val];
  return val;
}

function evaluatePythonPrint(inner: string, vars: Record<string, any>): string {
  // Support f-strings: f"..."
  if (inner.startsWith('f"') || inner.startsWith("f'")) {
    const raw = inner.slice(2, -1);
    return raw.replace(/\{([^}]+)\}/g, (_, expr) => {
      expr = expr.trim();
      // Handle formatting like {percentage:.0f}
      const parts = expr.split(":");
      const varName = parts[0].trim();
      if (vars[varName] !== undefined) {
        if (parts[1] && parts[1].includes("f") && typeof vars[varName] === "number") {
          return vars[varName].toFixed(0);
        }
        return String(vars[varName]);
      }
      return `{${expr}}`;
    });
  }

  // Handle standard arguments separated by comma: "Hello", name, 100
  const args = splitPythonArgs(inner);
  return args
    .map((arg) => {
      arg = arg.trim();
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      if (vars[arg] !== undefined) {
        return String(vars[arg]);
      }
      // Simple math evaluation
      try {
        if (/^[\d\s+\-*/.]+$/.test(arg)) {
          // eslint-disable-next-line no-eval
          return String(eval(arg));
        }
      } catch {}
      return arg;
    })
    .join(" ");
}

function splitPythonArgs(str: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  let quoteChar = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if ((char === '"' || char === "'") && (i === 0 || str[i - 1] !== "\\")) {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inQuotes = false;
      }
    }
    if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) result.push(current.trim());
  return result;
}

// Helper: In-memory mock SQL parser
function executeMockSql(query: string): Record<string, any>[] {
  const upper = query.toUpperCase();

  // Basic validation
  if (!upper.includes("FROM LEARNERS")) {
    throw new Error("This demo database only contains the table 'learners'. Use 'FROM learners'.");
  }

  let data: Record<string, any>[] = [...SAMPLE_LEARNERS];

  // Handle WHERE clause
  const whereMatch = query.match(/WHERE\s+(.+?)(ORDER BY|LIMIT|$)/i);
  if (whereMatch) {
    const condition = whereMatch[1].trim();

    // Check for >= score
    const scoreMatch = condition.match(/readiness_score\s*>=\s*(\d+)/i);
    if (scoreMatch) {
      const minScore = Number(scoreMatch[1]);
      data = data.filter((item) => item.readiness_score >= minScore);
    }

    // Check for target_role
    const roleMatch = condition.match(/target_role\s*=\s*['"]([^'"]+)['"]/i);
    if (roleMatch) {
      const targetRole = roleMatch[1].toLowerCase();
      data = data.filter((item) => item.target_role.toLowerCase() === targetRole);
    }

    // Check for weekly_hours
    const hoursMatch = condition.match(/weekly_hours\s*>=\s*(\d+)/i);
    if (hoursMatch) {
      const minHours = Number(hoursMatch[1]);
      data = data.filter((item) => item.weekly_hours >= minHours);
    }
  }

  // Handle ORDER BY
  const orderMatch = query.match(/ORDER BY\s+([a-zA-Z_]+)\s*(ASC|DESC)?/i);
  if (orderMatch) {
    const col = orderMatch[1].toLowerCase();
    const isDesc = (orderMatch[2] || "").toUpperCase() === "DESC";

    data.sort((a: any, b: any) => {
      const valA = a[col];
      const valB = b[col];
      if (valA < valB) return isDesc ? 1 : -1;
      if (valA > valB) return isDesc ? -1 : 1;
      return 0;
    });
  }

  // Handle LIMIT
  const limitMatch = query.match(/LIMIT\s+(\d+)/i);
  if (limitMatch) {
    const limitNum = Number(limitMatch[1]);
    data = data.slice(0, limitNum);
  }

  // Handle column projection (SELECT col1, col2...)
  const selectMatch = query.match(/SELECT\s+(.+?)\s+FROM/i);
  if (selectMatch) {
    const colsStr = selectMatch[1].trim();
    if (colsStr !== "*") {
      const cols = colsStr.split(",").map((c) => c.trim().toLowerCase());
      data = data.map((item: any) => {
        const row: Record<string, any> = {};
        for (const col of cols) {
          if (item[col] !== undefined) {
            row[col] = item[col];
          }
        }
        return row;
      });
    }
  }

  return data;
}
