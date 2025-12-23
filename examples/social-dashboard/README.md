# Social Media Dashboard - Projet Real-Time

## 📱 Description

Tableau de bord pour gérer plusieurs comptes de réseaux sociaux avec analytics en temps réel, planification de posts, et engagement tracking.

## ✨ Fonctionnalités

### 📊 Analytics Real-Time
- Métriques en direct (followers, likes, comments)
- Graphiques de croissance
- Comparaison multi-plateformes
- Rapports personnalisés
- Export de données

### 📝 Gestion de Contenu
- Planification de posts
- Calendrier éditorial
- Prévisualisation multi-plateformes
- Templates de posts
- Media library

### 💬 Engagement
- Inbox unifié (tous les messages)
- Réponses rapides
- Mentions et tags
- Commentaires à modérer
- Notifications intelligentes

### 🔔 Monitoring
- Alertes personnalisées
- Tracking de hashtags
- Veille concurrentielle
- Sentiment analysis

## 🛠️ Stack Technique

- **React 18** avec Concurrent Features
- **Zustand** pour state global
- **React Query** pour data fetching
- **WebSockets** pour real-time updates
- **Chart.js** pour visualisations
- **React Calendar** pour planning
- **Tiptap** pour éditeur riche

## 🏗️ Architecture

```
src/
├── features/
│   ├── analytics/
│   │   ├── MetricsCards.jsx
│   │   ├── GrowthChart.jsx
│   │   └── PlatformComparison.jsx
│   ├── posts/
│   │   ├── PostScheduler.jsx
│   │   ├── PostEditor.jsx
│   │   ├── PostCalendar.jsx
│   │   └── PostPreview.jsx
│   ├── inbox/
│   │   ├── MessageList.jsx
│   │   ├── MessageThread.jsx
│   │   └── QuickReply.jsx
│   └── monitoring/
│       ├── AlertsPanel.jsx
│       ├── HashtagTracker.jsx
│       └── CompetitorWatch.jsx
├── services/
│   ├── websocket.js
│   ├── api.js
│   └── analytics.js
├── stores/
│   ├── metricsStore.js
│   ├── postsStore.js
│   └── inboxStore.js
├── hooks/
│   ├── useRealTimeMetrics.js
│   ├── useWebSocket.js
│   └── useNotifications.js
└── App.jsx
```

## 🚀 Installation

```bash
cd examples/social-dashboard
npm install

# Lancer le serveur WebSocket mock
npm run ws-server

# Lancer l'application
npm run dev
```

## 🧪 Tests

```bash
npm test              # Tests unitaires
npm run test:ws       # Tests WebSocket
npm run test:coverage # Couverture
```

## 📚 Concepts Avancés

### Real-Time avec WebSockets
- Connexion persistante
- Reconnexion automatique
- Gestion des erreurs
- Heartbeat/ping-pong

### React Query
- Cache intelligent
- Background refetching
- Optimistic updates
- Pagination infinie
- Prefetching

### Performance
- Virtual scrolling pour messages
- Debouncing des updates
- Suspense pour loading states
- Error boundaries par feature

### State Management Hybride
- Zustand pour UI state
- React Query pour server state
- Local state avec useState
- Synchronisation entre sources

## 🎓 Points d'Apprentissage

1. **WebSockets** - Communication temps réel
2. **React Query** - Server state management
3. **Concurrent React** - Suspense et Transitions
4. **Data Visualization** - Chart.js
5. **Rich Text Editor** - Tiptap
6. **Calendar Integration** - React Calendar
7. **Optimistic UI** - Meilleures UX
8. **Error Recovery** - Stratégies de retry

## 🔌 WebSocket Events

```javascript
// Server → Client
{
  type: 'metrics_update',
  platform: 'twitter',
  data: { followers: 1523, engagement: 4.2 }
}

// Client → Server
{
  type: 'subscribe',
  channels: ['twitter', 'instagram']
}
```

## 📸 Captures d'Écran

![Dashboard](screenshots/dashboard.png)
![Post Scheduler](screenshots/scheduler.png)
![Inbox](screenshots/inbox.png)
![Analytics](screenshots/analytics.png)

## 🔗 Documentation

- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://docs.pmnd.rs/zustand)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Chart.js](https://www.chartjs.org/)
