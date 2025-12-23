# Module 16: Final Project - Full Stack Task Manager

## 🎯 Project Overview

Build a complete task management application using all hooks learned in this course.

**Features:**
- ✅ User authentication
- ✅ Real-time updates
- ✅ Drag & drop tasks
- ✅ Filters and search
- ✅ Dark mode
- ✅ Offline support
- ✅ Performance optimized

---

## 🏗️ Architecture

```
src/
├── hooks/
│   ├── useAuth.js
│   ├── useTasks.js
│   ├── useWebSocket.js
│   ├── useLocalStorage.js
│   ├── useTheme.js
│   └── useInfiniteScroll.js
├── components/
│   ├── Auth/
│   ├── TaskList/
│   ├── TaskItem/
│   ├── TaskForm/
│   └── Layout/
├── contexts/
│   ├── AuthContext.jsx
│   ├── TaskContext.jsx
│   └── ThemeContext.jsx
├── utils/
│   ├── api.js
│   └── storage.js
└── App.jsx
```

---

## 📝 Step-by-Step Implementation

### Step 1: Authentication System

```jsx
// hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useAuth() {
  const [user, setUser] = useLocalStorage('user', null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
  }, [setUser]);

  const register = useCallback(async (email, password, name) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      
      if (!response.ok) throw new Error('Registration failed');
      
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.json())
        .then(data => setUser(data.user))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, login, logout, register };
}
```

### Step 2: Task Management

```jsx
// hooks/useTasks.js
import { useReducer, useCallback, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const initialState = {
  tasks: [],
  filter: 'all',
  sort: 'created',
  loading: false,
  error: null
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
}

export function useTasks() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { sendMessage } = useWebSocket('/ws/tasks');

  const fetchTasks = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      dispatch({ type: 'SET_TASKS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  const addTask = useCallback(async (task) => {
    const optimisticTask = { ...task, id: Date.now(), createdAt: new Date() };
    dispatch({ type: 'ADD_TASK', payload: optimisticTask });
    
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      
      const newTask = await response.json();
      dispatch({ type: 'UPDATE_TASK', payload: newTask });
      sendMessage({ type: 'TASK_ADDED', payload: newTask });
    } catch (error) {
      dispatch({ type: 'DELETE_TASK', payload: optimisticTask.id });
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [sendMessage]);

  const updateTask = useCallback(async (id, updates) => {
    const originalTask = state.tasks.find(t => t.id === id);
    dispatch({ type: 'UPDATE_TASK', payload: { ...originalTask, ...updates } });
    
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      const updated = await response.json();
      dispatch({ type: 'UPDATE_TASK', payload: updated });
      sendMessage({ type: 'TASK_UPDATED', payload: updated });
    } catch (error) {
      dispatch({ type: 'UPDATE_TASK', payload: originalTask });
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [state.tasks, sendMessage]);

  const deleteTask = useCallback(async (id) => {
    const task = state.tasks.find(t => t.id === id);
    dispatch({ type: 'DELETE_TASK', payload: id });
    
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      sendMessage({ type: 'TASK_DELETED', payload: id });
    } catch (error) {
      dispatch({ type: 'ADD_TASK', payload: task });
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [state.tasks, sendMessage]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    setFilter: (filter) => dispatch({ type: 'SET_FILTER', payload: filter }),
    setSort: (sort) => dispatch({ type: 'SET_SORT', payload: sort })
  };
}
```

### Step 3: Main Application

```jsx
// App.jsx
import { Suspense, lazy } from 'react';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { TaskProvider } from './contexts/TaskContext';
import { Header } from './components/Layout/Header';
import { Loading } from './components/Loading';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`app theme-${theme}`}>
      <Header />
      
      <Suspense fallback={<Loading />}>
        {user ? (
          <TaskProvider>
            <Dashboard />
          </TaskProvider>
        ) : (
          <Login />
        )}
      </Suspense>
    </div>
  );
}

export default App;
```

---

## 🎯 Requirements Checklist

### Core Functionality
- [ ] User registration and login
- [ ] Create, read, update, delete tasks
- [ ] Filter tasks (all, active, completed)
- [ ] Sort tasks (date, priority, title)
- [ ] Search tasks
- [ ] Mark tasks as complete

### Advanced Features
- [ ] Drag and drop to reorder
- [ ] Real-time collaboration (WebSocket)
- [ ] Offline support (Service Worker)
- [ ] Dark/light theme toggle
- [ ] Keyboard shortcuts
- [ ] Export/import tasks

### Performance
- [ ] Code splitting for routes
- [ ] Lazy loading components
- [ ] Memoization (React.memo, useMemo, useCallback)
- [ ] Virtual scrolling for large lists
- [ ] Debounced search
- [ ] Optimistic updates

### Testing
- [ ] Unit tests for hooks
- [ ] Component tests
- [ ] Integration tests
- [ ] E2E tests

---

## 🏆 Bonus Challenges

1. **AI Task Suggestions**: Use AI to suggest task priorities
2. **Voice Input**: Add speech-to-text for creating tasks
3. **Analytics Dashboard**: Show productivity statistics
4. **Mobile App**: React Native version
5. **Browser Extension**: Quick task creation from any page

---

## 📊 Evaluation Criteria

| Criteria | Points |
|----------|--------|
| Code quality and organization | 20 |
| Hook usage and custom hooks | 25 |
| Performance optimization | 20 |
| UI/UX design | 15 |
| Testing coverage | 10 |
| Documentation | 10 |
| **Total** | **100** |

---

## 🎓 Congratulations!

You've completed the React Hooks Deep Dive course! You now have mastery over:

- ✅ All built-in React hooks
- ✅ Custom hook patterns
- ✅ Performance optimization
- ✅ State management
- ✅ Real-world application development

### Next Steps

1. Build the final project
2. Share your project on GitHub
3. Continue with [Performance Optimization →](../../react-performance-optimization/README.md)
4. Explore [Testing Masterclass →](../../react-testing-masterclass/README.md)
5. Master [Design Patterns →](../../react-design-patterns/README.md)

---

## 📜 Certificate

Complete the final project to earn your **React Hooks Expert** certificate!
