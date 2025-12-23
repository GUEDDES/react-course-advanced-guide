# Module 13: useId - Unique Identifiers

## 🎯 Learning Objectives

- ✅ Understand useId hook
- ✅ Generate unique IDs
- ✅ Solve SSR hydration issues
- ✅ Use with accessibility
- ✅ Avoid common mistakes

---

## 📖 What is useId?

Generates unique, stable IDs for accessibility attributes that work with server-side rendering.

```jsx
const id = useId();
```

**Benefits:**
- ✅ Stable across server/client
- ✅ No hydration mismatches
- ✅ Unique per component instance
- ✅ Works with concurrent features

---

## 💻 Basic Usage

### Problem: Manual IDs

```jsx
// ❌ Problems:
// 1. Not unique if component used twice
// 2. SSR/Client mismatch
// 3. Manual management

function Form() {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" />
    </div>
  );
}

// Used twice = duplicate IDs!
<Form />
<Form />
```

### Solution: useId

```jsx
import { useId } from 'react';

function Form() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} />
    </div>
  );
}

// ✅ Each instance gets unique ID
<Form /> // id: ":r1:"
<Form /> // id: ":r2:"
```

---

## 🎨 Accessibility Examples

### Example 1: Form Fields

```jsx
import { useId } from 'react';

function TextField({ label, type = 'text', ...props }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      
      <input
        id={id}
        type={type}
        aria-describedby={`${hintId} ${errorId}`}
        {...props}
      />
      
      <div id={hintId} className="hint">
        Enter your {label.toLowerCase()}
      </div>
      
      {props.error && (
        <div id={errorId} className="error" role="alert">
          {props.error}
        </div>
      )}
    </div>
  );
}

// Usage
function LoginForm() {
  return (
    <form>
      <TextField label="Email" type="email" />
      <TextField label="Password" type="password" />
    </form>
  );
}
```

### Example 2: Radio Groups

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
  const [size, setSize] = useState('medium');

  return (
    <RadioGroup
      label="Select size"
      options={[
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
      ]}
      value={size}
      onChange={setSize}
    />
  );
}
```

### Example 3: Combobox (Autocomplete)

```jsx
import { useId, useState } from 'react';

function Combobox({ label, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  
  const comboboxId = useId();
  const listboxId = `${comboboxId}-listbox`;

  return (
    <div>
      <label id={`${comboboxId}-label`} htmlFor={comboboxId}>
        {label}
      </label>
      
      <input
        id={comboboxId}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={`${comboboxId}-label`}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      
      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={`${comboboxId}-label`}
        >
          {options
            .filter(opt => opt.toLowerCase().includes(selected.toLowerCase()))
            .map((option, i) => (
              <li
                key={option}
                id={`${listboxId}-option-${i}`}
                role="option"
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
```

---

## 🌐 SSR Example

```jsx
import { useId } from 'react';

function NewsletterForm() {
  const id = useId();

  return (
    <form>
      <label htmlFor={id}>Subscribe to newsletter</label>
      <input id={id} type="email" />
    </form>
  );
}

// Server renders:
// <label for=":r1:">...</label>
// <input id=":r1:" />

// Client hydrates with SAME IDs:
// <label for=":r1:">...</label>
// <input id=":r1:" />

// ✅ No hydration mismatch!
```

---

## ⚠️ Common Mistakes

### ❌ Don't Use for Keys

```jsx
// ❌ Wrong - IDs change between renders in some cases
function List({ items }) {
  const id = useId();
  
  return (
    <ul>
      {items.map((item, i) => (
        <li key={`${id}-${i}`}>{item}</li>
      ))}
    </ul>
  );
}

// ✅ Correct - use stable keys
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### ❌ Don't Use for Data IDs

```jsx
// ❌ Wrong - not for database IDs
function createUser() {
  const id = useId();
  
  saveToDatabase({
    id: id, // Don't use for data!
    name: 'John'
  });
}

// ✅ Correct - generate on server
function createUser() {
  saveToDatabase({
    id: crypto.randomUUID(), // Or let DB generate
    name: 'John'
  });
}
```

---

## 💡 Advanced Patterns

### Pattern 1: Prefix for Multiple IDs

```jsx
function FormField({ label }) {
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const errorId = `${baseId}-error`;
  const hintId = `${baseId}-hint`;

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} aria-describedby={`${hintId} ${errorId}`} />
      <div id={hintId}>Hint text</div>
      <div id={errorId}>Error text</div>
    </div>
  );
}
```

### Pattern 2: Custom Hook

```jsx
import { useId } from 'react';

function useFormField(name) {
  const id = useId();
  
  return {
    fieldId: id,
    labelId: `${id}-label`,
    errorId: `${id}-error`,
    hintId: `${id}-hint`,
    name
  };
}

// Usage
function FormField({ label, name }) {
  const ids = useFormField(name);
  
  return (
    <div>
      <label id={ids.labelId} htmlFor={ids.fieldId}>
        {label}
      </label>
      <input
        id={ids.fieldId}
        name={ids.name}
        aria-labelledby={ids.labelId}
        aria-describedby={ids.hintId}
      />
      <div id={ids.hintId}>Helper text</div>
    </div>
  );
}
```

---

## 🏋️ Exercises

### Exercise 1: Accessible Tabs

Create tabs with proper ARIA attributes.

**Requirements:**
- Use useId for all IDs
- aria-controls
- aria-labelledby
- role="tablist", "tab", "tabpanel"

### Exercise 2: Modal Dialog

Build accessible modal.

**Requirements:**
- aria-labelledby
- aria-describedby
- Focus management
- Unique IDs per modal instance

---

## ➡️ Next Module

[useSyncExternalStore - External State →](../14-useSyncExternalStore/README.md)
