# Module 6: React.memo - Component Memoization

## 🎯 Learning Objectives

- ✅ Understand React.memo
- ✅ Prevent unnecessary re-renders
- ✅ Use custom comparison functions
- ✅ Know when NOT to use it
- ✅ Combine with useMemo/useCallback

---

## 📖 What is React.memo?

React.memo is a higher-order component that memoizes a component, preventing re-renders if props haven't changed.

```jsx
const MemoizedComponent = React.memo(Component);
```

---

## 💻 Basic Usage

### Example 1: Without React.memo

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  console.log('Parent rendered');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <input value={name} onChange={e => setName(e.target.value)} />
      
      {/* ❌ Child re-renders even when its props don't change */}
      <Child name="Alice" />
    </div>
  );
}

function Child({ name }) {
  console.log('Child rendered');
  return <h1>Hello {name}</h1>;
}

// Result: Child renders every time Parent renders
```

### Example 2: With React.memo

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <input value={name} onChange={e => setName(e.target.value)} />
      
      {/* ✅ Child only re-renders when name prop changes */}
      <MemoizedChild name="Alice" />
    </div>
  );
}

const MemoizedChild = React.memo(function Child({ name }) {
  console.log('Child rendered');
  return <h1>Hello {name}</h1>;
});

// Result: Child only renders once (props never change)
```

---

## 🔄 Custom Comparison Function

### Default Behavior (Shallow Comparison)

```jsx
const MemoizedComponent = React.memo(Component);
// Equivalent to:
// if (prevProps === nextProps) skip render
```

### Custom Comparison

```jsx
const MemoizedUser = React.memo(
  function User({ user }) {
    return (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Return true to SKIP re-render
    // Return false to re-render
    return prevProps.user.id === nextProps.user.id;
  }
);

// Usage
function App() {
  const [user, setUser] = useState({ id: 1, name: 'John', lastSeen: Date.now() });

  useEffect(() => {
    // Update lastSeen every second
    const interval = setInterval(() => {
      setUser(prev => ({ ...prev, lastSeen: Date.now() }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // User component won't re-render because ID hasn't changed
  return <MemoizedUser user={user} />;
}
```

---

## 💪 Real-World Examples

### Example 1: Expensive List Item

```jsx
import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build app', completed: false },
    { id: 3, text: 'Deploy', completed: false }
  ]);
  const [filter, setFilter] = useState('all');

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('active')}>Active</button>
      
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
        />
      ))}
    </div>
  );
}

// ✅ Only re-renders when todo or onToggle changes
const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
  console.log(`Rendering todo ${todo.id}`);
  
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
    </div>
  );
});
```

### Example 2: Heavy Computation Component

```jsx
import React from 'react';

const ExpensiveChart = React.memo(function ExpensiveChart({ data }) {
  console.log('Rendering chart with', data.length, 'points');
  
  // Expensive calculation
  const processedData = data.map(point => ({
    ...point,
    normalized: point.value / Math.max(...data.map(p => p.value))
  }));

  return (
    <div className="chart">
      {processedData.map((point, i) => (
        <div
          key={i}
          className="bar"
          style={{ height: `${point.normalized * 100}%` }}
        />
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if data length or values changed
  if (prevProps.data.length !== nextProps.data.length) return false;
  
  return prevProps.data.every((point, i) => 
    point.value === nextProps.data[i].value
  );
});
```

### Example 3: With useCallback

```jsx
import React, { useState, useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // ✅ Memoized callback - same function reference
  const handleAddItem = useCallback((item) => {
    setItems(prev => [...prev, item]);
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      
      {/* ✅ Won't re-render when count changes */}
      <AddItemForm onAdd={handleAddItem} />
    </div>
  );
}

const AddItemForm = React.memo(function AddItemForm({ onAdd }) {
  const [text, setText] = useState('');
  
  console.log('AddItemForm rendered');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
});
```

---

## ⚠️ When NOT to Use React.memo

### ❌ Mistake 1: Memoizing Everything

```jsx
// ❌ Don't memoize simple components
const Button = React.memo(({ label }) => <button>{label}</button>);

// ✅ Just use regular component
function Button({ label }) {
  return <button>{label}</button>;
}
```

### ❌ Mistake 2: Props Always Change

```jsx
// ❌ Useless - object/array created on every render
function Parent() {
  return <Child data={{ name: 'John' }} />;
}

const Child = React.memo(({ data }) => <div>{data.name}</div>);

// ✅ Memoize the prop
function Parent() {
  const data = useMemo(() => ({ name: 'John' }), []);
  return <Child data={data} />;
}
```

### ❌ Mistake 3: Function Props Not Memoized

```jsx
// ❌ New function on every render
function Parent() {
  return <Child onClick={() => console.log('clicked')} />;
}

const Child = React.memo(({ onClick }) => <button onClick={onClick}>Click</button>);

// ✅ Memoize the function
function Parent() {
  const handleClick = useCallback(() => console.log('clicked'), []);
  return <Child onClick={handleClick} />;
}
```

---

## 📊 Performance Comparison

```jsx
import React, { useState, useRef } from 'react';

function PerformanceDemo() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  const memoRenderCount = useRef(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Force Re-render ({count})
      </button>

      <RegularChild renderCount={renderCount} />
      <MemoizedChild renderCount={memoRenderCount} />
    </div>
  );
}

function RegularChild({ renderCount }) {
  renderCount.current++;
  return <div>Regular: Rendered {renderCount.current} times</div>;
}

const MemoizedChild = React.memo(function MemoizedChild({ renderCount }) {
  renderCount.current++;
  return <div>Memoized: Rendered {renderCount.current} times</div>;
});

// Result after 10 parent renders:
// Regular: Rendered 10 times
// Memoized: Rendered 1 time
```

---

## 🏋️ Exercises

### Exercise 1: Optimize Product List

```jsx
function ProductList({ products, onAddToCart }) {
  return (
    <div>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

// TODO: Optimize ProductCard to prevent unnecessary re-renders
```

### Exercise 2: Complex Form

Optimize a multi-step form with React.memo.

**Requirements:**
- 3 steps with different fields
- Only active step should re-render
- Navigation buttons memoized

---

## 🎓 Quiz

1. What does React.memo do?
2. When should you use a custom comparison function?
3. Does React.memo work with hooks?
4. What's the difference from useMemo?
5. Can you memo a component with children?

**[View Solutions](./solutions/README.md)**

---

## ⏭️ Next Module

[useRef - References Hook →](../07-useRef/README.md)
