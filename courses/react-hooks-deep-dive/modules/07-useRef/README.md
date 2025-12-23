# useRef - References Hook

## 🎯 Learning Objectives

- ✅ Access DOM elements
- ✅ Store mutable values
- ✅ Persist values across renders
- ✅ Understand ref vs state
- ✅ Use forwardRef

---

## 📖 What is useRef?

useRef returns a mutable ref object whose `.current` property persists across renders without causing re-renders.

```jsx
const ref = useRef(initialValue);
// ref = { current: initialValue }
```

---

## 💻 Basic Examples

### Example 1: DOM Access

```jsx
import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused" />;
}
```

### Example 2: Storing Previous Value

```jsx
import { useState, useRef, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  });

  const prevCount = prevCountRef.current;

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Example 3: Timer Reference

```jsx
import { useState, useRef } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return;
    
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  return (
    <div>
      <p>Time: {time}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

---

## 🎯 Advanced Use Cases

### Example 4: Scroll to Element

```jsx
import { useRef } from 'react';

function ScrollToSection() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <nav>
        <button onClick={() => scrollToSection(section1Ref)}>Section 1</button>
        <button onClick={() => scrollToSection(section2Ref)}>Section 2</button>
        <button onClick={() => scrollToSection(section3Ref)}>Section 3</button>
      </nav>

      <section ref={section1Ref}>Section 1 Content</section>
      <section ref={section2Ref}>Section 2 Content</section>
      <section ref={section3Ref}>Section 3 Content</section>
    </div>
  );
}
```

### Example 5: Render Count Tracker

```jsx
import { useState, useRef, useEffect } from 'react';

function RenderTracker() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <p>Component rendered {renderCount.current} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Example 6: Custom Video Player

```jsx
import { useRef, useState } from 'react';

function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    console.log('Current time:', videoRef.current.currentTime);
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
      />
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
```

---

## 🔄 forwardRef

### Example 7: Forwarding Refs

```jsx
import { forwardRef, useRef } from 'react';

// Child component with forwardRef
const FancyInput = forwardRef((props, ref) => (
  <input ref={ref} className="fancy-input" {...props} />
));

// Parent component
function Form() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Input value:', inputRef.current.value);
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FancyInput ref={inputRef} placeholder="Enter text" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Example 8: useImperativeHandle Preview

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
    setValue: (value) => { inputRef.current.value = value; }
  }));

  return <input ref={inputRef} {...props} />;
});

function App() {
  const customInputRef = useRef();

  return (
    <div>
      <CustomInput ref={customInputRef} />
      <button onClick={() => customInputRef.current.focus()}>Focus</button>
      <button onClick={() => customInputRef.current.clear()}>Clear</button>
      <button onClick={() => customInputRef.current.setValue('Hello')}>Set</button>
    </div>
  );
}
```

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Using ref.current in Dependencies

```jsx
// ❌ Wrong - ref.current changes don't trigger useEffect
useEffect(() => {
  console.log(divRef.current);
}, [divRef.current]);

// ✅ Correct - use callback ref or separate state
useEffect(() => {
  console.log(divRef.current);
}, []); // Run once or use other dependencies
```

### ❌ Mistake 2: Confusing ref with state

```jsx
// ❌ Wrong - updating ref doesn't trigger re-render
const countRef = useRef(0);
const increment = () => {
  countRef.current += 1; // Component won't re-render!
};

// ✅ Correct - use state for values that affect rendering
const [count, setCount] = useState(0);
const increment = () => setCount(count + 1);
```

---

## 📊 useRef vs useState

| Feature | useRef | useState |
|---------|--------|----------|
| **Triggers re-render** | ❌ No | ✅ Yes |
| **Persists across renders** | ✅ Yes | ✅ Yes |
| **Mutable** | ✅ Yes | ❌ No (use setter) |
| **Use for** | DOM, timers, values | UI state |
| **Update method** | `ref.current = value` | `setValue(value)` |

---

## 🏋️ Exercises

### Exercise 1: Click Outside Handler
Create a component that detects clicks outside.

**Requirements:**
- Use useRef for element
- Close on outside click
- Cleanup event listeners

### Exercise 2: Infinite Scroll
Implement infinite scroll.

**Requirements:**
- Detect bottom of page
- Load more items
- Use ref for scroll position

### Exercise 3: Canvas Drawing
Create a drawing canvas.

**Requirements:**
- Use ref for canvas element
- Track mouse position
- Draw on canvas

---

## ➡️ Next Module

[useReducer - State Reducer →](../08-useReducer/README.md)
