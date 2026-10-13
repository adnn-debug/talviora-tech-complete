"use client";

import { useState, useEffect } from "react";
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
import { fetchWithAuth } from "@/lib/api-client";

interface SprintTask {
  id: string;
  title: string;
  category: string;
  hours: number;
  column: "backlog" | "in-progress" | "completed";
}

export default function SprintPlannerPage() {
  const [tasks, setTasks] = useState<SprintTask[]>([]);
  const [syncMessage, setSyncMessage] = useState("Tasks are stored in this browser until you sign in and connect Supabase.");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("AI Architecture");
  const [newTaskHours, setNewTaskHours] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const suggestedTask = new URLSearchParams(window.location.search).get("task");
    if (suggestedTask) {
      setNewTaskTitle(suggestedTask.slice(0, 180));
      setShowAddModal(true);
    }

    // Load this browser's own task list first; the authenticated API may replace it.
    try {
      const cached = localStorage.getItem("talviora_sprint_tasks");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        }
      }
    } catch {}

    fetchWithAuth("/api/tasks")
      .then(async (res) => ({ ok: res.ok, data: await res.json() }))
      .then(({ ok, data }) => {
        if (!ok) {
          setSyncMessage(data?.error || "Could not sync tasks. Your browser copy is still available.");
          return;
        }
        if (data?.tasks && Array.isArray(data.tasks)) {
          if (data.persisted) {
            setTasks(data.tasks);
            localStorage.setItem("talviora_sprint_tasks", JSON.stringify(data.tasks));
            setSyncMessage("Tasks loaded from your account.");
          } else {
            setSyncMessage("Tasks are stored in this browser until you sign in and connect Supabase.");
          }
        }
      })
      .catch(() => {
        setSyncMessage("Task sync is unavailable. Your browser copy is still available.");
      });
  }, []);

  const moveTask = (taskId: string, targetCol: "backlog" | "in-progress" | "completed") => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;
    const updatedTask = { ...task, column: targetCol };
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === taskId ? updatedTask : t));
      try {
        localStorage.setItem("talviora_sprint_tasks", JSON.stringify(updated));
      } catch {}
      return updated;
    });
    fetchWithAuth("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId, column: targetCol }),
    }).then(async (response) => {
      const data = await response.json();
      if (response.ok && data.persisted) setSyncMessage("Task changes synced to your account.");
      else setSyncMessage(data.error || "Task change saved in this browser only.");
    }).catch(() => setSyncMessage("Task change saved in this browser only; sync is unavailable."));
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const created: SprintTask = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      category: newTaskCategory,
      hours: newTaskHours,
      column: "backlog",
    };

    const updated = [...tasks, created];
    setTasks(updated);
    setNewTaskTitle("");
    setShowAddModal(false);

    try {
      localStorage.setItem("talviora_sprint_tasks", JSON.stringify(updated));
    } catch {}

    // Keep the local copy usable and replace its identifier if the server persists it.
    try {
      const response = await fetchWithAuth("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(created),
      });
      const data = await response.json();
      if (response.ok && data.persisted && data.task) {
        const persisted = { ...created, id: data.task.id };
        const synced = updated.map((task) => task.id === created.id ? persisted : task);
        setTasks(synced);
        localStorage.setItem("talviora_sprint_tasks", JSON.stringify(synced));
        setSyncMessage("Task saved to your account.");
      } else {
        setSyncMessage(data?.error || "Task is saved in this browser only.");
      }
    } catch {
      setSyncMessage("Task is saved in this browser only; sync is unavailable.");
    }
  };

  const columns = [
    { id: "backlog", title: "Sprint Backlog", border: "border-[rgba(var(--color-burgundy-rgb),0.18)]", bg: "bg-[var(--color-creme-latte)]/70" },
    { id: "in-progress", title: "In Progress (Active)", border: "border-[rgba(var(--color-dusty-rose-rgb),0.6)]", bg: "bg-[var(--surface-rose)]/50" },
    { id: "completed", title: "Completed", border: "border-[rgba(var(--color-burgundy-rgb),0.2)]", bg: "bg-[var(--color-warm-ivory)]" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(var(--color-burgundy-rgb),0.15)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)]">
              <KanbanSquare className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]">
              Sprint Execution Engine
            </span>
          </div>
          <h1 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
            Weekly Sprint Kanban Planner
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/85 mt-0.5 font-medium">
            Organize actionable tasks from your roadmap and skill gap matrix into focused weekly sprints.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-burgundy px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-xs cursor-pointer self-start"
        >
          <Plus className="w-4 h-4 text-[var(--color-warm-ivory)]" />
          <span>New Sprint Task</span>
        </button>
      </div>

      <p className="rounded-lg border border-[var(--border-panel)] bg-[var(--bg-surface)] px-3 py-2 text-xs text-[var(--text-secondary)]" role="status">{syncMessage}</p>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.id);
          const totalHours = colTasks.reduce((acc, curr) => acc + curr.hours, 0);

          return (
            <div
              key={col.id}
              className={`rounded-2xl border ${col.border} ${col.bg} p-4 space-y-4 flex flex-col shadow-xs`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
                    {col.title}
                  </h2>
                  <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.15)]">
                    {colTasks.length}
                  </span>
                </div>
                <span className="text-[10px] text-[var(--color-burgundy)]/80 font-mono-code font-semibold">
                  {totalHours > 0 ? `${totalHours}h estimated` : "No estimate"}
                </span>
              </div>

              {/* Task Cards */}
              <div className="space-y-3 flex-1">
                {colTasks.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[var(--color-burgundy)]/70 border border-dashed border-[rgba(var(--color-burgundy-rgb),0.2)] rounded-xl font-medium">
                    No tasks in this column.
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="card-coffee p-4 space-y-2.5 border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)] hover:border-[rgba(var(--color-dusty-rose-rgb),0.7)] hover:scale-[1.01] transition-all"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold uppercase px-2 py-0.5 rounded-md bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)]">
                          {task.category}
                        </span>
                        <span className="text-[var(--color-burgundy)]/80 font-mono-code flex items-center gap-1 font-semibold">
                          <Clock className="w-3 h-3 text-[var(--color-burgundy)]" />
                          {task.hours > 0 ? `${task.hours}h estimate` : "Time not entered"}
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-[var(--color-burgundy)] leading-snug">
                        {task.title}
                      </h3>

                      {/* Move Actions */}
                      <div className="pt-2 border-t border-[rgba(var(--color-burgundy-rgb),0.10)] flex items-center justify-between text-[10px]">
                        {col.id !== "backlog" && (
                          <button
                            onClick={() => moveTask(task.id, "backlog")}
                            className="text-[var(--color-burgundy)]/70 hover:text-[var(--color-burgundy)] font-semibold cursor-pointer"
                          >
                            ← Backlog
                          </button>
                        )}
                        {col.id !== "in-progress" && (
                          <button
                            onClick={() => moveTask(task.id, "in-progress")}
                            className="text-[var(--color-burgundy)] hover:text-[var(--color-flowering-chestnut)] hover:underline font-bold cursor-pointer"
                          >
                            In Progress →
                          </button>
                        )}
                        {col.id !== "completed" && (
                          <button
                            onClick={() => moveTask(task.id, "completed")}
                            className="text-[var(--color-burgundy)] hover:text-[var(--color-flowering-chestnut)] hover:underline font-bold cursor-pointer"
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
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-display-serif font-bold text-[var(--color-burgundy)]">
              Create New Sprint Task
            </h2>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--color-burgundy)]">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement cosine similarity cache"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="input-coffee w-full px-3.5 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--color-burgundy)]">
                    Category
                  </label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="input-coffee w-full px-3 py-2 text-xs font-semibold cursor-pointer"
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
                  <label className="text-xs font-bold text-[var(--color-burgundy)]">
                    Estimated Hours (optional)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={newTaskHours}
                    onChange={(e) => setNewTaskHours(Number(e.target.value))}
                    className="input-coffee w-full px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary-coffee px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-burgundy px-5 py-2 rounded-xl text-xs font-semibold"
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
