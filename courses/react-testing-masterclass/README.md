# 🧪 React Testing Masterclass

Master testing in React applications from unit tests to end-to-end testing.

## 📚 Course Overview

Learn to write comprehensive tests for React applications using modern testing tools and best practices.

### What You'll Learn
- ✅ Testing fundamentals
- ✅ React Testing Library
- ✅ Jest configuration
- ✅ Component testing strategies
- ✅ Hook testing
- ✅ Integration testing
- ✅ End-to-End testing with Playwright
- ✅ TDD (Test-Driven Development)
- ✅ Mocking strategies
- ✅ Coverage analysis

### Prerequisites
- Solid React knowledge
- Understanding of JavaScript testing concepts
- Familiarity with async/await

### Course Duration
- **Estimated Time:** 12-15 hours
- **Level:** Beginner to Advanced
- **Includes:** 100+ test examples

---

## 📖 Course Modules

### Module 1: Testing Fundamentals
1. [Why Test React Apps](./modules/01-why-test/README.md)
2. [Testing Pyramid](./modules/02-testing-pyramid/README.md)
3. [Setting Up Testing Environment](./modules/03-setup/README.md)

### Module 2: Unit Testing
4. [Jest Basics](./modules/04-jest-basics/README.md)
5. [Testing React Components](./modules/05-component-testing/README.md)
6. [Testing Hooks](./modules/06-hook-testing/README.md)
7. [Snapshot Testing](./modules/07-snapshots/README.md)

### Module 3: React Testing Library
8. [RTL Philosophy](./modules/08-rtl-intro/README.md)
9. [Queries and Assertions](./modules/09-queries/README.md)
10. [User Interactions](./modules/10-user-events/README.md)
11. [Async Testing](./modules/11-async-testing/README.md)

### Module 4: Advanced Testing
12. [Testing Forms](./modules/12-forms/README.md)
13. [Testing API Calls](./modules/13-api-testing/README.md)
14. [Testing Redux/State Management](./modules/14-state-testing/README.md)
15. [Testing Router](./modules/15-router-testing/README.md)

### Module 5: Mocking
16. [Mock Functions](./modules/16-mock-functions/README.md)
17. [Mocking Modules](./modules/17-mock-modules/README.md)
18. [MSW (Mock Service Worker)](./modules/18-msw/README.md)

### Module 6: E2E Testing
19. [Playwright Setup](./modules/19-playwright/README.md)
20. [Writing E2E Tests](./modules/20-e2e-tests/README.md)
21. [CI/CD Integration](./modules/21-cicd/README.md)

### Module 7: Best Practices
22. [Test Organization](./modules/22-organization/README.md)
23. [Coverage Goals](./modules/23-coverage/README.md)
24. [Performance Testing](./modules/24-performance/README.md)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/GUEDDES/react-course-advanced-guide.git

# Navigate to course
cd react-course-advanced-guide/courses/react-testing-masterclass

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

---

## 📊 Testing Pyramid

```
        /\
       /  \     E2E Tests (10%)
      /____\    → Full user workflows
     /      \   
    /        \  Integration Tests (20%)
   /__________\ → Component interactions
  /            \
 /              \ Unit Tests (70%)
/________________\ → Individual functions/components
```

### Test Distribution
- **70% Unit Tests** - Fast, isolated, many
- **20% Integration Tests** - Medium speed, some mocking
- **10% E2E Tests** - Slow, no mocking, critical paths

---

## 💻 Example: Complete Test Suite

### Component to Test

```jsx
// UserProfile.jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  return (
    <div data-testid="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={() => alert(`Editing ${user.name}`)}>
        Edit Profile
      </button>
    </div>
  );
}

export default UserProfile;
```

### Unit Tests

```jsx
// UserProfile.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfile from './UserProfile';

// Mock fetch
global.fetch = jest.fn();

describe('UserProfile', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('shows loading state initially', () => {
    fetch.mockImplementation(() => new Promise(() => {}));
    
    render(<UserProfile userId="1" />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays user data after loading', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockUser
    });

    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch/)).toBeInTheDocument();
    });
  });

  it('shows alert when edit button is clicked', async () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' };
    fetch.mockResolvedValueOnce({ json: async () => mockUser });
    
    window.alert = jest.fn();
    const user = userEvent.setup();

    render(<UserProfile userId="1" />);

    await waitFor(() => screen.getByText('John Doe'));
    
    await user.click(screen.getByRole('button', { name: /edit profile/i }));
    
    expect(window.alert).toHaveBeenCalledWith('Editing John Doe');
  });

  it('fetches new user data when userId changes', async () => {
    const mockUser1 = { name: 'User 1', email: 'user1@example.com' };
    const mockUser2 = { name: 'User 2', email: 'user2@example.com' };

    fetch
      .mockResolvedValueOnce({ json: async () => mockUser1 })
      .mockResolvedValueOnce({ json: async () => mockUser2 });

    const { rerender } = render(<UserProfile userId="1" />);

    await waitFor(() => screen.getByText('User 1'));

    rerender(<UserProfile userId="2" />);

    await waitFor(() => screen.getByText('User 2'));
    
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
```

---

## 🧑‍💻 Testing Best Practices

### 1. Test Behavior, Not Implementation

```jsx
// ❌ Bad - testing implementation
expect(component.state.count).toBe(5);

// ✅ Good - testing behavior
expect(screen.getByText('Count: 5')).toBeInTheDocument();
```

### 2. Use Accessible Queries

```jsx
// ❌ Avoid
screen.getByTestId('submit-button');

// ✅ Prefer
screen.getByRole('button', { name: /submit/i });
```

### 3. Test User Interactions

```jsx
import userEvent from '@testing-library/user-event';

it('submits form on enter', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();
  
  render(<Form onSubmit={onSubmit} />);
  
  await user.type(screen.getByRole('textbox'), 'Hello{Enter}');
  
  expect(onSubmit).toHaveBeenCalledWith('Hello');
});
```

### 4. Clean Up After Tests

```jsx
afterEach(() => {
  jest.clearAllMocks();
  cleanup(); // RTL does this automatically
});
```

---

## 🔧 Testing Tools Comparison

| Tool | Purpose | When to Use |
|------|---------|-------------|
| **Jest** | Test runner | All tests |
| **React Testing Library** | Component testing | Unit/Integration |
| **Vitest** | Fast test runner | Vite projects |
| **Playwright** | E2E testing | Critical user flows |
| **MSW** | API mocking | Network requests |
| **Testing Library User Event** | User interactions | Simulating real usage |

---

## 🏋️ Projects

### Project 1: Todo App Testing
Write comprehensive tests for a todo application.

**Test Coverage:**
- Adding todos
- Completing todos
- Filtering todos
- LocalStorage persistence

### Project 2: E-Commerce Testing
Test a shopping cart feature.

**Test Coverage:**
- Adding to cart
- Updating quantities
- Checkout flow
- Payment integration (mocked)

### Project 3: Dashboard Testing
Test a real-time dashboard.

**Test Coverage:**
- Data fetching
- Real-time updates (WebSocket mocked)
- Error handling
- Performance

---

## 📊 Coverage Goals

### Minimum Targets
- **Statements:** 80%
- **Branches:** 75%
- **Functions:** 80%
- **Lines:** 80%

### Configuration

```javascript
// vitest.config.js
export default {
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80
    }
  }
};
```

---

## 📚 Resources

- [React Testing Library Docs](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)
- [Playwright Docs](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## 📝 License

MIT License - Free to use for learning!
