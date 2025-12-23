# useReducer - State Reducer Hook

## 🎯 Learning Objectives

- ✅ Understand reducers
- ✅ Manage complex state
- ✅ Use actions and dispatch
- ✅ Combine with Context
- ✅ Choose between useState and useReducer

---

## 📖 What is useReducer?

useReducer is an alternative to useState for managing complex state logic with actions.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

**Reducer Function:**
```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return newState;
    default:
      return state;
  }
}
```

---

## 💻 Basic Examples

### Example 1: Counter

```jsx
import { useReducer } from 'react';

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

### Example 2: Todo List

```jsx
import { useReducer } from 'react';

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    case 'CLEAR_COMPLETED':
      return {
        todos: state.todos.filter(todo => !todo.completed)
      };
    
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {state.todos.map(todo => (
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

## 🎯 Advanced Patterns

### Example 3: Form State Management

```jsx
import { useReducer } from 'react';

const initialState = {
  values: { email: '', password: '', username: '' },
  errors: {},
  touched: {},
  isSubmitting: false
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value
        },
        errors: {
          ...state.errors,
          [action.field]: undefined
        }
      };
    
    case 'SET_FIELD_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true
        }
      };
    
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      };
    
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting
      };
    
    case 'RESET_FORM':
      return initialState;
    
    default:
      return state;
  }
}

function RegistrationForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field) => (e) => {
    dispatch({ type: 'SET_FIELD_VALUE', field, value: e.target.value });
  };

  const handleBlur = (field) => () => {
    dispatch({ type: 'SET_FIELD_TOUCHED', field });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SUBMITTING', isSubmitting: true });
    
    try {
      await registerUser(state.values);
      dispatch({ type: 'RESET_FORM' });
    } catch (errors) {
      dispatch({ type: 'SET_ERRORS', errors });
    } finally {
      dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.values.username}
        onChange={handleChange('username')}
        onBlur={handleBlur('username')}
      />
      {state.touched.username && state.errors.username && (
        <span>{state.errors.username}</span>
      )}

      <button disabled={state.isSubmitting}>Submit</button>
    </form>
  );
}
```

### Example 4: useReducer + Context (Global State)

```jsx
import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { items: [] };
    
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, quantity) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      items: state.items,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
```

---

## 📊 useState vs useReducer

| Scenario | Use useState | Use useReducer |
|----------|--------------|----------------|
| **Simple state** | ✅ | ❌ |
| **Multiple related values** | ❌ | ✅ |
| **Complex state transitions** | ❌ | ✅ |
| **Next state depends on previous** | ✅ | ✅ |
| **Shared logic** | ❌ | ✅ |
| **Testing** | Easy | Easier |

---

## 🏋️ Exercises

### Exercise 1: Shopping Cart
Build a shopping cart with useReducer.

**Actions:**
- Add item
- Remove item
- Update quantity
- Apply coupon
- Calculate total

### Exercise 2: Multi-Step Form
Create a wizard form.

**Requirements:**
- Multiple steps
- Validation
- Progress tracking
- Go back/forward

### Exercise 3: Game State
Manage game state (tic-tac-toe).

**Actions:**
- Make move
- Check winner
- Reset game
- Undo move

---

## ➡️ Next Module

[useLayoutEffect - Synchronous Effect →](../09-useLayoutEffect/README.md)
