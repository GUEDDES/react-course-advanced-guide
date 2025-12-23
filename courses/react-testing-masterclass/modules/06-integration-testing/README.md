# Module 6: Integration Testing

## 🎯 Objectives

- ✅ Test component integration
- ✅ Test data flow
- ✅ Test user workflows

---

## 🔗 Integration Test Example

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoApp } from './TodoApp';

test('complete todo workflow', async () => {
  const user = userEvent.setup();
  render(<TodoApp />);

  // Add todo
  const input = screen.getByPlaceholderText('Add todo');
  await user.type(input, 'Buy milk');
  await user.click(screen.getByRole('button', { name: /add/i }));

  // Verify it appears
  expect(screen.getByText('Buy milk')).toBeInTheDocument();

  // Mark as complete
  const checkbox = screen.getByRole('checkbox');
  await user.click(checkbox);
  expect(checkbox).toBeChecked();

  // Delete todo
  await user.click(screen.getByRole('button', { name: /delete/i }));
  expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
});
```

---

## ⏭️ Next Module

[E2E Testing with Playwright →](../07-e2e-testing/README.md)
