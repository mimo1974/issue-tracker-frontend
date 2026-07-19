import type { Priority } from "../types";

export const priorityOrder: Priority[] = ["urgent", "high", "medium", "low"];

export const priorityLabel: Record<Priority, string> = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const priorityBadgeClass: Record<Priority, string> = {
  urgent: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  high: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  medium: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  low: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};
