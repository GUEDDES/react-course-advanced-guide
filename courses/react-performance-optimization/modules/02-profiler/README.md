# Module 2: React DevTools Profiler

## 🎯 Learning Objectives

- ✅ Install and use React DevTools
- ✅ Record and analyze profiles
- ✅ Identify performance bottlenecks
- ✅ Understand flame graphs
- ✅ Optimize based on profiler data

---

## 🔧 Installing React DevTools

### Browser Extension

**Chrome:**
[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

**Firefox:**
[React DevTools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

**Edge:**
Available in Microsoft Edge Add-ons

### Standalone App

```bash
npm install -g react-devtools
react-devtools
```

---

## 📊 Using the Profiler

### Step 1: Open DevTools

1. Open your React app
2. Press F12 (DevTools)
3. Click "Profiler" tab
4. Look for 🔴 Record button

### Step 2: Record a Session

```
1. Click Record (🔴)
2. Interact with your app
3. Click Stop (◼️)
4. Analyze results
```

### Step 3: Analyze the Data

**Flame Graph:**
- Shows component hierarchy
- Width = render time
- Color = rendering frequency
  - Green = Fast
  - Yellow = Moderate
  - Orange/Red = Slow

**Ranked Chart:**
- Lists components by render time
- Helps identify slowest components

---

## 💻 Profiler API

### Basic Usage

```jsx
import { Profiler } from 'react';

function onRenderCallback(
  id,              // "App" - Profiler id
  phase,           // "mount" or "update"
  actualDuration,  // Time spent rendering
  baseDuration,    // Estimated time without memoization
  startTime,       // When render started
  commitTime,      // When React committed
  interactions     // Set of interactions being traced
) {
  console.log(`${id} rendered in ${actualDuration}ms`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Navigation />
      <Main />
    </Profiler>
  );
}
```

### Advanced: Multiple Profilers

```jsx
function Dashboard() {
  return (
    <>
      <Profiler id="Sidebar" onRender={onRenderCallback}>
        <Sidebar />
      </Profiler>
      
      <Profiler id="Content" onRender={onRenderCallback}>
        <Content />
      </Profiler>
      
      <Profiler id="Footer" onRender={onRenderCallback}>
        <Footer />
      </Profiler>
    </>
  );
}
```

### Logging to Analytics

```jsx
function onRenderCallback(id, phase, actualDuration) {
  // Send to analytics
  analytics.track('component_render', {
    component: id,
    phase,
    duration: actualDuration,
    timestamp: Date.now()
  });
  
  // Log slow renders
  if (actualDuration > 16) {
    console.warn(`Slow render: ${id} took ${actualDuration}ms`);
  }
}
```

---

## 🔍 Reading the Profiler

### Understanding Metrics

**actualDuration:**
- Actual time spent rendering
- Includes child components
- Lower is better

**baseDuration:**
- Estimated render time without optimizations
- Theoretical worst case
- Compare with actualDuration to see optimization impact

**Render Count:**
- How many times component rendered
- Unnecessary renders = wasted work

---

## 📊 Example: Before/After Optimization

### Before Optimization

```jsx
function ProductList({ products }) {
  // ❌ Problem: Re-renders on every parent update
  const sortedProducts = products.sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      {sortedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  // ❌ Problem: New function on every render
  const handleClick = () => {
    console.log(product.id);
  };

  return (
    <div onClick={handleClick}>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
}
```

**Profiler Results:**
```
ProductList: 85ms (rendered 10 times)
ProductCard: 8ms each (100 cards × 10 renders = 800ms total)
```

### After Optimization

```jsx
import { useMemo, useCallback } from 'react';

function ProductList({ products }) {
  // ✅ Memoize sorted array
  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.name.localeCompare(b.name)),
    [products]
  );

  return (
    <div>
      {sortedProducts.map(product => (
        <MemoizedProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ✅ Memoize component
const MemoizedProductCard = React.memo(function ProductCard({ product }) {
  // ✅ Memoize callback
  const handleClick = useCallback(() => {
    console.log(product.id);
  }, [product.id]);

  return (
    <div onClick={handleClick}>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
});
```

**Profiler Results:**
```
ProductList: 22ms (rendered 10 times)
ProductCard: 0ms (skipped, no props changed)
Total improvement: 74% faster
```

---

## 🏋️ Practical Exercise

### Exercise: Profile Your App

1. **Record Baseline**
   ```
   - Open Profiler
   - Record normal usage
   - Note slowest components
   ```

2. **Identify Issues**
   ```
   - Components rendering > 16ms?
   - Unnecessary re-renders?
   - Large component trees?
   ```

3. **Optimize**
   ```
   - Add React.memo
   - Use useMemo/useCallback
   - Split large components
   ```

4. **Re-profile**
   ```
   - Record again
   - Compare results
   - Measure improvement %
   ```

---

## 📊 Performance Targets

**60 FPS = 16.67ms per frame**

| Component | Target | Action if Exceeded |
|-----------|--------|-------------------|
| **Small** | < 1ms | OK |
| **Medium** | < 5ms | Investigate |
| **Large** | < 16ms | Optimize |
| **Any** | > 16ms | 🚨 Critical |

---

## 💡 Profiling Tips

### Tip 1: Profile in Production Mode

```bash
# Development mode is slower
npm run build
npm run preview
```

### Tip 2: Test Multiple Scenarios

```
- Initial load
- User interactions
- Data updates
- Route changes
```

### Tip 3: Focus on User-Facing Features

```
Prioritize optimizing:
1. First page load
2. Common user flows
3. Interactive elements
```

---

## ⏭️ Next Module

[Chrome DevTools Performance →](../03-chrome-devtools/README.md)
