# Module 7: E2E Testing with Playwright

## 🎯 Objectives

- ✅ Setup Playwright
- ✅ Write E2E tests
- ✅ Test user flows
- ✅ Visual testing

---

## 🚀 Setup

```bash
npm init playwright@latest
```

---

## 🧪 Basic E2E Test

```js
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Fill login form
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Verify redirect
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await expect(page.locator('h1')).toHaveText('Dashboard');
});
```

---

## 📸 Visual Testing

```js
test('homepage screenshot', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

---

## ⏭️ Next Module

[API Mocking with MSW →](../08-msw/README.md)
