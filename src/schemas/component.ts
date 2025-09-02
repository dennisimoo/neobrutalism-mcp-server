// Schema definitions for neobrutalism components
export interface ComponentExample {
  title: string;
  code: string;
  url?: string;
}

export interface ComponentProp {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: string;
}

export interface ComponentInfo {
  name: string;
  title?: string;
  description?: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: ComponentFile[];
  url?: string;
  props?: ComponentProp[];
  examples?: ComponentExample[];
  source?: string;
  installation?: string;
}

export interface ComponentFile {
  path: string;
  type: string;
  target?: string;
}

export interface Theme {
  name: string;
  description: string;
  url?: string;
}

// Stars component interface for neobrutalism star components (s1-s40)
export interface StarComponent {
  name: string;
  title: string;
  type: string;
  files: ComponentFile[];
}
