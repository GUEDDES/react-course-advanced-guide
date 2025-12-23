import { useTaskStore } from '../stores/taskStore';
import './Dashboard.css';

function Dashboard() {
  const statistics = useTaskStore((state) => state.getStatistics());
  const categoryStats = useTaskStore((state) => state.getCategoryStats());

  const completionRate = statistics.total > 0
    ? Math.round((statistics.done / statistics.total) * 100)
    : 0;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{statistics.total}</h3>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>{statistics.inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{statistics.done}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>{statistics.highPriority}</h3>
            <p>High Priority</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>{statistics.overdue}</h3>
            <p>Overdue</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{completionRate}%</h3>
            <p>Completion Rate</p>
          </div>
        </div>
      </div>

      <div className="category-stats">
        <h2>Tasks by Category</h2>
        <div className="category-grid">
          {Object.entries(categoryStats).map(([category, stats]) => (
            <div key={category} className="category-card">
              <h3>{category}</h3>
              <div className="category-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${stats.total > 0 ? (stats.done / stats.total) * 100 : 0}%`
                    }}
                  />
                </div>
                <p>{stats.done} / {stats.total} completed</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
