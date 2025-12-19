# AI Coding Agent Guidelines for `okkk` Repository

## Project Overview
This repository is a TypeScript-based project using the Vite build tool. It includes React components, utility functions, and service modules. The project appears to be structured for a web application with a focus on modularity and separation of concerns.

### Key Directories and Files
- **`components/`**: Contains React components. Example: `VoiceWidget.tsx`.
- **`services/`**: Includes service modules for external integrations. Examples: `chinaDirectService.ts`, `geminiLiveService.ts`.
- **`utils/`**: Utility functions for shared logic. Example: `audioUtils.ts`.
- **`vite.config.ts`**: Configuration for the Vite build tool.
- **`tsconfig.json`**: TypeScript configuration.
- **`index.html`**: Entry point for the web application.

## Development Workflow
### Building the Project
Run the following command to build the project:
```bash
npm run build
```

### Running the Development Server
Start the development server with:
```bash
npm run dev
```

### Testing
Currently, no explicit testing framework or scripts are defined in the repository. If tests are added, update this section.

### Debugging
Use the browser's developer tools for debugging the web application. Source maps are enabled by default in development mode.

## Project-Specific Conventions
- **Component Structure**: React components are stored in the `components/` directory. Follow the existing patterns in `VoiceWidget.tsx` for creating new components.
- **Service Modules**: Service modules in `services/` handle external API integrations. Ensure proper error handling and modularity.
- **Utility Functions**: Shared logic is placed in `utils/`. Keep utility functions pure and reusable.

## Integration Points
- **External APIs**: The `services/` directory contains modules for interacting with external APIs. Example: `chinaDirectService.ts`.
- **Audio Processing**: Utility functions in `utils/audioUtils.ts` handle audio-related logic.

## Patterns and Practices
- **TypeScript**: Use TypeScript for type safety. Refer to `tsconfig.json` for the project's TypeScript configuration.
- **Vite**: The project uses Vite for fast builds and hot module replacement. Refer to `vite.config.ts` for configuration details.
- **Modularity**: Maintain a modular structure by separating components, services, and utilities.

## Notes for AI Agents
- When adding new components, follow the structure and patterns in `components/VoiceWidget.tsx`.
- For new service integrations, use the existing modules in `services/` as a reference.
- Ensure all code adheres to the TypeScript configuration defined in `tsconfig.json`.
- Update this document if new conventions or workflows are introduced.