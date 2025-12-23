# Module 17: Performance Budgets

## 🎯 Set Budget Limits

```js
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 500 // KB
  }
}
```

---

## 📊 Budget Metrics

- JS Bundle: < 170 KB (gzipped)
- CSS: < 50 KB
- Images: < 200 KB per page
- Fonts: < 100 KB
- Total page weight: < 1 MB

---

## ⏭️ Next Module

[Optimization Checklist →](../18-checklist/README.md)
