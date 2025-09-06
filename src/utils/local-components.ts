import { promises as fs, existsSync } from 'fs';
import path from 'path';
import { logError, logInfo } from './logger.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to local components - bundled with build
function getComponentsDir(): string {
  // Multiple possible paths when running via different contexts
  const possiblePaths = [
    // When run from build directory (local development)
    path.resolve(__dirname, '../components'),
    // When bundled in build directory
    path.resolve(__dirname, 'components'),
    // When installed as npm package and running from build/
    path.resolve(__dirname, '../components'),
    // When installed globally or via npx
    path.resolve(__dirname, '../../components'),
    // Alternative npx path
    path.resolve(__dirname, '../../../components'),
    // Try from current working directory
    path.resolve(process.cwd(), 'components'),
    // Try from current working directory build
    path.resolve(process.cwd(), 'build/components'),
  ];
  
  for (const testPath of possiblePaths) {
    try {
      if (existsSync(testPath)) {
        const registryPath = path.join(testPath, 'registry.json');
        const hasRegistry = existsSync(registryPath);
        
        if (hasRegistry) {
          logInfo(`Found components directory at: ${testPath}`);
          return testPath;
        }
      }
    } catch (error) {
      // Continue to next path
    }
  }
  
  // Special handling for bundled components within the package
  const bundledPath = path.resolve(__dirname, 'components');
  if (existsSync(bundledPath)) {
    logInfo(`Using bundled components directory at: ${bundledPath}`);
    return bundledPath;
  }
  
  // Fallback to original path with error logging
  const defaultPath = path.resolve(__dirname, '../components');
  logError(`Could not find components directory. Tried paths: ${possiblePaths.join(', ')}`);
  logError(`Falling back to: ${defaultPath}`);
  return defaultPath;
}

const COMPONENTS_DIR = getComponentsDir();
const UI_COMPONENTS_DIR = path.join(COMPONENTS_DIR, 'ui');
const STARS_COMPONENTS_DIR = path.join(COMPONENTS_DIR, 'stars');
const EXAMPLES_DIR = path.join(COMPONENTS_DIR, 'examples');
const REGISTRY_FILE = path.join(COMPONENTS_DIR, 'registry.json');

// Registry data cache
let registryData: any = null;

/**
 * Load registry data from local file
 */
async function loadRegistryData() {
    if (registryData) return registryData;
    
    try {
        const registryContent = await fs.readFile(REGISTRY_FILE, 'utf8');
        registryData = JSON.parse(registryContent);
        return registryData;
    } catch (error) {
        logError('Could not load local registry', error);
        return null;
    }
}

/**
 * Get component source code from local files
 */
async function getComponentSource(componentName: string): Promise<string> {
    try {
        // Try UI components first
        try {
            const uiPath = path.join(UI_COMPONENTS_DIR, `${componentName.toLowerCase()}.tsx`);
            return await fs.readFile(uiPath, 'utf8');
        } catch (error) {
            // If not found in UI, try stars components
            const starsPath = path.join(STARS_COMPONENTS_DIR, `${componentName.toLowerCase()}.tsx`);
            return await fs.readFile(starsPath, 'utf8');
        }
    } catch (error) {
        throw new Error(`Component "${componentName}" not found in local components`);
    }
}

/**
 * Get component demo from local files
 */
async function getComponentDemo(componentName: string): Promise<string> {
    try {
        // Try different demo paths
        const demoPaths = [
            path.join(EXAMPLES_DIR, 'ui', `${componentName.toLowerCase()}.tsx`),
            path.join(EXAMPLES_DIR, 'ui', componentName.toLowerCase(), 'index.tsx'),
            path.join(EXAMPLES_DIR, 'stars', `${componentName.toLowerCase()}.tsx`),
        ];

        for (const demoPath of demoPaths) {
            try {
                return await fs.readFile(demoPath, 'utf8');
            } catch (error) {
                // Continue to next path
            }
        }
        
        throw new Error(`Demo for component "${componentName}" not found in local examples`);
    } catch (error) {
        throw new Error(`Demo for component "${componentName}" not found in local examples`);
    }
}

/**
 * Get all available components from local files
 */
async function getAvailableComponents(): Promise<string[]> {
    try {
        const registry = await loadRegistryData();
        if (registry && registry.items) {
            const components = registry.items.map((item: any) => item.name);
            logInfo(`Loaded ${components.length} components from local registry`);
            return components.sort();
        }

        // Fallback: scan directories
        const components: string[] = [];
        
        try {
            const uiFiles = await fs.readdir(UI_COMPONENTS_DIR);
            const uiComponents = uiFiles
                .filter(file => file.endsWith('.tsx'))
                .map(file => file.replace('.tsx', ''));
            components.push(...uiComponents);
        } catch (error) {
            logError('Could not read UI components directory', error);
        }

        try {
            const starsFiles = await fs.readdir(STARS_COMPONENTS_DIR);
            const starsComponents = starsFiles
                .filter(file => file.endsWith('.tsx'))
                .map(file => file.replace('.tsx', ''));
            components.push(...starsComponents);
        } catch (error) {
            logError('Could not read stars components directory', error);
        }

        return [...new Set(components)].sort();
    } catch (error) {
        logError('Error getting available components', error);
        return [];
    }
}

/**
 * Get component metadata from local registry
 */
async function getComponentMetadata(componentName: string): Promise<any> {
    try {
        const registry = await loadRegistryData();
        if (registry && registry.items) {
            const component = registry.items.find((item: any) => item.name === componentName);
            return component || null;
        }
        return null;
    } catch (error) {
        logError(`Error getting metadata for ${componentName}`, error);
        return null;
    }
}

/**
 * Simple directory structure for local components
 */
async function buildDirectoryTree(): Promise<any> {
    return {
        path: 'components',
        type: 'directory',
        description: 'Local neobrutalism components',
        children: {
            'ui': {
                path: 'components/ui',
                type: 'directory',
                description: 'UI components'
            },
            'stars': {
                path: 'components/stars', 
                type: 'directory',
                description: 'Star decorative components'
            },
            'examples': {
                path: 'components/examples',
                type: 'directory',
                description: 'Component examples and demos'
            },
            'registry.json': {
                path: 'components/registry.json',
                type: 'file',
                description: 'Component registry metadata'
            }
        }
    };
}

// No need for API key methods since we're using local files
function setGitHubApiKey(_apiKey: string): void {
    logInfo('Using local components - no GitHub API key needed');
}

async function getGitHubRateLimit(): Promise<any> {
    return {
        message: 'Using local components - no rate limiting',
        local: true
    };
}

export const localComponents = {
    getComponentSource,
    getComponentDemo,
    getAvailableComponents,
    getComponentMetadata,
    buildDirectoryTree,
    setGitHubApiKey,
    getGitHubRateLimit,
    paths: {
        REPO_OWNER: 'local',
        REPO_NAME: 'components',
        REPO_BRANCH: 'main',
        COMPONENTS_PATH: 'components',
        UI_COMPONENTS_PATH: 'components/ui',
        STARS_COMPONENTS_PATH: 'components/stars',
        EXAMPLES_PATH: 'components/examples'
    }
};