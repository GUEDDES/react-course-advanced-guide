# Module 5: Higher-Order Components (HOC)

## 🎯 Learning Objectives

- ✅ Understand HOC pattern
- ✅ Reuse component logic
- ✅ Create composable HOCs
- ✅ Know when to use HOCs vs Hooks
- ✅ Avoid common pitfalls

---

## 📖 What is a HOC?

A Higher-Order Component is a function that takes a component and returns a new component with enhanced functionality.

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

**Pattern:**
```jsx
function withFeature(Component) {
  return function EnhancedComponent(props) {
    // Add logic here
    return <Component {...props} extraProp={data} />;
  };
}
```

---

## 💻 Basic Examples

### Example 1: withLoading

```jsx
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// Usage
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

const UserListWithLoading = withLoading(UserList);

// Use it
<UserListWithLoading users={users} isLoading={loading} />
```

### Example 2: withAuth

```jsx
import { Navigate } from 'react-router-dom';

function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user } = useAuth();
    
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    return <Component {...props} user={user} />;
  };
}

// Usage
function Dashboard({ user }) {
  return <h1>Welcome {user.name}!</h1>;
}

const ProtectedDashboard = withAuth(Dashboard);
```

---

## 🎯 Real-World Examples

### Example 1: withData (Data Fetching)

```jsx
import { useState, useEffect } from 'react';

function withData(Component, fetchFn) {
  return function WithDataComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      setLoading(true);
      fetchFn(props)
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    }, [props.id]); // Re-fetch when ID changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    return <Component {...props} data={data} />;
  };
}

// Usage
function UserProfile({ data }) {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}

const UserProfileWithData = withData(
  UserProfile,
  (props) => fetch(`/api/users/${props.id}`).then(r => r.json())
);

// Use it
<UserProfileWithData id={123} />
```

### Example 2: withLogger

```jsx
import { useEffect } from 'react';

function withLogger(Component, componentName) {
  return function LoggedComponent(props) {
    useEffect(() => {
      console.log(`${componentName} mounted`);
      console.log('Props:', props);
      
      return () => {
        console.log(`${componentName} unmounted`);
      };
    }, []);

    useEffect(() => {
      console.log(`${componentName} updated`);
      console.log('New props:', props);
    });

    return <Component {...props} />;
  };
}

// Usage
const LoggedButton = withLogger(Button, 'Button');
```

### Example 3: withToggle

```jsx
import { useState } from 'react';

function withToggle(Component) {
  return function ToggleableComponent(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(prev => !prev);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
      <Component
        {...props}
        isOpen={isOpen}
        toggle={toggle}
        open={open}
        close={close}
      />
    );
  };
}

// Usage
function Modal({ isOpen, close, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
}

const ToggleableModal = withToggle(Modal);

// Use it
function App() {
  return (
    <div>
      <ToggleableModal>
        <h1>Modal Content</h1>
      </ToggleableModal>
    </div>
  );
}
```

---

## 🔗 Composing HOCs

```jsx
import { compose } from 'lodash/fp';

// Multiple HOCs
function withAuth(Component) { /* ... */ }
function withLoading(Component) { /* ... */ }
function withError(Component) { /* ... */ }

// Compose them
const enhance = compose(
  withAuth,
  withLoading,
  withError
);

const EnhancedComponent = enhance(MyComponent);

// Equivalent to:
// withAuth(withLoading(withError(MyComponent)))
```

---

## ⚠️ Common Pitfalls

### ❌ Don't Mutate Original Component

```jsx
// ❌ Wrong
function withBad(Component) {
  Component.prototype.extra = function() { /* ... */ };
  return Component;
}

// ✅ Correct - return new component
function withGood(Component) {
  return function Enhanced(props) {
    return <Component {...props} />;
  };
}
```

### ❌ Don't Use HOCs Inside render

```jsx
// ❌ Wrong - creates new component on every render
function Parent() {
  const EnhancedChild = withData(Child);
  return <EnhancedChild />;
}

// ✅ Correct - create once outside
const EnhancedChild = withData(Child);

function Parent() {
  return <EnhancedChild />;
}
```

### ✅ Forward Refs

```jsx
import { forwardRef } from 'react';

function withForwardedRef(Component) {
  function WithRef(props, ref) {
    return <Component {...props} forwardedRef={ref} />;
  }
  
  return forwardRef(WithRef);
}
```

---

## 🆚 HOCs vs Hooks

| Feature | HOC | Hook |
|---------|-----|------|
| **Reuse logic** | ✅ | ✅ |
| **Multiple behaviors** | Nesting | Composition |
| **Prop naming conflicts** | Possible | Unlikely |
| **Component tree** | Deeper | Flatter |
| **Modern approach** | ❌ Legacy | ✅ Preferred |

### When to Use HOCs
- Legacy codebases
- Third-party libraries
- Need to wrap class components

### When to Use Hooks
- New code (preferred)
- Better composition
- Cleaner code

---

## 🏋️ Exercise

Create a `withPagination` HOC.

**Requirements:**
- Add pagination controls
- Handle page state
- Slice data by page
- Support custom page size
- Add navigation buttons

---

## ⏭️ Next Module

[Render Props Pattern →](../06-render-props/README.md)
