import { getAxiosImplementation } from '../../utils/framework.js';
import { logError } from '../../utils/logger.js';

export async function handleGetDirectoryStructure({ 
  path, 
  owner, 
  repo, 
  branch 
}: { 
  path?: string, 
  owner?: string, 
  repo?: string, 
  branch?: string 
}) {
  try {
    const components = await getAxiosImplementation();
    
    const directoryTree = await components.buildDirectoryTree();
    return {
      content: [{ 
        type: "text", 
        text: JSON.stringify(directoryTree, null, 2)
      }]
    };
  } catch (error) {
    logError('Failed to get directory structure', error);
    throw new Error(`Failed to get directory structure: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const schema = {
  path: {
    type: 'string',
    description: 'Path within the repository (default: src/components)'
  },
  owner: {
    type: 'string',
    description: 'Repository owner (default: "ekmas")'
  },
  repo: {
    type: 'string',
    description: 'Repository name (default: "neobrutalism-components")'
  },
  branch: {
    type: 'string',
    description: 'Branch name (default: "main")'
  }
}; 