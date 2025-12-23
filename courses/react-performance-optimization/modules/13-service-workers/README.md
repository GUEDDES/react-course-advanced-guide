# Module 13: Service Workers

## 🎯 Objectives

- ✅ Offline support
- ✅ Cache strategies
- ✅ Background sync

---

## 💾 Caching Strategy

```js
// Cache-first
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

---

## ⏭️ Next Module

[Progressive Web Apps →](../14-pwa/README.md)
