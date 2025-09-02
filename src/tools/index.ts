import { handleGetComponent } from './components/get-component.js';
import { handleGetComponentDemo } from './components/get-component-demo.js';
import { handleListComponents } from './components/list-components.js';
import { handleGetComponentMetadata } from './components/get-component-metadata.js';
import { handleGetDirectoryStructure } from './repository/get-directory-structure.js';

import { schema as getComponentSchema } from './components/get-component.js';
import { schema as getComponentDemoSchema } from './components/get-component-demo.js';
import { schema as listComponentsSchema } from './components/list-components.js';
import { schema as getComponentMetadataSchema } from './components/get-component-metadata.js';
import { schema as getDirectoryStructureSchema } from './repository/get-directory-structure.js';

export const toolHandlers = {
  get_component: handleGetComponent,
  get_component_demo: handleGetComponentDemo,
  list_components: handleListComponents,
  get_component_metadata: handleGetComponentMetadata,
  get_directory_structure: handleGetDirectoryStructure
};

export const toolSchemas = {
  get_component: getComponentSchema,
  get_component_demo: getComponentDemoSchema,
  list_components: listComponentsSchema,
  get_component_metadata: getComponentMetadataSchema,
  get_directory_structure: getDirectoryStructureSchema
};

export const tools = {
  'get_component': {
    name: 'get_component',
    description: 'Get the source code for a specific neobrutalism component',
    inputSchema: {
      type: 'object',
      properties: getComponentSchema,
      required: ['componentName']
    }
  },
  'get_component_demo': {
    name: 'get_component_demo',
    description: 'Get demo code illustrating how a neobrutalism component should be used',
    inputSchema: {
      type: 'object',
      properties: getComponentDemoSchema,
      required: ['componentName']
    }
  },
  'list_components': {
    name: 'list_components',
    description: 'Get all available neobrutalism components',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  'get_component_metadata': {
    name: 'get_component_metadata',
    description: 'Get metadata for a specific neobrutalism component',
    inputSchema: {
      type: 'object',
      properties: getComponentMetadataSchema,
      required: ['componentName']
    }
  },
  'get_directory_structure': {
    name: 'get_directory_structure',
    description: 'Get the directory structure of the neobrutalism-components repository',
    inputSchema: {
      type: 'object',
      properties: getDirectoryStructureSchema
    }
  }
}; 