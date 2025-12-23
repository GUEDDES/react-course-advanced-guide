import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/posts', icon: '📝', label: 'Posts' },
    { path: '/inbox', icon: '💬', label: 'Inbox' },
    { path: '/analytics', icon: '📈', label: 'Analytics' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">📱 SocialHub</h1>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="platform-badges">
          <span className="platform-badge twitter">𝕏</span>
          <span className="platform-badge instagram">📷</span>
          <span className="platform-badge linkedin">💼</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
