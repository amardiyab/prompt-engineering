import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as github from "./github.js";

const server = new McpServer({
  name: "GitHub MCP Server",
  version: "1.0.0",
});

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
  "getPullRequest",
  "Get a GitHub pull request by number",
  {
    owner: z.string(),
    repo: z.string(),
    pullNumber: z.number(),
  },
  async ({ owner, repo, pullNumber }) => {
    const pullRequest = await github.getPullRequest({ owner, repo }, pullNumber);
    return {
      content: [{ type: "text", text: JSON.stringify(pullRequest, null, 2) }],
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
      content: [{ type: "text", text: JSON.stringify(pullRequests, null, 2) }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
