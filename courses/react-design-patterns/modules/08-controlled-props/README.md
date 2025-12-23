# Module 8: Controlled Props Pattern

## 🎯 Objectives

- ✅ Allow external control
- ✅ Support both controlled and uncontrolled

---

## 💻 Example

```jsx
function useControlledState(controlledValue, defaultValue) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const value = isControlled ? controlledValue : internalValue;
  const setValue = isControlled ? () => {} : setInternalValue;
  
  return [value, setValue];
}

function Input({ value: controlledValue, onChange, ...props }) {
  const [value, setValue] = useControlledState(controlledValue, '');
  
  return (
    <input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange?.(e);
      }}
      {...props}
    />
  );
}

// Uncontrolled
<Input />

// Controlled
<Input value={value} onChange={setValue} />
```

---

## ⏭️ Next Module

[Props Getters Pattern →](../09-props-getters/README.md)
