import { octokit } from "./client.js";
import type { RepoParams, UpdateIssueParams } from "./types.js";

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

export async function listIssues({ owner, repo }: RepoParams) {
  const { data } = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: "all",
  });
  return data.filter((issue) => !issue.pull_request);
}
