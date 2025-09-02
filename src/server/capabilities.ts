export const capabilities = {
  tools: {
    get_component: {
      description:
        "Get the source code for a specific neobrutalism component",
      inputSchema: {
        type: "object",
        properties: {
          componentName: {
            type: "string",
            description:
              'Name of the neobrutalism component (e.g., "accordion", "button", "nbutton", "s1")',
          },
        },
        required: ["componentName"],
      },
    },
    get_component_demo: {
      description:
        "Get demo code illustrating how a neobrutalism component should be used",
      inputSchema: {
        type: "object",
        properties: {
          componentName: {
            type: "string",
            description:
              'Name of the neobrutalism component (e.g., "accordion", "button", "nbutton", "s1")',
          },
        },
        required: ["componentName"],
      },
    },
    list_components: {
      description: "Get all available neobrutalism components",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    get_component_metadata: {
      description: "Get metadata for a specific neobrutalism component",
      inputSchema: {
        type: "object",
        properties: {
          componentName: {
            type: "string",
            description:
              'Name of the neobrutalism component (e.g., "accordion", "button", "nbutton", "s1")',
          },
        },
        required: ["componentName"],
      },
    },
    get_directory_structure: {
      description:
        "Get the directory structure of the neobrutalism-components repository",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Path within the repository (default: src/components)",
          },
          owner: {
            type: "string",
            description: 'Repository owner (default: "ekmas")',
          },
          repo: {
            type: "string",
            description: 'Repository name (default: "neobrutalism-components")',
          },
          branch: {
            type: "string",
            description: 'Branch name (default: "main")',
          },
        },
      },
    },
  },
}