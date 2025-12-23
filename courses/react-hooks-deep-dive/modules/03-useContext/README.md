# useContext - Global State Hook

## 🎯 Learning Objectives

- ✅ Understand React Context
- ✅ Create and use Context
- ✅ Avoid prop drilling
- ✅ Implement global state
- ✅ Optimize Context performance

---

## 📖 Theory

### What is Context?

Context provides a way to share values between components without explicitly passing props through every level of the tree.

### When to Use Context

✅ **Good Use Cases:**
- Theme (dark/light mode)
- User authentication
- Language/locale
- Global settings

❌ **Avoid for:**
- Frequently changing data
- Component-specific state
- Simple prop passing (1-2 levels)

---

## 💻 Examples

### Example 1: Theme Context

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext();

// 2. Create Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create Custom Hook
export function useTheme() {
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
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}
```

### Example 2: Auth Context

```jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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

// Usage
function LoginForm() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      console.log('Logged in!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <button disabled={loading}>Login</button>
    </form>
  );
}

function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Example 3: Multiple Contexts

```jsx
import { createContext, useContext } from 'react';

const UserContext = createContext();
const NotificationContext = createContext();

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Dashboard />
      </NotificationProvider>
    </UserProvider>
  );
}

function Dashboard() {
  const user = useContext(UserContext);
  const { notify } = useContext(NotificationContext);

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={() => notify('Hello!')}>Notify</button>
    </div>
  );
}
```

### Example 4: Context with Reducer

```jsx
import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
```

---

## ⚡ Performance Optimization

### Problem: All Consumers Re-render

```jsx
// ❌ Problem - all consumers re-render when any value changes
const value = { user, settings, notifications };

return (
  <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
);
```

### Solution 1: Memoize Value

```jsx
import { useMemo } from 'react';

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({});

  const value = useMemo(
    () => ({ user, setUser, settings, setSettings }),
    [user, settings]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
```

### Solution 2: Split Contexts

```jsx
// ✅ Better - separate contexts for different concerns
function App() {
  return (
    <UserProvider>
      <SettingsProvider>
        <NotificationProvider>
          <Dashboard />
        </NotificationProvider>
      </SettingsProvider>
    </UserProvider>
  );
}
```

---

## 🏋️ Exercises

### Exercise 1: Language Context
Create a multi-language context.

**Requirements:**
- Support English, French, Spanish
- Provide translation function
- Save preference to localStorage

### Exercise 2: Shopping Cart
Build a cart context with:
- Add/remove items
- Update quantities
- Calculate total
- Persist to localStorage

### Exercise 3: Modal Manager
Create a context to manage modals.

**Requirements:**
- Open/close modals
- Stack multiple modals
- Close on ESC key

---

## 🎓 Quiz

1. What problem does Context solve?
2. When should you avoid using Context?
3. How do you prevent unnecessary re-renders?
4. What's the purpose of a custom hook like `useAuth()`?
5. Can you have multiple Contexts in one app?

**[View Solutions](./solutions/README.md)**

---

## ⏭️ Next Module

[useMemo - Memoization →](../04-useMemo/README.md)
