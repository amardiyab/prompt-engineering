import { octokit } from "./client.js";
import type { RepoParams, UpdatePullRequestParams } from "./types.js";

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

export async function listPullRequests({ owner, repo }: RepoParams) {
  const { data } = await octokit.rest.pulls.list({
    owner,
    repo,
    state: "all",
  });
  return data;
}
