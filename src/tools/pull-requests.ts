import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as github from "../github-functions/pull-requests.js";

export function registerPullRequestTools(server: McpServer) {
  server.tool(
    "getPullRequest",
    "Get a GitHub pull request by number",
    {
      owner: z.string(),
      repo: z.string(),
      pullNumber: z.number(),
    },
    async ({ owner, repo, pullNumber }) => {
      const pullRequest = await github.getPullRequest(
        { owner, repo },
        pullNumber
      );
      return {
        content: [{ type: "text", text: JSON.stringify(pullRequest, null, 2) }],
      };
    }
  );

  server.tool(
    "createPullRequestComment",
    "Create a comment on a pull request",
    {
      owner: z.string(),
      repo: z.string(),
      pullNumber: z.number(),
      body: z.string(),
    },
    async ({ owner, repo, pullNumber, body }) => {
      const comment = await github.createPullRequestComment(
        { owner, repo },
        pullNumber,
        body
      );
      return {
        content: [{ type: "text", text: JSON.stringify(comment, null, 2) }],
      };
    }
  );

  server.tool(
    "updatePullRequest",
    "Update a GitHub pull request",
    {
      owner: z.string(),
      repo: z.string(),
      pullNumber: z.number(),
      title: z.string().optional(),
      body: z.string().optional(),
      state: z.enum(["open", "closed"]).optional(),
    },
    async ({ owner, repo, pullNumber, title, body, state }) => {
      const pullRequest = await github.updatePullRequest({
        owner,
        repo,
        pullNumber,
        title,
        body,
        state,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(pullRequest, null, 2) }],
      };
    }
  );

  server.tool(
    "listPullRequests",
    "List pull requests for a GitHub repository",
    {
      owner: z.string(),
      repo: z.string(),
    },
    async ({ owner, repo }) => {
      const pullRequests = await github.listPullRequests({ owner, repo });
      return {
        content: [
          { type: "text", text: JSON.stringify(pullRequests, null, 2) },
        ],
      };
    }
  );
}
