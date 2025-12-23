import { formatDistanceToNow } from 'date-fns';
import { useInboxStore } from '../../stores/inboxStore';
import toast from 'react-hot-toast';
import './InboxList.css';

function InboxList() {
  const messages = useInboxStore((state) => state.messages);
  const markAsRead = useInboxStore((state) => state.markAsRead);
  const deleteMessage = useInboxStore((state) => state.deleteMessage);

  const platformIcons = {
    twitter: '𝕏',
    instagram: '📷',
    linkedin: '💼'
  };

  const handleMarkAsRead = (id) => {
    markAsRead(id);
    toast.success('Marked as read');
  };

  const handleDelete = (id) => {
    deleteMessage(id);
    toast.success('Message deleted');
  };

  if (messages.length === 0) {
    return (
      <div className="empty-inbox">
        <p>📧 Your inbox is empty</p>
      </div>
    );
  }

  return (
    <div className="inbox-list">
      {messages.map((msg) => (
        <div key={msg.id} className={`inbox-item ${msg.read ? 'read' : 'unread'}`}>
          <div className="inbox-icon">{platformIcons[msg.platform]}</div>
          <div className="inbox-content">
            <div className="inbox-header">
              <span className="inbox-from">{msg.from}</span>
              <span className="inbox-time">
                {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
              </span>
            </div>
            <p className="inbox-message">{msg.message}</p>
            <div className="inbox-actions">
              {!msg.read && (
                <button 
                  onClick={() => handleMarkAsRead(msg.id)}
                  className="btn-action"
                >
                  Mark as read
                </button>
              )}
              <button 
                onClick={() => handleDelete(msg.id)}
                className="btn-action btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InboxList;
