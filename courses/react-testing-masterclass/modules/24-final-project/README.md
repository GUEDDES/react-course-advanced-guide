# Module 24: Testing Final Project

## 🎯 Project: Test a Full-Stack Application

### Overview

Write comprehensive tests for a complete task management application.

---

## 📝 Testing Requirements

### 1. Unit Tests (40%)

**Custom Hooks:**
- [ ] useAuth - login/logout/register
- [ ] useTasks - CRUD operations
- [ ] useLocalStorage - storage sync
- [ ] useDebounce - debouncing logic

**Utilities:**
- [ ] API client functions
- [ ] Validation helpers
- [ ] Date formatters

### 2. Component Tests (40%)

**Components:**
- [ ] LoginForm - form validation, submission
- [ ] TaskList - rendering, filtering
- [ ] TaskItem - toggle, edit, delete
- [ ] TaskForm - create/update tasks
- [ ] Header - navigation, user menu

### 3. Integration Tests (15%)

**User Flows:**
- [ ] Complete signup flow
- [ ] Create, edit, delete task flow
- [ ] Filter and search tasks
- [ ] Logout and re-login

### 4. E2E Tests (5%)

**Critical Paths:**
- [ ] User registration and login
- [ ] Task management workflow
- [ ] Cross-browser testing

---

## ✅ Test Coverage Requirements

```bash
# Target Coverage
Statements   : 80%
Branches     : 75%
Functions    : 80%
Lines        : 80%
```

---

## 📝 Test Examples

### Unit Test Example

```jsx
import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';

test('useAuth - login success', async () => {
  const { result } = renderHook(() => useAuth());

  await act(async () => {
    await result.current.login('test@example.com', 'password123');
  });

  expect(result.current.user).toEqual({
    id: 1,
    email: 'test@example.com',
    name: 'Test User'
  });
  expect(result.current.isAuthenticated).toBe(true);
});
```

### Component Test Example

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from './TaskForm';

test('TaskForm - creates new task', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();
  
  render(<TaskForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText('Title'), 'New Task');
  await user.type(screen.getByLabelText('Description'), 'Task description');
  await user.click(screen.getByRole('button', { name: /create/i }));

  expect(onSubmit).toHaveBeenCalledWith({
    title: 'New Task',
    description: 'Task description'
  });
});
```

### Integration Test Example

```jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskApp } from './TaskApp';
import { server } from './mocks/server';

test('complete task workflow', async () => {
  const user = userEvent.setup();
  render(<TaskApp />);

  // Login
  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.type(screen.getByLabelText('Password'), 'password123');
  await user.click(screen.getByRole('button', { name: /login/i }));

  // Wait for dashboard
  await waitFor(() => {
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  // Create task
  await user.type(screen.getByPlaceholderText('Add task'), 'Buy groceries');
  await user.click(screen.getByRole('button', { name: /add/i }));

  // Verify task appears
  expect(await screen.findByText('Buy groceries')).toBeInTheDocument();

  // Complete task
  const checkbox = screen.getByRole('checkbox');
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
});
```

### E2E Test Example

```js
import { test, expect } from '@playwright/test';

test('full user journey', async ({ page }) => {
  // Navigate to app
  await page.goto('http://localhost:3000');

  // Register
  await page.click('text=Sign Up');
  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="email"]', 'john@example.com');
  await page.fill('[name="password"]', 'secure123');
  await page.click('button:has-text("Register")');

  // Verify redirect to dashboard
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('h1')).toHaveText('Welcome, John Doe!');

  // Create task
  await page.fill('[placeholder="Add task"]', 'Test Task');
  await page.click('button:has-text("Add")');

  // Verify task created
  await expect(page.locator('text=Test Task')).toBeVisible();

  // Take screenshot
  await page.screenshot({ path: 'dashboard-with-task.png' });
});
```

---

## 🛠️ Setup

### MSW Handlers

```js
// mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json();
    
    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        user: { id: 1, email, name: 'Test User' },
        token: 'fake-token'
      });
    }
    
    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  http.get('/api/tasks', () => {
    return HttpResponse.json([
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true }
    ]);
  }),

  http.post('/api/tasks', async ({ request }) => {
    const task = await request.json();
    return HttpResponse.json({ id: Date.now(), ...task });
  })
];
```

---

## 🏆 Evaluation Criteria

| Category | Points |
|----------|--------|
| Unit tests coverage | 25 |
| Component tests | 25 |
| Integration tests | 20 |
| E2E tests | 15 |
| Test quality & organization | 10 |
| Documentation | 5 |
| **Total** | **100** |

---

## 📊 Success Metrics

- [ ] All tests passing
- [ ] Coverage > 80%
- [ ] No console errors/warnings
- [ ] Tests run in < 30 seconds
- [ ] E2E tests pass in all browsers

---

## 🎓 Congratulations!

You've completed the React Testing Masterclass!

**Skills Mastered:**
- ✅ Unit testing with Jest
- ✅ Component testing with RTL
- ✅ Hook testing
- ✅ Integration testing
- ✅ E2E testing with Playwright
- ✅ API mocking with MSW
- ✅ TDD methodology
- ✅ Testing best practices

### Next Steps

1. Apply testing to your projects
2. Maintain high coverage
3. Practice TDD
4. Explore [Performance Optimization →](../../react-performance-optimization/README.md)

---

**Test Everything! 🧪✅**
