import { formatDistanceToNow } from 'date-fns';
import { useInboxStore } from '../../stores/inboxStore';
import './RecentActivity.css';

function RecentActivity() {
  const messages = useInboxStore((state) => state.messages.slice(0, 5));

  const platformColors = {
    twitter: '#000000',
    instagram: '#E4405F',
    linkedin: '#0077B5'
  };

  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <div className="activity-list">
        {messages.map((msg) => (
          <div key={msg.id} className="activity-item">
            <div 
              className="activity-badge"
              style={{ backgroundColor: platformColors[msg.platform] }}
            >
              {msg.platform[0].toUpperCase()}
            </div>
            <div className="activity-content">
              <div className="activity-header">
                <span className="activity-from">{msg.from}</span>
                <span className="activity-time">
                  {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                </span>
              </div>
              <p className="activity-message">{msg.message}</p>
            </div>
            {!msg.read && <span className="unread-dot"></span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
