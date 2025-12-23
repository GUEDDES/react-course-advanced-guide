# useSyncExternalStore - External Store Sync (React 18+)

## 🎯 Objectives

- ✅ Subscribe to external stores
- ✅ Avoid tearing in Concurrent React
- ✅ Library integration

---

## 💻 Examples

### Example 1: Window Size

```jsx
import { useSyncExternalStore } from 'react';

function useWindowWidth() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => window.innerWidth,
    () => 0 // Server-side default
  );
}

function Component() {
  const width = useWindowWidth();
  return <div>Width: {width}px</div>;
}
```

### Example 2: Online Status

```jsx
import { useSyncExternalStore } from 'react';

function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine,
    () => true
  );
}
```

---

## ➡️ Next: [Custom Hooks Advanced](../15-custom-hooks-advanced/README.md)
