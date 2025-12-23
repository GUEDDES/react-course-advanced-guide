# Module 0 : Fondamentaux JavaScript ES6+

## 🎯 Objectifs

Maîtriser les fonctionnalités modernes de JavaScript indispensables pour React.

## 📚 Contenu

### 1. Variables Modernes

```javascript
// ❌ Éviter var
var oldWay = "problèmes de scope";

// ✅ Utiliser const par défaut
const API_URL = "https://api.example.com";
const user = { name: "Alice" };

// ✅ let uniquement si réassignation nécessaire
let counter = 0;
counter++;
```

### 2. Arrow Functions

```javascript
// Syntaxe concise
const add = (a, b) => a + b;

// Avec bloc
const processData = (data) => {
  const result = data.map(item => item * 2);
  return result;
};

// Contexte 'this' lexical
class Timer {
  constructor() {
    this.seconds = 0;
    // Arrow function préserve 'this'
    setInterval(() => {
      this.seconds++;
    }, 1000);
  }
}
```

### 3. Destructuring

```javascript
// Objets
const user = { name: "Bob", age: 25, city: "Paris" };
const { name, age } = user;

// Avec renommage
const { name: userName, age: userAge } = user;

// Valeurs par défaut
const { country = "France" } = user;

// Tableaux
const colors = ["red", "green", "blue"];
const [primary, secondary] = colors;

// Skip d'éléments
const [first, , third] = colors;
```

### 4. Spread & Rest Operators

```javascript
// Spread - Étaler un tableau
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Spread - Copier un objet
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 };

// Rest - Collecter les arguments
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3, 4); // 10
```

### 5. Array Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - Transformation
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter - Filtrage
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce - Réduction
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// find - Recherche
const found = numbers.find(n => n > 3);
// 4

// some / every - Tests
const hasEven = numbers.some(n => n % 2 === 0); // true
const allPositive = numbers.every(n => n > 0); // true
```

### 6. Async/Await

```javascript
// Promise classique
function fetchUserOld(id) {
  return fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err));
}

// Async/Await - Plus lisible
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}

// Appels parallèles
async function fetchMultipleUsers(ids) {
  const promises = ids.map(id => fetchUser(id));
  const users = await Promise.all(promises);
  return users;
}
```

### 7. Modules ES6

```javascript
// math.js - Export nommé
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}

// Export par défaut
export default function subtract(a, b) {
  return a - b;
}

// app.js - Import
import subtract, { PI, add } from './math.js';

console.log(add(2, 3)); // 5
console.log(PI); // 3.14159
console.log(subtract(5, 2)); // 3
```

## ✨ Exercices Pratiques

### Exercice 1 : Transformation de données

```javascript
const products = [
  { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
  { id: 2, name: "Phone", price: 800, category: "Electronics" },
  { id: 3, name: "Desk", price: 300, category: "Furniture" },
  { id: 4, name: "Chair", price: 150, category: "Furniture" },
];

// TODO: 
// 1. Filtrer les produits < 500€
// 2. Ajouter une propriété 'affordable: true'
// 3. Extraire uniquement name et price
```

**Solution :**

```javascript
const affordableProducts = products
  .filter(p => p.price < 500)
  .map(p => ({ 
    ...p, 
    affordable: true 
  }))
  .map(({ name, price, affordable }) => ({ 
    name, 
    price, 
    affordable 
  }));
```

### Exercice 2 : API avec Async/Await

```javascript
// TODO: Créer une fonction qui :
// 1. Récupère les données de https://jsonplaceholder.typicode.com/posts
// 2. Filtre les posts de l'userId 1
// 3. Retourne uniquement les titres
```

**Solution :**

```javascript
async function getUserPosts(userId) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    
    return posts
      .filter(post => post.userId === userId)
      .map(post => post.title);
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

// Utilisation
getUserPosts(1).then(titles => console.log(titles));
```

## 📈 Points Clés

✅ **Immutabilité** : Toujours utiliser spread pour copier
✅ **Pure functions** : Pas d'effets de bord
✅ **Async/Await** : Préférer aux Promise chains
✅ **Destructuring** : Code plus lisible
✅ **Arrow functions** : Syntaxe concise

## 📚 Ressources

- [MDN - JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info)
- [ES6 Features](http://es6-features.org)

---

[Suivant : Module 1 - React Hooks →](../01-React-Hooks/README.md)
