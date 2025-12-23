# Module 15: Custom Hooks - Advanced Patterns

## 🎯 Learning Objectives

- ✅ Build complex custom hooks
- ✅ Compose hooks together
- ✅ Handle edge cases
- ✅ Test custom hooks
- ✅ Create reusable hook libraries

---

## 💻 Advanced Custom Hooks

### 1. useAsync - Async Operations

```jsx
import { useState, useEffect, useCallback } from 'react';

function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return asyncFunction()
      .then(response => {
        setValue(response);
        setStatus('success');
      })
      .catch(error => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
}

// Usage
function UserProfile({ userId }) {
  const fetchUser = useCallback(
    () => fetch(`/api/users/${userId}`).then(r => r.json()),
    [userId]
  );

  const { value: user, status, error, execute: refetch } = useAsync(fetchUser);

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {error.message}</div>;
  if (status === 'success') return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );

  return null;
}
```

### 2. useIntersectionObserver - Lazy Loading

```jsx
import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold: 0,
        root: null,
        rootMargin: '0px',
        ...options
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options.threshold, options.root, options.rootMargin]);

  return { ref, isIntersecting, entry };
}

// Usage
function LazyImage({ src, alt }) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1
  });
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (isIntersecting && !imageSrc) {
      setImageSrc(src);
    }
  }, [isIntersecting, src, imageSrc]);

  return (
    <div ref={ref}>
      {imageSrc ? (
        <img src={imageSrc} alt={alt} />
      ) : (
        <div className="placeholder">Loading...</div>
      )}
    </div>
  );
}
```

### 3. useWebSocket - Real-time Connection

```jsx
import { useState, useEffect, useRef, useCallback } from 'react';

function useWebSocket(url) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      setLastMessage(JSON.parse(event.data));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      setIsConnected(false);
      // Auto-reconnect after 5 seconds
      reconnectTimeoutRef.current = setTimeout(connect, 5000);
    };

    wsRef.current = ws;
  }, [url]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback((message) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  return { isConnected, lastMessage, sendMessage };
}

// Usage
function Chat() {
  const { isConnected, lastMessage, sendMessage } = useWebSocket('ws://localhost:8080');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (lastMessage) {
      setMessages(prev => [...prev, lastMessage]);
    }
  }, [lastMessage]);

  const handleSend = () => {
    sendMessage({ text: input, timestamp: Date.now() });
    setInput('');
  };

  return (
    <div>
      <div>{isConnected ? '🟢 Connected' : '🔴 Disconnected'}</div>
      <div>{messages.map((msg, i) => <div key={i}>{msg.text}</div>)}</div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSend} disabled={!isConnected}>Send</button>
    </div>
  );
}
```

### 4. useClipboard - Copy to Clipboard

```jsx
import { useState, useCallback } from 'react';

function useClipboard(resetTimeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setError(null);

      setTimeout(() => setIsCopied(false), resetTimeout);
    } catch (err) {
      setError(err);
      setIsCopied(false);
    }
  }, [resetTimeout]);

  return { isCopied, error, copy };
}

// Usage
function CodeBlock({ code }) {
  const { isCopied, copy } = useClipboard();

  return (
    <div>
      <pre>{code}</pre>
      <button onClick={() => copy(code)}>
        {isCopied ? '✅ Copied!' : '📋 Copy'}
      </button>
    </div>
  );
}
```

### 5. useKeyPress - Keyboard Shortcuts

```jsx
import { useState, useEffect } from 'react';

function useKeyPress(targetKeys, callback) {
  const [keysPressed, setKeysPressed] = useState(new Set());

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newKeys = new Set(keysPressed);
      newKeys.add(e.key.toLowerCase());
      setKeysPressed(newKeys);

      const allPressed = targetKeys.every(key => 
        newKeys.has(key.toLowerCase())
      );

      if (allPressed) {
        e.preventDefault();
        callback?.();
      }
    };

    const handleKeyUp = (e) => {
      const newKeys = new Set(keysPressed);
      newKeys.delete(e.key.toLowerCase());
      setKeysPressed(newKeys);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [targetKeys, callback, keysPressed]);
}

// Usage
function Editor() {
  useKeyPress(['Control', 's'], () => {
    console.log('Save!');
  });

  useKeyPress(['Control', 'Shift', 'p'], () => {
    console.log('Command palette!');
  });

  return <textarea />;
}
```

---

## 🏋️ Final Exercises

### Exercise 1: useGeolocation
Track user's location.

### Exercise 2: useNotification
Browser notifications.

### Exercise 3: useDarkMode
Persistent dark mode.

---

## ⏭️ Next Module

[Final Project →](../16-final-project/README.md)
