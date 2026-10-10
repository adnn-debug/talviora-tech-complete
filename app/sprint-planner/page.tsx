"use client";

import { useState } from "react";
import {
  KanbanSquare,
  Plus,
  CheckCircle2,
  Clock,
  MoreVertical,
  Layers,
  ArrowRight,
  Flame,
} from "lucide-react";

interface SprintTask {
  id: string;
  title: string;
  category: string;
  hours: number;
  column: "backlog" | "in-progress" | "completed";
}

export default function SprintPlannerPage() {
  const [tasks, setTasks] = useState<SprintTask[]>([
    {
      id: "t-1",
      title: "Implement Transformer Multi-Head Attention layer in PyTorch",
      category: "Deep Learning",
      hours: 6,
      column: "in-progress",
    },
    {
      id: "t-2",
      title: "Configure Redis semantic cache with cosine threshold 0.88",
      category: "Architecture",
      hours: 4,
      column: "in-progress",
    },
    {
      id: "t-3",
      title: "Solve 10 LeetCode Medium Sliding Window & Two Pointer problems",
      category: "Algorithms",
      hours: 5,
      column: "backlog",
    },
    {
      id: "t-4",
      title: "Write Docker multi-stage build for FastAPI inference server",
      category: "DevOps",
      hours: 3,
      column: "backlog",
    },
    {
      id: "t-5",
      title: "PostgreSQL pgvector HNSW index creation and EXPLAIN testing",
      category: "Database",
      hours: 4,
      column: "completed",
    },
    {
      id: "t-6",
      title: "Review STAR interview scenarios for distributed outage retrospective",
      category: "Interview",
      hours: 2,
      column: "completed",
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("AI Architecture");
  const [newTaskHours, setNewTaskHours] = useState(4);
  const [showAddModal, setShowAddModal] = useState(false);

  const moveTask = (taskId: string, targetCol: "backlog" | "in-progress" | "completed") => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column: targetCol } : t))
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const created: SprintTask = {
      id: `t-${Date.now()}`,
      title: newTaskTitle,
      category: newTaskCategory,
      hours: newTaskHours,
      column: "backlog",
    };

    setTasks([...tasks, created]);
    setNewTaskTitle("");
    setShowAddModal(false);
  };

  const columns = [
    { id: "backlog", title: "Sprint Backlog", color: "border-zinc-300 dark:border-zinc-700" },
    { id: "in-progress", title: "In Progress (Active)", color: "border-[#c58b94]" },
    { id: "completed", title: "Completed & Verified", color: "border-emerald-500" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <KanbanSquare className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Sprint Execution Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Weekly Sprint Kanban Planner
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Organize actionable tasks from your roadmap and skill gap matrix into focused weekly sprints.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-semibold transition flex items-center gap-2 shadow-xs cursor-pointer self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Sprint Task</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.id);
          const totalHours = colTasks.reduce((acc, curr) => acc + curr.hours, 0);

          return (
            <div
              key={col.id}
              className={`rounded-2xl border ${col.color} bg-white/60 dark:bg-zinc-900/40 p-4 space-y-4 flex flex-col`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    {col.title}
                  </h2>
                  <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {colTasks.length}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono-code">
                  {totalHours} hrs
                </span>
              </div>

              {/* Task Cards */}
              <div className="space-y-3 flex-1">
                {colTasks.length === 0 ? (
                  <div className="p-6 text-center text-xs text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                    No tasks in this column.
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="card-luxury p-4 space-y-2.5 bg-white dark:bg-zinc-900/90 hover:scale-[1.01] transition-transform"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {task.category}
                        </span>
                        <span className="text-zinc-400 font-mono-code flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.hours}h
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                        {task.title}
                      </h3>

                      {/* Move Actions */}
                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[10px]">
                        {col.id !== "backlog" && (
                          <button
                            onClick={() => moveTask(task.id, "backlog")}
                            className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 font-medium"
                          >
                            ← Backlog
                          </button>
                        )}
                        {col.id !== "in-progress" && (
                          <button
                            onClick={() => moveTask(task.id, "in-progress")}
                            className="text-[#843e4b] dark:text-[#d8a0ab] hover:underline font-semibold"
                          >
                            In Progress →
                          </button>
                        )}
                        {col.id !== "completed" && (
                          <button
                            onClick={() => moveTask(task.id, "completed")}
                            className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                          >
                            Done ✓
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-[#fdf7f1] dark:bg-[#111118] p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Create New Sprint Task
            </h2>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement cosine similarity cache"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#c58b94]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Category
                  </label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none"
                  >
                    <option value="Deep Learning">Deep Learning</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Algorithms">Algorithms</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Database">Database</option>
                    <option value="Interview">Interview</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Estimated Hours
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={newTaskHours}
                    onChange={(e) => setNewTaskHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
