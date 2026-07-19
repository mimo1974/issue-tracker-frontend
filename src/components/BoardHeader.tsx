interface BoardHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  issueCount: number;
  onNewIssue: () => void;
}

export function BoardHeader({
  search,
  onSearchChange,
  issueCount,
  onNewIssue,
}: BoardHeaderProps) {
  return (
    <div className="flex items-center gap-4 border-b border-white/10 px-6 py-4">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search issues..."
        className="w-72 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 placeholder:text-slate-500 focus:border-violet-400/60 focus:outline-none"
      />
      <span className="text-sm text-slate-400">{issueCount} issues</span>
      <button
        type="button"
        onClick={onNewIssue}
        className="ml-auto rounded-md border border-violet-400/60 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 transition-colors hover:bg-violet-500/20"
      >
        New issue +
      </button>
    </div>
  );
}
