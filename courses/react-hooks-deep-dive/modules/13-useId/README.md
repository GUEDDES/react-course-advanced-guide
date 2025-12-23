# useId - Unique ID Generation (React 18+)

## 🎯 Objectives

- ✅ Generate unique IDs
- ✅ SSR-safe IDs
- ✅ Accessibility
- ✅ Form labels

---

## 💻 Examples

### Example 1: Form Fields

```jsx
import { useId } from 'react';

function FormField({ label, type = 'text' }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </div>
  );
}
```

### Example 2: Accessible Components

```jsx
import { useId } from 'react';

function Tooltip({ children, content }) {
  const id = useId();

  return (
    <>
      <button aria-describedby={id}>{children}</button>
      <div id={id} role="tooltip">{content}</div>
    </>
  );
}
```

---

## ➡️ Next: [useSyncExternalStore](../14-useSyncExternalStore/README.md)
