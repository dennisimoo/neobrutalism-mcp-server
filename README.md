# Neobrutalism Components MCP Server

[![npm version](https://badge.fury.io/js/neobrutalism-mcp-server.svg)](https://badge.fury.io/js/neobrutalism-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **🚀 The fastest way to integrate neobrutalism components into your AI workflow**

A Model Context Protocol (MCP) server that provides AI assistants with comprehensive access to [neobrutalism components](https://neobrutalism.dev/) - a collection of neobrutalism-styled React components based on shadcn/ui.

## ✨ Key Features

- **🎯 Neobrutalism Design** - Bold, stark, and brutalist-inspired UI components
- **📦 Component Source Code** - Latest TypeScript source code from the registry
- **🎨 Component Demos** - Example implementations and usage patterns  
- **⭐ Stars Components** - 40 unique star/decoration components (s1-s40)
- **📋 Metadata Access** - Dependencies, descriptions, and configuration details
- **🔍 Directory Browsing** - Explore repository structures
- **⚡ Local Components** - All components included locally, no external dependencies

## 🚀 Quick Start

```bash
# Simple usage!
npx neobrutalism-mcp-server
```

**🎯 All components included locally!**

## 🎨 Component Categories

This MCP server provides access to neobrutalism components organized in categories:

| Category | Description | Examples |
|----------|-------------|----------|
| **UI Components** | Core neobrutalism-styled components | `button`, `nbutton`, `card`, `ncard`, `dialog` |
| **Form Components** | Input and form elements | `input`, `ninput`, `label`, `nlabel`, `checkbox` |
| **Layout Components** | Structure and navigation | `sheet`, `nsheet`, `sidebar`, `navigation-menu` |
| **Star Components** | Decorative elements | `s1`, `s2`, `s3`, ... `s40` |

## 🛠️ Essential Setup

### 1. Run Server
```bash
npx neobrutalism-mcp-server
```

### 2. Integrate with Your Editor
Configure your AI assistant to use this MCP server:

**Claude Desktop Configuration:**
```json
{
  "mcpServers": {
    "neobrutalism": {
      "command": "npx",
      "args": ["neobrutalism-mcp-server"]
    }
  }
}
```

## 🎯 Use Cases

- **AI-Powered Development** - Let AI assistants build UIs with neobrutalism components
- **Component Discovery** - Explore available components and their usage
- **Rapid Prototyping** - Get complete component implementations
- **Design Systems** - Build brutalist-inspired design systems
- **Code Generation** - Generate component code with proper dependencies

## 📦 Available Tools

The MCP server provides these tools for AI assistants:

- `list_components` - Get all available neobrutalism components
- `get_component` - Get source code for a specific component
- `get_component_demo` - Get demo/example usage for a component
- `get_component_metadata` - Get metadata (dependencies, type, etc.)
- `get_directory_structure` - Browse the repository structure

## 🎨 Component Examples

### UI Components
- `button` / `nbutton` - Neobrutalism-styled buttons
- `card` / `ncard` - Container components with bold borders
- `dialog` / `ndialog` - Modal dialogs with stark styling
- `input` / `ninput` - Form input elements

### Stars Components
- `s1` to `s40` - Decorative star and ornamental components
- Each with unique neobrutalism styling

## 📦 Installation

```bash
# Install globally (optional)
npm install -g neobrutalism-mcp-server

# Or use npx directly (recommended)
npx neobrutalism-mcp-server

# Or install locally in a project
npm install neobrutalism-mcp-server
```

## 🔗 Repository

This server includes components locally from the [ekmas/neobrutalism-components](https://github.com/ekmas/neobrutalism-components) repository.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **[ekmas](https://github.com/ekmas)** - For the amazing neobrutalism components library
- **[shadcn](https://github.com/shadcn)** - For the foundational shadcn/ui architecture
- **[Anthropic](https://anthropic.com)** - For the Model Context Protocol specification

---

**Made with ❤️ by [Dennis Khylkouski](https://github.com/dennisimoo) for the neobrutalism design movement**

**Star ⭐ this repo if you find it helpful!**