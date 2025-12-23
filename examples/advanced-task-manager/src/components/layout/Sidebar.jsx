import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h1>TaskFlow</h1>
      </div>
      <nav className="nav-menu">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <span className="icon">📊</span>
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
          <span className="icon">✓</span>
          Tasks
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>
          <span className="icon">📈</span>
          Analytics
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
