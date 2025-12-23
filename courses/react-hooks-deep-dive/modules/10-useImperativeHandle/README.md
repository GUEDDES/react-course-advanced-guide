# Module 10: useImperativeHandle - Ref Customization Hook

## 🎯 Learning Objectives

- ✅ Understand useImperativeHandle
- ✅ Customize ref values
- ✅ Use with forwardRef
- ✅ Create imperative APIs
- ✅ Know when to use it

---

## 📖 What is useImperativeHandle?

Customizes the instance value exposed when using `ref`. Used with `forwardRef`.

```jsx
useImperativeHandle(ref, () => ({
  // Exposed methods/properties
}), [dependencies]);
```

**Why use it?**
- Control what parent components can access
- Hide implementation details
- Provide custom API

---

## 💻 Basic Example

### Without useImperativeHandle

```jsx
import { useRef, forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

function Parent() {
  const inputRef = useRef();

  return (
    <div>
      <Input ref={inputRef} />
      {/* ✅ Can access ALL input DOM methods */}
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.select()}>Select</button>
    </div>
  );
}
```

### With useImperativeHandle

```jsx
import { useRef, forwardRef, useImperativeHandle } from 'react';

const Input = forwardRef((props, ref) => {
  const inputRef = useRef();

  // Expose ONLY specific methods
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));

  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const inputRef = useRef();

  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.clear()}>Clear</button>
      {/* ❌ inputRef.current.select() - NOT available */}
    </div>
  );
}
```

---

## 🎨 Real-World Examples

### Example 1: Custom Video Player

```jsx
import { useRef, forwardRef, useImperativeHandle, useState } from 'react';

const VideoPlayer = forwardRef(({ src }, ref) => {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      videoRef.current.play();
      setIsPlaying(true);
    },
    pause: () => {
      videoRef.current.pause();
      setIsPlaying(false);
    },
    seek: (time) => {
      videoRef.current.currentTime = time;
    },
    getCurrentTime: () => {
      return videoRef.current.currentTime;
    },
    getDuration: () => {
      return videoRef.current.duration;
    },
    setVolume: (level) => {
      videoRef.current.volume = Math.max(0, Math.min(1, level));
    },
    isPlaying: () => isPlaying
  }));

  return <video ref={videoRef} src={src} />;
});

// Usage
function App() {
  const playerRef = useRef();

  return (
    <div>
      <VideoPlayer ref={playerRef} src="video.mp4" />
      
      <button onClick={() => playerRef.current.play()}>Play</button>
      <button onClick={() => playerRef.current.pause()}>Pause</button>
      <button onClick={() => playerRef.current.seek(0)}>Restart</button>
      <button onClick={() => playerRef.current.setVolume(0.5)}>50% Volume</button>
    </div>
  );
}
```

### Example 2: Modal Component

```jsx
import { useRef, forwardRef, useImperativeHandle, useState } from 'react';

const Modal = forwardRef(({ title, children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev),
    isOpen: () => isOpen
  }));

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
});

// Usage
function App() {
  const modalRef = useRef();

  return (
    <div>
      <button onClick={() => modalRef.current.open()}>Open Modal</button>
      
      <Modal ref={modalRef} title="My Modal">
        <p>Modal content here</p>
      </Modal>
    </div>
  );
}
```

### Example 3: Form Component

```jsx
import { useRef, forwardRef, useImperativeHandle, useState } from 'react';

const Form = forwardRef(({ onSubmit }, ref) => {
  const [values, setValues] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  useImperativeHandle(ref, () => ({
    submit: () => {
      if (validate()) {
        onSubmit(values);
      }
    },
    reset: () => {
      setValues({ name: '', email: '' });
      setErrors({});
    },
    setFieldValue: (field, value) => {
      setValues(prev => ({ ...prev, [field]: value }));
    },
    getValues: () => values,
    isValid: () => Object.keys(validate()).length === 0
  }));

  const validate = () => {
    const newErrors = {};
    if (!values.name) newErrors.name = 'Required';
    if (!values.email) newErrors.email = 'Required';
    if (values.email && !values.email.includes('@')) {
      newErrors.email = 'Invalid email';
    }
    setErrors(newErrors);
    return newErrors;
  };

  return (
    <form onSubmit={e => {
      e.preventDefault();
      if (validate()) onSubmit(values);
    }}>
      <div>
        <input
          value={values.name}
          onChange={e => setValues({ ...values, name: e.target.value })}
          placeholder="Name"
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      
      <div>
        <input
          value={values.email}
          onChange={e => setValues({ ...values, email: e.target.value })}
          placeholder="Email"
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
});

// Usage
function App() {
  const formRef = useRef();

  const handleExternalSubmit = () => {
    if (formRef.current.isValid()) {
      formRef.current.submit();
    } else {
      alert('Form is invalid');
    }
  };

  return (
    <div>
      <Form ref={formRef} onSubmit={data => console.log(data)} />
      
      <button onClick={handleExternalSubmit}>Submit Externally</button>
      <button onClick={() => formRef.current.reset()}>Reset</button>
    </div>
  );
}
```

---

## ⚠️ Best Practices

### ✅ Do's

```jsx
// ✅ Expose minimal API
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus()
}));

// ✅ Use meaningful method names
useImperativeHandle(ref, () => ({
  openModal: () => setIsOpen(true),
  closeModal: () => setIsOpen(false)
}));

// ✅ Include dependencies
useImperativeHandle(ref, () => ({
  getValue: () => value
}), [value]);
```

### ❌ Don'ts

```jsx
// ❌ Exposing entire internal ref
useImperativeHandle(ref, () => internalRef.current);

// ❌ Mutating internal state directly
useImperativeHandle(ref, () => ({
  setState: setInternalState // Don't expose setState
}));

// ❌ Missing dependencies
useImperativeHandle(ref, () => ({
  getValue: () => value // Missing [value]
}));
```

---

## 🆚 forwardRef vs useImperativeHandle

| Approach | Use Case |
|----------|----------|
| **forwardRef only** | Full DOM access needed |
| **+ useImperativeHandle** | Custom API, hide implementation |

---

## 🏋️ Exercises

### Exercise 1: Audio Player

Create audio player with custom API.

**Methods:**
- play()
- pause()
- setVolume(level)
- seek(time)
- getProgress()

### Exercise 2: Carousel

Build carousel with imperative controls.

**Methods:**
- next()
- previous()
- goToSlide(index)
- getCurrentSlide()

### Exercise 3: Drawing Canvas

Create canvas with drawing API.

**Methods:**
- clear()
- undo()
- redo()
- save()
- load(data)

---

## ⏭️ Next Module

[React 18 Hooks (useTransition) →](../11-useTransition/README.md)
