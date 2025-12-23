# useCallback - Function Memoization Hook

## 🎯 Learning Objectives

- ✅ Understand useCallback
- ✅ Memoize callback functions
- ✅ Prevent unnecessary re-renders
- ✅ Optimize child components
- ✅ Know when to use it

---

## 📖 Theory

### What is useCallback?

Returns a memoized version of a callback function that only changes if dependencies change.

### useCallback vs useMemo

```javascript
// useMemo - memoizes VALUE
const value = useMemo(() => computeValue(a, b), [a, b]);

// useCallback - memoizes FUNCTION
const callback = useCallback(() => doSomething(a, b), [a, b]);

// These are equivalent:
const callback = useCallback(fn, deps);
const callback = useMemo(() => fn, deps);
```

---

## 💻 Examples

### Example 1: Basic Usage

```jsx
import { useState, useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ❌ Without useCallback - new function on every render
  // const handleClick = () => {
  //   console.log('Clicked!');
  // };

  // ✅ With useCallback - same function unless deps change
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []); // No dependencies

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}

const ExpensiveChild = React.memo(({ onClick }) => {
  console.log('ExpensiveChild rendered');
  return <button onClick={onClick}>Click Me</button>;
});
```

### Example 2: With Dependencies

```jsx
import { useState, useCallback } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
  }, []); // No dependencies needed (uses functional update)

  const toggleTodo = useCallback((id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // No dependencies needed

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <TodoInput onAdd={addTodo} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TodoItems
        todos={todos}
        filter={filter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}
```

### Example 3: Event Handlers

```jsx
import { useState, useCallback } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = useCallback((field) => {
    return (e) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    };
  }, []); // Empty deps - function factory pattern

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  }, [formData]); // Depends on formData

  return (
    <form onSubmit={handleSubmit}>
      <input value={formData.name} onChange={handleChange('name')} />
      <input value={formData.email} onChange={handleChange('email')} />
      <textarea value={formData.message} onChange={handleChange('message')} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Example 4: With useEffect

```jsx
import { useState, useEffect, useCallback } from 'react';

function UserSearch({ initialQuery }) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);

  const searchUsers = useCallback(async (searchQuery) => {
    if (!searchQuery) return;
    
    const response = await fetch(`/api/users?q=${searchQuery}`);
    const data = await response.json();
    setResults(data);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchUsers(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, searchUsers]); // searchUsers won't cause infinite loop

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search users..."
      />
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Example 5: Custom Hook with useCallback

```jsx
import { useState, useCallback } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setTrue, setFalse };
}

// Usage
function Modal() {
  const { value: isOpen, toggle, setFalse } = useToggle();

  return (
    <div>
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && (
        <div className="modal">
          <button onClick={setFalse}>Close</button>
        </div>
      )}
    </div>
  );
}
```

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Overusing useCallback

```jsx
// ❌ Unnecessary - not passed to memoized component
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

return <button onClick={handleClick}>Click</button>;

// ✅ Better - direct function
return <button onClick={() => console.log('clicked')}>Click</button>;
```

### ❌ Mistake 2: Missing Dependencies

```jsx
// ❌ Wrong - using stale closure
const handleClick = useCallback(() => {
  console.log(count); // Will always log initial value
}, []);

// ✅ Correct - include count
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
```

### ❌ Mistake 3: Using without React.memo

```jsx
// ❌ Pointless - ChildComponent not memoized
function Parent() {
  const handleClick = useCallback(() => {}, []);
  return <ChildComponent onClick={handleClick} />;
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>Click</button>;
}

// ✅ Correct - memoize child
const ChildComponent = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});
```

---

## 📊 Performance Impact

```jsx
import { useState, useCallback, useRef } from 'react';

function PerformanceDemo() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  // Without useCallback
  const handleClick1 = () => console.log('clicked');

  // With useCallback
  const handleClick2 = useCallback(() => console.log('clicked'), []);

  return (
    <div>
      <p>Renders: {renderCount.current++}</p>
      <button onClick={() => setCount(count + 1)}>Re-render</button>
      
      <MemoChild onClick={handleClick1} label="Without useCallback" />
      <MemoChild onClick={handleClick2} label="With useCallback" />
    </div>
  );
}

const MemoChild = React.memo(({ onClick, label }) => {
  const renderCount = useRef(0);
  console.log(`${label} rendered`);
  
  return (
    <div>
      <button onClick={onClick}>{label}</button>
      <span> (Renders: {renderCount.current++})</span>
    </div>
  );
});
```

---

## 🏋️ Exercises

### Exercise 1: Optimized List
Create a list with item actions.

**Requirements:**
- 100+ items
- Delete, edit, toggle actions
- Measure renders
- Optimize with useCallback

### Exercise 2: Form with Validation
Build a form with field-level validation.

**Requirements:**
- Multiple fields
- Async validation
- Debounced validation
- Use useCallback

### Exercise 3: Custom useDebounce Hook
Create a debounced callback hook.

**Requirements:**
- Configurable delay
- Cancel on unmount
- Use useCallback

---

## 🎓 Quiz

1. When should you use useCallback?
2. What's the difference from useMemo?
3. Does it prevent all re-renders?
4. When is it premature optimization?
5. How does it work with useEffect?

**[View Solutions](./solutions/README.md)**

---

## ⏭️ Next Module

[React.memo - Component Memoization →](../06-react-memo/README.md)
