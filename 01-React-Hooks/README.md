# Module 1 : React Hooks Essentiels

## 🎯 Objectifs

Maîtriser les Hooks fondamentaux de React pour construire des composants fonctionnels modernes.

## 📁 Contenu

### 1. useState - Gestion d'État Local

```jsx
import { useState } from 'react';

function Counter() {
  // Déclaration d'état
  const [count, setCount] = useState(0);
  
  // Mise à jour simple
  const increment = () => setCount(count + 1);
  
  // Mise à jour fonctionnelle (recommandé)
  const incrementSafe = () => setCount(prev => prev + 1);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementSafe}>+1</button>
    </div>
  );
}
```

**⚠️ Pièges courants :**

```jsx
// ❌ Mauvais - Mutation directe
const [user, setUser] = useState({ name: 'Alice' });
user.name = 'Bob'; // Ne déclenche PAS de re-render

// ✅ Correct - Nouvelle référence
setUser({ ...user, name: 'Bob' });
```

### 2. useEffect - Effets de Bord

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Effet
    let isCancelled = false;
    
    async function fetchUser() {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();
        if (!isCancelled) {
          setUser(data);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }
    
    fetchUser();
    
    // Cleanup
    return () => {
      isCancelled = true;
    };
  }, [userId]); // Dépendances
  
  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

**Règles du tableau de dépendances :**

```jsx
// Jamais de dépendances : Exécute à chaque render
useEffect(() => {
  console.log('Every render');
});

// Tableau vide : Exécute une seule fois
useEffect(() => {
  console.log('Mount only');
}, []);

// Avec dépendances : Exécute quand elles changent
useEffect(() => {
  console.log('When count changes');
}, [count]);
```

### 3. useCallback - Mémoization de Fonctions

```jsx
import { useState, useCallback } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  
  // ❌ Sans useCallback : Nouvelle fonction à chaque render
  const handleSearch = () => {
    onSearch(query);
  };
  
  // ✅ Avec useCallback : Fonction stable
  const handleSearchMemo = useCallback(() => {
    onSearch(query);
  }, [query, onSearch]);
  
  return (
    <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onBlur={handleSearchMemo}
    />
  );
}
```

### 4. useMemo - Mémoization de Valeurs

```jsx
import { useMemo } from 'react';

function ProductList({ products, filter }) {
  // Calcul coûteux
  const filteredProducts = useMemo(() => {
    console.log('Filtering...');
    return products.filter(p => 
      p.category === filter
    );
  }, [products, filter]);
  
  return (
    <ul>
      {filteredProducts.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

### 5. useRef - Références

```jsx
import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Accès direct au DOM
    inputRef.current.focus();
  }, []);
  
  return <input ref={inputRef} />;
}

// Stocker une valeur mutable sans re-render
function Timer() {
  const intervalRef = useRef(null);
  const [seconds, setSeconds] = useState(0);
  
  const start = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
  };
  
  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  
  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

### 6. Custom Hooks - Réutilisabilité

```jsx
// hooks/useFetch.js
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isCancelled = false;
    
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url);
        const json = await res.json();
        
        if (!isCancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }
    
    fetchData();
    
    return () => {
      isCancelled = true;
    };
  }, [url]);
  
  return { data, loading, error };
}

// Utilisation
function MovieList() {
  const { data, loading, error } = useFetch('/api/movies');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {data.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}
```

## 💡 Projet Pratique : Movie Search App

```jsx
import { useState, useCallback } from 'react';
import { useFetch } from './hooks/useFetch';

function MovieSearchApp() {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  
  const { data, loading, error } = useFetch(
    search ? `/api/movies?search=${search}` : null
  );
  
  const handleSearch = useCallback(() => {
    setSearch(query);
  }, [query]);
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
      
      {loading && <p>Searching...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <ul>
          {data.results.map(movie => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## 📈 Points Clés

✅ **useState** : Toujours utiliser la forme fonctionnelle pour les mises à jour basées sur l'état précédent
✅ **useEffect** : Toujours nettoyer les abonnements/timers
✅ **useCallback/useMemo** : N'optimiser que si nécessaire (mesurer d'abord)
✅ **useRef** : Ne déclenche PAS de re-render
✅ **Custom Hooks** : Préfixer par `use` et suivre les règles des Hooks

## 📚 Ressources

- [React Hooks Reference](https://react.dev/reference/react)
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

---

[← Précédent : ES6 Fundamentals](../00-ES6-Fundamentals/README.md) | [Suivant : State Management →](../02-State-Management/README.md)
