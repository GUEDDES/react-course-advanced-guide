# useState - State Management Hook

## 🎯 Learning Objectives

By the end of this module, you will:
- ✅ Understand what state is in React
- ✅ Know how to use useState hook
- ✅ Handle multiple state variables
- ✅ Update state correctly
- ✅ Understand state batching

---

## 📖 Theory

### What is State?

State is data that changes over time in your component. When state changes, React re-renders the component.

### useState Syntax

```javascript
const [state, setState] = useState(initialValue);
```

- `state` - Current state value
- `setState` - Function to update state
- `initialValue` - Initial state (can be any type)

---

## 💻 Examples

### Example 1: Simple Counter

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
```

### Example 2: Form Input

```jsx
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Example 3: Object State

```jsx
import { useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    age: 0,
    email: ''
  });

  const updateField = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => updateField('name', e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => updateField('age', e.target.value)}
        placeholder="Age"
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="Email"
      />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
```

### Example 4: Array State

```jsx
import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Direct Mutation

```javascript
// ❌ Wrong
const [count, setCount] = useState(0);
count = count + 1; // ERROR!

// ✅ Correct
setCount(count + 1);
```

### ❌ Mistake 2: Not Using Functional Update

```javascript
// ❌ Problematic (stale closure)
setCount(count + 1);
setCount(count + 1); // May not increment by 2

// ✅ Better (functional update)
setCount(prev => prev + 1);
setCount(prev => prev + 1); // Will increment by 2
```

### ❌ Mistake 3: Mutating Objects/Arrays

```javascript
// ❌ Wrong
const [user, setUser] = useState({ name: 'John' });
user.name = 'Jane'; // Mutation!
setUser(user);

// ✅ Correct
setUser({ ...user, name: 'Jane' });
```

---

## 🎯 Best Practices

### 1. Use Multiple State Variables

```javascript
// ✅ Good - separate concerns
const [name, setName] = useState('');
const [age, setAge] = useState(0);

// ❌ Not ideal - related data in separate states
const [formData, setFormData] = useState({ name: '', age: 0 });
```

### 2. Lazy Initialization

```javascript
// ✅ Expensive computation runs once
const [data, setData] = useState(() => {
  return expensiveComputation();
});

// ❌ Runs on every render
const [data, setData] = useState(expensiveComputation());
```

### 3. Functional Updates for Dependent Changes

```javascript
// ✅ Always use latest state
setCount(prev => prev + 1);

// ❌ May use stale state
setCount(count + 1);
```

---

## 🏋️ Exercises

### Exercise 1: Toggle Component
Create a component that toggles between "ON" and "OFF".

**Requirements:**
- Button to toggle state
- Display current state
- Style differently based on state

### Exercise 2: Form Validation
Build a registration form with validation.

**Requirements:**
- Email and password fields
- Show error messages
- Disable submit if invalid
- Clear form on submit

### Exercise 3: Shopping List
Create a shopping list app.

**Requirements:**
- Add items
- Mark items as purchased
- Delete items
- Show total count

---

## 🎓 Quiz

1. What does useState return?
2. How do you update state with the previous value?
3. Can you call setState during render?
4. What happens if you mutate state directly?
5. How do you initialize state with a function?

**[View Solutions](./solutions/README.md)**

---

## 📚 Additional Resources

- [React Docs - useState](https://react.dev/reference/react/useState)
- [When to use useState vs useReducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)

---

## ⏭️ Next Module

[useEffect - Side Effects →](../02-useEffect/README.md)
