# Module 12: useDeferredValue - Deferred Rendering

## 🎯 Learning Objectives

- ✅ Understand useDeferredValue
- ✅ Defer non-urgent updates
- ✅ Improve responsiveness
- ✅ Combine with memoization
- ✅ Know when to use it

---

## 📖 What is useDeferredValue?

Defers updating a value to keep the UI responsive during expensive renders.

```jsx
const deferredValue = useDeferredValue(value);
```

---

## 💻 Basic Example

```jsx
import { useState, useDeferredValue } from 'react';

function SearchResults({ query }) {
  // ✅ Defer the query value
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    // Expensive search
    return items.filter(item => 
      item.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [deferredQuery]);

  return (
    <ul>
      {results.map(result => (
        <li key={result}>{result}</li>
      ))}
    </ul>
  );
}

function App() {
  const [query, setQuery] = useState('');

  return (
    <div>
      {/* Input stays responsive */}
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <SearchResults query={query} />
    </div>
  );
}
```

---

## 🎯 Real-World Examples

### Example 1: List Filtering

```jsx
import { useState, useDeferredValue, useMemo } from 'react';

function ProductList({ products }) {
  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(deferredFilter.toLowerCase())
    );
  }, [products, deferredFilter]);

  // Show stale state indicator
  const isStale = filter !== deferredFilter;

  return (
    <div>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Filter products..."
      />

      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        {isStale && <div>Updating...</div>}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
```

### Example 2: Chart Updates

```jsx
import { useState, useDeferredValue } from 'react';

function ChartDashboard({ data }) {
  const [selectedRange, setSelectedRange] = useState('1M');
  const deferredRange = useDeferredValue(selectedRange);

  return (
    <div>
      <div className="controls">
        {['1D', '1W', '1M', '1Y'].map(range => (
          <button
            key={range}
            onClick={() => setSelectedRange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Chart re-renders with deferred value */}
      <ExpensiveChart range={deferredRange} data={data} />
    </div>
  );
}

const ExpensiveChart = React.memo(({ range, data }) => {
  // Expensive chart rendering
  const chartData = processDataForRange(data, range);
  
  return <Chart data={chartData} />;
});
```

---

## 📊 Performance Comparison

```jsx
// Without useDeferredValue
function SlowList({ items, filter }) {
  // ❌ Re-renders on every keystroke
  const filtered = items.filter(i => i.includes(filter));
  
  return (
    <ul>
      {filtered.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}

// With useDeferredValue
function FastList({ items, filter }) {
  const deferredFilter = useDeferredValue(filter);
  
  // ✅ Re-renders deferred - input stays responsive
  const filtered = useMemo(
    () => items.filter(i => i.includes(deferredFilter)),
    [items, deferredFilter]
  );
  
  return (
    <ul>
      {filtered.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}
```

---

## 🏋️ Exercises

### Exercise 1: Data Table

Create sortable/filterable table.

**Requirements:**
- 1000+ rows
- Responsive controls
- Use useDeferredValue

### Exercise 2: Image Gallery

Build filterable gallery.

**Requirements:**
- 100+ images
- Tag filtering
- Smooth scrolling

---

## ⏭️ Next Module

[useId - Unique IDs →](../13-useId/README.md)
