# Module 15: Custom Hooks - Advanced Patterns

## 🎯 Learning Objectives

- ✅ Master advanced custom hooks
- ✅ Composition patterns
- ✅ Error handling
- ✅ TypeScript integration
- ✅ Testing strategies

---

## 📖 Advanced Hook Patterns

### Pattern 1: Compound Hooks

```jsx
import { useState, useEffect, useCallback } from 'react';

// Combine multiple concerns
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback((...params) => {
    setStatus('pending');
    setData(null);
    setError(null);

    return asyncFunction(...params)
      .then(response => {
        setData(response);
        setStatus('success');
        return response;
      })
      .catch(error => {
        setError(error);
        setStatus('error');
        throw error;
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    status,
    data,
    error,
    isIdle: status === 'idle',
    isPending: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error'
  };
}

// Usage
function UserProfile({ userId }) {
  const fetchUser = useCallback(
    () => fetch(`/api/users/${userId}`).then(r => r.json()),
    [userId]
  );

  const { data: user, isPending, isError, error, execute } = useAsync(fetchUser);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message} <button onClick={execute}>Retry</button></div>;

  return <div>Welcome {user.name}!</div>;
}
```

### Pattern 2: State Machine Hook

```jsx
import { useReducer, useCallback } from 'react';

function useStateMachine(states, initialState) {
  const [state, dispatch] = useReducer((currentState, action) => {
    const transitions = states[currentState];
    return transitions[action] ?? currentState;
  }, initialState);

  const send = useCallback((action) => {
    dispatch(action);
  }, []);

  return [state, send];
}

// Usage: Form wizard
function FormWizard() {
  const [step, send] = useStateMachine({
    personal: { NEXT: 'address', CANCEL: 'cancelled' },
    address: { NEXT: 'payment', BACK: 'personal' },
    payment: { NEXT: 'confirmation', BACK: 'address' },
    confirmation: { SUBMIT: 'submitted', BACK: 'payment' },
    submitted: {},
    cancelled: {}
  }, 'personal');

  return (
    <div>
      {step === 'personal' && <PersonalInfo onNext={() => send('NEXT')} />}
      {step === 'address' && <AddressInfo onNext={() => send('NEXT')} onBack={() => send('BACK')} />}
      {step === 'payment' && <PaymentInfo onNext={() => send('NEXT')} onBack={() => send('BACK')} />}
      {step === 'confirmation' && <Confirmation onSubmit={() => send('SUBMIT')} />}
      {step === 'submitted' && <Success />}
    </div>
  );
}
```

### Pattern 3: Retry with Exponential Backoff

```jsx
import { useState, useCallback, useRef } from 'react';

function useRetry(fn, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2
  } = options;

  const [attempts, setAttempts] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const timeoutRef = useRef();

  const execute = useCallback(async (...args) => {
    let lastError;
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        setAttempts(i);
        const result = await fn(...args);
        setIsRetrying(false);
        return result;
      } catch (error) {
        lastError = error;
        
        if (i < maxRetries) {
          const delay = Math.min(
            initialDelay * Math.pow(backoffFactor, i),
            maxDelay
          );
          
          setIsRetrying(true);
          await new Promise(resolve => {
            timeoutRef.current = setTimeout(resolve, delay);
          });
        }
      }
    }
    
    setIsRetrying(false);
    throw lastError;
  }, [fn, maxRetries, initialDelay, maxDelay, backoffFactor]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setIsRetrying(false);
    }
  }, []);

  return { execute, attempts, isRetrying, cancel };
}

// Usage
function DataFetcher() {
  const fetchData = useCallback(
    () => fetch('/api/data').then(r => r.json()),
    []
  );

  const { execute, attempts, isRetrying } = useRetry(fetchData, {
    maxRetries: 5,
    initialDelay: 1000
  });

  const [data, setData] = useState(null);

  useEffect(() => {
    execute().then(setData).catch(console.error);
  }, [execute]);

  if (isRetrying) {
    return <div>Retrying... (Attempt {attempts + 1})</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
```

---

## 🎨 Data Fetching Hooks

### useQuery (React Query-like)

```jsx
import { useState, useEffect, useRef } from 'react';

function useQuery(queryKey, queryFn, options = {}) {
  const { enabled = true, refetchInterval } = options;
  
  const [state, setState] = useState({
    data: null,
    error: null,
    isLoading: true,
    isFetching: false
  });

  const queryKeyRef = useRef(queryKey);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const fetchData = async () => {
    setState(prev => ({ ...prev, isFetching: true }));

    try {
      const data = await queryFn();
      
      if (isMounted.current) {
        setState({
          data,
          error: null,
          isLoading: false,
          isFetching: false
        });
      }
    } catch (error) {
      if (isMounted.current) {
        setState({
          data: null,
          error,
          isLoading: false,
          isFetching: false
        });
      }
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [queryKey, enabled]);

  useEffect(() => {
    if (refetchInterval && enabled) {
      const interval = setInterval(fetchData, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [refetchInterval, enabled]);

  return {
    ...state,
    refetch: fetchData
  };
}

// Usage
function Posts() {
  const { data, isLoading, error, refetch } = useQuery(
    ['posts'],
    () => fetch('/api/posts').then(r => r.json()),
    { refetchInterval: 30000 }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {data.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
}
```

---

## 🔐 Authentication Hook

```jsx
import { useState, useEffect, useContext, createContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signin = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      const user = await response.json();
      setUser(user);
      localStorage.setItem('token', user.token);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    setLoading(true);
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name })
      });
      const user = await response.json();
      setUser(user);
      localStorage.setItem('token', user.token);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.json())
        .then(setUser)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    signin,
    signup,
    signout
  };
}
```

---

## 🏋️ Final Exercises

### Exercise 1: useInfiniteScroll

**Requirements:**
- Detect scroll position
- Load more on threshold
- Loading states
- Error handling

### Exercise 2: useWebSocket

**Requirements:**
- Connect/disconnect
- Send/receive messages
- Reconnection logic
- Message queue

### Exercise 3: useUndoRedo

**Requirements:**
- History management
- Undo/redo actions
- Time travel
- State snapshots

---

## ➡️ Next Module

[Final Project →](../16-final-project/README.md)
