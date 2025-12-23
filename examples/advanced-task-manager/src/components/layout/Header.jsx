import { useTaskStore } from '../../stores/taskStore';
import './Header.css';

function Header() {
  const statistics = useTaskStore((state) => state.getStatistics());

  return (
    <header className="header">
      <div className="header-stats">
        <div className="stat">
          <span className="stat-value">{statistics.total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat">
          <span className="stat-value">{statistics.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat">
          <span className="stat-value">{statistics.done}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>
      <div className="header-actions">
        <button className="icon-button">🔔</button>
        <button className="icon-button">⚙️</button>
      </div>
    </header>
  );
}

export default Header;
