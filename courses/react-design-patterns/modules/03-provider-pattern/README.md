# Module 3: Provider Pattern

## 🎯 Learning Objectives

- ✅ Understand Provider pattern
- ✅ Avoid prop drilling
- ✅ Share global state
- ✅ Create custom providers
- ✅ Optimize performance

---

## 📖 What is Provider Pattern?

Makes data available to components without prop drilling using Context API.

**Benefits:**
- Share data globally
- Avoid prop drilling
- Centralized state management
- Clean component APIs

---

## 💻 Basic Implementation

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext();

// 2. Create Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create Custom Hook
function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
}

// 4. Usage
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}
```

---

## 🎯 Real-World Examples

### Example 1: Auth Provider

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.json())
        .then(setUser)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Protected Route
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
}
```

### Example 2: Shopping Cart Provider

```jsx
import { createContext, useContext, useReducer, useMemo } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existing = state.items.find(i => i.id === action.payload.id);
      
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
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
        items: state.items.filter(i => i.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
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

  const value = useMemo(() => {
    const total = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const itemCount = state.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return {
      items: state.items,
      total,
      itemCount,
      addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
      updateQuantity: (id, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' })
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

// Usage
function ProductCard({ product }) {
  const { addItem } = useCart();
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}

function CartSummary() {
  const { items, total, itemCount } = useCart();
  
  return (
    <div>
      <h2>Cart ({itemCount} items)</h2>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
```

---

## ⚡ Performance Optimization

### Split Context for Better Performance

```jsx
import { createContext, useContext, useState, useMemo } from 'react';

// Split state and actions into separate contexts
const TodoStateContext = createContext();
const TodoActionsContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  // Memoize state
  const state = useMemo(() => ({ todos }), [todos]);

  // Memoize actions (never change)
  const actions = useMemo(
    () => ({
      addTodo: (text) =>
        setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]),
      toggleTodo: (id) =>
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        ),
      deleteTodo: (id) => setTodos(prev => prev.filter(t => t.id !== id))
    }),
    []
  );

  return (
    <TodoStateContext.Provider value={state}>
      <TodoActionsContext.Provider value={actions}>
        {children}
      </TodoActionsContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoActions() {
  return useContext(TodoActionsContext);
}

// Components only re-render when their context changes
function TodoList() {
  const { todos } = useTodoState(); // Re-renders when todos change
  return <ul>{todos.map(t => <TodoItem key={t.id} todo={t} />)}</ul>;
}

function AddTodoButton() {
  const { addTodo } = useTodoActions(); // Never re-renders!
  return <button onClick={() => addTodo('New')}>Add</button>;
}
```

---

## 🏋️ Exercise

Create a Notification Provider.

**Requirements:**
- Show toast notifications
- Auto-dismiss after timeout
- Support different types (success, error, info)
- Queue multiple notifications
- Remove on click

---

## ⏭️ Next Module

[Container/Presentational Pattern →](../04-container-presentational/README.md)
