# GitHub MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that exposes GitHub issues, pull requests, and Actions workflows as tools for AI assistants.

Built with TypeScript, Express, and the MCP SDK. Uses SSE transport so it can be connected from Cursor or other MCP clients over HTTP.

## Features

### Issues

| Tool | Description |
|------|-------------|
| `getIssue` | Get a GitHub issue by number |
| `createIssueComment` | Create a comment on an issue |
| `updateIssue` | Update an issue |
| `listIssues` | List issues for a repository |

### Pull Requests

| Tool | Description |
|------|-------------|
| `getPullRequest` | Get a pull request by number |
| `createPullRequestComment` | Create a comment on a pull request |
| `updatePullRequest` | Update a pull request |
| `listPullRequests` | List pull requests for a repository |

### GitHub Actions

| Tool | Description |
|------|-------------|
| `listActions` | List workflow runs for a repository |
| `getActionStatus` | Get the status of a workflow run |
| `getActionDetails` | Get details of a workflow run |
| `cancelAction` | Cancel a workflow run |
| `retryAction` | Retry a workflow run |

## Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/)
- A [GitHub personal access token](https://github.com/settings/tokens)

## Setup

1. Clone the repository and install dependencies:

```bash
pnpm install
```

2. Copy the environment template and add your GitHub token:

```bash
cp .env.example .env
```

Edit `.env` and set `GITHUB_TOKEN` to your personal access token.

3. Build the project:

```bash
pnpm build
```

## Development

Start the server in watch mode:

```bash
pnpm dev
```

The server listens on port **8080** and exposes:

- `GET /sse` — SSE endpoint for MCP client connections
- `POST /messages` — Message endpoint for MCP transport

## Project Structure

```
src/
├── main.ts                 # MCP server entry point (SSE transport)
├── tools/
│   ├── index.ts            # Registers all MCP tools
│   ├── issues.ts           # Issue tools
│   ├── pull-requests.ts    # Pull request tools
│   └── actions.ts          # GitHub Actions tools
└── github-functions/
    ├── client.ts           # Shared Octokit client
    ├── types.ts            # Shared types
    ├── issues.ts           # Issue API wrappers
    ├── pull-requests.ts    # Pull request API wrappers
    └── actions.ts          # Actions API wrappers
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm dev` | Run the server in development mode with hot reload |

## License

MIT
