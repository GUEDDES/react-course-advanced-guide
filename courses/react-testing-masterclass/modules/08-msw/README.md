# Module 8: API Mocking with MSW

## 🎯 Objectives

- ✅ Mock API requests
- ✅ Test loading states
- ✅ Test error states
- ✅ Realistic data

---

## 🔧 Setup MSW

```bash
npm install msw --save-dev
```

```js
// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    });
  }),

  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();
    
    if (email === 'test@example.com' && password === 'password') {
      return HttpResponse.json({ token: 'abc123' });
    }
    
    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  })
];
```

---

## 🧪 Using in Tests

```js
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import { UserProfile } from './UserProfile';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays user data', async () => {
  render(<UserProfile userId={1} />);

  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});

test('handles error', async () => {
  server.use(
    http.get('/api/user', () => {
      return HttpResponse.json(
        { error: 'Not found' },
        { status: 404 }
      );
    })
  );

  render(<UserProfile userId={999} />);

  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

---

## ⏭️ Next Module

[Test-Driven Development →](../09-tdd/README.md)
