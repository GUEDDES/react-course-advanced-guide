# Module 8: useReducer - State Management Hook

## 🎯 Learning Objectives

- ✅ Understand useReducer
- ✅ When to use vs useState
- ✅ Write reducers and actions
- ✅ Handle complex state logic
- ✅ Combine with Context

---

## 📖 What is useReducer?

An alternative to useState for managing complex state logic. Similar to Redux reducers.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

**Components:**
- `state`: Current state value
- `dispatch`: Function to send actions
- `reducer`: Function that updates state
- `initialState`: Initial state value

---

## 💻 Basic Example

### Counter with useReducer

```jsx
import { useReducer } from 'react';

// 1. Define initial state
const initialState = { count: 0 };

// 2. Define reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// 3. Use in component
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

---

## 🔄 useState vs useReducer

### Use useState when:
- ✅ Simple state (primitives)
- ✅ Independent state updates
- ✅ Few state transitions

### Use useReducer when:
- ✅ Complex state objects
- ✅ Related state updates
- ✅ Multiple sub-values
- ✅ Next state depends on previous
- ✅ State logic needs testing

---

## 💪 Complex Example: Todo App

```jsx
import { useReducer } from 'react';

const initialState = {
  todos: [],
  filter: 'all'
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
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

    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <div>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}>
          All
        </button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}>
          Active
        </button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}>
          Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
        Clear Completed
      </button>
    </div>
  );
}
```

---

## 🎨 Advanced Patterns

### Pattern 1: Lazy Initialization

```jsx
function init(initialCount) {
  return { count: initialCount };
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  // ...
}
```

### Pattern 2: Action Creators

```jsx
// Action creators
const actions = {
  increment: () => ({ type: 'INCREMENT' }),
  decrement: () => ({ type: 'DECREMENT' }),
  incrementBy: (amount) => ({ type: 'INCREMENT_BY', payload: amount }),
  reset: () => ({ type: 'RESET' })
};

// Usage
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <button onClick={() => dispatch(actions.increment())}>+</button>
      <button onClick={() => dispatch(actions.incrementBy(5))}>+5</button>
    </div>
  );
}
```

### Pattern 3: With Context (Global State)

```jsx
import { createContext, useContext, useReducer } from 'react';

const StateContext = createContext();
const DispatchContext = createContext();

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Custom hooks
function useAppState() {
  return useContext(StateContext);
}

function useAppDispatch() {
  return useContext(DispatchContext);
}

// Usage
function Component() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch({ type: 'ACTION' })}>
      {state.value}
    </button>
  );
}
```

---

## 🏋️ Exercises

### Exercise 1: Shopping Cart

Build a shopping cart with useReducer.

**Actions:**
- ADD_ITEM
- REMOVE_ITEM
- UPDATE_QUANTITY
- CLEAR_CART
- APPLY_COUPON

### Exercise 2: Form State Management

Manage complex form state.

**Features:**
- Multiple fields
- Validation
- Error messages
- Submission state

### Exercise 3: Game State

Create a tic-tac-toe game.

**State:**
- Board (9 squares)
- Current player
- Winner
- Game history

---

## ⏭️ Next Module

[useLayoutEffect - Synchronous Effects →](../09-useLayoutEffect/README.md)
