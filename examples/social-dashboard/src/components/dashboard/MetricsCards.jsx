import { useMetricsStore } from '../../stores/metricsStore';
import './MetricsCards.css';

function MetricsCards() {
  const metrics = useMetricsStore((state) => state.metrics);

  const platforms = [
    { key: 'twitter', name: 'Twitter', icon: '𝕏', color: '#000000' },
    { key: 'instagram', name: 'Instagram', icon: '📷', color: '#E4405F' },
    { key: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0077B5' }
  ];

  return (
    <div className="metrics-section">
      <h2>Platform Metrics</h2>
      <div className="metrics-grid">
        {platforms.map((platform) => {
          const data = metrics[platform.key];
          return (
            <div key={platform.key} className="metric-card" style={{ borderTopColor: platform.color }}>
              <div className="metric-header">
                <span className="platform-icon">{platform.icon}</span>
                <h3>{platform.name}</h3>
              </div>
              <div className="metric-stats">
                <div className="stat">
                  <span className="stat-value">{data.followers.toLocaleString()}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{data.engagement}%</span>
                  <span className="stat-label">Engagement</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{data.posts}</span>
                  <span className="stat-label">Posts</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MetricsCards;
