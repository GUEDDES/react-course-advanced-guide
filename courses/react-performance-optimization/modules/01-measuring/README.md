# Module 1: Measuring Performance

## 🎯 Learning Objectives

- ✅ Understand why performance matters
- ✅ Learn to measure performance correctly
- ✅ Use React DevTools Profiler
- ✅ Interpret profiling results
- ✅ Set performance budgets

---

## 📖 Why Performance Matters

### User Impact

**Page Load Time Impact:**
- 1-3 seconds: Optimal
- 3-5 seconds: Users start leaving
- 5+ seconds: High bounce rate

**Real Statistics:**
- 53% of mobile users abandon sites that take > 3 seconds to load
- 1 second delay = 7% reduction in conversions
- Amazon: 100ms delay = 1% revenue loss

### Business Impact

- Better SEO rankings
- Higher conversion rates
- Improved user satisfaction
- Reduced server costs
- Better mobile experience

---

## 🔍 Performance Measurement Tools

### 1. React DevTools Profiler

**Install:**
- [Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

**How to Use:**

```jsx
import { Profiler } from 'react';

function onRenderCallback(
  id,              // Profiler id
  phase,           // "mount" or "update"
  actualDuration,  // Time spent rendering
  baseDuration,    // Estimated time without memoization
  startTime,       // When render started
  commitTime,      // When render committed
  interactions     // Set of interactions
) {
  console.log(`${id} - ${phase}`);
  console.log(`Actual: ${actualDuration}ms`);
  console.log(`Base: ${baseDuration}ms`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <YourComponent />
    </Profiler>
  );
}
```

**What to Look For:**
- Components with long render times (> 16ms)
- Unexpected re-renders
- Components rendering during idle time

---

### 2. Chrome DevTools Performance

**Recording a Session:**

1. Open DevTools (F12)
2. Go to Performance tab
3. Click Record
4. Interact with your app
5. Stop recording
6. Analyze the results

**Key Metrics:**

```
FCP (First Contentful Paint)
  ↓
LCP (Largest Contentful Paint)
  ↓
TTI (Time to Interactive)
  ↓
TBT (Total Blocking Time)
```

---

### 3. Lighthouse

**Running Lighthouse:**

```bash
# Via CLI
npm install -g lighthouse
lighthouse https://your-app.com --view

# Via Chrome DevTools
# DevTools → Lighthouse → Generate Report
```

**Key Scores:**
- Performance (0-100)
- Accessibility (0-100)
- Best Practices (0-100)
- SEO (0-100)

**Performance Breakdown:**
```
Performance Score
├── First Contentful Paint (10%)
├── Speed Index (10%)
├── Largest Contentful Paint (25%)
├── Time to Interactive (10%)
├── Total Blocking Time (30%)
└── Cumulative Layout Shift (15%)
```

---

### 4. Web Vitals

**Implementation:**

```bash
npm install web-vitals
```

```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log(metric);
  // Send to your analytics service
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

**Targets:**

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** | < 2.5s | 2.5s - 4.0s | > 4.0s |
| **FID** | < 100ms | 100ms - 300ms | > 300ms |
| **CLS** | < 0.1 | 0.1 - 0.25 | > 0.25 |

---

## 📊 Practical Example: Profiling a Component

### Before Optimization

```jsx
function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <button onClick={() => console.log(product)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}

// Profiler shows:
// - Render time: 85ms (for 100 products)
// - Re-renders on every parent update
```

### After Optimization

```jsx
import { memo, useCallback } from 'react';

const ProductItem = memo(({ product, onView }) => (
  <div>
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <button onClick={onView}>View Details</button>
  </div>
));

function ProductList({ products }) {
  const handleView = useCallback((product) => {
    console.log(product);
  }, []);

  return (
    <div>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onView={() => handleView(product)}
        />
      ))}
    </div>
  );
}

// Profiler shows:
// - Render time: 22ms (74% improvement)
// - Only affected items re-render
```

---

## 🎯 Performance Budgets

### Setting Budgets

```javascript
// performance-budget.json
{
  "budgets": [
    {
      "resourceType": "script",
      "budget": 200  // KB
    },
    {
      "resourceType": "total",
      "budget": 500  // KB
    },
    {
      "metric": "interactive",
      "budget": 3800  // ms
    }
  ]
}
```

### Webpack Bundle Analyzer

```bash
npm install --save-dev webpack-bundle-analyzer
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
});
```

---

## 🏋️ Exercise: Profile Your App

### Task 1: Basic Profiling

1. Wrap your app with Profiler
2. Record render times
3. Identify slow components (> 16ms)
4. Document findings

### Task 2: Lighthouse Audit

1. Run Lighthouse on your app
2. Aim for 90+ performance score
3. Fix top 3 issues
4. Re-run and compare

### Task 3: Web Vitals

1. Implement web-vitals
2. Log all metrics
3. Compare to targets
4. Create improvement plan

---

## 📋 Profiling Checklist

- [ ] Install React DevTools
- [ ] Add Profiler to critical paths
- [ ] Record baseline metrics
- [ ] Identify bottlenecks
- [ ] Set performance budgets
- [ ] Monitor Web Vitals
- [ ] Regular performance audits

---

## 💡 Key Takeaways

1. **Always measure first** - Don't optimize blindly
2. **Use multiple tools** - Each provides different insights
3. **Set budgets** - Prevent performance regression
4. **Monitor continuously** - Performance degrades over time
5. **Focus on user experience** - Real metrics matter most

---

## 📚 Additional Resources

- [React Profiler API](https://react.dev/reference/react/Profiler)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Lighthouse Scoring](https://web.dev/performance-scoring/)

---

## ⏭️ Next Module

[React DevTools Profiler Deep Dive →](../02-profiler/README.md)
