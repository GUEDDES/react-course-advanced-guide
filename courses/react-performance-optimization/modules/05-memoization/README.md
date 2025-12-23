# Module 5: Memoization Techniques

## 🎯 Learning Objectives

- ✅ Master React.memo
- ✅ Optimize with useMemo
- ✅ Optimize with useCallback
- ✅ Know when NOT to memoize
- ✅ Measure memoization impact

---

## 📖 The Memoization Trinity

| Hook/HOC | Purpose | Returns |
|----------|---------|----------|
| **React.memo** | Memoize component | Memoized component |
| **useMemo** | Memoize value | Memoized value |
| **useCallback** | Memoize function | Memoized function |

---

## 💻 React.memo Deep Dive

### Problem: Unnecessary Re-renders

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <ExpensiveChild name="John" /> {/* Re-renders on every count change! */}
    </div>
  );
}

function ExpensiveChild({ name }) {
  console.log('ExpensiveChild rendered');
  // Expensive rendering logic
  return <div>Hello {name}</div>;
}
```

### Solution: React.memo

```jsx
const ExpensiveChild = React.memo(function ExpensiveChild({ name }) {
  console.log('ExpensiveChild rendered');
  return <div>Hello {name}</div>;
});

// Now only re-renders when 'name' prop changes!
```

### Advanced: Custom Comparison

```jsx
const UserCard = React.memo(
  function UserCard({ user, onUpdate }) {
    return (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={() => onUpdate(user.id)}>Update</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Return true to SKIP re-render
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name
    );
    // Ignore onUpdate changes
  }
);
```

---

## ⚡ useMemo Best Practices

### ✅ Good Use Cases

```jsx
// ✅ Expensive calculations
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}, [users]);

// ✅ Filtered/mapped data
const activeUsers = useMemo(() => {
  return users.filter(u => u.active);
}, [users]);

// ✅ Object/array for props (to prevent re-renders)
const config = useMemo(() => ({
  theme: 'dark',
  language: 'en'
}), []);
```

### ❌ Bad Use Cases

```jsx
// ❌ Simple calculations (overhead > benefit)
const double = useMemo(() => count * 2, [count]);
// Better: const double = count * 2;

// ❌ Premature optimization
const greeting = useMemo(() => `Hello ${name}`, [name]);
// Better: const greeting = `Hello ${name}`;
```

---

## 🆕 useCallback Patterns

### Pattern 1: Event Handlers

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []); // No dependencies!

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete} // Same function reference
        />
      ))}
    </div>
  );
}

const TodoItem = React.memo(({ todo, onDelete }) => {
  return (
    <div>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});
```

### Pattern 2: Dependencies Management

```jsx
function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = useCallback(async () => {
    const data = await fetch(`/api/search?q=${query}`);
    setResults(await data.json());
  }, [query]); // Re-create when query changes

  useEffect(() => {
    const timer = setTimeout(search, 500);
    return () => clearTimeout(timer);
  }, [search]); // Won't cause infinite loop!

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>
    </div>
  );
}
```

---

## 📊 Performance Measurements

### Measuring Impact

```jsx
import { useRef } from 'react';

function Component() {
  const renderCount = useRef(0);
  renderCount.current++;

  const startTime = performance.now();
  
  // Your component logic
  
  const endTime = performance.now();
  console.log(`Render #${renderCount.current}: ${endTime - startTime}ms`);

  return <div>Content</div>;
}
```

### Before/After Comparison

```jsx
// BEFORE memoization
// Render #1: 45ms
// Render #2: 42ms (parent count changed)
// Render #3: 44ms (parent count changed)
// Total: 131ms for 3 renders

// AFTER memoization
// Render #1: 45ms
// (Skipped renders #2, #3 - props didn't change)
// Total: 45ms for 3 parent renders
// Improvement: 66% faster!
```

---

## 🏋️ Complete Example

```jsx
import { useState, useMemo, useCallback, memo } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Memoize filtered list
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  // ✅ Memoize callbacks
  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false
    }]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  // ✅ Memoize theme config
  const theme = useMemo(() => ({
    background: darkMode ? '#222' : '#fff',
    color: darkMode ? '#fff' : '#222'
  }), [darkMode]);

  return (
    <div style={theme}>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
      
      <TodoInput onAdd={addTodo} />
      
      <FilterButtons filter={filter} setFilter={setFilter} />
      
      <TodoList todos={filteredTodos} onToggle={toggleTodo} />
    </div>
  );
}

// ✅ Memoize components
const TodoInput = memo(function TodoInput({ onAdd }) {
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button>Add</button>
    </form>
  );
});

const TodoList = memo(function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});

const TodoItem = memo(function TodoItem({ todo, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {todo.text}
    </li>
  );
});
```

---

## ⏭️ Next Module

[Virtual Lists →](../06-virtual-lists/README.md)
