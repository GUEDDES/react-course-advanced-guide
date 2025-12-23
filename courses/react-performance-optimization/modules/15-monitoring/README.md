# Module 15: Performance Monitoring

## 🎯 Objectives

- ✅ Real User Monitoring
- ✅ Error tracking
- ✅ Performance metrics
- ✅ Analytics integration

---

## 📊 Sentry Integration

```js
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_DSN',
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0
});
```

---

## 📝 Custom Metrics

```js
import { onCLS, onFID, onLCP } from 'web-vitals';

function sendToAnalytics({ name, value, id }) {
  ga('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventValue: Math.round(value),
    eventLabel: id,
    nonInteraction: true
  });
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onLCP(sendToAnalytics);
```

---

## ⏭️ Next Module

[Debugging Performance →](../16-debugging/README.md)
