# ATA Frontend

The React + Vite web client for the **Autonomous Testing Agent**. See the [root README](../README.md) for full project documentation.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests once (Vitest) |
| `npm run test:watch` | Run Vitest in watch mode |

## Structure

```
src/
├── App.jsx             # Root layout, view routing, send handler
├── main.jsx            # React entry point
├── components/         # Sidebar, ChatArea, ChatInput, ContextPanel, PanelView, SettingsModal
├── services/
│   ├── storage.js      # localStorage settings persistence
│   └── ai/             # Provider abstraction (GitHub Copilot, OpenAI, Anthropic)
├── test/               # Vitest + Testing Library unit tests
└── *.css               # Component-scoped and global styles
```

## AI providers

Providers live in `src/services/ai/`, each extending `BaseProvider`. Register new ones in `src/services/ai/index.js`; they appear automatically in the Settings (⚙) modal.

> API tokens are stored only in the browser's `localStorage` and are sent solely to the selected provider's API. They are never committed (see `.gitignore`).

## Testing

Tests use **Vitest** + **@testing-library/react** (jsdom) and live in `src/test/`. They cover icon rendering, view navigation, and CSS regressions.

```bash
npm test
```

## Tooling

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) — Fast Refresh via Babel
- [ESLint](https://eslint.org/) — see `eslint.config.js`
