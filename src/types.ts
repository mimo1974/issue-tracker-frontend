export type Priority = "urgent" | "high" | "medium" | "low";

export type Status = "backlog" | "todo" | "in-progress" | "in-review" | "done";

export interface Project {
  id: string;
  name: string;
  key: string;
}

export interface Assignee {
  id: string;
  name: string;
  initials: string;
}

export interface Issue {
  id: string;
  projectId: string;
  title: string;
  priority: Priority;
  status: Status;
  tags: string[];
  assigneeId: string;
  dueDate: string | null;
  commentCount: number;
}
