import type { ReactNode } from "react";
import type { Assignee, Issue, Priority, Project } from "../types";
import { priorityLabel, priorityOrder } from "../lib/priority";

interface SidebarProps {
  projects: Project[];
  assignees: Assignee[];
  issues: Issue[];
  selectedProjectId: string | null;
  onSelectProject: (projectId: string | null) => void;
  selectedAssigneeIds: Set<string>;
  onToggleAssignee: (assigneeId: string) => void;
  selectedPriorities: Set<Priority>;
  onTogglePriority: (priority: Priority) => void;
}

export function Sidebar({
  projects,
  assignees,
  issues,
  selectedProjectId,
  onSelectProject,
  selectedAssigneeIds,
  onToggleAssignee,
  selectedPriorities,
  onTogglePriority,
}: SidebarProps) {
  return (
    <aside className="flex w-64 shrink-0 flex-col gap-6 border-r border-white/10 bg-[#111118] p-5">
      <h1 className="text-lg font-semibold text-white">Tracker</h1>

      <div className="flex flex-col gap-1">
        <SectionLabel>Projects</SectionLabel>
        <NavItem
          label="All projects"
          count={issues.length}
          active={selectedProjectId === null}
          onClick={() => onSelectProject(null)}
        />
        {projects.map((project) => (
          <NavItem
            key={project.id}
            label={project.name}
            count={issues.filter((i) => i.projectId === project.id).length}
            active={selectedProjectId === project.id}
            onClick={() => onSelectProject(project.id)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <SectionLabel>Assignee</SectionLabel>
        {assignees.map((assignee) => (
          <NavItem
            key={assignee.id}
            label={assignee.name}
            count={issues.filter((i) => i.assigneeId === assignee.id).length}
            active={selectedAssigneeIds.has(assignee.id)}
            onClick={() => onToggleAssignee(assignee.id)}
            icon={<Avatar initials={assignee.initials} />}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>Priority</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {priorityOrder.map((priority) => {
            const active = selectedPriorities.has(priority);
            return (
              <button
                key={priority}
                type="button"
                onClick={() => onTogglePriority(priority)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  active
                    ? "border-violet-400/60 bg-violet-500/15 text-violet-300"
                    : "border-white/15 text-slate-400 hover:border-white/30 hover:text-slate-200"
                }`}
              >
                {priorityLabel[priority]}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="px-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
      {children}
    </span>
  );
}

function NavItem({
  label,
  count,
  active,
  onClick,
  icon,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
        active
          ? "bg-violet-500/15 text-white"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className="flex items-center gap-2 truncate">
        {icon}
        {label}
      </span>
      <span className="text-xs text-slate-500">{count}</span>
    </button>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-700 text-[10px] font-medium text-slate-200">
      {initials}
    </span>
  );
}
