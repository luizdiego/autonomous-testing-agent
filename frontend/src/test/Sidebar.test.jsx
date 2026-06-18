import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar';

describe('Sidebar', () => {
  const menus = ['New Chat', 'Search', 'Chats', 'Apps', 'History', 'Settings'];

  it('renders every menu button', () => {
    render(<Sidebar activeView="chats" onNavigate={() => {}} />);
    menus.forEach(label => {
      expect(screen.getByTitle(label)).toBeInTheDocument();
    });
  });

  it('renders an icon (svg) inside every menu button', () => {
    render(<Sidebar activeView="chats" onNavigate={() => {}} />);
    menus.forEach(label => {
      const btn = screen.getByTitle(label);
      const svg = btn.querySelector('svg');
      expect(svg, `expected an icon in "${label}" button`).toBeInTheDocument();
    });
  });

  it('marks the active view button as active', () => {
    render(<Sidebar activeView="search" onNavigate={() => {}} />);
    expect(screen.getByTitle('Search')).toHaveClass('active');
    expect(screen.getByTitle('Chats')).not.toHaveClass('active');
  });

  it('calls onNavigate with the menu id when clicked', () => {
    const onNavigate = vi.fn();
    render(<Sidebar activeView="chats" onNavigate={onNavigate} />);
    screen.getByTitle('Apps').click();
    expect(onNavigate).toHaveBeenCalledWith('apps');
  });
});
