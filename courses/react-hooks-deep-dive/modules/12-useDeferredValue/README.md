# useDeferredValue - Deferred Updates (React 18+)

## 🎯 Objectives

- ✅ Defer non-urgent updates
- ✅ Keep UI responsive
- ✅ Alternative to useTransition
- ✅ Optimize rendering

---

## 📖 What is useDeferredValue?

Defers updating a value to keep UI responsive.

```jsx
const deferredValue = useDeferredValue(value);
```

---

## 💻 Examples

### Example 1: Search Results

```jsx
import { useState, useDeferredValue, useMemo } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  const results = useMemo(() => {
    return searchDatabase(deferredQuery);
  }, [deferredQuery]);

  return (
    <ul>
      {results.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

function App() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <SearchResults query={query} />
    </div>
  );
}
```

### Example 2: Live Preview

```jsx
import { useState, useDeferredValue } from 'react';

function CodeEditor() {
  const [code, setCode] = useState('');
  const deferredCode = useDeferredValue(code);

  return (
    <div className="split-view">
      <textarea value={code} onChange={e => setCode(e.target.value)} />
      <Preview code={deferredCode} />
    </div>
  );
}

function Preview({ code }) {
  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}
```

---

## 🏋️ Exercise

Create a color picker with live preview using useDeferredValue.

---

## ➡️ Next: [useId](../13-useId/README.md)
