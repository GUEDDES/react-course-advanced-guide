# Module 3 : Navigation et Gestion des API

## 🎯 Objectifs

Maîtriser React Router v6 et RTK Query pour créer des applications multi-pages performantes.

## 🧭 React Router v6

### Installation

```bash
npm install react-router-dom
```

### Configuration de Base

```jsx
// main.jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### Routes Simples

```jsx
// App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

### Navigation

```jsx
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      {/* Link basique */}
      <Link to="/">Home</Link>
      
      {/* NavLink avec style actif */}
      <NavLink 
        to="/about"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        About
      </NavLink>
    </nav>
  );
}
```

### Routes Dynamiques

```jsx
// App.jsx
<Route path="/movies/:id" element={<MovieDetail />} />

// MovieDetail.jsx
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams();
  
  return <h1>Movie ID: {id}</h1>;
}
```

### Navigation Programmatique

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = async (credentials) => {
    const success = await login(credentials);
    
    if (success) {
      navigate('/dashboard');
      // Ou avec remplacement de l'historique
      // navigate('/dashboard', { replace: true });
    }
  };
  
  return <form onSubmit={handleLogin}>...</form>;
}
```

### Layouts et Routes Imbriquées

```jsx
// App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
      
      {/* Routes privées */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

// Layout.jsx
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      
      <main>
        <Outlet /> {/* Affiche le composant de la route active */}
      </main>
      
      <footer>
        <p>© 2025 My App</p>
      </footer>
    </div>
  );
}
```

### Query Parameters

```jsx
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q') || '';
  const page = searchParams.get('page') || '1';
  
  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery, page: '1' });
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <p>Page: {page}</p>
    </div>
  );
}
```

## 🚀 RTK Query - Data Fetching Avancé

### Installation

```bash
npm install @reduxjs/toolkit react-redux
```

### Configuration API Service

```javascript
// services/moviesApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TMDB_API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Movie', 'Favorite'],
  endpoints: (builder) => ({
    // GET - Liste des films
    getPopularMovies: builder.query({
      query: (page = 1) => `/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`,
      providesTags: ['Movie']
    }),
    
    // GET - Détail d'un film
    getMovieById: builder.query({
      query: (id) => `/movie/${id}?api_key=${TMDB_API_KEY}`,
      providesTags: (result, error, id) => [{ type: 'Movie', id }]
    }),
    
    // GET - Recherche
    searchMovies: builder.query({
      query: (searchTerm) => 
        `/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}`,
      providesTags: ['Movie']
    }),
    
    // POST - Exemple de mutation
    addToFavorites: builder.mutation({
      query: (movieId) => ({
        url: '/favorites',
        method: 'POST',
        body: { movieId }
      }),
      invalidatesTags: ['Favorite']
    })
  })
});

export const {
  useGetPopularMoviesQuery,
  useGetMovieByIdQuery,
  useSearchMoviesQuery,
  useAddToFavoritesMutation
} = moviesApi;
```

### Configuration du Store

```javascript
// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from '../services/moviesApi';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware)
});
```

### Utilisation dans Composants

```jsx
import { useGetPopularMoviesQuery } from '../services/moviesApi';

function MovieList() {
  const [page, setPage] = useState(1);
  
  const { 
    data, 
    error, 
    isLoading, 
    isFetching,
    refetch 
  } = useGetPopularMoviesQuery(page);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {isFetching && <div>Updating...</div>}
      
      <div className="grid">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      <div>
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
      
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Mutations

```jsx
import { useAddToFavoritesMutation } from '../services/moviesApi';

function MovieCard({ movie }) {
  const [addToFavorites, { isLoading }] = useAddToFavoritesMutation();
  
  const handleAddFavorite = async () => {
    try {
      await addToFavorites(movie.id).unwrap();
      alert('Added to favorites!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };
  
  return (
    <div>
      <h3>{movie.title}</h3>
      <button 
        onClick={handleAddFavorite}
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add to Favorites'}
      </button>
    </div>
  );
}
```

### Polling (Rafraîchissement Automatique)

```jsx
function LiveData() {
  const { data } = useGetPopularMoviesQuery(1, {
    pollingInterval: 30000 // Rafraîchir toutes les 30s
  });
  
  return <div>{/* ... */}</div>;
}
```

### Skip Conditionnel

```jsx
function MovieDetail({ movieId }) {
  const { data } = useGetMovieByIdQuery(movieId, {
    skip: !movieId // Ne pas faire l'appel si pas d'ID
  });
  
  return <div>{/* ... */}</div>;
}
```

## 💡 Projet Complet : Movie Database App

```jsx
// App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}

// pages/MovieDetailPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useGetMovieByIdQuery } from '../services/moviesApi';

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, isLoading, error } = useGetMovieByIdQuery(id);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Movie not found</div>;
  
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}/10</p>
    </div>
  );
}
```

## 📈 Points Clés

✅ **React Router** : Toujours utiliser `<Link>` au lieu de `<a>`
✅ **RTK Query** : Cache automatique et partage entre composants
✅ **Tags** : Système d'invalidation puissant
✅ **Polling** : Utile pour données temps réel
✅ **Optimistic Updates** : Meilleure UX

## 📚 Ressources

- [React Router Documentation](https://reactrouter.com)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [TMDB API](https://www.themoviedb.org/documentation/api)

---

[← Précédent : State Management](../02-State-Management/README.md) | [Suivant : Micro-frontends →](../04-Microfrontends/README.md)
