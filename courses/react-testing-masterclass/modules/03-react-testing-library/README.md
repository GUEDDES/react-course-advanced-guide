# Module 3: React Testing Library

## 🎯 Objectives

- ✅ Query elements
- ✅ User interactions
- ✅ Async testing
- ✅ Accessibility

---

## 🔍 Queries

```jsx
import { render, screen } from '@testing-library/react';

// getBy - throws error if not found
const button = screen.getByRole('button', { name: /submit/i });
const heading = screen.getByText('Welcome');
const input = screen.getByLabelText('Email');

// queryBy - returns null if not found
const missing = screen.queryByText('Not here');
expect(missing).toBeNull();

// findBy - async, waits for element
const async = await screen.findByText('Loaded');

// getAllBy - returns array
const items = screen.getAllByRole('listitem');
expect(items).toHaveLength(3);
```

---

## 👆 User Interactions

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('user interactions', async () => {
  const user = userEvent.setup();
  render(<Form />);

  // Type in input
  const input = screen.getByRole('textbox');
  await user.type(input, 'Hello');
  expect(input).toHaveValue('Hello');

  // Click button
  const button = screen.getByRole('button');
  await user.click(button);

  // Select from dropdown
  const select = screen.getByRole('combobox');
  await user.selectOptions(select, 'Option 1');

  // Check checkbox
  const checkbox = screen.getByRole('checkbox');
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
});
```

---

## ⏱️ Async Testing

```jsx
import { render, screen, waitFor } from '@testing-library/react';

test('loads and displays data', async () => {
  render(<UserProfile userId={1} />);

  // Wait for element to appear
  const name = await screen.findByText('John Doe');
  expect(name).toBeInTheDocument();

  // Or use waitFor
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

---

## ♿ Accessibility Testing

```jsx
// Prefer accessible queries
screen.getByRole('button', { name: /submit/i }); // ✅ Best
screen.getByLabelText('Email'); // ✅ Good
screen.getByPlaceholderText('Enter email'); // ⚠️ OK
screen.getByTestId('submit-button'); // ❌ Last resort
```

---

## ⏭️ Next Module

[Testing Hooks →](../04-testing-hooks/README.md)
