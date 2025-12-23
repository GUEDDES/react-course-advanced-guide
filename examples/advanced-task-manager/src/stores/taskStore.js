import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const PRIORITY_LEVELS = {
  low: 1,
  medium: 2,
  high: 3,
  urgent: 4
};

export const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      categories: ['Work', 'Personal', 'Shopping', 'Health'],
      filters: {
        search: '',
        status: 'all',
        priority: 'all',
        category: 'all',
        assignedTo: 'all'
      },
      sortBy: 'createdAt',
      sortOrder: 'desc',

      // Actions
      addTask: (taskData) => set((state) => ({
        tasks: [
          ...state.tasks,
          {
            id: uuidv4(),
            title: taskData.title,
            description: taskData.description || '',
            status: 'todo',
            priority: taskData.priority || 'medium',
            category: taskData.category || 'Personal',
            assignedTo: taskData.assignedTo || null,
            dueDate: taskData.dueDate || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            comments: [],
            tags: taskData.tags || []
          }
        ]
      })),

      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id
            ? { 
                ...task, 
                ...updates, 
                updatedAt: new Date().toISOString() 
              }
            : task
        )
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id)
      })),

      toggleTaskStatus: (id) => set((state) => ({
        tasks: state.tasks.map((task) => {
          if (task.id !== id) return task;
          
          const statusFlow = {
            todo: 'in-progress',
            'in-progress': 'done',
            done: 'todo'
          };
          
          return {
            ...task,
            status: statusFlow[task.status],
            updatedAt: new Date().toISOString()
          };
        })
      })),

      addComment: (taskId, comment) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                comments: [
                  ...task.comments,
                  {
                    id: uuidv4(),
                    text: comment,
                    createdAt: new Date().toISOString(),
                    author: 'Current User'
                  }
                ]
              }
            : task
        )
      })),

      reorderTasks: (startIndex, endIndex) => set((state) => {
        const filteredTasks = get().getFilteredTasks();
        const result = Array.from(filteredTasks);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        
        return { tasks: result };
      }),

      setFilter: (filterType, value) => set((state) => ({
        filters: { ...state.filters, [filterType]: value }
      })),

      setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),

      addCategory: (category) => set((state) => ({
        categories: [...state.categories, category]
      })),

      // Computed values
      getFilteredTasks: () => {
        const { tasks, filters, sortBy, sortOrder } = get();
        
        let filtered = tasks.filter((task) => {
          if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
          }
          if (filters.status !== 'all' && task.status !== filters.status) {
            return false;
          }
          if (filters.priority !== 'all' && task.priority !== filters.priority) {
            return false;
          }
          if (filters.category !== 'all' && task.category !== filters.category) {
            return false;
          }
          if (filters.assignedTo !== 'all' && task.assignedTo !== filters.assignedTo) {
            return false;
          }
          return true;
        });

        // Sorting
        filtered.sort((a, b) => {
          let comparison = 0;
          
          if (sortBy === 'priority') {
            comparison = PRIORITY_LEVELS[b.priority] - PRIORITY_LEVELS[a.priority];
          } else if (sortBy === 'dueDate') {
            const dateA = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
            const dateB = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
            comparison = dateA - dateB;
          } else {
            comparison = new Date(b[sortBy]) - new Date(a[sortBy]);
          }
          
          return sortOrder === 'asc' ? -comparison : comparison;
        });

        return filtered;
      },

      getStatistics: () => {
        const { tasks } = get();
        
        return {
          total: tasks.length,
          todo: tasks.filter((t) => t.status === 'todo').length,
          inProgress: tasks.filter((t) => t.status === 'in-progress').length,
          done: tasks.filter((t) => t.status === 'done').length,
          highPriority: tasks.filter((t) => t.priority === 'high' || t.priority === 'urgent').length,
          overdue: tasks.filter((t) => {
            if (!t.dueDate) return false;
            return new Date(t.dueDate) < new Date() && t.status !== 'done';
          }).length
        };
      },

      getCategoryStats: () => {
        const { tasks } = get();
        const stats = {};
        
        tasks.forEach((task) => {
          if (!stats[task.category]) {
            stats[task.category] = { total: 0, done: 0 };
          }
          stats[task.category].total++;
          if (task.status === 'done') {
            stats[task.category].done++;
          }
        });
        
        return stats;
      },

      exportTasks: (format = 'json') => {
        const { tasks } = get();
        
        if (format === 'json') {
          return JSON.stringify(tasks, null, 2);
        }
        
        if (format === 'csv') {
          const headers = ['ID', 'Title', 'Status', 'Priority', 'Category', 'Due Date'];
          const rows = tasks.map((t) => [
            t.id,
            t.title,
            t.status,
            t.priority,
            t.category,
            t.dueDate || 'N/A'
          ]);
          
          return [
            headers.join(','),
            ...rows.map((row) => row.join(','))
          ].join('\n');
        }
      }
    }),
    {
      name: 'task-storage',
      version: 1
    }
  )
);
