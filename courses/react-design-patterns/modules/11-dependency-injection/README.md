# Module 11: Dependency Injection

## 🎯 Objectives

- ✅ Inject dependencies
- ✅ Improve testability
- ✅ Decouple components

---

## 💻 Example

```jsx
// Instead of hard-coded dependency
function UserProfile() {
  const api = new UserAPI(); // ❌ Tight coupling
  // ...
}

// Inject as prop
function UserProfile({ api }) {
  // ✅ Loose coupling
  // ...
}

// Or via context
const APIContext = createContext();

function UserProfile() {
  const api = useContext(APIContext);
  // ...
}
```

---

## ⏭️ Next Module

[Proxy Pattern →](../12-proxy/README.md)
