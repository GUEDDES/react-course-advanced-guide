# Module 3: Web Vitals - Core Metrics

## 🎯 Learning Objectives

- ✅ Understand Core Web Vitals
- ✅ Measure LCP, FID, CLS
- ✅ Optimize for good scores
- ✅ Use web-vitals library
- ✅ Track in production

---

## 📖 Core Web Vitals

### 3 Key Metrics

| Metric | What It Measures | Good Score |
|--------|------------------|------------|
| **LCP** | Loading performance | < 2.5s |
| **FID** | Interactivity | < 100ms |
| **CLS** | Visual stability | < 0.1 |

---

## 📊 LCP - Largest Contentful Paint

**Measures:** Time until largest content element is rendered.

**Common LCP Elements:**
- `<img>` tags
- `<video>` tags
- Background images
- Block-level text

### Optimization Techniques

```jsx
// ❌ Bad - Slow LCP
function Hero() {
  return (
    <div>
      <img src="large-image.jpg" alt="Hero" />
    </div>
  );
}

// ✅ Good - Fast LCP
function Hero() {
  return (
    <div>
      {/* Preload critical image */}
      <link rel="preload" as="image" href="large-image.jpg" />
      
      {/* Optimized image */}
      <img
        src="large-image.jpg"
        srcSet="
          large-image-400.jpg 400w,
          large-image-800.jpg 800w,
          large-image-1200.jpg 1200w
        "
        sizes="(max-width: 600px) 400px, 800px"
        alt="Hero"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
```

### Measure LCP

```jsx
import { onLCP } from 'web-vitals';

onLCP(console.log);
// Output: { name: 'LCP', value: 2300, rating: 'good' }
```

---

## ⚡ FID - First Input Delay

**Measures:** Time from first user interaction to browser response.

### Optimization Techniques

```jsx
// ❌ Bad - Blocking main thread
function App() {
  const data = expensiveSync Calculation(); // Blocks!
  
  return <div>{data}</div>;
}

// ✅ Good - Non-blocking
function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Run in effect, not during render
    setTimeout(() => {
      setData(expensiveCalculation());
    }, 0);
  }, []);
  
  return <div>{data || 'Loading...'}</div>;
}

// ✅ Even better - Web Workers
function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const worker = new Worker('worker.js');
    worker.postMessage({ type: 'CALCULATE' });
    worker.onmessage = (e) => setData(e.data);
    return () => worker.terminate();
  }, []);
  
  return <div>{data || 'Loading...'}</div>;
}
```

### Measure FID

```jsx
import { onFID } from 'web-vitals';

onFID(console.log);
// Output: { name: 'FID', value: 45, rating: 'good' }
```

---

## 📍 CLS - Cumulative Layout Shift

**Measures:** Visual stability (unexpected layout shifts).

### Common Causes

1. Images without dimensions
2. Ads/embeds/iframes
3. Web fonts (FOIT/FOUT)
4. Dynamically injected content

### Optimization Techniques

```jsx
// ❌ Bad - Causes layout shift
function Image() {
  return <img src="photo.jpg" alt="Photo" />;
}

// ✅ Good - Reserve space
function Image() {
  return (
    <img
      src="photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      style={{ aspectRatio: '4/3' }}
    />
  );
}

// ✅ Good - Skeleton loader
function Card() {
  const [data, setData] = useState(null);
  
  if (!data) {
    return (
      <div className="skeleton" style={{ height: '200px' }}>
        Loading...
      </div>
    );
  }
  
  return <div className="card">{data.content}</div>;
}
```

### Measure CLS

```jsx
import { onCLS } from 'web-vitals';

onCLS(console.log);
// Output: { name: 'CLS', value: 0.05, rating: 'good' }
```

---

## 🛠️ web-vitals Library

### Installation

```bash
npm install web-vitals
```

### Complete Setup

```jsx
// src/reportWebVitals.js
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
  
  // Example: Google Analytics
  window.gtag?.('event', metric.name, {
    value: Math.round(metric.value),
    event_label: metric.id,
    non_interaction: true
  });
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}

// src/main.jsx
import { reportWebVitals } from './reportWebVitals';

reportWebVitals();
```

---

## 🏋️ Practical Exercise

### Optimize This Component

```jsx
// BEFORE - Multiple issues
function ProductPage() {
  const products = fetchProducts(); // Blocking!
  
  return (
    <div>
      <img src="hero.jpg" /> {/* No dimensions */}
      
      <div>
        {products.map(p => (
          <div key={p.id}>
            <img src={p.image} /> {/* Lazy load? */}
            <h3>{p.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

// TODO: Fix LCP, FID, CLS issues
```

---

## 📊 Scoring Guidelines

| Score | LCP | FID | CLS |
|-------|-----|-----|-----|
| 🟢 Good | 0-2.5s | 0-100ms | 0-0.1 |
| 🟡 Needs Improvement | 2.5-4.0s | 100-300ms | 0.1-0.25 |
| 🔴 Poor | > 4.0s | > 300ms | > 0.25 |

---

## ⏭️ Next Module

[Code Splitting →](../04-code-splitting/README.md)
