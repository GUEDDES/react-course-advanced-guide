import { useState } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskForm from '../components/tasks/TaskForm';
import Modal from '../components/common/Modal';
import './TasksPage.css';

function TasksPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>Tasks</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          + New Task
        </button>
      </div>

      <TaskFilters />
      <TaskList />

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <TaskForm onClose={() => setShowForm(false)} />
        </Modal>
      )}
    </div>
  );
}

export default TasksPage;
