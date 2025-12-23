# Module 12: Web Workers

## 🎯 Objectives

- ✅ Offload heavy computations
- ✅ Keep UI responsive
- ✅ Use Comlink

---

## 💻 Example

```js
// worker.js
self.addEventListener('message', (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
});

// App.jsx
const worker = new Worker('worker.js');
worker.postMessage(data);
worker.onmessage = (e) => setResult(e.data);
```

---

## ⏭️ Next Module

[Service Workers →](../13-service-workers/README.md)
