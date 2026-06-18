import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
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

  it('zeroes button padding so icons are not collapsed by the global button style', () => {
    const css = readFileSync(
      resolve(process.cwd(), 'src/components/Sidebar.css'),
      'utf8',
    );
    const rule = css.match(/\.sidebar-btn\s*\{([^}]*)\}/)?.[1] || '';
    expect(rule).toMatch(/padding:\s*0\s*;/);
  });
});
