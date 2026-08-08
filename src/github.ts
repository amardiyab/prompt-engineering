import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

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

export async function getIssue(
  { owner, repo }: RepoParams,
  issueNumber: number
) {
  const { data } = await octokit.rest.issues.get({
    owner,
    repo,
    issue_number: issueNumber,
  });
  return data;
}

export async function getPullRequest(
  { owner, repo }: RepoParams,
  pullNumber: number
) {
  const { data } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: pullNumber,
  });
  return data;
}

export async function createIssueComment(
  { owner, repo }: RepoParams,
  issueNumber: number,
  body: string
) {
  const { data } = await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body,
  });
  return data;
}

export async function createPullRequestComment(
  { owner, repo }: RepoParams,
  pullNumber: number,
  body: string
) {
  const { data } = await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: pullNumber,
    body,
  });
  return data;
}

export async function updateIssue({
  owner,
  repo,
  issueNumber,
  title,
  body,
  state,
  labels,
}: UpdateIssueParams) {
  const { data } = await octokit.rest.issues.update({
    owner,
    repo,
    issue_number: issueNumber,
    title,
    body,
    state,
    labels,
  });
  return data;
}

export async function updatePullRequest({
  owner,
  repo,
  pullNumber,
  title,
  body,
  state,
}: UpdatePullRequestParams) {
  const { data } = await octokit.rest.pulls.update({
    owner,
    repo,
    pull_number: pullNumber,
    title,
    body,
    state,
  });
  return data;
}

export async function listIssues({ owner, repo }: RepoParams) {
  const { data } = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: "all",
  });
  return data.filter((issue) => !issue.pull_request);
}

export async function listPullRequests({ owner, repo }: RepoParams) {
  const { data } = await octokit.rest.pulls.list({
    owner,
    repo,
    state: "all",
  });
  return data;
}
