# Module 9: Test-Driven Development (TDD)

## 🎯 Objectives

- ✅ Understand TDD cycle
- ✅ Write tests first
- ✅ Red-Green-Refactor

---

## 🔴 Red-Green-Refactor Cycle

1. **🔴 Red**: Write failing test
2. **🟢 Green**: Make it pass
3. **🔵 Refactor**: Clean up code

---

## 💡 TDD Example

```jsx
// Step 1: 🔴 Write failing test
test('Counter increments', () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });
  const count = screen.getByText('Count: 0');
  
  userEvent.click(button);
  
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

// Step 2: 🟢 Make it pass
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Step 3: 🔵 Refactor
function Counter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(c => c + 1), []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

---

## ⏭️ Next Module

[Testing Best Practices →](../10-best-practices/README.md)
