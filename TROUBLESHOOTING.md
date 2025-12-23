# Troubleshooting Guide

Common issues and their solutions for all projects.

## 🔧 Installation Issues

### npm install fails

**Problem:** Dependencies fail to install

**Solutions:**

1. **Clear npm cache:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

2. **Use correct Node version:**
```bash
node --version  # Should be 18+
nvm install 18  # If using nvm
nvm use 18
```

3. **Try yarn instead:**
```bash
npm install -g yarn
yarn install
```

---

### Port already in use

**Problem:** `Error: Port 3000 is already in use`

**Solutions:**

**macOS/Linux:**
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
VITE_PORT=3001 npm run dev
```

**Windows:**
```cmd
# Find process
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

---

## ⚙️ Build Issues

### Build fails with memory error

**Problem:** `JavaScript heap out of memory`

**Solution:**
```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Windows
set NODE_OPTIONS=--max-old-space-size=4096 && npm run build
```

---

### TypeScript errors (E-Commerce)

**Problem:** Type errors during build

**Solutions:**

1. **Check TypeScript version:**
```bash
npm list typescript
# Should be 5.x
```

2. **Clear TypeScript cache:**
```bash
rm -rf node_modules/.cache
npm run type-check
```

3. **Regenerate types:**
```bash
npm install --save-dev @types/react @types/react-dom
```

---

## 🎬 Movie App Issues

### API not responding

**Problem:** Movie search returns no results

**Causes:**
1. OMDB API key not configured
2. Rate limit exceeded
3. Network issues

**Solutions:**

1. **Get API key:**
   - Visit https://www.omdbapi.com/apikey.aspx
   - Sign up for free key
   - Add to `.env`:
   ```
   VITE_OMDB_API_KEY=your_key_here
   ```

2. **Check rate limits:**
   - Free tier: 1,000 requests/day
   - Wait 24 hours or upgrade

3. **Verify API call:**
   ```javascript
   console.log('API Key:', import.meta.env.VITE_OMDB_API_KEY);
   ```

---

## ✅ Task Manager Issues

### LocalStorage not persisting

**Problem:** Tasks disappear on refresh

**Solutions:**

1. **Check browser settings:**
   - Ensure cookies/storage enabled
   - Check if in private/incognito mode
   - Clear browser cache

2. **Verify store setup:**
   ```javascript
   // taskStore.js
   import { persist } from 'zustand/middleware';
   
   export const useTaskStore = create(
     persist(
       (set, get) => ({
         // ... store logic
       }),
       {
         name: 'task-storage', // Check this key
       }
     )
   );
   ```

3. **Manual check:**
   ```javascript
   // In browser console
   localStorage.getItem('task-storage');
   ```

---

### Drag and drop not working

**Problem:** Cannot drag tasks

**Solutions:**

1. **Check react-dnd installation:**
   ```bash
   npm list react-dnd react-dnd-html5-backend
   ```

2. **Verify DnD Provider:**
   ```jsx
   import { DndProvider } from 'react-dnd';
   import { HTML5Backend } from 'react-dnd-html5-backend';
   
   <DndProvider backend={HTML5Backend}>
     {/* Your app */}
   </DndProvider>
   ```

3. **Touch devices:**
   ```bash
   npm install react-dnd-touch-backend
   ```

---

## 🛒 E-Commerce Issues

### Stripe not loading

**Problem:** Payment form doesn't appear

**Solutions:**

1. **Check API keys:**
   ```bash
   # .env
   VITE_STRIPE_PUBLIC_KEY=pk_test_...
   ```

2. **Verify Stripe.js loading:**
   ```jsx
   import { loadStripe } from '@stripe/stripe-js';
   
   const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
   ```

3. **Content Security Policy:**
   ```html
   <!-- index.html -->
   <meta http-equiv="Content-Security-Policy" 
         content="script-src 'self' https://js.stripe.com">
   ```

---

### Redux DevTools not working

**Problem:** Can't see Redux state in browser

**Solutions:**

1. **Install extension:**
   - [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

2. **Check store configuration:**
   ```typescript
   // store.ts
   export const store = configureStore({
     reducer: { /* ... */ },
     devTools: process.env.NODE_ENV !== 'production'
   });
   ```

3. **Open DevTools:**
   - F12 → Redux tab
   - Or Cmd+Opt+J (Mac) / Ctrl+Shift+J (Windows)

---

## 📱 Social Dashboard Issues

### WebSocket connection fails

**Problem:** Dashboard shows "Offline" or connection errors

**Solutions:**

1. **Start WebSocket server:**
   ```bash
   cd examples/social-dashboard/server
   npm install
   npm start
   
   # Should see:
   # 🚀 WebSocket server running on ws://localhost:8080
   ```

2. **Check port availability:**
   ```bash
   # macOS/Linux
   lsof -i :8080
   
   # Windows
   netstat -ano | findstr :8080
   ```

3. **Verify connection URL:**
   ```javascript
   // useWebSocket.js
   const WS_URL = 'ws://localhost:8080';
   ```

4. **Firewall issues:**
   - Allow port 8080 in firewall
   - Check antivirus settings

---

### Auto-reconnect not working

**Problem:** WebSocket doesn't reconnect after disconnect

**Check reconnect logic:**

```javascript
// useWebSocket.js
const MAX_RETRIES = 5;
let retryCount = 0;

const connect = () => {
  if (retryCount >= MAX_RETRIES) {
    console.error('Max reconnection attempts reached');
    return;
  }
  
  // Connection logic...
};
```

**Debug in console:**
```javascript
// Check retry count
console.log('Retry count:', retryCount);

// Monitor connection state
ws.addEventListener('close', (event) => {
  console.log('WebSocket closed:', event.code, event.reason);
});
```

---

### Real-time updates not appearing

**Problem:** Metrics don't update

**Solutions:**

1. **Check message handler:**
   ```javascript
   const handleMessage = (data) => {
     console.log('Received:', data);
     if (data.type === 'metrics_update') {
       updateMetrics(data.platform, data.data);
     }
   };
   ```

2. **Verify server sending updates:**
   ```javascript
   // websocket-server.js
   setInterval(() => {
     const data = { type: 'metrics_update', /* ... */ };
     ws.send(JSON.stringify(data));
     console.log('Sent update:', data);
   }, 5000);
   ```

3. **Check Zustand store:**
   ```javascript
   // Test in console
   import { useMetricsStore } from './stores/metricsStore';
   const store = useMetricsStore.getState();
   console.log(store.metrics);
   ```

---

## 🐳 Docker Issues

### Docker build fails

**Problem:** `docker-compose up` errors

**Solutions:**

1. **Check Docker installation:**
   ```bash
   docker --version
   docker-compose --version
   ```

2. **Rebuild images:**
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up
   ```

3. **Check Dockerfile:**
   ```dockerfile
   # Ensure correct Node version
   FROM node:18-alpine
   ```

---

### Container won't start

**Problem:** Container exits immediately

**Debug:**
```bash
# View logs
docker-compose logs

# Check container status
docker ps -a

# Inspect container
docker inspect <container_id>
```

---

## 🔄 CI/CD Issues

### GitHub Actions failing

**Problem:** Workflow fails on push

**Check:**

1. **Secrets configured:**
   - Settings → Secrets → Actions
   - Verify all required secrets exist

2. **Node version:**
   ```yaml
   # .github/workflows/ci.yml
   - uses: actions/setup-node@v3
     with:
       node-version: '18'  # Match local version
   ```

3. **View logs:**
   - Actions tab → Failed workflow → View logs

---

## 🎯 General Tips

### Clear everything and start fresh

```bash
# Nuclear option - clears everything
rm -rf node_modules package-lock.json dist .cache
npm cache clean --force
npm install
```

### Check versions

```bash
node --version     # Should be 18+
npm --version      # Should be 9+
git --version      # Any recent version
```

### Enable verbose logging

```bash
# npm
npm install --verbose
npm run dev --verbose

# Vite
VITE_LOG_LEVEL=info npm run dev
```

### Browser DevTools

- **Console:** Check for errors
- **Network:** Verify API calls
- **Application:** Check localStorage
- **Redux/React DevTools:** Debug state

---

## 🐛 Reporting Bugs

If none of these solutions work:

1. **Check existing issues:** [GitHub Issues](https://github.com/GUEDDES/react-course-advanced-guide/issues)

2. **Create new issue with:**
   - Project name
   - Node/npm versions
   - Operating system
   - Steps to reproduce
   - Error messages (full stack trace)
   - Screenshots

3. **Include debug info:**
   ```bash
   # Run and include output
   npm run dev 2>&1 | tee debug.log
   ```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Troubleshooting](https://vitejs.dev/guide/troubleshooting.html)
- [Node.js Issues](https://github.com/nodejs/node/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)

---

**Still stuck? Open an issue and we'll help! 🚀**
