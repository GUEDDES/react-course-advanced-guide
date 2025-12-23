# React.memo - Component Memoization

## 🎯 Learning Objectives

- ✅ Understand React.memo
- ✅ Prevent unnecessary re-renders
- ✅ Use custom comparison functions
- ✅ Combine with useMemo/useCallback
- ✅ Know when NOT to use it

---

## 📖 What is React.memo?

React.memo is a higher-order component that memoizes component output, preventing re-renders when props haven't changed.

```jsx
const MemoizedComponent = React.memo(Component);
```

---

## 💻 Basic Examples

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
      <Child name={name} />
    </div>
  );
}

function Child({ name }) {
  console.log('Child rendered'); // Renders even when only count changes!
  return <div>Hello {name}</div>;
}
```

**Problem:** Child re-renders when count changes, even though its props didn't change.

### Example 2: With React.memo

```jsx
const MemoizedChild = React.memo(function Child({ name }) {
  console.log('Child rendered'); // Only renders when name changes
  return <div>Hello {name}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedChild name={name} />
    </div>
  );
}
```

---

## 🎯 Custom Comparison Function

### Example 3: Custom areEqual

```jsx
function User({ user, lastUpdated }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <small>Updated: {lastUpdated}</small>
    </div>
  );
}

// Only re-render if user.id changed
const MemoizedUser = React.memo(
  User,
  (prevProps, nextProps) => {
    // Return true if props are equal (skip render)
    return prevProps.user.id === nextProps.user.id;
  }
);

// Usage
function UserList() {
  const [users, setUsers] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  return (
    <div>
      {users.map(user => (
        <MemoizedUser 
          key={user.id} 
          user={user} 
          lastUpdated={lastUpdated} // Changes don't trigger re-render!
        />
      ))}
    </div>
  );
}
```

---

## ⚡ Combining with Hooks

### Example 4: React.memo + useCallback

```jsx
import { useState, useCallback } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // ✅ Memoize callback
  const toggleTodo = useCallback((id) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <FilterButtons filter={filter} setFilter={setFilter} />
      {todos.map(todo => (
        <MemoizedTodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  );
}

// ✅ Memoize component
const MemoizedTodoItem = React.memo(function TodoItem({ todo, onToggle, onDelete }) {
  console.log('TodoItem rendered:', todo.id);
  
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});
```

### Example 5: React.memo + useMemo

```jsx
import { useMemo } from 'react';

function ProductList({ products, category }) {
  // ✅ Memoize filtered data
  const filteredProducts = useMemo(
    () => products.filter(p => p.category === category),
    [products, category]
  );

  return (
    <div>
      {filteredProducts.map(product => (
        <MemoizedProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ✅ Memoize component
const MemoizedProductCard = React.memo(function ProductCard({ product }) {
  // ✅ Memoize expensive calculation
  const discount = useMemo(
    () => calculateDiscount(product),
    [product]
  );

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      {discount > 0 && <span>Save {discount}%</span>}
    </div>
  );
});
```

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Inline Objects

```jsx
// ❌ Wrong - new object on every render
function Parent() {
  return <MemoizedChild user={{ name: 'John', age: 25 }} />;
}

// ✅ Correct - memoize object
function Parent() {
  const user = useMemo(() => ({ name: 'John', age: 25 }), []);
  return <MemoizedChild user={user} />;
}
```

### ❌ Mistake 2: Inline Functions

```jsx
// ❌ Wrong - new function on every render
function Parent() {
  return <MemoizedChild onClick={() => console.log('click')} />;
}

// ✅ Correct - memoize function
function Parent() {
  const handleClick = useCallback(() => console.log('click'), []);
  return <MemoizedChild onClick={handleClick} />;
}
```

### ❌ Mistake 3: Overusing React.memo

```jsx
// ❌ Unnecessary - simple component, rarely re-renders
const MemoizedButton = React.memo(function Button({ label }) {
  return <button>{label}</button>;
});

// ✅ Better - direct component
function Button({ label }) {
  return <button>{label}</button>;
}
```

---

## 📊 Performance Comparison

```jsx
import { useState, useRef } from 'react';

function PerformanceDemo() {
  const [count, setCount] = useState(0);
  const renderCount = useRef({ regular: 0, memoized: 0 });

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Re-render Parent</button>
      <p>Parent renders: {count}</p>
      
      <h3>Regular Component</h3>
      <RegularChild renderCount={renderCount} type="regular" />
      
      <h3>Memoized Component</h3>
      <MemoizedChild renderCount={renderCount} type="memoized" />
    </div>
  );
}

function RegularChild({ renderCount, type }) {
  renderCount.current[type]++;
  return <p>Renders: {renderCount.current[type]}</p>;
}

const MemoizedChild = React.memo(RegularChild);
```

**Result:** Memoized component renders once, regular renders every time.

---

## 🎯 When to Use React.memo

### ✅ Good Use Cases

1. **Expensive components** (complex calculations, many children)
2. **Components that render often** with same props
3. **List items** in large lists
4. **Pure components** (output depends only on props)

### ❌ Avoid When

1. **Props change frequently**
2. **Simple components** (overhead > benefit)
3. **Already optimized** parent
4. **Premature optimization**

---

## 🏋️ Exercises

### Exercise 1: Optimize List
Optimize a list of 1000 items.

**Requirements:**
- Use React.memo
- Memoize callbacks
- Measure render count
- Compare performance

### Exercise 2: Dashboard Widgets
Optimize dashboard with multiple widgets.

**Requirements:**
- Independent widget updates
- Memoize expensive calculations
- Prevent cascade re-renders

### Exercise 3: Form Fields
Optimize form with many fields.

**Requirements:**
- Field-level memoization
- Optimize validation
- Track render counts

---

## 📚 Key Takeaways

1. React.memo prevents re-renders when props are equal
2. Use with useCallback/useMemo for best results
3. Custom comparison for complex props
4. Don't overuse - measure first!
5. Shallow comparison by default

---

## ➡️ Next Module

[useRef - References Hook →](../07-useRef/README.md)
