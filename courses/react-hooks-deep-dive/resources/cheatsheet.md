# React Hooks Cheat Sheet

## 🎣 All React Hooks Quick Reference

### useState
```jsx
const [state, setState] = useState(initialValue);

// Functional update
setState(prev => prev + 1);

// Lazy initialization
const [state, setState] = useState(() => expensiveComputation());
```

### useEffect
```jsx
// Run on every render
useEffect(() => {
  // effect
});

// Run once on mount
useEffect(() => {
  // effect
}, []);

// Run when deps change
useEffect(() => {
  // effect
}, [dep1, dep2]);

// With cleanup
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

### useContext
```jsx
const ThemeContext = createContext();

function Provider({ children }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

function Component() {
  const theme = useContext(ThemeContext);
}
```

### useReducer
```jsx
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

dispatch({ type: 'increment' });
```

### useMemo
```jsx
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);
```

### useCallback
```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);
```

### useRef
```jsx
// DOM reference
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();

// Mutable value
const countRef = useRef(0);
countRef.current += 1;
```

### useLayoutEffect
```jsx
// Runs synchronously after DOM mutations
useLayoutEffect(() => {
  // Measure DOM before paint
}, []);
```

### useImperativeHandle
```jsx
const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus()
  }));
  
  return <input ref={inputRef} />;
});
```

---

## 🏆 Custom Hooks Patterns

### useToggle
```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}
```

### useFetch
```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

### useLocalStorage
```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

### useDebounce
```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

---

## ⚡ Performance Optimization

### React.memo
```jsx
const MemoizedComponent = React.memo(Component);

// Custom comparison
const MemoizedComponent = React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});
```

### useMemo for Objects/Arrays
```jsx
const config = useMemo(() => ({ theme, locale }), [theme, locale]);
```

### useCallback for Functions
```jsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

---

## 🚨 Common Pitfalls

### ❌ Infinite Loop
```jsx
// Wrong
useEffect(() => {
  setData([...data, newItem]);
}, [data]);

// Right
useEffect(() => {
  setData(prev => [...prev, newItem]);
}, []);
```

### ❌ Stale Closure
```jsx
// Wrong
const handleClick = useCallback(() => {
  console.log(count); // Stale
}, []);

// Right
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
```

### ❌ Missing Cleanup
```jsx
// Wrong
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
}, []);

// Right
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  return () => clearInterval(interval);
}, []);
```

---

## 📝 Rules of Hooks

1. **Only call at top level** - Don't call in loops, conditions, or nested functions
2. **Only call from React functions** - Call from React components or custom hooks
3. **Custom hooks start with "use"** - Convention for hook detection

---

## 📊 Hooks Flow

```
Mount:
  1. useState (lazy init)
  2. useReducer (lazy init)
  3. useContext
  4. useMemo
  5. useCallback
  6. Render
  7. useLayoutEffect
  8. Browser paint
  9. useEffect

Update:
  1. State/Props change
  2. useMemo (if deps changed)
  3. useCallback (if deps changed)
  4. Render
  5. useLayoutEffect cleanup
  6. useLayoutEffect
  7. Browser paint
  8. useEffect cleanup
  9. useEffect

Unmount:
  1. useLayoutEffect cleanup
  2. useEffect cleanup
```
