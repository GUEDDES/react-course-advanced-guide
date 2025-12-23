import { useTaskStore } from '../../stores/taskStore';
import TaskCard from './TaskCard';
import './TaskList.css';

function TaskList() {
  const tasks = useTaskStore((state) => state.getFilteredTasks());
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={() => toggleTaskStatus(task.id)}
          onDelete={() => deleteTask(task.id)}
        />
      ))}
    </div>
  );
}

export default TaskList;
