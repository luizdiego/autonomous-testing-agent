import { Search, LayoutGrid, History } from 'lucide-react';
import './PanelView.css';

const META = {
  search: {
    icon: Search,
    title: 'Search',
    sub: 'Find past chats, prompts and test runs.',
  },
  apps: {
    icon: LayoutGrid,
    title: 'Apps',
    sub: 'Connect and manage integrations for your testing workflows.',
  },
  history: {
    icon: History,
    title: 'History',
    sub: 'Browse your previous sessions and test results.',
  },
};

export default function PanelView({ view, messages = [], onOpenChat }) {
  const meta = META[view];
  if (!meta) return null;
  const Icon = meta.icon;

  return (
    <div className="panel-view">
      <header className="panel-header">
        <Icon size={22} />
        <div>
          <h1 className="panel-title">{meta.title}</h1>
          <p className="panel-sub">{meta.sub}</p>
        </div>
      </header>

      {view === 'search' && (
        <div className="panel-body">
          <input
            className="panel-search-input"
            type="search"
            placeholder="Search chats, prompts, results…"
            autoFocus
          />
          <p className="panel-empty">Type above to search your workspace.</p>
        </div>
      )}

      {view === 'apps' && (
        <div className="panel-body">
          <div className="panel-grid">
            {['GitHub', 'Jira', 'Slack', 'Playwright', 'Postman', 'Webhooks'].map(name => (
              <div key={name} className="panel-card">
                <span className="panel-card-name">{name}</span>
                <button className="panel-card-btn">Connect</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'history' && (
        <div className="panel-body">
          {messages.length === 0 ? (
            <p className="panel-empty">No history yet. Start a chat to see it here.</p>
          ) : (
            <ul className="panel-history">
              {messages
                .filter(m => m.role === 'user')
                .map(m => (
                  <li key={m.id} className="panel-history-item" onClick={onOpenChat}>
                    {m.content}
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
