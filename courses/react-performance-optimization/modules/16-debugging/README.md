# Module 16: Debugging Performance Issues

## 🎯 Techniques

- ✅ Chrome DevTools
- ✅ React DevTools Profiler
- ✅ Why Did You Render
- ✅ Bundle analysis

---

## 🐞 Why Did You Render

```js
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

// Mark component for tracking
MyComponent.whyDidYouRender = true;
```

---

## ⏭️ Next Module

[Performance Budgets →](../17-budgets/README.md)
