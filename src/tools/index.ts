import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerIssueTools } from "./issues.js";
import { registerPullRequestTools } from "./pull-requests.js";

export function registerTools(server: McpServer) {
  registerIssueTools(server);
  registerPullRequestTools(server);
}
