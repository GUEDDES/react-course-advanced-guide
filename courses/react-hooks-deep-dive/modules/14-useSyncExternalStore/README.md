# Module 14: useSyncExternalStore - External State Sync

## 🎯 Learning Objectives

- ✅ Understand external stores
- ✅ Subscribe to external state
- ✅ Handle concurrent rendering
- ✅ Build custom stores
- ✅ Integrate third-party stores

---

## 📖 What is useSyncExternalStore?

Subscribes to external data stores in a way that's safe for concurrent rendering.

```jsx
const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);
```

**Parameters:**
- `subscribe`: Function to subscribe to the store
- `getSnapshot`: Returns current snapshot of data
- `getServerSnapshot`: (Optional) Returns server snapshot

---

## 💻 Basic Example

### Simple Store

```jsx
import { useSyncExternalStore } from 'react';

// External store
let count = 0;
let listeners = [];

const store = {
  subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return count;
  },
  increment() {
    count++;
    listeners.forEach(l => l());
  },
  decrement() {
    count--;
    listeners.forEach(l => l());
  }
};

// Component
function Counter() {
  const count = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={store.increment}>+</button>
      <button onClick={store.decrement}>-</button>
    </div>
  );
}
```

---

## 🎨 Real-World Examples

### Example 1: Window Dimensions

```jsx
import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

function getServerSnapshot() {
  return { width: 0, height: 0 };
}

function useWindowSize() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}

// Usage
function App() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window size: {width} x {height}</p>
      {width < 768 ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

### Example 2: Online Status

```jsx
import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true; // Assume online on server
}

function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}

// Usage
function StatusIndicator() {
  const isOnline = useOnlineStatus();

  return (
    <div className={isOnline ? 'online' : 'offline'}>
      {isOnline ? '🟢 Online' : '🔴 Offline'}
    </div>
  );
}
```

### Example 3: Custom Store

```jsx
import { useSyncExternalStore } from 'react';

class TodoStore {
  constructor() {
    this.todos = [];
    this.listeners = new Set();
  }

  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => {
    return this.todos;
  };

  addTodo(text) {
    this.todos = [...this.todos, { id: Date.now(), text, completed: false }];
    this.notifyListeners();
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.notifyListeners();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.notifyListeners();
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

const todoStore = new TodoStore();

function useTodos() {
  return useSyncExternalStore(
    todoStore.subscribe,
    todoStore.getSnapshot
  );
}

// Usage
function TodoApp() {
  const todos = useTodos();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      todoStore.addTodo(input);
      setInput('');
    }
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => todoStore.toggleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => todoStore.deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Example 4: Local Storage Sync

```jsx
import { useSyncExternalStore } from 'react';

function createLocalStorageStore(key, initialValue) {
  let listeners = [];

  // Listen to storage events from other tabs
  window.addEventListener('storage', (e) => {
    if (e.key === key) {
      listeners.forEach(l => l());
    }
  });

  return {
    subscribe(listener) {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    },
    getSnapshot() {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    },
    getServerSnapshot() {
      return initialValue;
    },
    setValue(value) {
      localStorage.setItem(key, JSON.stringify(value));
      listeners.forEach(l => l());
    }
  };
}

const themeStore = createLocalStorageStore('theme', 'light');

function useTheme() {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );

  return [theme, themeStore.setValue];
}

// Usage - syncs across tabs!
function ThemeToggle() {
  const [theme, setTheme] = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  );
}
```

---

## 🏋️ Exercises

### Exercise 1: Mouse Position Tracker

Track mouse position globally.

**Requirements:**
- Subscribe to mousemove
- Return { x, y }
- Clean up listeners
- Handle SSR

### Exercise 2: Media Query Hook

Create `useMediaQuery` hook.

**Requirements:**
- Subscribe to matchMedia
- Return boolean
- Support multiple queries
- SSR-safe

### Exercise 3: WebSocket Store

Build real-time data store.

**Requirements:**
- WebSocket connection
- Auto-reconnect
- Message handling
- State synchronization

---

## ⏭️ Next Module

[Custom Hooks Advanced →](../15-custom-hooks-advanced/README.md)
