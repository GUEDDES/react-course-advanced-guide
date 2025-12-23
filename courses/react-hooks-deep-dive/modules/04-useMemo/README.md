# useMemo - Memoization Hook

## 🎯 Learning Objectives

- ✅ Understand memoization
- ✅ Use useMemo hook
- ✅ Identify expensive computations
- ✅ Optimize performance
- ✅ Avoid premature optimization

---

## 📖 Theory

### What is Memoization?

Memoization is caching the result of expensive calculations so they don't run on every render.

### useMemo Syntax

```javascript
const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]); // Dependencies
```

### When to Use useMemo

✅ **Good Use Cases:**
- Expensive calculations (filtering, sorting large arrays)
- Complex object/array creation
- Preventing child re-renders

❌ **Don't Use for:**
- Simple calculations
- Primitive values
- Premature optimization

---

## 💻 Examples

### Example 1: Expensive Calculation

```jsx
import { useState, useMemo } from 'react';

function PrimeNumbers({ max }) {
  const [count, setCount] = useState(0);

  // ❌ Without useMemo - runs on every render
  // const primes = calculatePrimes(max);

  // ✅ With useMemo - only runs when max changes
  const primes = useMemo(() => {
    console.log('Calculating primes...');
    return calculatePrimes(max);
  }, [max]);

  return (
    <div>
      <p>Prime numbers up to {max}: {primes.length}</p>
      <p>Render count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Force Re-render
      </button>
    </div>
  );
}

function calculatePrimes(max) {
  const primes = [];
  for (let i = 2; i <= max; i++) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }
  return primes;
}
```

### Example 2: Filtered List

```jsx
import { useState, useMemo } from 'react';

function ProductList({ products }) {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSorted = useMemo(() => {
    console.log('Filtering and sorting...');
    
    let result = products.filter(product =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });

    return result;
  }, [products, filter, sortBy]);

  return (
    <div>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Filter products..."
      />
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
      
      <ul>
        {filteredAndSorted.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Example 3: Preventing Child Re-renders

```jsx
import { useState, useMemo } from 'react';
import { ChildComponent } from './ChildComponent';

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  // ❌ Without useMemo - new object on every render
  // const user = { name, age: 25 };

  // ✅ With useMemo - same object if name doesn't change
  const user = useMemo(() => {
    return { name, age: 25 };
  }, [name]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <ChildComponent user={user} />
    </div>
  );
}

// ChildComponent only re-renders when user changes
const ChildComponent = React.memo(({ user }) => {
  console.log('ChildComponent rendered');
  return <div>User: {user.name}</div>;
});
```

### Example 4: Complex Calculations

```jsx
import { useMemo } from 'react';

function DataDashboard({ data }) {
  const stats = useMemo(() => {
    console.log('Calculating stats...');
    
    return {
      total: data.length,
      average: data.reduce((sum, val) => sum + val, 0) / data.length,
      max: Math.max(...data),
      min: Math.min(...data),
      median: calculateMedian(data)
    };
  }, [data]);

  return (
    <div>
      <h3>Statistics</h3>
      <p>Total: {stats.total}</p>
      <p>Average: {stats.average.toFixed(2)}</p>
      <p>Max: {stats.max}</p>
      <p>Min: {stats.min}</p>
      <p>Median: {stats.median}</p>
    </div>
  );
}

function calculateMedian(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}
```

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Overusing useMemo

```jsx
// ❌ Unnecessary - simple calculation
const double = useMemo(() => number * 2, [number]);

// ✅ Better - direct calculation
const double = number * 2;
```

### ❌ Mistake 2: Wrong Dependencies

```jsx
// ❌ Missing dependency
const filtered = useMemo(() => {
  return items.filter(item => item.category === category);
}, [items]); // Missing 'category'

// ✅ Correct
const filtered = useMemo(() => {
  return items.filter(item => item.category === category);
}, [items, category]);
```

### ❌ Mistake 3: Mutating Inside useMemo

```jsx
// ❌ Wrong - mutating original array
const sorted = useMemo(() => {
  return items.sort(); // Mutates items!
}, [items]);

// ✅ Correct - create new array
const sorted = useMemo(() => {
  return [...items].sort();
}, [items]);
```

---

## 📊 Performance Comparison

```jsx
import { useState, useMemo } from 'react';

function ComparisonDemo() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(10000);

  // Without useMemo - recalculates on every render
  const start1 = performance.now();
  const withoutMemo = expensiveCalculation(number);
  const time1 = performance.now() - start1;

  // With useMemo - only recalculates when number changes
  const start2 = performance.now();
  const withMemo = useMemo(() => expensiveCalculation(number), [number]);
  const time2 = performance.now() - start2;

  return (
    <div>
      <p>Without useMemo: {time1.toFixed(2)}ms</p>
      <p>With useMemo: {time2.toFixed(2)}ms</p>
      <button onClick={() => setCount(count + 1)}>
        Re-render ({count})
      </button>
    </div>
  );
}
```

---

## 🏋️ Exercises

### Exercise 1: Search and Filter
Create a searchable, filterable list.

**Requirements:**
- 1000+ items
- Filter by category
- Search by name
- Measure performance

### Exercise 2: Data Table
Build a sortable data table.

**Requirements:**
- Sort by multiple columns
- Pagination
- Row selection
- Use useMemo appropriately

### Exercise 3: Chart Data Processing
Process data for charts.

**Requirements:**
- Aggregate data
- Calculate trends
- Group by date
- Optimize with useMemo

---

## 🎓 Quiz

1. When should you use useMemo?
2. What happens if you omit dependencies?
3. Does useMemo guarantee the value is cached?
4. What's the difference between useMemo and useCallback?
5. Can useMemo have side effects?

**[View Solutions](./solutions/README.md)**

---

## ⏭️ Next Module

[useCallback - Function Memoization →](../05-useCallback/README.md)
