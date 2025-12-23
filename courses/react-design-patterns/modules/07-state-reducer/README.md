# Module 7: State Reducer Pattern

## 🎯 Learning Objectives

- ✅ Inversion of control
- ✅ Allow state customization
- ✅ Build flexible components

---

## 💻 Example

```jsx
function useToggle({ reducer = (state, action) => action.nextState } = {}) {
  const [on, setOn] = useState(false);

  const toggle = () => {
    const nextState = !on;
    const action = { type: 'toggle', nextState };
    const newState = reducer(on, action);
    setOn(newState);
  };

  return { on, toggle };
}

// Custom reducer
function myReducer(state, action) {
  if (action.type === 'toggle' && tooManyClicks) {
    return state; // Don't toggle
  }
  return action.nextState;
}

const { on, toggle } = useToggle({ reducer: myReducer });
```

---

## ⏭️ Next Module

[Controlled Props Pattern →](../08-controlled-props/README.md)
