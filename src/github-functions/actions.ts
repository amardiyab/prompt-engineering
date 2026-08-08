import { octokit } from "./client.js";
import type { ActionParams, ListActionsParams } from "./types.js";

export async function listActions({
  owner,
  repo,
  page = 1,
  per_page = 30,
}: ListActionsParams) {
  const { data } = await octokit.rest.actions.listWorkflowRunsForRepo({
    owner,
    repo,
    page,
    per_page,
  });
  return data;
}

export async function getActionStatus({
  owner,
  repo,
  runId,
}: ActionParams) {
  const { data } = await octokit.rest.actions.getWorkflowRun({
    owner,
    repo,
    run_id: runId,
  });

  return {
    id: data.id,
    name: data.name,
    status: data.status,
    conclusion: data.conclusion,
    html_url: data.html_url,
    created_at: data.created_at,
    updated_at: data.updated_at,
    run_started_at: data.run_started_at,
    run_attempt: data.run_attempt,
    event: data.event,
    head_branch: data.head_branch,
    head_sha: data.head_sha,
  };
}

export async function getActionDetails({ owner, repo, runId }: ActionParams) {
  const { data } = await octokit.rest.actions.getWorkflowRun({
    owner,
    repo,
    run_id: runId,
  });
  return data;
}

export async function cancelAction({ owner, repo, runId }: ActionParams) {
  await octokit.rest.actions.cancelWorkflowRun({
    owner,
    repo,
    run_id: runId,
  });

  return { success: true, runId };
}

export async function retryAction({ owner, repo, runId }: ActionParams) {
  await octokit.rest.actions.reRunWorkflow({
    owner,
    repo,
    run_id: runId,
  });

  return { success: true, runId };
}
