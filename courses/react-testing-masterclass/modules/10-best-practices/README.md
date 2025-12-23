# Module 10: Testing Best Practices

## 🎯 Key Principles

---

## ✅ DO's

### Test User Behavior
```jsx
// ✅ Good - tests what user sees
test('shows welcome message', () => {
  render(<App />);
  expect(screen.getByText('Welcome')).toBeInTheDocument();
});

// ❌ Bad - tests implementation
test('sets state', () => {
  const { result } = renderHook(() => useState(0));
  expect(result.current[0]).toBe(0);
});
```

### Use Accessible Queries
```jsx
// ✅ Best
screen.getByRole('button', { name: /submit/i });

// ✅ Good
screen.getByLabelText('Email');

// ❌ Avoid
screen.getByTestId('submit-btn');
```

### Test Edge Cases
```jsx
test('handles empty list', () => {
  render(<TodoList todos={[]} />);
  expect(screen.getByText('No todos')).toBeInTheDocument();
});

test('handles loading state', () => {
  render(<UserProfile loading={true} />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('handles error state', () => {
  render(<UserProfile error="Failed to load" />);
  expect(screen.getByText(/failed/i)).toBeInTheDocument();
});
```

---

## ❌ DON'Ts

### Don't Test Implementation Details
```jsx
// ❌ Bad
expect(component.state.count).toBe(1);

// ✅ Good
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

### Don't Make Tests Too Specific
```jsx
// ❌ Fragile
expect(element).toHaveClass('btn btn-primary btn-lg');

// ✅ Better
expect(element).toHaveClass('btn-primary');
```

---

## 📏 Test Structure

```jsx
// AAA Pattern: Arrange, Act, Assert
test('user can login', async () => {
  // Arrange
  const user = userEvent.setup();
  render(<LoginForm />);
  
  // Act
  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.type(screen.getByLabelText('Password'), 'password123');
  await user.click(screen.getByRole('button', { name: /login/i }));
  
  // Assert
  expect(screen.getByText('Welcome back!')).toBeInTheDocument();
});
```

---

## 🎯 Test Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

---

## ⏭️ Next: Final Project

[Testing Project →](../24-final-project/README.md)
