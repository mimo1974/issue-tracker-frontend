import { useState } from "react";
import type { Assignee, Issue, Status } from "../types";
import { IssueCard } from "./IssueCard";

const columnAccent: Record<Status, string> = {
  backlog: "border-t-emerald-500/70",
  todo: "border-t-sky-500/70",
  "in-progress": "border-t-amber-500/70",
  "in-review": "border-t-violet-500/70",
  done: "border-t-slate-500/70",
};

interface ColumnProps {
  status: Status;
  label: string;
  issues: Issue[];
  assigneesById: Map<string, Assignee>;
  onDropIssue: (issueId: string, status: Status) => void;
  draggingIssueId: string | null;
  onDragStartIssue: (issueId: string) => void;
  onDragEndIssue: () => void;
}

export function Column({
  status,
  label,
  issues,
  assigneesById,
  onDropIssue,
  draggingIssueId,
  onDragStartIssue,
  onDragEndIssue,
}: ColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        if (!draggingIssueId) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const issueId = e.dataTransfer.getData("text/plain");
        if (issueId) onDropIssue(issueId, status);
      }}
      className={`flex w-80 shrink-0 flex-col rounded-lg bg-[#111118] transition-colors ${
        isDragOver ? "ring-2 ring-violet-500/60" : ""
      }`}
    >
      <div
        className={`flex items-center justify-between rounded-t-lg border-t-2 bg-white/5 px-3 py-2 ${columnAccent[status]}`}
      >
        <span className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
          {label}
        </span>
        <span className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-slate-400">
          {issues.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            assignee={assigneesById.get(issue.assigneeId)}
            onDragStart={onDragStartIssue}
            onDragEnd={onDragEndIssue}
          />
        ))}
        {issues.length === 0 && (
          <p className="px-2 py-6 text-center text-xs text-slate-600">
            No issues
          </p>
        )}
      </div>
    </div>
  );
}
