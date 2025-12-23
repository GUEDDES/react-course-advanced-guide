import { useMetricsStore } from '../../stores/metricsStore';
import './Header.css';

function Header() {
  const isConnected = useMetricsStore((state) => state.isConnected);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h2>Welcome back! 👋</h2>
          <p className="subtitle">Here's what's happening with your social media today</p>
        </div>
        
        <div className="header-actions">
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            <span className="status-dot"></span>
            {isConnected ? 'Live' : 'Offline'}
          </div>
          <button className="btn btn-primary">+ New Post</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
