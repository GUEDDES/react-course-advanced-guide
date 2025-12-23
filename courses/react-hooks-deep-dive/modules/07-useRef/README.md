# Module 7: useRef - References Hook

## 🎯 Learning Objectives

- ✅ Understand useRef
- ✅ Access DOM elements
- ✅ Store mutable values
- ✅ Avoid re-renders
- ✅ Use with third-party libraries

---

## 📖 What is useRef?

useRef returns a mutable ref object whose `.current` property is initialized to the passed argument.

```jsx
const ref = useRef(initialValue);
```

**Key Points:**
- `.current` is mutable
- Doesn't cause re-renders when changed
- Persists across renders
- Same object reference

---

## 💻 DOM References

### Example 1: Focus Input

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

### Example 2: Scroll to Element

```jsx
import { useRef } from 'react';

function ScrollToSection() {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <button onClick={scrollToSection}>Scroll to Section</button>
      
      <div style={{ height: '100vh' }}>Content...</div>
      
      <div ref={sectionRef}>
        <h2>Target Section</h2>
      </div>
    </div>
  );
}
```

### Example 3: Measure Element

```jsx
import { useRef, useState, useLayoutEffect } from 'react';

function MeasureElement() {
  const elementRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <div>
      <div ref={elementRef} style={{ padding: '20px', background: '#eee' }}>
        <h1>Measure Me!</h1>
        <p>Some content here</p>
      </div>
      
      <p>Width: {dimensions.width}px</p>
      <p>Height: {dimensions.height}px</p>
    </div>
  );
}
```

---

## 🔄 Storing Mutable Values

### Example 1: Previous Value

```jsx
import { useState, useRef, useEffect } from 'react';

function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Example 2: Render Count

```jsx
import { useState, useRef, useEffect } from 'react';

function Component() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  // ✅ Doesn't cause re-render
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

### Example 3: Interval ID

```jsx
import { useState, useRef, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current !== null) return;
    
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current === null) return;
    
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  useEffect(() => {
    return () => stop(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

---

## 🎨 Advanced Use Cases

### Example 1: Video Player Controls

```jsx
import { useRef } from 'react';

function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  const play = () => videoRef.current.play();
  const pause = () => videoRef.current.pause();
  const restart = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  return (
    <div>
      <video ref={videoRef} src={src} />
      
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
}
```

### Example 2: Form Refs

```jsx
import { useRef } from 'react';

function Form() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    
    console.log(formData);
    
    // Reset form
    nameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
    
    // Focus first field
    nameRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} placeholder="Name" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Example 3: Canvas Drawing

```jsx
import { useRef, useEffect } from 'react';

function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
  }, []);

  return <canvas ref={canvasRef} width={200} height={200} />;
}
```

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Using for Reactive Values

```jsx
// ❌ Wrong - won't trigger re-render
function Counter() {
  const countRef = useRef(0);
  
  const increment = () => {
    countRef.current += 1;
    // Component won't re-render!
  };
  
  return <button onClick={increment}>{countRef.current}</button>;
}

// ✅ Correct - use useState
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### ❌ Mistake 2: Accessing .current in Render

```jsx
// ❌ Don't read ref during render
function Component() {
  const ref = useRef(0);
  ref.current += 1; // ❌ Side effect in render
  return <div>{ref.current}</div>;
}

// ✅ Use in effect or event handler
function Component() {
  const ref = useRef(0);
  
  useEffect(() => {
    ref.current += 1; // ✅ In effect
  });
  
  return <div>Component</div>;
}
```

---

## 🆚 useState vs useRef

| Feature | useState | useRef |
|---------|----------|--------|
| **Triggers re-render** | ✅ Yes | ❌ No |
| **Mutable** | ❌ No (use setter) | ✅ Yes (.current) |
| **Use for UI** | ✅ Yes | ❌ No |
| **Persists** | ✅ Yes | ✅ Yes |
| **DOM access** | ❌ No | ✅ Yes |

---

## 🏋️ Exercises

### Exercise 1: Click Outside Hook

Create `useClickOutside` hook.

**Requirements:**
- Detect clicks outside element
- Call callback when clicked outside
- Clean up event listeners

### Exercise 2: Infinite Scroll

Implement infinite scroll using refs.

**Requirements:**
- Detect when user reaches bottom
- Load more items
- Use IntersectionObserver

### Exercise 3: Debounced Input

Create debounced search input.

**Requirements:**
- Delay API calls
- Cancel previous timeouts
- Use useRef for timeout ID

---

## ⏭️ Next Module

[useReducer - State Management →](../08-useReducer/README.md)
