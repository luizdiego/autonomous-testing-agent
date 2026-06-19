import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import ContextPanel from '../components/ContextPanel';

describe('ContextPanel', () => {
  it('renders an icon inside the Add context button', () => {
    render(<ContextPanel onContextsChange={() => {}} />);
    const addBtn = screen.getByTitle('Add context block');
    expect(addBtn.querySelector('svg')).toBeInTheDocument();
  });

  it('renders an icon inside each Remove button', () => {
    render(<ContextPanel onContextsChange={() => {}} />);
    const removeBtns = screen.getAllByTitle('Remove');
    expect(removeBtns.length).toBeGreaterThan(0);
    removeBtns.forEach(btn => {
      expect(btn.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('zeroes button padding so context icons are not collapsed by the global button style', () => {
    const css = readFileSync(
      resolve(process.cwd(), 'src/components/ContextPanel.css'),
      'utf8',
    );
    for (const sel of ['.ctx-add-btn', '.ctx-icon-btn']) {
      const rule = css.match(new RegExp(`\\${sel}\\s*\\{([^}]*)\\}`))?.[1] || '';
      expect(rule, `${sel} should reset padding`).toMatch(/padding:\s*0\s*;/);
    }
  });
});
