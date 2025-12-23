# Module 11: useTransition - Concurrent Rendering

## 🎯 Learning Objectives

- ✅ Understand concurrent rendering
- ✅ Use useTransition hook
- ✅ Mark updates as non-urgent
- ✅ Improve perceived performance
- ✅ Handle pending states

---

## 📖 What is useTransition?

Marks state updates as transitions (non-urgent), allowing React to keep the UI responsive during expensive updates.

```jsx
const [isPending, startTransition] = useTransition();
```

**Returns:**
- `isPending`: Boolean indicating if transition is in progress
- `startTransition`: Function to wrap non-urgent updates

---

## 💻 Basic Example

### Without useTransition (Blocking)

```jsx
import { useState } from 'react';

function SearchableList({ items }) {
  const [query, setQuery] = useState('');

  // ❌ Filters 10,000+ items on every keystroke - BLOCKS UI
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Input feels sluggish during typing */}
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      
      <ul>
        {filteredItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

### With useTransition (Non-blocking)

```jsx
import { useState, useTransition } from 'react';

function SearchableList({ items }) {
  const [query, setQuery] = useState('');
  const [deferredQuery, setDeferredQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    
    // ✅ Update input immediately (urgent)
    setQuery(value);
    
    // ✅ Defer expensive filtering (non-urgent)
    startTransition(() => {
      setDeferredQuery(value);
    });
  };

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div>
      {/* Input stays responsive! */}
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      
      {/* Show loading state during transition */}
      {isPending && <div>Updating results...</div>}
      
      <ul style={{ opacity: isPending ? 0.5 : 1 }}>
        {filteredItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🎯 Real-World Examples

### Example 1: Tab Switching

```jsx
import { useState, useTransition } from 'react';

function Tabs() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const handleTabClick = (tab) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => handleTabClick('home')}>
          Home
        </button>
        <button onClick={() => handleTabClick('profile')}>
          Profile {isPending && '...'}
        </button>
        <button onClick={() => handleTabClick('settings')}>
          Settings
        </button>
      </div>

      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        {activeTab === 'home' && <HomeContent />}
        {activeTab === 'profile' && <ProfileContent />} {/* Heavy component */}
        {activeTab === 'settings' && <SettingsContent />}
      </div>
    </div>
  );
}

function ProfileContent() {
  // Expensive component
  const posts = Array.from({ length: 5000 }, (_, i) => `Post ${i}`);
  return (
    <div>
      {posts.map(post => <div key={post}>{post}</div>)}
    </div>
  );
}
```

### Example 2: Auto-complete

```jsx
import { useState, useTransition } from 'react';

function Autocomplete({ suggestions }) {
  const [input, setInput] = useState('');
  const [deferredInput, setDeferredInput] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    startTransition(() => {
      setDeferredInput(value);
    });
  };

  const matches = suggestions.filter(s =>
    s.toLowerCase().includes(deferredInput.toLowerCase())
  ).slice(0, 10);

  return (
    <div>
      <input
        value={input}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      
      {deferredInput && (
        <div className="suggestions">
          {isPending ? (
            <div>Loading...</div>
          ) : (
            matches.map(match => (
              <div key={match} onClick={() => setInput(match)}>
                {match}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
```

### Example 3: Data Filtering

```jsx
import { useState, useTransition } from 'react';

function ProductFilter({ products }) {
  const [category, setCategory] = useState('all');
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (newCategory) => {
    startTransition(() => {
      setCategory(newCategory);
    });
  };

  const filtered = category === 'all'
    ? products
    : products.filter(p => p.category === category);

  return (
    <div>
      <div className="filters">
        {['all', 'electronics', 'clothing', 'books'].map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            disabled={isPending}
          >
            {cat}
          </button>
        ))}
      </div>

      {isPending && <div className="loading-bar" />}

      <div className="products" style={{ opacity: isPending ? 0.6 : 1 }}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

---

## 🔄 Comparison with useDeferredValue

```jsx
// useTransition - wrap the STATE UPDATE
function Component() {
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    startTransition(() => {
      setInput(e.target.value);
    });
  };
}

// useDeferredValue - defer the VALUE
function Component() {
  const [input, setInput] = useState('');
  const deferredInput = useDeferredValue(input);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
}
```

**Use useTransition when:**
- You control the state update
- You want to show pending UI
- You need to know when transition completes

**Use useDeferredValue when:**
- You receive value from props
- You just want to defer rendering

---

## ⚠️ Best Practices

### ✅ Do's

```jsx
// ✅ Use for non-urgent updates
startTransition(() => {
  setFilteredData(expensiveFilter(data));
});

// ✅ Show loading indicator
{isPending && <Spinner />}

// ✅ Keep urgent updates outside
setInputValue(e.target.value); // Immediate
startTransition(() => {
  setSearchResults(results); // Deferred
});
```

### ❌ Don'ts

```jsx
// ❌ Don't use for controlled inputs
startTransition(() => {
  setInputValue(e.target.value); // Input will lag!
});

// ❌ Don't use for urgent updates
startTransition(() => {
  setErrorMessage('Error!'); // Should be immediate
});
```

---

## 🏋️ Exercises

### Exercise 1: Sortable Table

Create table with sortable columns.

**Requirements:**
- 1000+ rows
- Multiple sort options
- Use useTransition
- Show loading state

### Exercise 2: Live Search

Implement live search with results.

**Requirements:**
- Search 10,000+ items
- Highlight matches
- Responsive input
- Loading indicator

---

## ⏭️ Next Module

[useDeferredValue - Deferred Rendering →](../12-useDeferredValue/README.md)
