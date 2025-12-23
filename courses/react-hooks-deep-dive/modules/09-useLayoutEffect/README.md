# Module 9: useLayoutEffect - Synchronous Effects Hook

## 🎯 Learning Objectives

- ✅ Understand useLayoutEffect
- ✅ Difference from useEffect
- ✅ When to use it
- ✅ Measure DOM elements
- ✅ Prevent visual flicker

---

## 📖 What is useLayoutEffect?

Runs synchronously after DOM mutations but before browser paint.

```jsx
useLayoutEffect(() => {
  // DOM mutations
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

---

## 🆚 useEffect vs useLayoutEffect

### Execution Timeline

```
1. React updates DOM
2. useLayoutEffect runs ⚡ (SYNCHRONOUS - blocks paint)
3. Browser paints screen 🎨
4. useEffect runs ✨ (ASYNCHRONOUS)
```

### Visual Comparison

```jsx
// useEffect - may cause flicker
function Component() {
  const [color, setColor] = useState('red');

  useEffect(() => {
    // Runs AFTER paint - user sees red briefly
    setColor('blue');
  }, []);

  return <div style={{ color }}>Text</div>;
}

// useLayoutEffect - no flicker
function Component() {
  const [color, setColor] = useState('red');

  useLayoutEffect(() => {
    // Runs BEFORE paint - user only sees blue
    setColor('blue');
  }, []);

  return <div style={{ color }}>Text</div>;
}
```

---

## 💻 Common Use Cases

### Example 1: Measure DOM Element

```jsx
import { useState, useLayoutEffect, useRef } from 'react';

function Tooltip({ children, text }) {
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    // Measure before paint to position correctly
    const height = tooltipRef.current.getBoundingClientRect().height;
    setTooltipHeight(height);
  }, [text]); // Re-measure when text changes

  return (
    <div className="tooltip-container">
      {children}
      <div
        ref={tooltipRef}
        className="tooltip"
        style={{ top: `-${tooltipHeight + 10}px` }}
      >
        {text}
      </div>
    </div>
  );
}
```

### Example 2: Scroll to Element

```jsx
import { useLayoutEffect, useRef } from 'react';

function ChatMessages({ messages }) {
  const bottomRef = useRef(null);

  useLayoutEffect(() => {
    // Scroll before paint - smooth UX
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="messages">
      {messages.map(msg => (
        <div key={msg.id}>{msg.text}</div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
```

### Example 3: Animate on Mount

```jsx
import { useLayoutEffect, useRef } from 'react';

function FadeIn({ children }) {
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    
    // Set initial state before paint
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';

    // Trigger animation
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.3s';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }, []);

  return <div ref={elementRef}>{children}</div>;
}
```

---

## 🎯 Real-World Examples

### Example 1: Dynamic Positioning

```jsx
import { useState, useLayoutEffect, useRef } from 'react';

function Dropdown({ trigger, children }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    let top = triggerRect.bottom;
    let left = triggerRect.left;

    // Check if menu fits below trigger
    if (top + menuRect.height > viewportHeight) {
      // Position above
      top = triggerRect.top - menuRect.height;
    }

    setPosition({ top, left });
  }, [isOpen]);

  return (
    <div>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
```

### Example 2: Text Truncation

```jsx
import { useState, useLayoutEffect, useRef } from 'react';

function TruncatedText({ text, maxLines = 3 }) {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const element = textRef.current;
    const lineHeight = parseInt(getComputedStyle(element).lineHeight);
    const maxHeight = lineHeight * maxLines;

    setIsTruncated(element.scrollHeight > maxHeight);
  }, [text, maxLines]);

  return (
    <div>
      <div
        ref={textRef}
        style={{
          maxHeight: `${maxLines * 1.5}em`,
          overflow: 'hidden'
        }}
      >
        {text}
      </div>
      {isTruncated && <button>Read More</button>}
    </div>
  );
}
```

---

## ⚠️ When NOT to Use

### ❌ Use useEffect Instead

```jsx
// ❌ Don't use for data fetching
useLayoutEffect(() => {
  fetch('/api/data').then(setData);
}, []);

// ✅ Use useEffect
useEffect(() => {
  fetch('/api/data').then(setData);
}, []);

// ❌ Don't use for subscriptions
useLayoutEffect(() => {
  const unsubscribe = subscribe();
  return () => unsubscribe();
}, []);

// ✅ Use useEffect
useEffect(() => {
  const unsubscribe = subscribe();
  return () => unsubscribe();
}, []);
```

### ⚡ Performance Warning

```jsx
// ❌ Blocks rendering - use sparingly!
useLayoutEffect(() => {
  // Heavy computation
  for (let i = 0; i < 1000000; i++) {
    // ...
  }
});
```

---

## 📊 Performance Impact

```jsx
function PerformanceTest() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect - non-blocking');
  });

  useLayoutEffect(() => {
    console.log('useLayoutEffect - blocking');
    // Simulating heavy work
    const start = Date.now();
    while (Date.now() - start < 100) {}
  });

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Result: Button click feels sluggish due to useLayoutEffect blocking
```

---

## 🏋️ Exercises

### Exercise 1: Resizable Panel

Create a panel that adjusts height based on content.

**Requirements:**
- Measure content height
- Animate height changes
- No visual flicker

### Exercise 2: Virtual Keyboard

Handle mobile virtual keyboard.

**Requirements:**
- Adjust layout when keyboard appears
- Scroll to focused input
- Use useLayoutEffect

---

## ⏭️ Next Module

[useImperativeHandle - Ref Customization →](../10-useImperativeHandle/README.md)
