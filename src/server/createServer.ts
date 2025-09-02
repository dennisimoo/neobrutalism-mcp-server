import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { capabilities } from "./capabilities.js"

export function createServer(version: string) {
  return new Server(
    {
      name: "neobrutalism-mcp-server",
      version,
    },
    {
      capabilities,
    }
  )
}