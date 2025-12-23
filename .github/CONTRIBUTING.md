# Guide de Contribution

Merci de votre intérêt pour contribuer à ce projet ! 🎉

## 👨‍💻 Comment Contribuer

### 1. Fork et Clone

```bash
# Fork le repository sur GitHub
# Puis clone votre fork
git clone https://github.com/VOTRE_USERNAME/react-course-advanced-guide.git
cd react-course-advanced-guide
```

### 2. Créer une Branche

```bash
git checkout -b feature/ma-super-fonctionnalite
# ou
git checkout -b fix/correction-bug
```

### 3. Convention de Commits

Nous suivons [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Ajouter exemple de custom hook useDebounce
fix: Corriger erreur dans MovieCard component
docs: Améliorer documentation du module State Management
test: Ajouter tests pour useFetch hook
refactor: Simplifier logique du panier e-commerce
```

### 4. Standards de Code

#### JavaScript/React

```javascript
// ✅ Bon
const MyComponent = ({ title, onAction }) => {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
    onAction?.(count);
  }, [count, onAction]);
  
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  );
};

// ❌ Mauvais
function MyComponent(props) {
  var count = 0; // Utiliser const/let
  
  return <div onClick={() => props.onAction()}> {/* Pas de callback optimisé */}
    <h2>{props.title}</h2>
  </div>
}
```

#### Documentation

```javascript
/**
 * Hook personnalisé pour débouncer une valeur
 * @param {any} value - Valeur à débouncer
 * @param {number} delay - Délai en ms
 * @returns {any} Valeur débouncée
 * 
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 500);
 */
export function useDebounce(value, delay) {
  // ...
}
```

### 5. Tests

Chaque nouvelle fonctionnalité doit inclure des tests :

```javascript
// MyComponent.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render title', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  
  it('should increment count on click', () => {
    render(<MyComponent title="Test" />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(button).toHaveTextContent('Count: 1');
  });
});
```

Exécuter les tests :

```bash
cd examples/[nom-exemple]
npm test
npm run test:coverage
```

### 6. Pull Request

1. Pushez votre branche
2. Ouvrez une PR sur GitHub
3. Remplissez le template de PR
4. Attendez la review

## 📝 Types de Contributions

### 🐛 Signaler un Bug

Utilisez le template [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)

### 💡 Proposer une Fonctionnalité

Utilisez le template [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)

### 📚 Améliorer la Documentation

- Corriger des typos
- Ajouter des exemples
- Clarifier des explications
- Traduire en d'autres langues

### ✨ Ajouter des Exemples

Structure d'un exemple :

```
examples/mon-exemple/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── App.jsx
│   └── main.jsx
├── tests/
├── package.json
├── vite.config.js
└── README.md
```

## ✅ Checklist Avant PR

- [ ] Le code suit les conventions du projet
- [ ] Les tests passent (`npm test`)
- [ ] La couverture de tests est ≥ 80%
- [ ] Le linter ne renvoie aucune erreur (`npm run lint`)
- [ ] La documentation est à jour
- [ ] Les commits suivent Conventional Commits
- [ ] La PR a une description claire

## 👥 Code de Conduite

Soyez respectueux et bienveillant avec tous les contributeurs.

## 💬 Questions ?

N'hésitez pas à ouvrir une [Discussion](https://github.com/GUEDDES/react-course-advanced-guide/discussions) !

---

Merci de contribuer à l'amélioration de ce projet ! 🚀
