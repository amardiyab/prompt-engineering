import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as github from "../github-functions/issues.js";

export function registerIssueTools(server: McpServer) {
  server.tool(
    "getIssue",
    "Get a GitHub issue by number",
    {
      owner: z.string(),
      repo: z.string(),
      issueNumber: z.number(),
    },
    async ({ owner, repo, issueNumber }) => {
      const issue = await github.getIssue({ owner, repo }, issueNumber);
      return {
        content: [{ type: "text", text: JSON.stringify(issue, null, 2) }],
      };
    }
  );

  server.tool(
    "createIssueComment",
    "Create a comment on a GitHub issue",
    {
      owner: z.string(),
      repo: z.string(),
      issueNumber: z.number(),
      body: z.string(),
    },
    async ({ owner, repo, issueNumber, body }) => {
      const comment = await github.createIssueComment(
        { owner, repo },
        issueNumber,
        body
      );
      return {
        content: [{ type: "text", text: JSON.stringify(comment, null, 2) }],
      };
    }
  );

  server.tool(
    "updateIssue",
    "Update a GitHub issue",
    {
      owner: z.string(),
      repo: z.string(),
      issueNumber: z.number(),
      title: z.string().optional(),
      body: z.string().optional(),
      state: z.enum(["open", "closed"]).optional(),
      labels: z.array(z.string()).optional(),
    },
    async ({ owner, repo, issueNumber, title, body, state, labels }) => {
      const issue = await github.updateIssue({
        owner,
        repo,
        issueNumber,
        title,
        body,
        state,
        labels,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(issue, null, 2) }],
      };
    }
  );

  server.tool(
    "listIssues",
    "List issues for a GitHub repository",
    {
      owner: z.string(),
      repo: z.string(),
    },
    async ({ owner, repo }) => {
      const issues = await github.listIssues({ owner, repo });
      return {
        content: [{ type: "text", text: JSON.stringify(issues, null, 2) }],
      };
    }
  );
}
