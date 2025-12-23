# useEffect - Side Effects Hook

## 🎯 Learning Objectives

- ✅ Understand side effects in React
- ✅ Master useEffect hook
- ✅ Handle cleanup functions
- ✅ Manage dependencies array
- ✅ Avoid infinite loops

---

## 📖 Theory

### What are Side Effects?

Side effects are operations that affect things outside the component:
- Data fetching
- Subscriptions
- Timers
- Manually changing the DOM
- Logging

### useEffect Syntax

```javascript
useEffect(() => {
  // Effect code
  
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]);
```

---

## 💻 Examples

### Example 1: Data Fetching

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    fetch(`https://api.example.com/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [userId]); // Re-run when userId changes

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Example 2: Document Title

```jsx
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Example 3: Subscriptions with Cleanup

```jsx
import { useState, useEffect } from 'react';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Subscribe
    const socket = connectToChat(roomId);
    
    socket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Cleanup function
    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
    </div>
  );
}
```

### Example 4: Timer

```jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}
```

### Example 5: Event Listeners

```jsx
import { useState, useEffect } from 'react';

function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty array = run once on mount

  return (
    <div>
      Mouse position: ({position.x}, {position.y})
    </div>
  );
}
```

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Missing Dependencies

```javascript
// ❌ Wrong - missing userId dependency
useEffect(() => {
  fetchUser(userId);
}, []);

// ✅ Correct
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

### ❌ Mistake 2: Infinite Loop

```javascript
// ❌ Wrong - creates infinite loop
const [data, setData] = useState([]);

useEffect(() => {
  setData([...data, newItem]); // data changes -> effect runs -> data changes...
}, [data]);

// ✅ Correct - use functional update
useEffect(() => {
  setData(prev => [...prev, newItem]);
}, []); // Or proper dependencies
```

### ❌ Mistake 3: Not Cleaning Up

```javascript
// ❌ Wrong - memory leak
useEffect(() => {
  const interval = setInterval(() => {
    console.log('tick');
  }, 1000);
  // Missing cleanup!
}, []);

// ✅ Correct
useEffect(() => {
  const interval = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  return () => clearInterval(interval);
}, []);
```

---

## 🎯 Dependencies Array Patterns

### Pattern 1: Run Once on Mount

```javascript
useEffect(() => {
  console.log('Component mounted');
}, []); // Empty array
```

### Pattern 2: Run on Every Render

```javascript
useEffect(() => {
  console.log('Component rendered');
}); // No array
```

### Pattern 3: Run When Specific Values Change

```javascript
useEffect(() => {
  console.log('userId or page changed');
}, [userId, page]);
```

### Pattern 4: Cleanup on Unmount

```javascript
useEffect(() => {
  return () => {
    console.log('Component will unmount');
  };
}, []);
```

---

## 🏋️ Exercises

### Exercise 1: Live Clock
Create a component that displays current time and updates every second.

**Requirements:**
- Show hours:minutes:seconds
- Update every second
- Clean up on unmount

### Exercise 2: Window Resize Listener
Track window dimensions.

**Requirements:**
- Display width and height
- Update on resize
- Remove listener on unmount

### Exercise 3: Auto-save Form
Save form data to localStorage after 2 seconds of inactivity.

**Requirements:**
- Debounce saves
- Load saved data on mount
- Clear timer on unmount

---

## 🎓 Quiz

1. When does useEffect run?
2. What does the cleanup function do?
3. What happens with an empty dependencies array?
4. How do you prevent infinite loops?
5. When should you use cleanup functions?

**[View Solutions](./solutions/README.md)**

---

## 📚 Additional Resources

- [React Docs - useEffect](https://react.dev/reference/react/useEffect)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

---

## ⏭️ Next Module

[useContext - Global State →](../03-useContext/README.md)
