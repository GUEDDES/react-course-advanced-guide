import { useEffect } from 'react';
import { useMetricsStore } from '../stores/metricsStore';
import { useWebSocket } from '../hooks/useWebSocket';
import MetricsCards from '../components/dashboard/MetricsCards';
import RecentActivity from '../components/dashboard/RecentActivity';
import './DashboardPage.css';

function DashboardPage() {
  const setConnected = useMetricsStore((state) => state.setConnected);
  const updateMetrics = useMetricsStore((state) => state.updateMetrics);

  const handleMessage = (data) => {
    if (data.type === 'metrics_update') {
      updateMetrics(data.platform, data.data);
    }
  };

  const { isConnected } = useWebSocket(handleMessage);

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected, setConnected]);

  return (
    <div className="dashboard-page">
      <MetricsCards />
      <RecentActivity />
    </div>
  );
}

export default DashboardPage;
