import { useTaskStore } from '../../stores/taskStore';
import './TaskFilters.css';

function TaskFilters() {
  const filters = useTaskStore((state) => state.filters);
  const categories = useTaskStore((state) => state.categories);
  const setFilter = useTaskStore((state) => state.setFilter);
  const setSorting = useTaskStore((state) => state.setSorting);
  const sortBy = useTaskStore((state) => state.sortBy);
  const sortOrder = useTaskStore((state) => state.sortOrder);

  return (
    <div className="task-filters">
      <div className="filter-group">
        <label>Search</label>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Status</label>
        <select
          value={filters.status}
          onChange={(e) => setFilter('status', e.target.value)}
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Priority</label>
        <select
          value={filters.priority}
          onChange={(e) => setFilter('priority', e.target.value)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Category</label>
        <select
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSorting(e.target.value, sortOrder)}
        >
          <option value="createdAt">Created Date</option>
          <option value="updatedAt">Updated Date</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Order</label>
        <select
          value={sortOrder}
          onChange={(e) => setSorting(sortBy, e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilters;
