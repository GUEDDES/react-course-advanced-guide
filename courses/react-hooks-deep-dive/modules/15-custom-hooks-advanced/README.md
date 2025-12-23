# Custom Hooks - Advanced Patterns

## 🎯 Objectives

- ✅ Compose multiple hooks
- ✅ Create hook libraries
- ✅ Advanced patterns
- ✅ Testing custom hooks

---

## 💻 Advanced Custom Hooks

### useAsync - Async Operations

```jsx
import { useState, useEffect, useCallback } from 'react';

function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback((...params) => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return asyncFunction(...params)
      .then(response => {
        setValue(response);
        setStatus('success');
      })
      .catch(error => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
}

// Usage
function UserProfile({ userId }) {
  const { status, value, error } = useAsync(
    () => fetch(`/api/users/${userId}`).then(r => r.json())
  );

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {error.message}</div>;
  if (status === 'success') return <div>{value.name}</div>;
}
```

### useIntersectionObserver

```jsx
import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver(options = {}) {
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [elementRef, entry];
}

// Usage - Lazy Loading
function LazyImage({ src, alt }) {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (entry?.isIntersecting) {
      setImageSrc(src);
    }
  }, [entry, src]);

  return <img ref={ref} src={imageSrc || 'placeholder.jpg'} alt={alt} />;
}
```

---

## 🏋️ Final Exercise

Create a complete custom hooks library with:
- useLocalStorage
- useDebounce
- useThrottle
- useMediaQuery
- usePrevious
- useClickOutside

---

## ➡️ Next: [Final Project](../16-final-project/README.md)
