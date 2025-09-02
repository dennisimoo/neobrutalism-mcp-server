3/**
 * Framework selection utility for neobrutalism components MCP server
 *
 * This module handles switching between React and other framework implementations
 * based on environment variables or command line arguments.
 *
 * Usage:
 * - Set FRAMEWORK environment variable to 'react' or 'svelte' or 'vue'
 * - Or use --framework command line argument
 * - Defaults to 'react' if not specified
 */

import { logInfo, logWarning } from "./logger.js"

// Framework types
export type Framework = "react" | "svelte" | "vue"

// Default framework
const DEFAULT_FRAMEWORK: Framework = "react"

/**
 * Get the current framework from environment or command line arguments
 * @returns The selected framework ('react' or 'svelte' or 'vue')
 */
export function getFramework(): Framework {
  // Check command line arguments first
  const args = process.argv.slice(2)
  const frameworkIndex = args.findIndex(
    (arg) => arg === "--framework" || arg === "-f"
  )

  if (frameworkIndex !== -1 && args[frameworkIndex + 1]) {
    const framework = args[frameworkIndex + 1].toLowerCase() as Framework
    if (
      framework === "react" ||
      framework === "svelte" ||
      framework === "vue"
    ) {
      logInfo(`Framework set to '${framework}' via command line argument`)
      return framework
    } else {
      logWarning(
        `Invalid framework '${framework}' specified. Using default '${DEFAULT_FRAMEWORK}'`
      )
    }
  }

  // Check environment variable
  const envFramework = process.env.FRAMEWORK?.toLowerCase() as Framework
  if (
    envFramework === "react" ||
    envFramework === "svelte" ||
    envFramework === "vue"
  ) {
    logInfo(`Framework set to '${envFramework}' via environment variable`)
    return envFramework
  }

  // Return default
  logInfo(`Using default framework: '${DEFAULT_FRAMEWORK}'`)
  return DEFAULT_FRAMEWORK
}

/**
 * Get the components implementation based on the current framework
 * @returns The appropriate components implementation
 */
export async function getAxiosImplementation() {
  const framework = getFramework()

  if (framework === "svelte") {
    // Dynamic import for Svelte implementation (future)
    return import("./local-components.js").then((module) => module.localComponents)
  } else if (framework === "vue") {
    // Dynamic import for Vue implementation (future)
    return import("./local-components.js").then((module) => module.localComponents)
  } else {
    // Dynamic import for local neobrutalism components (default)
    return import("./local-components.js").then((module) => module.localComponents)
  }
}

/**
 * Get framework-specific information for help text
 * @returns Framework information object
 */
export function getFrameworkInfo() {
  const framework = getFramework()

  return {
    current: framework,
    repository:
      framework === "svelte"
        ? "local neobrutalism components (future)"
        : framework === "vue"
        ? "local neobrutalism components (future)"
        : "local neobrutalism components",
    fileExtension:
      framework === "svelte"
        ? ".svelte"
        : framework === "vue"
        ? ".vue"
        : ".tsx",
    description:
      framework === "svelte"
        ? "Svelte components from neobrutalism (future)"
        : framework === "vue"
        ? "Vue components from neobrutalism (future)"
        : "React components from neobrutalism-components",
  }
}

/**
 * Validate framework selection and provide helpful feedback
 */
export function validateFrameworkSelection() {
  const framework = getFramework()
  const info = getFrameworkInfo()

  logInfo(`MCP Server configured for ${framework.toUpperCase()} framework`)
  logInfo(`Repository: ${info.repository}`)
  logInfo(`File extension: ${info.fileExtension}`)
  logInfo(`Description: ${info.description}`)

  // Provide helpful information about switching frameworks
  if (framework === "react") {
    logInfo(
      "To switch frameworks: set FRAMEWORK=svelte|vue or use --framework svelte|vue"
    )
  } else if (framework === "svelte") {
    logInfo(
      "To switch frameworks: set FRAMEWORK=react|vue or use --framework react|vue"
    )
  } else if (framework === "vue") {
    logInfo(
      "To switch frameworks: set FRAMEWORK=react|svelte or use --framework react|svelte"
    )
  } else {
    logInfo(
      "To switch frameworks: set FRAMEWORK=react|svelte or use --framework react|svelte"
    )
  }
}
