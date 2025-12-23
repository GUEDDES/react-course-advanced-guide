# Module 4: Code Splitting

## 🎯 Learning Objectives

- ✅ Understand code splitting
- ✅ Use React.lazy and Suspense
- ✅ Split by routes
- ✅ Split by components
- ✅ Measure bundle size

---

## 📖 Why Code Splitting?

**Problem:** Sending entire app bundle upfront
```
Bundle.js: 2.5 MB
User only visits homepage: Wastes 90% of bundle!
```

**Solution:** Split code into chunks, load on demand
```
Home.js: 50 KB (loaded immediately)
Dashboard.js: 300 KB (loaded when visited)
Admin.js: 200 KB (loaded when visited)
```

---

## 💻 React.lazy() Basics

### Before Code Splitting

```jsx
import Dashboard from './Dashboard';
import Settings from './Settings';

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

// Bundle size: 500 KB (all routes included)
```

### After Code Splitting

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

// Initial bundle: 100 KB
// Dashboard.js: 200 KB (loaded on demand)
// Settings.js: 200 KB (loaded on demand)
```

---

## 🔀 Route-Based Splitting

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <Spinner />
      <p>Loading page...</p>
    </div>
  );
}
```

---

## 🧩 Component-Based Splitting

```jsx
import { lazy, Suspense, useState } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));
const ImageEditor = lazy(() => import('./ImageEditor'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>
      
      <button onClick={() => setShowChart(true)}>
        Show Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
      
      <button onClick={() => setShowEditor(true)}>
        Open Editor
      </button>
      
      {showEditor && (
        <Suspense fallback={<div>Loading editor...</div>}>
          <ImageEditor />
        </Suspense>
      )}
    </div>
  );
}
```

---

## 🎯 Advanced Patterns

### Pattern 1: Preloading

```jsx
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  // Preload on hover
  const handleMouseEnter = () => {
    const component = import('./Dashboard');
  };

  return (
    <div>
      <Link
        to="/dashboard"
        onMouseEnter={handleMouseEnter}
      >
        Dashboard
      </Link>
    </div>
  );
}
```

### Pattern 2: Named Exports

```jsx
// utils.js
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }

// App.jsx
const MathUtils = lazy(() =>
  import('./utils').then(module => ({
    default: module.add
  }))
);
```

### Pattern 3: Error Boundaries

```jsx
import { Component, lazy, Suspense } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Failed to load component. <button onClick={() => window.location.reload()}>Retry</button></div>;
    }
    return this.props.children;
  }
}

const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

## 📊 Bundle Analysis

### Install Bundle Analyzer

```bash
npm install --save-dev vite-plugin-bundle-analyzer
```

### Configure Vite

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['recharts']
        }
      }
    }
  }
});
```

---

## 🏋️ Exercise

### Optimize This App

```jsx
// BEFORE - Everything in one bundle (800 KB)
import Home from './Home';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Settings from './Settings';
import AdminPanel from './AdminPanel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

// TODO:
// 1. Split routes with React.lazy
// 2. Add Suspense with loading states
// 3. Add error boundary
// 4. Preload on hover
// 5. Measure bundle reduction
```

---

## ⏭️ Next Module

[Memoization Techniques →](../05-memoization/README.md)
