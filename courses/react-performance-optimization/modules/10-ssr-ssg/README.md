# Module 10: SSR/SSG Optimization

## 🎯 Objectives

- ✅ Server-side rendering
- ✅ Static generation
- ✅ Hybrid approaches
- ✅ Hydration optimization

---

## 💻 Next.js Example

```jsx
// Static Generation
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}

// Server-Side Rendering
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

// Incremental Static Regeneration
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 60 // Revalidate every 60s
  };
}
```

---

## ⏭️ Next Module

[Advanced Performance Patterns →](../11-advanced-patterns/README.md)
