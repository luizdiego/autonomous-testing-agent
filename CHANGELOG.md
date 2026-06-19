# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Multi-provider AI service architecture supporting GitHub Copilot, OpenAI, and Anthropic, with a Settings modal to select a provider and model.
- "Test credentials" action in the Settings modal that validates the configured provider before saving and reports success or failure inline.
- Dedicated navigation views for Search, Apps, and History, plus a one-click New Chat action.
- Unit test suite using Vitest and Testing Library covering component rendering, view navigation, and credential-check behavior.
- ESLint override for test and config files so Node/Vitest globals lint cleanly.

### Fixed
- Sidebar menu icons no longer collapse: reset the inherited global button padding so icons render at their intended size.
- Context panel Add and Remove buttons now display their icons correctly.

### Changed
- Updated the root and frontend README files to document AI providers, multi-view navigation, testing, and security notes.
- Hardened `.gitignore` to exclude test coverage output and additional credential file formats.

### Security
- Provider tokens are stored only in the browser's local storage and are never written to the repository or transmitted to any project-operated server.
