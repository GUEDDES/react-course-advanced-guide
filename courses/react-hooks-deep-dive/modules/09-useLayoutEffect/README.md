# useLayoutEffect - Synchronous Effect Hook

## 🎯 Learning Objectives

- ✅ Understand useLayoutEffect
- ✅ Know difference from useEffect
- ✅ Prevent visual flicker
- ✅ Measure DOM before paint
- ✅ Use correctly and sparingly

---

## 📖 useLayoutEffect vs useEffect

### Execution Order

```
Render → useLayoutEffect → Browser Paint → useEffect
```

| Hook | When it runs | Blocks paint | Use case |
|------|--------------|--------------|----------|
| **useEffect** | After paint | ❌ No | Most side effects |
| **useLayoutEffect** | Before paint | ✅ Yes | DOM measurements |

---

## 💻 Examples

### Example 1: Preventing Flicker

```jsx
import { useState, useLayoutEffect, useRef } from 'react';

// ❌ With useEffect - flickers
function TooltipWithEffect({ text }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef();

  useEffect(() => {
    const rect = tooltipRef.current.getBoundingClientRect();
    // User might see tooltip jump to new position
    setPosition({ x: rect.width, y: rect.height });
  }, []);

  return (
    <div ref={tooltipRef} style={{ left: position.x, top: position.y }}>
      {text}
    </div>
  );
}

// ✅ With useLayoutEffect - no flicker
function TooltipWithLayoutEffect({ text }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef();

  useLayoutEffect(() => {
    const rect = tooltipRef.current.getBoundingClientRect();
    // Position set before browser paints
    setPosition({ x: rect.width, y: rect.height });
  }, []);

  return (
    <div ref={tooltipRef} style={{ left: position.x, top: position.y }}>
      {text}
    </div>
  );
}
```

### Example 2: Measuring DOM Elements

```jsx
import { useState, useLayoutEffect, useRef } from 'react';

function AutoSizeTextarea() {
  const textareaRef = useRef();
  const [height, setHeight] = useState('auto');

  useLayoutEffect(() => {
    // Measure before paint
    const scrollHeight = textareaRef.current.scrollHeight;
    setHeight(`${scrollHeight}px`);
  });

  return (
    <textarea
      ref={textareaRef}
      style={{ height }}
      onChange={() => setHeight('auto')}
    />
  );
}
```

### Example 3: Scroll Position Restoration

```jsx
import { useLayoutEffect, useRef } from 'react';

function ScrollRestoration({ scrollKey }) {
  const containerRef = useRef();

  useLayoutEffect(() => {
    // Restore scroll before paint
    const savedPosition = sessionStorage.getItem(scrollKey);
    if (savedPosition && containerRef.current) {
      containerRef.current.scrollTop = parseInt(savedPosition, 10);
    }

    // Save on unmount
    return () => {
      if (containerRef.current) {
        sessionStorage.setItem(
          scrollKey,
          containerRef.current.scrollTop.toString()
        );
      }
    };
  }, [scrollKey]);

  return (
    <div ref={containerRef} style={{ height: '400px', overflow: 'auto' }}>
      {/* Content */}
    </div>
  );
}
```

### Example 4: Animation Preparation

```jsx
import { useState, useLayoutEffect, useRef } from 'react';

function AnimatedBox() {
  const boxRef = useRef();
  const [startPosition, setStartPosition] = useState(null);

  useLayoutEffect(() => {
    // Get initial position before paint
    const rect = boxRef.current.getBoundingClientRect();
    setStartPosition({ x: rect.left, y: rect.top });
    
    // Start animation after position is set
    requestAnimationFrame(() => {
      boxRef.current.style.transform = 'translateX(100px)';
    });
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: '100px',
        height: '100px',
        background: 'blue',
        transition: 'transform 0.3s'
      }}
    />
  );
}
```

---

## ⚠️ When to Use Each

### Use useEffect for:

```jsx
// ✅ Data fetching
useEffect(() => {
  fetchData().then(setData);
}, []);

// ✅ Subscriptions
useEffect(() => {
  const sub = subscribe();
  return () => sub.unsubscribe();
}, []);

// ✅ Event listeners
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// ✅ Logging/Analytics
useEffect(() => {
  trackPageView();
}, []);
```

### Use useLayoutEffect for:

```jsx
// ✅ DOM measurements
useLayoutEffect(() => {
  const height = elementRef.current.offsetHeight;
  setCalculatedHeight(height);
}, []);

// ✅ Preventing flicker
useLayoutEffect(() => {
  // Position tooltip before user sees it
  positionTooltip();
}, []);

// ✅ Scroll position
useLayoutEffect(() => {
  containerRef.current.scrollTop = savedPosition;
}, []);

// ✅ Synchronous mutations
useLayoutEffect(() => {
  elementRef.current.focus();
}, []);
```

---

## 📊 Performance Considerations

### ⚠️ useLayoutEffect Blocks Painting

```jsx
// ❌ Expensive operation - blocks paint
useLayoutEffect(() => {
  // Heavy computation
  for (let i = 0; i < 1000000; i++) {
    // ...
  }
}, []);

// ✅ Move to useEffect if possible
useEffect(() => {
  // Heavy computation after paint
  for (let i = 0; i < 1000000; i++) {
    // ...
  }
}, []);
```

---

## 🎯 Real-World Example: Modal Positioning

```jsx
import { useState, useLayoutEffect, useRef } from 'react';

function PositionedModal({ trigger, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef();
  const modalRef = useRef();

  useLayoutEffect(() => {
    if (!isOpen) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const modalRect = modalRef.current.getBoundingClientRect();
    
    // Calculate position before paint
    let top = triggerRect.bottom + 8;
    let left = triggerRect.left;

    // Keep modal in viewport
    if (left + modalRect.width > window.innerWidth) {
      left = window.innerWidth - modalRect.width - 8;
    }
    
    if (top + modalRect.height > window.innerHeight) {
      top = triggerRect.top - modalRect.height - 8;
    }

    setPosition({ top, left });
  }, [isOpen]);

  return (
    <>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div
          ref={modalRef}
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            zIndex: 1000
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}
```

---

## 🏋️ Exercises

### Exercise 1: Dynamic Tooltip
Create tooltip that positions itself intelligently.

**Requirements:**
- Auto-position based on viewport
- No flicker
- Arrow pointing to trigger

### Exercise 2: Masonry Layout
Implement masonry grid layout.

**Requirements:**
- Measure item heights
- Calculate positions
- Animate placement

### Exercise 3: Sticky Header
Create sticky header with smooth transitions.

**Requirements:**
- Measure header height
- Calculate scroll thresholds
- No visual jumps

---

## ➡️ Next Module

[useImperativeHandle - Ref Customization →](../10-useImperativeHandle/README.md)
