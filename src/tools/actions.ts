import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as github from "../github-functions/actions.js";

export function registerActionTools(server: McpServer) {
  server.tool(
    "listActions",
    "List GitHub Actions workflow runs for a repository",
    {
      owner: z.string(),
      repo: z.string(),
      page: z.number().optional(),
      per_page: z.number().optional(),
    },
    async ({ owner, repo, page, per_page }) => {
      const actions = await github.listActions({
        owner,
        repo,
        page,
        per_page,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(actions, null, 2) }],
      };
    }
  );

  server.tool(
    "getActionStatus",
    "Get the status of a GitHub Actions workflow run",
    {
      owner: z.string(),
      repo: z.string(),
      runId: z.number(),
    },
    async ({ owner, repo, runId }) => {
      const status = await github.getActionStatus({ owner, repo, runId });
      return {
        content: [{ type: "text", text: JSON.stringify(status, null, 2) }],
      };
    }
  );

  server.tool(
    "getActionDetails",
    "Get the details of a GitHub Actions workflow run",
    {
      owner: z.string(),
      repo: z.string(),
      runId: z.number(),
    },
    async ({ owner, repo, runId }) => {
      const details = await github.getActionDetails({ owner, repo, runId });
      return {
        content: [{ type: "text", text: JSON.stringify(details, null, 2) }],
      };
    }
  );

  server.tool(
    "cancelAction",
    "Cancel a GitHub Actions workflow run",
    {
      owner: z.string(),
      repo: z.string(),
      runId: z.number(),
    },
    async ({ owner, repo, runId }) => {
      const result = await github.cancelAction({ owner, repo, runId });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "retryAction",
    "Retry a GitHub Actions workflow run",
    {
      owner: z.string(),
      repo: z.string(),
      runId: z.number(),
    },
    async ({ owner, repo, runId }) => {
      const result = await github.retryAction({ owner, repo, runId });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
