# Module 2: Custom Hooks Pattern

## 🎯 Learning Objectives

- ✅ Create reusable custom hooks
- ✅ Extract component logic
- ✅ Compose hooks together
- ✅ Follow hooks best practices
- ✅ Test custom hooks

---

## 📖 What are Custom Hooks?

Custom hooks are JavaScript functions that use React hooks to encapsulate reusable logic.

**Rules:**
- Name starts with "use"
- Can call other hooks
- Return any value

---

## 💻 Basic Custom Hooks

### useToggle

```jsx
import { useState, useCallback } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue
  };
}

// Usage
function Modal() {
  const { value: isOpen, toggle, setFalse } = useToggle();

  return (
    <div>
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && (
        <div className="modal">
          <button onClick={setFalse}>Close</button>
        </div>
      )}
    </div>
  );
}
```

### useLocalStorage

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'en');

  return (
    <div>
      <select value={theme} onChange={e => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
```

### useDebounce

```jsx
import { useState, useEffect } from 'react';

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // Make API call
      console.log('Searching for:', debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

## 💪 Advanced Custom Hooks

### useFetch

```jsx
import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      
      try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}
```

### useForm

```jsx
import { useState, useCallback } from 'react';

function useForm(initialValues = {}, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    if (validate) {
      const fieldError = validate(name, values[name], values);
      if (fieldError) {
        setErrors(prev => ({ ...prev, [name]: fieldError }));
      }
    }
  }, [validate, values]);

  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      e.preventDefault();
      
      // Validate all fields
      if (validate) {
        const newErrors = {};
        Object.keys(values).forEach(name => {
          const error = validate(name, values[name], values);
          if (error) newErrors[name] = error;
        });
        
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
      }
      
      await onSubmit(values);
    };
  }, [validate, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  };
}

// Usage
function LoginForm() {
  const validate = (name, value) => {
    if (name === 'email' && !value.includes('@')) {
      return 'Invalid email';
    }
    if (name === 'password' && value.length < 8) {
      return 'Password must be at least 8 characters';
    }
  };

  const form = useForm({ email: '', password: '' }, validate);

  const onSubmit = async (values) => {
    console.log('Submitting:', values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <input
          type="email"
          value={form.values.email}
          onChange={e => form.handleChange('email', e.target.value)}
          onBlur={() => form.handleBlur('email')}
        />
        {form.touched.email && form.errors.email && (
          <span className="error">{form.errors.email}</span>
        )}
      </div>

      <div>
        <input
          type="password"
          value={form.values.password}
          onChange={e => form.handleChange('password', e.target.value)}
          onBlur={() => form.handleBlur('password')}
        />
        {form.touched.password && form.errors.password && (
          <span className="error">{form.errors.password}</span>
        )}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 🏋️ Exercises

### Exercise 1: useAsync
Create a hook for async operations.

**Requirements:**
- Execute async function
- Track loading, data, error
- Support cancellation
- Retry functionality

### Exercise 2: useIntersectionObserver
Create a hook for intersection observer.

**Requirements:**
- Observe element visibility
- Configurable threshold
- Lazy loading support

### Exercise 3: useMediaQuery
Create a hook for media queries.

**Requirements:**
- Match media query
- Update on change
- SSR support

---

## ⏭️ Next Module

[Provider Pattern →](../03-provider-pattern/README.md)
