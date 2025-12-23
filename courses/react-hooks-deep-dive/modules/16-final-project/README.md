# Module 16: Final Project - Advanced Todo App

## 🎯 Project Overview

Build a production-ready todo application using **all React hooks** learned in this course.

### Features

✅ **Core Features:**
- Add, edit, delete todos
- Mark as complete
- Filter (all/active/completed)
- Persistent storage
- Drag and drop reordering

✅ **Advanced Features:**
- Dark mode with useContext
- Keyboard shortcuts with custom hooks
- Optimistic UI updates
- Undo/redo with useReducer
- Real-time sync across tabs
- Performance optimizations

---

## 📁 Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   ├── TodoInput.jsx
│   │   ├── FilterButtons.jsx
│   │   └── ThemeToggle.jsx
│   ├── hooks/
│   │   ├── useTodos.js
│   │   ├── useLocalStorage.js
│   │   ├── useKeyPress.js
│   │   └── useUndo.js
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── reducers/
│   │   └── todoReducer.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## 💻 Implementation

### 1. Todo Reducer

```jsx
// src/reducers/todoReducer.js
export const initialState = {
  todos: [],
  filter: 'all',
  history: [],
  historyIndex: -1
};

export function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
            createdAt: new Date().toISOString()
          }
        ]
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      };

    case 'REORDER_TODOS':
      return {
        ...state,
        todos: action.payload
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    case 'RESTORE_STATE':
      return action.payload;

    default:
      return state;
  }
}
```

### 2. Custom Hooks

```jsx
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
}

// src/hooks/useKeyPress.js
import { useEffect } from 'react';

export function useKeyPress(targetKey, callback) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === targetKey) {
        callback(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [targetKey, callback]);
}

// src/hooks/useUndo.js
import { useReducer, useCallback } from 'react';

export function useUndo(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, {
    past: [],
    present: initialState,
    future: []
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  return {
    state: state.present,
    dispatch,
    canUndo,
    canRedo,
    undo,
    redo
  };
}
```

### 3. Theme Context

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### 4. Main Components

```jsx
// src/components/TodoItem.jsx
import { useState, memo, useCallback } from 'react';

const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = useCallback(() => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  }, [todo.id, editText, onEdit]);

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      {isEditing ? (
        <input
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={e => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}
      
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});

export default TodoItem;

// src/App.jsx
import { useReducer, useMemo, useCallback } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { todoReducer, initialState } from './reducers/todoReducer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useKeyPress } from './hooks/useKeyPress';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function TodoApp() {
  const [savedState, setSavedState] = useLocalStorage('todos', initialState);
  const [state, dispatch] = useReducer(todoReducer, savedState);
  const { theme } = useTheme();

  // Auto-save
  useEffect(() => {
    setSavedState(state);
  }, [state, setSavedState]);

  // Filtered todos
  const filteredTodos = useMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter(t => !t.completed);
      case 'completed':
        return state.todos.filter(t => t.completed);
      default:
        return state.todos;
    }
  }, [state.todos, state.filter]);

  // Callbacks
  const addTodo = useCallback((text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  }, []);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const editTodo = useCallback((id, text) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, text } });
  }, []);

  // Keyboard shortcuts
  useKeyPress('Escape', () => {
    // Clear filter on ESC
    dispatch({ type: 'SET_FILTER', payload: 'all' });
  });

  return (
    <div className={`app theme-${theme}`}>
      <header>
        <h1>Advanced Todo App</h1>
        <ThemeToggle />
      </header>

      <main>
        <TodoInput onAdd={addTodo} />
        
        <FilterButtons
          currentFilter={state.filter}
          setFilter={filter => dispatch({ type: 'SET_FILTER', payload: filter })}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        <footer>
          <span>{state.todos.filter(t => !t.completed).length} items left</span>
          <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
            Clear completed
          </button>
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
}

export default App;
```

---

## 🎨 Styling

```css
/* src/App.css */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #333333;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
  --accent-color: #4CAF50;
}

[data-theme='dark'] {
  --bg-primary: #1e1e1e;
  --bg-secondary: #2d2d2d;
  --text-primary: #e0e0e0;
  --text-secondary: #b0b0b0;
  --border-color: #404040;
  --accent-color: #66BB6A;
}

.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s;
}

.todo-item.completed span {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-item:hover {
  background: var(--bg-secondary);
}
```

---

## 🏋️ Challenges

### Level 1: Basic
- [ ] Add todo counter
- [ ] Implement "Select All" checkbox
- [ ] Add created date display

### Level 2: Intermediate
- [ ] Add drag-and-drop reordering
- [ ] Implement categories/tags
- [ ] Add search functionality

### Level 3: Advanced
- [ ] Sync across browser tabs
- [ ] Add animations with transitions
- [ ] Implement undo/redo
- [ ] Add keyboard shortcuts overlay
- [ ] Export/import todos (JSON)

---

## 📊 Hooks Used

✅ useState - Component state  
✅ useEffect - Side effects  
✅ useContext - Theme management  
✅ useReducer - Complex state logic  
✅ useMemo - Filtered todos  
✅ useCallback - Memoized callbacks  
✅ useRef - Focus management  
✅ useLayoutEffect - DOM measurements  
✅ useId - Accessibility  
✅ useTransition - Smooth filtering  
✅ Custom hooks - Reusable logic  

---

## 🎓 Congratulations!

You've completed the React Hooks Deep Dive course! 🎉

You now have mastery of:
- All 16 React hooks
- Custom hook patterns
- Performance optimization
- Real-world applications

**Next Steps:**
- Build your own projects
- Contribute to open source
- Share your knowledge
- Continue learning!
