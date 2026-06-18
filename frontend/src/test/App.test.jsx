import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App menu navigation', () => {
  beforeEach(() => localStorage.clear());

  it('shows the chat view by default', () => {
    render(<App />);
    expect(screen.getByText(/what do you want to test/i)).toBeInTheDocument();
  });

  it('renders the Search interface when Search is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByTitle('Search'));
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search chats/i)).toBeInTheDocument();
  });

  it('renders the Apps interface when Apps is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByTitle('Apps'));
    expect(screen.getByRole('heading', { name: 'Apps' })).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('renders the History interface when History is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByTitle('History'));
    expect(screen.getByRole('heading', { name: 'History' })).toBeInTheDocument();
    expect(screen.getByText(/no history yet/i)).toBeInTheDocument();
  });

  it('returns to the chat view from another menu', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByTitle('Apps'));
    await user.click(screen.getByTitle('Chats'));
    expect(screen.getByText(/what do you want to test/i)).toBeInTheDocument();
  });

  it('New Chat resets to the chat view', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByTitle('Search'));
    await user.click(screen.getByTitle('New Chat'));
    expect(screen.getByText(/what do you want to test/i)).toBeInTheDocument();
  });
});
