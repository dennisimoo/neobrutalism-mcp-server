/**
 * Request handler setup for the neobrutalism MCP server.
 * 
 * This file configures how the server responds to MCP tool requests.
 * Simplified to focus on core neobrutalism component functionality.
 */
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from "@modelcontextprotocol/sdk/types.js";
import { type Server } from "@modelcontextprotocol/sdk/server/index.js";
import { toolHandlers, tools } from "../tools/index.js";
import { logError, logInfo } from '../utils/logger.js';

/**
 * Wrapper function to handle tool requests with error handling
 */
async function handleToolRequest(
  method: string,
  params: any,
  handler: (params: any) => Promise<any>
): Promise<any> {
  try {
    logInfo(`Processing tool request: ${method}`);
    return await handler(params);
  } catch (error: any) {
    logError(`Tool request failed: ${method}`, error);
    throw new McpError(
      ErrorCode.InternalError,
      `Tool request failed: ${error.message || error}`
    );
  }
}

export function setupHandlers(server: Server) {
  logInfo("Setting up request handlers...");

  // Tool handlers
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: Object.values(tools),
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    if (!(name in toolHandlers)) {
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Tool not found: ${name}`
      );
    }

    const handler = toolHandlers[name as keyof typeof toolHandlers];
    return await handleToolRequest(name, args, handler);
  });

  logInfo("Handlers setup complete");
}