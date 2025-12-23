# useImperativeHandle - Ref Customization Hook

## 🎯 Learning Objectives

- ✅ Customize ref exposure
- ✅ Create imperative APIs
- ✅ Use with forwardRef
- ✅ Control child components
- ✅ Build reusable components

---

## 📖 What is useImperativeHandle?

Customizes the instance value exposed when using `ref` with `forwardRef`.

```jsx
useImperativeHandle(ref, createHandle, [deps]);
```

---

## 💻 Basic Examples

### Example 1: Custom Input

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    },
    setValue: (value) => {
      inputRef.current.value = value;
    },
    getValue: () => {
      return inputRef.current.value;
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// Usage
function App() {
  const inputRef = useRef();

  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Enter text" />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.clear()}>Clear</button>
      <button onClick={() => inputRef.current.setValue('Hello')}>Set Value</button>
      <button onClick={() => alert(inputRef.current.getValue())}>Get Value</button>
    </div>
  );
}
```

### Example 2: Video Player

```jsx
import { forwardRef, useRef, useImperativeHandle, useState } from 'react';

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
    stop: () => {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    },
    setVolume: (volume) => {
      videoRef.current.volume = Math.max(0, Math.min(1, volume));
    },
    seekTo: (time) => {
      videoRef.current.currentTime = time;
    },
    getCurrentTime: () => videoRef.current.currentTime,
    getDuration: () => videoRef.current.duration,
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
      <button onClick={() => playerRef.current.stop()}>Stop</button>
      <button onClick={() => playerRef.current.setVolume(0.5)}>50% Volume</button>
    </div>
  );
}
```

---

## 🎯 Advanced Examples

### Example 3: Modal with Imperative API

```jsx
import { forwardRef, useImperativeHandle, useState } from 'react';

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
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={() => setIsOpen(false)}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
});

// Usage
function App() {
  const confirmModalRef = useRef();
  const infoModalRef = useRef();

  const handleDelete = () => {
    confirmModalRef.current.open();
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => infoModalRef.current.open()}>Info</button>

      <Modal ref={confirmModalRef} title="Confirm Delete">
        <p>Are you sure?</p>
        <button onClick={() => confirmModalRef.current.close()}>Cancel</button>
        <button>Delete</button>
      </Modal>

      <Modal ref={infoModalRef} title="Information">
        <p>Some info here</p>
      </Modal>
    </div>
  );
}
```

### Example 4: Form with Validation

```jsx
import { forwardRef, useImperativeHandle, useState } from 'react';

const Form = forwardRef(({ onSubmit, children }, ref) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useImperativeHandle(ref, () => ({
    submit: () => {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values);
        return true;
      } else {
        setErrors(validationErrors);
        return false;
      }
    },
    reset: () => {
      setValues({});
      setErrors({});
    },
    setValues: (newValues) => setValues(newValues),
    getValues: () => values,
    setFieldValue: (field, value) => {
      setValues(prev => ({ ...prev, [field]: value }));
    },
    validateField: (field) => {
      const fieldError = validateSingleField(field, values[field]);
      setErrors(prev => ({ ...prev, [field]: fieldError }));
      return !fieldError;
    }
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    ref.current?.submit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {typeof children === 'function' 
        ? children({ values, errors, setValues, setErrors })
        : children
      }
    </form>
  );
});

// Usage
function App() {
  const formRef = useRef();

  const handleSave = () => {
    if (formRef.current.submit()) {
      console.log('Form submitted');
    }
  };

  const handleReset = () => {
    formRef.current.reset();
  };

  const fillTestData = () => {
    formRef.current.setValues({
      name: 'John Doe',
      email: 'john@example.com'
    });
  };

  return (
    <div>
      <button onClick={fillTestData}>Fill Test Data</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleReset}>Reset</button>

      <Form ref={formRef} onSubmit={console.log}>
        {/* Form fields */}
      </Form>
    </div>
  );
}
```

---

## ⚠️ Best Practices

### ✅ Do: Limit Exposed API

```jsx
// ✅ Good - only expose what's needed
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus(),
  clear: () => inputRef.current.value = ''
}));

// ❌ Bad - exposing entire DOM element
useImperativeHandle(ref, () => inputRef.current);
```

### ✅ Do: Use TypeScript

```typescript
interface CustomInputHandle {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
}

const CustomInput = forwardRef<CustomInputHandle, Props>((props, ref) => {
  // ...
});
```

### ❌ Don't: Overuse Imperative API

```jsx
// ❌ Bad - props would be better
const Component = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  
  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false)
  }));
  // ...
});

// ✅ Good - use props
function Component({ visible, onVisibilityChange }) {
  // ...
}
```

---

## 🏋️ Exercises

### Exercise 1: Carousel
Create carousel with imperative controls.

**API:**
- `next()`
- `prev()`
- `goTo(index)`
- `getCurrentIndex()`

### Exercise 2: Toast Notifications
Build toast system.

**API:**
- `success(message)`
- `error(message)`
- `warning(message)`
- `clear()`

### Exercise 3: Drawer
Create drawer component.

**API:**
- `open()`
- `close()`
- `toggle()`
- `setContent(content)`

---

## ➡️ Next Module

[useTransition - Concurrent Rendering →](../11-useTransition/README.md)
