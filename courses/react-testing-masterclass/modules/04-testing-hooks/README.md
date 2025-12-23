# Module 4: Testing Hooks

## 🎯 Objectives

- ✅ Test custom hooks
- ✅ Use @testing-library/react-hooks
- ✅ Handle async hooks

---

## 🎣 Testing Custom Hooks

```jsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('useCounter', () => {
  const { result } = renderHook(() => useCounter(0));

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

---

## 🔄 Re-rendering Hooks

```jsx
test('useCounter with initial value', () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useCounter(initialValue),
    { initialProps: { initialValue: 0 } }
  );

  expect(result.current.count).toBe(0);

  // Change props
  rerender({ initialValue: 10 });
  expect(result.current.count).toBe(10);
});
```

---

## ⏱️ Async Hooks

```jsx
import { renderHook, waitFor } from '@testing-library/react';

test('useFetch', async () => {
  const { result } = renderHook(() => useFetch('/api/user'));

  expect(result.current.loading).toBe(true);

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.data).toEqual({ name: 'John' });
});
```

---

## ⏭️ Next Module

[Integration Testing →](../06-integration-testing/README.md)
