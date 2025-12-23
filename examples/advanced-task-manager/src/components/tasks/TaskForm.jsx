import { useState } from 'react';
import { useTaskStore } from '../../stores/taskStore';
import toast from 'react-hot-toast';
import './TaskForm.css';

function TaskForm({ onClose }) {
  const addTask = useTaskStore((state) => state.addTask);
  const categories = useTaskStore((state) => state.categories);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: categories[0],
    dueDate: '',
    tags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    const taskData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    addTask(taskData);
    toast.success('Task created successfully!');
    onClose?.();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create New Task</h2>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="4"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g., important, urgent"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Create Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
