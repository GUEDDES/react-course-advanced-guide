# 🎨 React Design Patterns - Complete Guide

Master advanced React patterns for building scalable, maintainable applications.

## 📚 Course Overview

Learn proven design patterns and architectural approaches for professional React development.

### What You'll Learn
- ✅ Component composition patterns
- ✅ Render props pattern
- ✅ Higher-Order Components (HOC)
- ✅ Compound components
- ✅ State management patterns
- ✅ Custom hooks patterns
- ✅ Provider pattern
- ✅ Container/Presentational pattern
- ✅ Controlled vs Uncontrolled components
- ✅ Error boundaries
- ✅ Code splitting patterns
- ✅ Server-side patterns

### Prerequisites
- Strong React fundamentals
- Understanding of hooks
- JavaScript ES6+
- Component composition basics

### Course Duration
- **Estimated Time:** 10-12 hours
- **Level:** Intermediate to Advanced
- **Includes:** 30+ pattern examples

---

## 📖 Course Modules

### Module 1: Composition Patterns
1. [Component Composition](./modules/01-composition/README.md)
2. [Compound Components](./modules/02-compound/README.md)
3. [Flexible Compound Components](./modules/03-flexible-compound/README.md)

### Module 2: Code Reuse Patterns
4. [Higher-Order Components](./modules/04-hoc/README.md)
5. [Render Props](./modules/05-render-props/README.md)
6. [Custom Hooks](./modules/06-custom-hooks/README.md)

### Module 3: State Management Patterns
7. [Provider Pattern](./modules/07-provider/README.md)
8. [Container/Presentational](./modules/08-container-presentational/README.md)
9. [State Reducer Pattern](./modules/09-state-reducer/README.md)
10. [Control Props Pattern](./modules/10-control-props/README.md)

### Module 4: Performance Patterns
11. [Lazy Loading](./modules/11-lazy-loading/README.md)
12. [Code Splitting](./modules/12-code-splitting/README.md)
13. [Windowing/Virtualization](./modules/13-virtualization/README.md)

### Module 5: Error Handling
14. [Error Boundaries](./modules/14-error-boundaries/README.md)
15. [Suspense Pattern](./modules/15-suspense/README.md)

### Module 6: Advanced Patterns
16. [Portal Pattern](./modules/16-portals/README.md)
17. [Proxy Pattern](./modules/17-proxy/README.md)
18. [Observer Pattern](./modules/18-observer/README.md)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/GUEDDES/react-course-advanced-guide.git

# Navigate to course
cd react-course-advanced-guide/courses/react-design-patterns

# Install dependencies
npm install

# Start examples
npm run dev
```

---

## 📊 Pattern Overview

### When to Use Each Pattern

| Pattern | Use Case | Complexity |
|---------|----------|------------|
| **Composition** | Flexible UI components | ⭐ Easy |
| **Compound Components** | Related components (Tabs, Accordion) | ⭐⭐ Medium |
| **HOC** | Cross-cutting concerns (legacy) | ⭐⭐⭐ Hard |
| **Render Props** | Sharing stateful logic (legacy) | ⭐⭐ Medium |
| **Custom Hooks** | Reusable logic (modern) | ⭐⭐ Medium |
| **Provider** | Global state | ⭐ Easy |
| **Container/Presentational** | Separation of concerns | ⭐⭐ Medium |
| **Error Boundaries** | Error handling | ⭐ Easy |

---

## 💻 Pattern Examples

### 1. Compound Components Pattern

**Problem:** Building flexible, cohesive component APIs (like `<select>` and `<option>`)

```jsx
// Usage
<Tabs>
  <Tabs.List>
    <Tabs.Tab>Tab 1</Tabs.Tab>
    <Tabs.Tab>Tab 2</Tabs.Tab>
    <Tabs.Tab>Tab 3</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel>Content 1</Tabs.Panel>
  <Tabs.Panel>Content 2</Tabs.Panel>
  <Tabs.Panel>Content 3</Tabs.Panel>
</Tabs>
```

**Implementation:**

```jsx
import { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children }) {
  return <div className="tabs-list">{children}</div>;
}

function Tab({ children, index }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const isActive = activeIndex === index;

  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </button>
  );
}

function Panel({ children, index }) {
  const { activeIndex } = useContext(TabsContext);
  if (activeIndex !== index) return null;

  return <div className="panel">{children}</div>;
}

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = Panel;

export default Tabs;
```

---

### 2. Custom Hook Pattern (Modern Approach)

**Problem:** Sharing stateful logic between components

```jsx
// useToggle.js
import { useState, useCallback } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
}

// Usage
function Modal() {
  const { value: isOpen, toggle, setFalse } = useToggle();

  return (
    <>
      <button onClick={toggle}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <button onClick={setFalse}>Close</button>
        </div>
      )}
    </>
  );
}
```

---

### 3. Provider Pattern

**Problem:** Avoiding prop drilling for global state

```jsx
// ThemeContext.jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

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

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
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

### 4. Container/Presentational Pattern

**Problem:** Separating logic from presentation

```jsx
// UserListContainer.jsx (Logic)
import { useState, useEffect } from 'react';
import UserListPresentation from './UserListPresentation';

function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <UserListPresentation
      users={users}
      loading={loading}
      error={error}
      onDelete={handleDelete}
    />
  );
}

// UserListPresentation.jsx (UI)
function UserListPresentation({ users, loading, error, onDelete }) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---

### 5. State Reducer Pattern

**Problem:** Giving users control over state management

```jsx
import { useReducer } from 'react';

// Default reducer
function toggleReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return { on: !state.on };
    case 'SET_ON':
      return { on: true };
    case 'SET_OFF':
      return { on: false };
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
}

function useToggle({ reducer = toggleReducer, initialOn = false } = {}) {
  const [{ on }, dispatch] = useReducer(reducer, { on: initialOn });

  const toggle = () => dispatch({ type: 'TOGGLE' });
  const setOn = () => dispatch({ type: 'SET_ON' });
  const setOff = () => dispatch({ type: 'SET_OFF' });

  return { on, toggle, setOn, setOff };
}

// Usage with custom reducer
function customReducer(state, action) {
  // User can add custom logic
  if (action.type === 'TOGGLE' && state.on) {
    // Prevent turning off if certain condition
    return state;
  }
  return toggleReducer(state, action);
}

function MyComponent() {
  const { on, toggle } = useToggle({ reducer: customReducer });
  // ...
}
```

---

## 🎯 Anti-Patterns to Avoid

### 1. ❌ Prop Drilling

```jsx
// Bad
<App>
  <Header user={user} />
  <Main user={user} />
  <Sidebar user={user} />
</App>

// Good - Use Context
<UserProvider value={user}>
  <App>
    <Header />
    <Main />
    <Sidebar />
  </App>
</UserProvider>
```

### 2. ❌ Huge Components

```jsx
// Bad - 500+ lines component
function Dashboard() {
  // Too much logic here
}

// Good - Split into smaller components
function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <DashboardStats />
      <DashboardCharts />
      <DashboardTable />
    </>
  );
}
```

### 3. ❌ Unnecessary HOCs

```jsx
// Bad (legacy pattern)
withAuth(withTheme(withRouter(Component)))

// Good - Use hooks
function Component() {
  const auth = useAuth();
  const theme = useTheme();
  const router = useRouter();
  // ...
}
```

---

## 📚 Pattern Cheat Sheet

### Component Composition
```jsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

### Custom Hook
```jsx
const { data, loading, error } = useFetch('/api/data');
```

### Provider Pattern
```jsx
<AuthProvider>
  <App />
</AuthProvider>
```

### Render Props (Legacy)
```jsx
<DataFetcher url="/api/data">
  {({ data, loading }) => (
    loading ? <Spinner /> : <Display data={data} />
  )}
</DataFetcher>
```

---

## 🏋️ Projects

### Project 1: Design System
Build a component library using compound components.

**Components:**
- Accordion
- Tabs
- Modal
- Dropdown

### Project 2: Dashboard
Create a dashboard using provider pattern and custom hooks.

**Features:**
- Theme switching
- User authentication
- Data fetching
- Error handling

---

## 📝 License

MIT License - Free to use for learning!
