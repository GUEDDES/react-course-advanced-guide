# Module 5: Memoization Strategies

## 🎯 Objectives

- ✅ Master React.memo
- ✅ Use useMemo effectively
- ✅ Optimize with useCallback
- ✅ Avoid over-optimization

---

## 💻 Complete Example

```jsx
import { useState, useMemo, useCallback, memo } from 'react';

// 1. Memoize expensive calculations
function ProductList({ products, sortBy }) {
  const sortedProducts = useMemo(() => {
    console.log('Sorting...');
    return [...products].sort((a, b) => 
      a[sortBy] > b[sortBy] ? 1 : -1
    );
  }, [products, sortBy]);

  return (
    <div>
      {sortedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// 2. Memoize component
const ProductCard = memo(function ProductCard({ product }) {
  console.log('Rendering product:', product.id);
  return <div>{product.name}</div>;
});

// 3. Memoize callbacks
function App() {
  const [products, setProducts] = useState([]);

  const addProduct = useCallback((product) => {
    setProducts(prev => [...prev, product]);
  }, []);

  const removeProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <ProductList 
      products={products}
      onAdd={addProduct}
      onRemove={removeProduct}
    />
  );
}
```

---

## ⚠️ When NOT to Memoize

```jsx
// ❌ Unnecessary
const doubled = useMemo(() => number * 2, [number]);

// ✅ Just calculate
const doubled = number * 2;
```

---

## ➡️ Next: [Virtual Scrolling](../06-virtual-scrolling/README.md)
