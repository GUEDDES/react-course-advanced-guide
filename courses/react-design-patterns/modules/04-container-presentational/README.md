# Module 4: Container/Presentational Pattern

## 🎯 Learning Objectives

- ✅ Separate logic from UI
- ✅ Create reusable presentational components
- ✅ Build smart containers
- ✅ Improve testability
- ✅ Enhance maintainability

---

## 📖 Pattern Overview

**Presentational Components:**
- Focus on how things look
- Receive data via props
- No state management
- Reusable and composable
- Easy to test

**Container Components:**
- Focus on how things work
- Manage state and logic
- Fetch data
- Pass data to presentational components

---

## 💻 Basic Example

### Before (Mixed)

```jsx
// ❌ Logic and UI mixed
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not found</div>;

  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <div>Followers: {user.followers}</div>
    </div>
  );
}
```

### After (Separated)

```jsx
// ✅ Presentational Component (UI only)
function UserProfileView({ user }) {
  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <div>Followers: {user.followers}</div>
    </div>
  );
}

// ✅ Container Component (Logic only)
function UserProfileContainer({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!user) return <NotFound />;

  return <UserProfileView user={user} />;
}
```

---

## 🎯 Real-World Examples

### Example 1: Todo List

```jsx
// Presentational Components
function TodoListView({ todos, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItemView
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function TodoItemView({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

function TodoFiltersView({ filter, onFilterChange }) {
  return (
    <div className="filters">
      {['all', 'active', 'completed'].map(f => (
        <button
          key={f}
          className={filter === f ? 'active' : ''}
          onClick={() => onFilterChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

// Container Component
function TodoListContainer() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/todos')
      .then(r => r.json())
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (id) => {
    const todo = todos.find(t => t.id === id);
    const updated = { ...todo, completed: !todo.completed };
    
    setTodos(todos.map(t => t.id === id ? updated : t));
    
    await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updated)
    });
  };

  const handleDelete = async (id) => {
    setTodos(todos.filter(t => t.id !== id));
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (loading) return <Loading />;

  return (
    <div>
      <TodoFiltersView filter={filter} onFilterChange={setFilter} />
      <TodoListView
        todos={filteredTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
```

### Example 2: Product Catalog

```jsx
// Presentational Components
function ProductGridView({ products, onAddToCart }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCardView
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

function ProductCardView({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <p className="description">{product.description}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

function ProductFiltersView({ filters, onFilterChange }) {
  return (
    <div className="filters">
      <select
        value={filters.category}
        onChange={e => onFilterChange('category', e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      
      <input
        type="range"
        min="0"
        max="1000"
        value={filters.maxPrice}
        onChange={e => onFilterChange('maxPrice', e.target.value)}
      />
      <span>Max: ${filters.maxPrice}</span>
    </div>
  );
}

// Container Component
function ProductCatalogContainer() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: 1000
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = async (product) => {
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId: product.id })
    });
    alert(`${product.name} added to cart!`);
  };

  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    if (product.price > filters.maxPrice) {
      return false;
    }
    return true;
  });

  if (loading) return <Loading />;

  return (
    <div>
      <ProductFiltersView
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <ProductGridView
        products={filteredProducts}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
```

---

## 💪 Modern Alternative: Custom Hooks

```jsx
// Extract logic to custom hook
function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    if (product.price > filters.maxPrice) {
      return false;
    }
    return true;
  });

  return { products: filteredProducts, loading };
}

// Presentational component with hook
function ProductCatalog({ filters }) {
  const { products, loading } = useProducts(filters);

  if (loading) return <Loading />;

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## 🏋️ Exercise

Refactor a blog post list:

**Requirements:**
- Separate PostList (presentational)
- Create PostListContainer (logic)
- Add filters (category, search)
- Implement pagination
- Handle loading/error states

---

## ⏭️ Next Module

[Higher-Order Components →](../05-hoc/README.md)
