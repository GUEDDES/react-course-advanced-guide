import { useMetricsStore } from '../stores/metricsStore';
import './AnalyticsPage.css';

function AnalyticsPage() {
  const metrics = useMetricsStore((state) => state.metrics);
  const totalFollowers = Object.values(metrics).reduce(
    (sum, platform) => sum + platform.followers,
    0
  );
  const avgEngagement = (
    Object.values(metrics).reduce((sum, p) => sum + p.engagement, 0) /
    Object.values(metrics).length
  ).toFixed(1);

  return (
    <div className="analytics-page">
      <h1>Analytics</h1>

      <div className="analytics-summary">
        <div className="summary-card">
          <h3>Total Followers</h3>
          <p className="summary-value">{totalFollowers.toLocaleString()}</p>
          <span className="summary-change positive">+12.5% this month</span>
        </div>
        <div className="summary-card">
          <h3>Average Engagement</h3>
          <p className="summary-value">{avgEngagement}%</p>
          <span className="summary-change positive">+2.3% this week</span>
        </div>
        <div className="summary-card">
          <h3>Total Posts</h3>
          <p className="summary-value">
            {Object.values(metrics).reduce((sum, p) => sum + p.posts, 0)}
          </p>
          <span className="summary-change">This month</span>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-placeholder">
          <h3>📈 Growth Trend</h3>
          <p>Line chart showing follower growth over time</p>
        </div>
        <div className="chart-placeholder">
          <h3>🔥 Engagement Rate</h3>
          <p>Bar chart comparing engagement across platforms</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
