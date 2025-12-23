# Module 13: useId - Unique IDs Hook

## 🎯 Learning Objectives

- ✅ Understand useId
- ✅ Generate unique IDs
- ✅ Fix accessibility issues
- ✅ Handle SSR properly
- ✅ Use in forms and labels

---

## 📖 What is useId?

Generates unique IDs that are stable across server and client renders.

```jsx
const id = useId();
```

**Why not just use Math.random()?**
- ❌ Different IDs on server vs client (hydration mismatch)
- ❌ Not deterministic
- ✅ useId is stable and SSR-safe

---

## 💻 Basic Usage

### Form Labels

```jsx
import { useId } from 'react';

function TextField({ label, type = 'text' }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </div>
  );
}

// Usage
function Form() {
  return (
    <form>
      <TextField label="Name" />
      <TextField label="Email" type="email" />
      <TextField label="Password" type="password" />
    </form>
  );
}

// Generated IDs:
// :r0: (Name)
// :r1: (Email)
// :r2: (Password)
```

### Aria Attributes

```jsx
import { useId } from 'react';

function Tooltip({ children, text }) {
  const id = useId();

  return (
    <>
      <button aria-describedby={id}>
        {children}
      </button>
      <div role="tooltip" id={id}>
        {text}
      </div>
    </>
  );
}
```

---

## 🎨 Real-World Examples

### Example 1: Accessible Form Field

```jsx
import { useId } from 'react';

function FormField({ label, error, helperText, ...inputProps }) {
  const id = useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={
          error ? errorId : helperText ? helperId : undefined
        }
        {...inputProps}
      />
      
      {error && (
        <span id={errorId} className="error" role="alert">
          {error}
        </span>
      )}
      
      {helperText && !error && (
        <span id={helperId} className="helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
}

// Usage
function LoginForm() {
  return (
    <form>
      <FormField
        label="Email"
        type="email"
        helperText="We'll never share your email"
      />
      <FormField
        label="Password"
        type="password"
        error="Password must be at least 8 characters"
      />
    </form>
  );
}
```

### Example 2: Radio Group

```jsx
import { useId } from 'react';

function RadioGroup({ label, options, value, onChange }) {
  const groupId = useId();

  return (
    <fieldset>
      <legend>{label}</legend>
      {options.map((option, index) => {
        const id = `${groupId}-${index}`;
        return (
          <div key={option.value}>
            <input
              type="radio"
              id={id}
              name={groupId}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <label htmlFor={id}>{option.label}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

// Usage
function Survey() {
  const [satisfaction, setSatisfaction] = useState('');

  return (
    <RadioGroup
      label="How satisfied are you?"
      value={satisfaction}
      onChange={setSatisfaction}
      options={[
        { value: '1', label: 'Very Unsatisfied' },
        { value: '2', label: 'Unsatisfied' },
        { value: '3', label: 'Neutral' },
        { value: '4', label: 'Satisfied' },
        { value: '5', label: 'Very Satisfied' }
      ]}
    />
  );
}
```

### Example 3: Accordion with ARIA

```jsx
import { useState, useId } from 'react';

function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const headerId = `${id}-header`;
  const panelId = `${id}-panel`;

  return (
    <div className="accordion-item">
      <button
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      
      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function FAQ() {
  return (
    <div>
      <AccordionItem title="What is React?">
        React is a JavaScript library for building user interfaces.
      </AccordionItem>
      <AccordionItem title="What is useId?">
        useId generates unique IDs for accessibility.
      </AccordionItem>
    </div>
  );
}
```

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Using for Keys

```jsx
// ❌ Wrong - useId is NOT for list keys
function List({ items }) {
  return items.map(item => {
    const id = useId(); // New ID on every render!
    return <li key={id}>{item}</li>;
  });
}

// ✅ Correct - use stable keys
function List({ items }) {
  return items.map(item => (
    <li key={item.id}>{item.name}</li>
  ));
}
```

### ❌ Mistake 2: Generating Multiple IDs

```jsx
// ❌ Wrong - calling useId multiple times
function Form() {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  // ...
}

// ✅ Correct - use one ID as base
function Form() {
  const id = useId();
  return (
    <>
      <input id={`${id}-name`} />
      <input id={`${id}-email`} />
      <input id={`${id}-phone`} />
    </>
  );
}
```

---

## 🏋️ Exercises

### Exercise 1: Accessible Select

Create a custom select with proper ARIA.

**Requirements:**
- Label association
- Error messages
- Helper text
- Keyboard navigation

### Exercise 2: Tabs Component

Build accessible tabs.

**Requirements:**
- Tab panel association
- ARIA attributes
- Keyboard support
- Multiple instances

---

## 📚 Best Practices

1. **Use for accessibility** - Labels, ARIA attributes
2. **Prefix for related IDs** - `${id}-error`, `${id}-helper`
3. **One per component** - Generate once, reuse
4. **Not for list keys** - Keys should be stable

---

## ⏭️ Next Module

[useSyncExternalStore - External State →](../14-useSyncExternalStore/README.md)
