# Module 9: Lazy Loading Strategies

## 🎯 Objectives

- ✅ Route-based lazy loading
- ✅ Component lazy loading
- ✅ Prefetching strategies

---

## 💻 Examples

```jsx
// Route lazy loading
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

// Prefetch on hover
const handleMouseEnter = () => {
  import('./Dashboard');
};

<Link to="/dashboard" onMouseEnter={handleMouseEnter}>
  Dashboard
</Link>
```

---

## ⏭️ Next Module

[SSR/SSG Optimization →](../10-ssr-ssg/README.md)
