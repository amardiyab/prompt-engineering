export type RepoParams = {
  owner: string;
  repo: string;
};

export type UpdateIssueParams = RepoParams & {
  issueNumber: number;
  title?: string;
  body?: string;
  state?: "open" | "closed";
  labels?: string[];
};

export type UpdatePullRequestParams = RepoParams & {
  pullNumber: number;
  title?: string;
  body?: string;
  state?: "open" | "closed";
};

export type ListActionsParams = RepoParams & {
  page?: number;
  per_page?: number;
};

export type ActionParams = RepoParams & {
  runId: number;
};
