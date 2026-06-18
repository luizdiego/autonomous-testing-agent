import { Plus, Search, MessageSquare, LayoutGrid, History, Settings } from 'lucide-react';
import './Sidebar.css';

const NAV_TOP = [
  { icon: Plus,          label: 'New Chat',  id: 'new' },
  { icon: Search,        label: 'Search',    id: 'search' },
  { icon: MessageSquare, label: 'Chats',     id: 'chats', badge: true },
  { icon: LayoutGrid,    label: 'Apps',      id: 'apps' },
];

const NAV_BOTTOM = [
  { icon: History,  label: 'History',  id: 'history' },
  { icon: Settings, label: 'Settings', id: 'settings', badge: true },
];

export default function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="sidebar">
      <nav className="sidebar-top">
        {NAV_TOP.map(({ icon: Icon, label, id, badge }) => (
          <button
            key={id}
            className={`sidebar-btn ${activeView === id ? 'active' : ''}`}
            title={label}
            onClick={() => onNavigate(id)}
          >
            <Icon size={20} />
            {badge && <span className="badge" />}
          </button>
        ))}
      </nav>
      <nav className="sidebar-bottom">
        {NAV_BOTTOM.map(({ icon: Icon, label, id, badge }) => (
          <button
            key={id}
            className={`sidebar-btn ${activeView === id ? 'active' : ''}`}
            title={label}
            onClick={() => onNavigate(id)}
          >
            <Icon size={20} />
            {badge && <span className="badge" />}
          </button>
        ))}
        <button className="sidebar-btn avatar" title="Profile">
          <span>L</span>
        </button>
      </nav>
    </aside>
  );
}
