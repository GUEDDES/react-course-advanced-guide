# Module 14: useSyncExternalStore - External State

## 🎯 Learning Objectives

- ✅ Sync with external stores
- ✅ Handle subscriptions safely
- ✅ Support concurrent rendering
- ✅ Avoid tearing issues
- ✅ Build custom stores

---

## 📖 What is useSyncExternalStore?

Subscribes to external stores in a way that's safe for concurrent rendering.

```jsx
const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);
```

**Parameters:**
- `subscribe`: Function to subscribe to store
- `getSnapshot`: Returns current store value
- `getServerSnapshot`: (Optional) Returns server snapshot for SSR

---

## 💻 Basic Example

### Creating a Store

```jsx
// store.js
let listeners = [];
let state = { count: 0 };

export const store = {
  getState() {
    return state;
  },
  
  setState(newState) {
    state = { ...state, ...newState };
    listeners.forEach(listener => listener());
  },
  
  subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }
};
```

### Using the Store

```jsx
import { useSyncExternalStore } from 'react';
import { store } from './store';

function Counter() {
  const state = useSyncExternalStore(
    store.subscribe,
    () => store.getState()
  );

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => store.setState({ count: state.count + 1 })}>
        Increment
      </button>
    </div>
  );
}
```

---

## 🎯 Real-World Examples

### Example 1: Online Status

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

### Example 2: Window Dimensions

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
function ResponsiveComponent() {
  const { width } = useWindowSize();
  
  return (
    <div>
      {width < 768 ? (
        <MobileView />
      ) : (
        <DesktopView />
      )}
    </div>
  );
}
```

### Example 3: Local Storage Sync

```jsx
import { useSyncExternalStore, useCallback } from 'react';

function useLocalStorage(key, initialValue) {
  const subscribe = useCallback((callback) => {
    const handler = (e) => {
      if (e.key === key) {
        callback();
      }
    };
    
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);

  const getSnapshot = () => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  };

  const getServerSnapshot = () => initialValue;

  const state = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setState = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    // Trigger storage event for same-tab updates
    window.dispatchEvent(new StorageEvent('storage', { key }));
  };

  return [state, setState];
}

// Usage
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  );
}
```

---

## 💪 Advanced Store Example

```jsx
// createStore.js
export function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    
    setState: (newState) => {
      state = typeof newState === 'function'
        ? newState(state)
        : { ...state, ...newState };
      listeners.forEach(listener => listener());
    },
    
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

// useStore.js
import { useSyncExternalStore, useCallback } from 'react';

export function useStore(store, selector = (state) => state) {
  const getSnapshot = useCallback(
    () => selector(store.getState()),
    [store, selector]
  );

  return useSyncExternalStore(
    store.subscribe,
    getSnapshot
  );
}

// Usage
import { createStore } from './createStore';
import { useStore } from './useStore';

const userStore = createStore({
  user: null,
  isLoading: false
});

function UserProfile() {
  const user = useStore(userStore, state => state.user);
  const isLoading = useStore(userStore, state => state.isLoading);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return <div>Welcome, {user.name}!</div>;
}

function LoginButton() {
  const login = async () => {
    userStore.setState({ isLoading: true });
    const user = await fetchUser();
    userStore.setState({ user, isLoading: false });
  };

  return <button onClick={login}>Login</button>;
}
```

---

## 🔄 Selector Optimization

```jsx
import { useSyncExternalStore, useMemo } from 'react';

// ❌ Creates new object every render - causes re-renders
function BadComponent() {
  const data = useStore(store, state => ({
    user: state.user,
    settings: state.settings
  }));
  
  return <div>{data.user.name}</div>;
}

// ✅ Stable selector - only re-renders when selected data changes
function GoodComponent() {
  const userName = useStore(store, state => state.user.name);
  
  return <div>{userName}</div>;
}

// ✅ Memoized selector for complex transformations
function OptimizedComponent({ userId }) {
  const selector = useMemo(
    () => (state) => state.users.find(u => u.id === userId),
    [userId]
  );
  
  const user = useStore(store, selector);
  
  return <div>{user?.name}</div>;
}
```

---

## 🏋️ Complete Example: Todo Store

```jsx
// todoStore.js
import { createStore } from './createStore';

export const todoStore = createStore({
  todos: [],
  filter: 'all'
});

export const todoActions = {
  addTodo: (text) => {
    todoStore.setState(state => ({
      todos: [...state.todos, {
        id: Date.now(),
        text,
        completed: false
      }]
    }));
  },
  
  toggleTodo: (id) => {
    todoStore.setState(state => ({
      todos: state.todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    }));
  },
  
  setFilter: (filter) => {
    todoStore.setState({ filter });
  }
};

// TodoList.jsx
import { useStore } from './useStore';
import { todoStore, todoActions } from './todoStore';

function TodoList() {
  const todos = useStore(todoStore, state => state.todos);
  const filter = useStore(todoStore, state => state.filter);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <FilterButtons />
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <AddTodoForm />
    </div>
  );
}

function TodoItem({ todo }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => todoActions.toggleTodo(todo.id)}
      />
      {todo.text}
    </li>
  );
}

function FilterButtons() {
  const filter = useStore(todoStore, state => state.filter);
  
  return (
    <div>
      {['all', 'active', 'completed'].map(f => (
        <button
          key={f}
          onClick={() => todoActions.setFilter(f)}
          disabled={filter === f}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
```

---

## 🏋️ Exercises

### Exercise 1: Media Query Hook

Create `useMediaQuery` hook.

**Requirements:**
- Subscribe to matchMedia
- Support SSR
- Handle multiple queries

### Exercise 2: Geolocation Store

Build location tracking store.

**Requirements:**
- Watch position
- Handle permissions
- Error states

---

## ➡️ Next Module

[Custom Hooks Advanced →](../15-custom-hooks-advanced/README.md)
