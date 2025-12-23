# Module 6: Render Props Pattern

## 🎯 Learning Objectives

- ✅ Understand render props
- ✅ Share code with render props
- ✅ Implement flexible components
- ✅ Avoid wrapper hell
- ✅ Combine with hooks

---

## 📖 What are Render Props?

A technique where a component takes a function as a prop and calls it to render content.

```jsx
<DataProvider render={(data) => <div>{data}</div>} />
```

---

## 💻 Basic Example

```jsx
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return render(position);
}

// Usage
<Mouse render={({ x, y }) => (
  <div>Mouse at {x}, {y}</div>
)} />
```

---

## 🎯 Real Examples

### Toggle Component

```jsx
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  
  return children({
    on,
    toggle: () => setOn(prev => !prev)
  });
}

// Usage
<Toggle>
  {({ on, toggle }) => (
    <div>
      <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
      {on && <div>Content</div>}
    </div>
  )}
</Toggle>
```

---

## ⏭️ Next: State Reducer

[State Reducer Pattern →](../07-state-reducer/README.md)
