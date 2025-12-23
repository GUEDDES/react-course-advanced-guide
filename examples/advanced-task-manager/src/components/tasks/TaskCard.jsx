import { format } from 'date-fns';
import './TaskCard.css';

function TaskCard({ task, onToggle, onDelete }) {
  const priorityColors = {
    low: '#4ade80',
    medium: '#fbbf24',
    high: '#fb923c',
    urgent: '#ef4444'
  };

  const statusLabels = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'done': 'Done'
  };

  return (
    <div className={`task-card status-${task.status}`}>
      <div className="task-header">
        <div className="task-info">
          <h3 className="task-title">{task.title}</h3>
          <span className="task-category">{task.category}</span>
        </div>
        <div className="task-actions">
          <button onClick={onToggle} className="btn-icon" title="Change status">
            ✓
          </button>
          <button onClick={onDelete} className="btn-icon btn-danger" title="Delete">
            🗑️
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span 
          className="task-priority" 
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
        <span className="task-status">{statusLabels[task.status]}</span>
        {task.dueDate && (
          <span className="task-due-date">
            📅 {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </span>
        )}
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="task-tags">
          {task.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
      )}

      {task.comments && task.comments.length > 0 && (
        <div className="task-comments">
          💬 {task.comments.length} comment{task.comments.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default TaskCard;
