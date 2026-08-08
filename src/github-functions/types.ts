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
