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
- 🏷️ **Test status badges** — agent responses surface `PASS`, `FAIL`, and `PENDING` states at a glance
- 🎨 **Dark UI** — clean, distraction-free interface inspired by modern AI chat products
- 🔌 **Backend-agnostic** — wire up any LLM or agent backend through the `onSend` handler in `App.jsx`

---

## Project Structure

```
autonomous-testing-agent/
├── frontend/                    # React + Vite web application
│   └── src/
│       ├── App.jsx              # Root layout, global state, send handler
│       ├── components/
│       │   ├── Sidebar.jsx      # Icon-only navigation sidebar
│       │   ├── ChatArea.jsx     # Message list and welcome screen
│       │   ├── ChatInput.jsx    # Prompt input bar with model selector
│       │   └── ContextPanel.jsx # Right-hand context block manager
│       └── index.css            # Global dark-theme base styles
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

---

## Usage

1. **Define your context** — use the right-hand panel to create context blocks (e.g. *System Prompt*, *App Under Test*, *Test Data*). These are injected before every prompt sent to the agent.

2. **Write a prompt** — describe a test scenario in the bottom input bar and press **Enter** (use **Shift+Enter** for a new line without submitting).

3. **Review results** — the agent response appears in the chat with a status badge indicating whether the test passed, failed, or is still pending.

### Connecting a backend

In `frontend/src/App.jsx`, replace the placeholder agent response with a real API call:

```js
const handleSend = async (text) => {
  const userMsg = { id: ++msgId, role: 'user', content: text };
  setMessages(prev => [...prev, userMsg]);

  const response = await fetch('/api/run-test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: text, context: collectContextBlocks() }),
  });

  const { status, result } = await response.json();
  setMessages(prev => [
    ...prev,
    { id: ++msgId, role: 'assistant', status, content: result },
  ]);
};
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI framework | React 18 |
| Build tool | Vite 5 |
| Icons | lucide-react |
| Styling | Component-scoped CSS |

---

## Roadmap

- [ ] Backend integration (LLM / agent API)
- [ ] Persist context blocks to local storage
- [ ] Export test cases to JSON / CSV
- [ ] Test run history and replay
- [ ] Multi-turn test conversations
- [ ] CI/CD headless mode

---

## License

Distributed under the [MIT License](LICENSE).
