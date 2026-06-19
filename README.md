# Autonomous Testing Agent (ATA)

> An AI-powered testing agent that helps design, generate, and evaluate test cases from item requirements — with context information kept cleanly separated from prompts.

---

## Overview

The **Autonomous Testing Agent** (ATA) removes the manual overhead of writing test cases. You describe what you want to test in plain language; the agent uses configurable **context blocks** (system prompt, app configuration, test data) to produce precise, relevant test cases without repeating boilerplate in every prompt.

### Core concepts

| Concept | Description |
|---------|-------------|
| **Context** | Reusable blocks of information (system prompt, app URL, auth tokens, test data) injected automatically before each prompt |
| **Prompt** | A natural-language description of the scenario you want to test |
| **Agent** | The backend that processes context + prompt and returns structured test results |

---

## Features

- 🧠 **Context-aware prompting** — define system context, app details, and test data once; reuse across every prompt
- ✏️ **Editable context blocks** — add, rename, collapse, or remove context blocks at any time via the right panel
- 💬 **Chat interface** — interact with the agent conversationally, just like a modern AI assistant
- 🤖 **Multiple AI providers** — switch between GitHub Copilot, OpenAI, and Anthropic from the Settings modal
- 🔑 **Local-only credentials** — API tokens are stored exclusively in your browser's `localStorage` and never committed or sent to any third-party server
- 🧭 **Multi-view navigation** — dedicated Chat, Search, Apps, and History views plus a one-click New Chat
- 🏷️ **Test status badges** — agent responses surface `PASS`, `FAIL`, and `PENDING` states at a glance
- 🎨 **Dark UI** — clean, distraction-free interface inspired by modern AI chat products
- ✅ **Unit tested** — component and navigation tests run with Vitest + Testing Library

---

## Project Structure

```
autonomous-testing-agent/
├── frontend/                        # React + Vite web application
│   └── src/
│       ├── App.jsx                  # Root layout, global state, view routing, send handler
│       ├── main.jsx                 # React entry point
│       ├── components/
│       │   ├── Sidebar.jsx          # Icon-only navigation sidebar
│       │   ├── ChatArea.jsx         # Message list and welcome screen
│       │   ├── ChatInput.jsx        # Prompt input bar
│       │   ├── ContextPanel.jsx     # Right-hand context block manager
│       │   ├── PanelView.jsx        # Search / Apps / History views
│       │   └── SettingsModal.jsx    # AI provider + token configuration
│       ├── services/
│       │   ├── storage.js           # localStorage settings persistence
│       │   └── ai/                  # Provider abstraction (Copilot, OpenAI, Anthropic)
│       ├── test/                    # Vitest + Testing Library unit tests
│       └── index.css                # Global dark-theme base styles
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Install & run

```bash
# 1. Clone the repo
git clone https://github.com/luizdiego/autonomous-testing-agent.git
cd autonomous-testing-agent/frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Production build → `frontend/dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the codebase |
| `npm test` | Run the unit test suite once with Vitest |
| `npm run test:watch` | Run Vitest in watch mode |

---

## Usage

1. **Configure an AI provider** — open the **Settings** (⚙) modal in the sidebar, pick a provider (GitHub Copilot, OpenAI, or Anthropic), paste your API token, and choose a model. Tokens are saved to your browser's `localStorage` only.

2. **Define your context** — use the right-hand panel to create context blocks (e.g. *System Prompt*, *App Under Test*, *Test Data*). These are injected before every prompt sent to the agent.

3. **Write a prompt** — describe a test scenario in the bottom input bar and press **Enter** (use **Shift+Enter** for a new line without submitting).

4. **Review results** — the agent response appears in the chat with a status badge indicating whether the test passed, failed, or is still pending.

5. **Navigate** — use the sidebar to switch between **Chat**, **Search**, **Apps**, and **History** views, or start a fresh conversation with **New Chat**.

### Adding an AI provider

Providers live in `frontend/src/services/ai/`. Each extends `BaseProvider` and implements `isReady()` and the request logic. Register a new one in `frontend/src/services/ai/index.js` and add its defaults to the `DEFAULTS` map — it then appears automatically in the Settings modal.

> **Security note:** API tokens never leave the browser except as outbound `Authorization`/`x-api-key` headers to the provider you selected. They are not committed to the repository (see `.gitignore`) nor sent to any ATA-operated server.

## Testing

Unit tests are written with **Vitest** and **@testing-library/react** (jsdom environment) and live in `frontend/src/test/`. They cover sidebar/context icon rendering, navigation between views, and CSS regressions that could hide icons.

```bash
cd frontend
npm test
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI framework | React 18 |
| Build tool | Vite 5 |
| AI providers | GitHub Copilot, OpenAI, Anthropic |
| Testing | Vitest + Testing Library (jsdom) |
| Icons | lucide-react |
| Styling | Component-scoped CSS |

---

## Roadmap

- [x] Multi-provider AI integration (Copilot / OpenAI / Anthropic)
- [x] Persist settings to local storage
- [x] Unit test coverage
- [ ] Persist context blocks to local storage
- [ ] Export test cases to JSON / CSV
- [ ] Test run history and replay
- [ ] Multi-turn test conversations
- [ ] CI/CD headless mode

---

## License

Distributed under the [MIT License](LICENSE).
