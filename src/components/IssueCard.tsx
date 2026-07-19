import type { Assignee, Issue } from "../types";
import { formatDueDate } from "../lib/format";
import { priorityBadgeClass, priorityLabel } from "../lib/priority";

interface IssueCardProps {
  issue: Issue;
  assignee: Assignee | undefined;
}

export function IssueCard({ issue, assignee }: IssueCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-[#15151d] p-3 transition-colors hover:border-white/20">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{issue.id}</span>
        <span
          className={`rounded border px-2 py-0.5 text-[11px] font-medium ${priorityBadgeClass[issue.priority]}`}
        >
          {priorityLabel[issue.priority]}
        </span>
      </div>

      <p className="text-sm font-medium text-slate-100">{issue.title}</p>

      {issue.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {issue.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-white/10 px-1.5 py-0.5 text-[11px] text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-1">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-[10px] font-medium text-slate-200">
          {assignee?.initials ?? "?"}
        </span>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {issue.commentCount > 0 && <span>💬 {issue.commentCount}</span>}
          <span>{formatDueDate(issue.dueDate)}</span>
        </div>
      </div>
    </div>
  );
}
