# Module 5: Testing React Components

## 🎯 Learning Objectives

- ✅ Test component rendering
- ✅ Test props and state
- ✅ Test user interactions
- ✅ Test conditional rendering
- ✅ Write maintainable tests

---

## 📖 Testing Philosophy

### Test Behavior, Not Implementation

❌ **Bad:** Testing implementation details
```jsx
expect(component.state.count).toBe(5);
expect(component.find('.button').length).toBe(1);
```

✅ **Good:** Testing user-visible behavior
```jsx
expect(screen.getByText('Count: 5')).toBeInTheDocument();
expect(screen.getByRole('button')).toBeInTheDocument();
```

---

## 💻 Basic Component Testing

### Example 1: Simple Component

**Component:**
```jsx
// Button.jsx
function Button({ label, onClick, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;
```

**Tests:**
```jsx
// Button.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button label="Click" onClick={handleClick} />);
    
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Click" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button label="Click" onClick={handleClick} disabled />);
    
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

---

### Example 2: Stateful Component

**Component:**
```jsx
// Counter.jsx
import { useState } from 'react';

function Counter({ initialCount = 0, step = 1 }) {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + step)}>Increment</button>
      <button onClick={() => setCount(count - step)}>Decrement</button>
      <button onClick={() => setCount(initialCount)}>Reset</button>
    </div>
  );
}

export default Counter;
```

**Tests:**
```jsx
// Counter.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  it('displays initial count', () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });

  it('increments count when increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    await user.click(screen.getByRole('button', { name: /increment/i }));
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('decrements count when decrement button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={5} />);
    
    await user.click(screen.getByRole('button', { name: /decrement/i }));
    
    expect(screen.getByText('Count: 4')).toBeInTheDocument();
  });

  it('increments by custom step', async () => {
    const user = userEvent.setup();
    render(<Counter step={5} />);
    
    await user.click(screen.getByRole('button', { name: /increment/i }));
    
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });

  it('resets to initial count', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={10} />);
    
    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText('Count: 11')).toBeInTheDocument();
    
    await user.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByText('Count: 10')).toBeInTheDocument();
  });
});
```

---

### Example 3: Conditional Rendering

**Component:**
```jsx
// Alert.jsx
function Alert({ type = 'info', message, onClose }) {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  const colors = {
    info: 'blue',
    success: 'green',
    warning: 'orange',
    error: 'red'
  };

  if (!message) return null;

  return (
    <div className={`alert alert-${type}`} style={{ color: colors[type] }}>
      <span className="icon">{icons[type]}</span>
      <span className="message">{message}</span>
      {onClose && (
        <button onClick={onClose} aria-label="Close alert">
          ×
        </button>
      )}
    </div>
  );
}

export default Alert;
```

**Tests:**
```jsx
// Alert.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Alert from './Alert';

describe('Alert', () => {
  it('renders nothing when no message', () => {
    const { container } = render(<Alert />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders message when provided', () => {
    render(<Alert message="Test alert" />);
    expect(screen.getByText('Test alert')).toBeInTheDocument();
  });

  it('renders different types correctly', () => {
    const types = ['info', 'success', 'warning', 'error'];
    
    types.forEach(type => {
      const { container } = render(<Alert type={type} message="Test" />);
      expect(container.firstChild).toHaveClass(`alert-${type}`);
    });
  });

  it('renders close button when onClose provided', () => {
    render(<Alert message="Test" onClose={() => {}} />);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('does not render close button without onClose', () => {
    render(<Alert message="Test" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    
    render(<Alert message="Test" onClose={handleClose} />);
    
    await user.click(screen.getByRole('button', { name: /close/i }));
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
```

---

## 🏋️ Exercises

### Exercise 1: TodoItem Component

**Requirements:**
- Display todo text
- Checkbox to toggle completion
- Delete button
- Edit mode

**Write tests for:**
- [ ] Renders todo text
- [ ] Toggles completion
- [ ] Deletes todo
- [ ] Enters edit mode
- [ ] Saves edited text
- [ ] Cancels edit

### Exercise 2: SearchBar Component

**Requirements:**
- Input field
- Search button
- Clear button
- Debounced onChange

**Write tests for:**
- [ ] Updates input value
- [ ] Calls onSearch
- [ ] Clears input
- [ ] Disables when loading
- [ ] Shows error message

---

## 📚 Resources

- [React Testing Library Docs](https://testing-library.com/react)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## ⏭️ Next Module

[Testing Hooks →](../06-hook-testing/README.md)
