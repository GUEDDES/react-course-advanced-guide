import { useInboxStore } from '../stores/inboxStore';
import InboxList from '../components/inbox/InboxList';
import './InboxPage.css';

function InboxPage() {
  const unreadCount = useInboxStore((state) => state.getUnreadCount());

  return (
    <div className="inbox-page">
      <div className="page-header">
        <h1>Inbox</h1>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount} unread</span>
        )}
      </div>
      <InboxList />
    </div>
  );
}

export default InboxPage;
