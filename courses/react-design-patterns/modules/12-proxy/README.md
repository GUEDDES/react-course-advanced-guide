# Module 12: Proxy Pattern

## 🎯 Objectives

- ✅ Intercept operations
- ✅ Add validation
- ✅ Cache results

---

## 💻 Example

```jsx
const handler = {
  get(target, prop) {
    console.log(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const user = new Proxy({ name: 'John' }, handler);
user.name; // Logs: Getting name
user.age = 30; // Logs: Setting age to 30
```

---

## ⏭️ Next Module

[Observer Pattern →](../13-observer/README.md)
