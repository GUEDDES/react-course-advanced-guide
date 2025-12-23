# Module 3: Web Vitals & Performance Metrics

## 🎯 Objectives

- ✅ Understand Core Web Vitals
- ✅ Measure LCP, FID, CLS
- ✅ Optimize for good scores
- ✅ Monitor in production

---

## 📊 Core Web Vitals

### LCP - Largest Contentful Paint
**Target: < 2.5s**

Measures loading performance.

```jsx
import { useEffect } from 'react';
import { getCLS, getFID, getLCP } from 'web-vitals';

function App() {
  useEffect(() => {
    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
  }, []);
}
```

### FID - First Input Delay
**Target: < 100ms**

Measures interactivity.

### CLS - Cumulative Layout Shift
**Target: < 0.1**

Measures visual stability.

---

## ✅ Optimization Techniques

### Optimize LCP
```jsx
// 1. Preload critical resources
<link rel="preload" href="hero.jpg" as="image" />

// 2. Lazy load below fold
import { lazy } from 'react';
const BelowFold = lazy(() => import('./BelowFold'));

// 3. Optimize images
<img src="image.webp" loading="eager" />
```

### Optimize FID
```jsx
// Use useTransition for non-urgent updates
import { useTransition } from 'react';

const [isPending, startTransition] = useTransition();

startTransition(() => {
  setHeavyState(value);
});
```

### Optimize CLS
```jsx
// Always set dimensions
<img src="image.jpg" width="800" height="600" alt="..." />

// Reserve space for dynamic content
<div style={{ minHeight: '200px' }}>
  {loading ? <Skeleton /> : <Content />}
</div>
```

---

## ➡️ Next: [Code Splitting](../04-code-splitting/README.md)
