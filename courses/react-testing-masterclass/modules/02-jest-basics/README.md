# Module 2: Jest Basics

## 🎯 Learning Objectives

- ✅ Write basic tests
- ✅ Use matchers
- ✅ Setup/teardown
- ✅ Mocking basics

---

## 📝 Basic Test Structure

```js
describe('Math operations', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });

  it('multiplies correctly', () => {
    expect(2 * 3).toBe(6);
  });
});
```

---

## ✅ Common Matchers

```js
// Equality
expect(value).toBe(4); // Strict equality
expect(obj).toEqual({ name: 'John' }); // Deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(5);
expect(value).toBeCloseTo(0.3); // Floating point

// Strings
expect(str).toMatch(/pattern/);
expect(str).toContain('substring');

// Arrays
expect(arr).toContain(item);
expect(arr).toHaveLength(3);

// Objects
expect(obj).toHaveProperty('name');
expect(obj).toMatchObject({ name: 'John' });

// Exceptions
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('error message');
```

---

## 🔄 Setup and Teardown

```js
describe('Database tests', () => {
  beforeAll(() => {
    // Runs once before all tests
    return initDB();
  });

  afterAll(() => {
    // Runs once after all tests
    return closeDB();
  });

  beforeEach(() => {
    // Runs before each test
    return seedDB();
  });

  afterEach(() => {
    // Runs after each test
    return clearDB();
  });

  test('insert works', () => {
    // Test code
  });
});
```

---

## 🎭 Mocking

```js
// Mock function
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// Mock return value
const mockFn = jest.fn().mockReturnValue(42);
expect(mockFn()).toBe(42);

// Mock implementation
const mockFn = jest.fn((x) => x * 2);
expect(mockFn(5)).toBe(10);

// Mock module
jest.mock('./api', () => ({
  fetchUser: jest.fn().mockResolvedValue({ name: 'John' })
}));
```

---

## ⏭️ Next Module

[React Testing Library →](../03-react-testing-library/README.md)
