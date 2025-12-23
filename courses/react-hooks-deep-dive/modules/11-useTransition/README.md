# useTransition - Concurrent Rendering (React 18+)

## 🎯 Learning Objectives

- ✅ Understand concurrent rendering
- ✅ Mark updates as non-urgent
- ✅ Keep UI responsive
- ✅ Show loading states
- ✅ Optimize user experience

---

## 📖 What is useTransition?

useTransition lets you mark state updates as **transitions** (non-urgent), keeping the UI responsive during expensive updates.

```jsx
const [isPending, startTransition] = useTransition();
```

---

## 💻 Basic Examples

### Example 1: Search Filter

```jsx
import { useState, useTransition } from 'react';

function SearchList({ items }) {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    
    // Urgent: Update input immediately
    setQuery(value);
    
    // Non-urgent: Filter list can wait
    startTransition(() => {
      setFilteredQuery(value);
    });
  };

  const [filteredQuery, setFilteredQuery] = useState('');
  
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(filteredQuery.toLowerCase())
  );

  return (
    <div>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      
      {isPending && <div>Loading...</div>}
      
      <ul style={{ opacity: isPending ? 0.5 : 1 }}>
        {filteredItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Example 2: Tab Switching

```jsx
import { useState, useTransition } from 'react';

function Tabs() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const switchTab = (tab) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div>
      <div className="tab-buttons">
        <button onClick={() => switchTab('home')}>Home</button>
        <button onClick={() => switchTab('profile')}>Profile</button>
        <button onClick={() => switchTab('posts')}>Posts</button>
      </div>

      <div className="tab-content" style={{ opacity: isPending ? 0.7 : 1 }}>
        {isPending && <div className="loading-spinner">Loading...</div>}
        
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'posts' && <PostsPage />} {/* Expensive */}
      </div>
    </div>
  );
}

function PostsPage() {
  // Simulate expensive component
  const posts = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    title: `Post ${i}`
  }));

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

---

## 🎯 Real-World Examples

### Example 3: Data Table with Filtering

```jsx
import { useState, useTransition, useMemo } from 'react';

function DataTable({ data }) {
  const [sortBy, setSortBy] = useState('name');
  const [filterText, setFilterText] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSort = (column) => {
    startTransition(() => {
      setSortBy(column);
    });
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterText(value); // Immediate update
    
    startTransition(() => {
      // Heavy filtering happens as transition
      // UI stays responsive
    });
  };

  const processedData = useMemo(() => {
    let result = data;
    
    // Filter
    if (filterText) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    
    // Sort
    result = [...result].sort((a, b) => 
      a[sortBy] > b[sortBy] ? 1 : -1
    );
    
    return result;
  }, [data, sortBy, filterText]);

  return (
    <div>
      <input
        value={filterText}
        onChange={handleFilter}
        placeholder="Filter..."
      />
      
      {isPending && <div className="loading-bar" />}
      
      <table style={{ opacity: isPending ? 0.6 : 1 }}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('age')}>Age</th>
            <th onClick={() => handleSort('email')}>Email</th>
          </tr>
        </thead>
        <tbody>
          {processedData.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Example 4: Route Transitions

```jsx
import { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleNavigate = (path) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <nav>
      {isPending && <div className="page-loading">Loading page...</div>}
      
      <button onClick={() => handleNavigate('/')}>Home</button>
      <button onClick={() => handleNavigate('/about')}>About</button>
      <button onClick={() => handleNavigate('/products')}>Products</button>
    </nav>
  );
}
```

---

## 📊 useTransition vs setTimeout

```jsx
// ❌ Old way - setTimeout
function SearchOld() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Uses debouncedQuery for filtering
}

// ✅ New way - useTransition
function SearchNew() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value);
    startTransition(() => {
      // Update happens when browser is ready
    });
  };
}
```

**Benefits of useTransition:**
- No arbitrary delay
- React decides when to render
- Can be interrupted
- Better UX

---

## ⚠️ Important Notes

### What Gets Wrapped?

```jsx
// ✅ Wrap state updates
startTransition(() => {
  setState(newValue);
});

// ❌ Don't wrap async operations
startTransition(async () => {
  await fetchData(); // Won't work as expected
});

// ✅ Update state after async
const data = await fetchData();
startTransition(() => {
  setData(data);
});
```

### Urgent vs Non-Urgent

**Urgent (Don't wrap):**
- Text input changes
- Button clicks
- Focus changes

**Non-Urgent (Wrap in transition):**
- Filtering large lists
- Sorting data
- Route changes
- Complex calculations

---

## 🏋️ Exercises

### Exercise 1: Product Filter
Build product filter with transitions.

**Requirements:**
- Filter by category, price, rating
- 1000+ products
- Smooth UI during filtering
- Loading indicator

### Exercise 2: Code Editor
Create code editor with syntax highlighting.

**Requirements:**
- Real-time highlighting
- Responsive typing
- Use transitions for highlighting

### Exercise 3: Dashboard
Build dashboard with widget switching.

**Requirements:**
- Multiple heavy widgets
- Smooth transitions
- Loading states

---

## ➡️ Next Module

[useDeferredValue - Deferred Updates →](../12-useDeferredValue/README.md)
