# Module 9: Props Getters Pattern

## 🎯 Objectives

- ✅ Simplify prop spreading
- ✅ Combine multiple props
- ✅ Make APIs easier to use

---

## 💻 Example

```jsx
function useToggle() {
  const [on, setOn] = useState(false);
  
  function getTogglerProps(props = {}) {
    return {
      'aria-pressed': on,
      onClick: () => setOn(prev => !prev),
      ...props
    };
  }
  
  return {
    on,
    getTogglerProps
  };
}

// Usage
function App() {
  const { on, getTogglerProps } = useToggle();
  
  return (
    <div>
      <button {...getTogglerProps()}>
        {on ? 'ON' : 'OFF'}
      </button>
      <button {...getTogglerProps({ className: 'custom' })}>
        Custom Toggle
      </button>
    </div>
  );
}
```

---

## ⏭️ Next: Final Project

[Final Project →](../18-final-project/README.md)
