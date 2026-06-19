import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsModal from '../components/SettingsModal';
import { aiService } from '../services/ai';

describe('SettingsModal credential testing', () => {
  beforeEach(() => {
    localStorage.clear();
    aiService.updateSettings(structuredClone(aiService.getSettings()));
    vi.restoreAllMocks();
  });

  it('renders a Test credentials button', () => {
    render(<SettingsModal onClose={() => {}} />);
    expect(screen.getByRole('button', { name: /test credentials/i })).toBeInTheDocument();
  });

  it('disables the Test button when no token is entered', () => {
    render(<SettingsModal onClose={() => {}} />);
    expect(screen.getByRole('button', { name: /test credentials/i })).toBeDisabled();
  });

  it('shows a success message when credentials are valid', async () => {
    const user = userEvent.setup();
    vi.spyOn(aiService, 'testCredentials').mockResolvedValue({ ok: true, message: 'Credentials are valid.' });
    render(<SettingsModal onClose={() => {}} />);

    await user.type(screen.getByPlaceholderText(/paste your/i), 'tok_123');
    await user.click(screen.getByRole('button', { name: /test credentials/i }));

    await waitFor(() => expect(screen.getByText('Credentials are valid.')).toBeInTheDocument());
  });

  it('shows a failure message when credentials are invalid', async () => {
    const user = userEvent.setup();
    vi.spyOn(aiService, 'testCredentials').mockResolvedValue({ ok: false, message: 'Copilot error (401): Unauthorized' });
    render(<SettingsModal onClose={() => {}} />);

    await user.type(screen.getByPlaceholderText(/paste your/i), 'bad');
    await user.click(screen.getByRole('button', { name: /test credentials/i }));

    await waitFor(() => expect(screen.getByText(/Unauthorized/)).toBeInTheDocument());
  });
});
