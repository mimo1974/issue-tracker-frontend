import { useMemo, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { BoardHeader } from "./components/BoardHeader";
import { Column } from "./components/Column";
import { assignees, issues, projects, statusColumns } from "./data/mockData";
import type { Priority } from "./types";

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<Set<string>>(
    new Set(),
  );
  const [selectedPriorities, setSelectedPriorities] = useState<Set<Priority>>(
    new Set(),
  );
  const [search, setSearch] = useState("");

  const assigneesById = useMemo(
    () => new Map(assignees.map((a) => [a.id, a])),
    [],
  );

  const filteredIssues = useMemo(() => {
    const query = search.trim().toLowerCase();
    return issues.filter((issue) => {
      if (selectedProjectId && issue.projectId !== selectedProjectId)
        return false;
      if (
        selectedAssigneeIds.size > 0 &&
        !selectedAssigneeIds.has(issue.assigneeId)
      )
        return false;
      if (
        selectedPriorities.size > 0 &&
        !selectedPriorities.has(issue.priority)
      )
        return false;
      if (
        query &&
        !issue.title.toLowerCase().includes(query) &&
        !issue.id.toLowerCase().includes(query)
      )
        return false;
      return true;
    });
  }, [selectedProjectId, selectedAssigneeIds, selectedPriorities, search]);

  function toggleAssignee(assigneeId: string) {
    setSelectedAssigneeIds((prev) => {
      const next = new Set(prev);
      if (next.has(assigneeId)) next.delete(assigneeId);
      else next.add(assigneeId);
      return next;
    });
  }

  function togglePriority(priority: Priority) {
    setSelectedPriorities((prev) => {
      const next = new Set(prev);
      if (next.has(priority)) next.delete(priority);
      else next.add(priority);
      return next;
    });
  }

  return (
    <div className="flex h-screen bg-[#0d0d13] text-slate-100">
      <Sidebar
        projects={projects}
        assignees={assignees}
        issues={issues}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        selectedAssigneeIds={selectedAssigneeIds}
        onToggleAssignee={toggleAssignee}
        selectedPriorities={selectedPriorities}
        onTogglePriority={togglePriority}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <BoardHeader
          search={search}
          onSearchChange={setSearch}
          issueCount={filteredIssues.length}
          onNewIssue={() => {}}
        />

        <div className="flex flex-1 gap-4 overflow-x-auto p-4">
          {statusColumns.map((column) => (
            <Column
              key={column.id}
              status={column.id}
              label={column.label}
              issues={filteredIssues.filter((i) => i.status === column.id)}
              assigneesById={assigneesById}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
