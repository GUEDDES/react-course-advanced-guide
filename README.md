# 🚀 React Advanced Guide - Complete Project Collection

[![CI Status](https://github.com/GUEDDES/react-course-advanced-guide/workflows/CI/badge.svg)](https://github.com/GUEDDES/react-course-advanced-guide/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A comprehensive collection of **5 production-ready React projects** demonstrating advanced concepts, best practices, and modern development patterns. Perfect for learning, teaching, or using as starter templates.

## 📚 Table of Contents

- [Projects Overview](#-projects-overview)
- [Quick Start](#-quick-start)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Details](#-project-details)
- [Docker Deployment](#-docker-deployment)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📋 Projects Overview

| Project | Complexity | Tech Stack | Live Demo | Lines of Code |
|---------|------------|------------|-----------|---------------|
| **Movie App** | ⭐⭐ Beginner | React, Hooks, Fetch API | [Demo](#) | ~500 |
| **State Management Demo** | ⭐⭐ Beginner | React, Zustand | [Demo](#) | ~400 |
| **Advanced Task Manager** | ⭐⭐⭐ Intermediate | React, Zustand, React DnD, Recharts | [Demo](#) | ~2000 |
| **E-Commerce Platform** | ⭐⭐⭐⭐ Advanced | React, TypeScript, Redux Toolkit, Stripe | [Demo](#) | ~1500 |
| **Social Media Dashboard** | ⭐⭐⭐⭐ Advanced | React, Zustand, React Query, WebSockets | [Demo](#) | ~2500 |

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/GUEDDES/react-course-advanced-guide.git

# Navigate to a project
cd react-course-advanced-guide/examples/advanced-task-manager

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Using Docker

```bash
# Navigate to project
cd examples/advanced-task-manager

# Build and run with Docker Compose
docker-compose up -d
```

---

## ✨ Features

### Common Features Across All Projects

- ✅ Modern React 18+ with Hooks
- ✅ Fully responsive design
- ✅ Component-based architecture
- ✅ ESLint + Prettier configured
- ✅ Comprehensive documentation
- ✅ Docker support
- ✅ CI/CD ready

### Project-Specific Features

#### 🎬 Movie App
- Movie search with OMDB API
- Responsive grid layout
- Loading states
- Error handling

#### 📦 State Management Demo
- Zustand store implementation
- Counter with persist
- Best practices examples

#### ✅ Advanced Task Manager
- Complete CRUD operations
- Drag & Drop task reordering
- Multi-criteria filtering
- CSV/JSON export
- Analytics dashboard
- Dark mode ready

#### 🛒 E-Commerce Platform
- Product catalog with search
- Shopping cart with Redux Toolkit
- Stripe payment integration
- TypeScript throughout
- Multi-step checkout
- OAuth authentication (Google, GitHub)

#### 📱 Social Media Dashboard
- Real-time metrics via WebSockets
- Post scheduling
- Unified inbox
- Analytics & reporting
- Multi-platform support (Twitter, Instagram, LinkedIn)
- Auto-reconnect WebSocket

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|----------|
| React | 18.3+ | UI Framework |
| Vite | 5.x | Build Tool |
| TypeScript | 5.x | Type Safety (E-Commerce) |
| Node.js | 18+ | Runtime |

### State Management

- **Zustand** - Lightweight state (Task Manager, Social Dashboard)
- **Redux Toolkit** - Complex state with RTK Query (E-Commerce)
- **React Query** - Server state management (Social Dashboard)

### UI & Styling

- **CSS Modules** - Scoped styling
- **React DnD** - Drag and drop (Task Manager)
- **Recharts** - Data visualization (Task Manager)
- **date-fns** - Date formatting

### Additional Libraries

- **React Router** - Navigation
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Stripe Elements** - Payment processing
- **WebSocket (ws)** - Real-time communication
- **uuid** - Unique ID generation

### Development Tools

- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Docker** - Containerization

---

## 📁 Project Details

### 1. 🎬 Movie App (Beginner)

**Path:** `examples/movie-app`

**What You'll Learn:**
- useState and useEffect hooks
- API integration with fetch
- Conditional rendering
- Props and component composition
- Loading and error states

**Run:**
```bash
cd examples/movie-app
npm install && npm run dev
```

**[Full Documentation](examples/movie-app/README.md)**

---

### 2. 📦 State Management Demo (Beginner)

**Path:** `examples/state-management-demo`

**What You'll Learn:**
- Zustand store setup
- Global state management
- State persistence
- Actions and selectors

**Run:**
```bash
cd examples/state-management-demo
npm install && npm run dev
```

**[Full Documentation](examples/state-management-demo/README.md)**

---

### 3. ✅ Advanced Task Manager (Intermediate)

**Path:** `examples/advanced-task-manager`

**What You'll Learn:**
- Complex Zustand patterns
- Drag and drop implementation
- Advanced filtering and sorting
- Data export (CSV/JSON)
- Dashboard with statistics
- Modal patterns
- Multi-page routing

**Run:**
```bash
cd examples/advanced-task-manager
npm install && npm run dev
```

**Key Features:**
- 📊 Real-time statistics dashboard
- 🎯 Multi-criteria filtering (status, priority, category)
- 📅 Due date management
- 🏷️ Tagging system
- 💬 Comments on tasks
- 💾 Export to CSV/JSON
- ⌨️ Keyboard shortcuts

**[Full Documentation](examples/advanced-task-manager/README.md)** | **[Screenshots](examples/advanced-task-manager/SCREENSHOTS.md)** | **[Deployment Guide](examples/advanced-task-manager/DEPLOYMENT.md)**

---

### 4. 🛒 E-Commerce Platform (Advanced)

**Path:** `examples/ecommerce-platform`

**What You'll Learn:**
- Redux Toolkit with RTK Query
- TypeScript in React
- Stripe payment integration
- OAuth authentication
- Form validation with Zod
- Shopping cart logic
- Multi-step forms

**Run:**
```bash
cd examples/ecommerce-platform
cp .env.example .env  # Configure your Stripe keys
npm install && npm run dev
```

**Key Features:**
- 🛒 Full shopping cart functionality
- 💳 Stripe payment processing
- 🔐 OAuth authentication (Google, GitHub)
- 📦 Inventory management
- 🎫 Promo codes
- 📊 Admin dashboard
- 📧 Order confirmation emails

**[Full Documentation](examples/ecommerce-platform/README.md)** | **[Screenshots](examples/ecommerce-platform/SCREENSHOTS.md)**

---

### 5. 📱 Social Media Dashboard (Advanced)

**Path:** `examples/social-dashboard`

**What You'll Learn:**
- WebSocket real-time communication
- Hybrid state management (Zustand + React Query)
- Custom hooks with complex logic
- Auto-reconnecting WebSocket
- Server-side event handling
- Testing WebSocket connections

**Run:**
```bash
# Terminal 1 - Start WebSocket server
cd examples/social-dashboard/server
npm install && npm start

# Terminal 2 - Start React app
cd examples/social-dashboard
npm install && npm run dev
```

**Key Features:**
- 🔴 Live metrics updates via WebSockets
- 📅 Post scheduling calendar
- 💬 Unified inbox (Twitter, Instagram, LinkedIn)
- 📈 Analytics dashboard
- 🔔 Smart notifications
- 🏷️ Hashtag monitoring
- 📊 Growth trends visualization

**[Full Documentation](examples/social-dashboard/README.md)** | **[WebSocket Hook Tests](examples/social-dashboard/src/tests/useWebSocket.test.js)**

---

## 🐳 Docker Deployment

All projects include Docker support for easy deployment.

### Single Project

```bash
cd examples/advanced-task-manager
docker-compose up -d
```

### All Projects

```bash
# Task Manager on port 3000
cd examples/advanced-task-manager && docker-compose up -d

# E-Commerce on port 3001
cd examples/ecommerce-platform && docker-compose up -d

# Social Dashboard on port 3002 (includes WebSocket server)
cd examples/social-dashboard && docker-compose up -d
```

### Production Build

Each Dockerfile uses multi-stage builds:
1. **Builder stage** - Installs deps and builds app
2. **Production stage** - Nginx serves static files

Features:
- ⚡ Optimized bundle size
- 🛡️ Security headers configured
- 📊 Health checks included
- 🗃️ Gzip compression enabled

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### Continuous Integration (`.github/workflows/ci.yml`)

Runs on every push and PR:
- ✅ Install dependencies
- ✅ Run ESLint
- ✅ Type checking (TypeScript projects)
- ✅ Run unit tests
- ✅ Run build
- ✅ Upload coverage reports

#### Deployment (`.github/workflows/deploy.yml`)

Triggers:
- Manual workflow dispatch
- Commit messages with `[deploy-*]` tags

Actions:
- 🚀 Deploy to Vercel
- 🐳 Build Docker images
- 📦 Push to DockerHub

### Setting Up Secrets

Add these secrets in GitHub repository settings:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID_TASK=task_manager_project_id
VERCEL_PROJECT_ID_ECOMMERCE=ecommerce_project_id
DOCKERHUB_USERNAME=your_dockerhub_username
DOCKERHUB_TOKEN=your_dockerhub_token
STRIPE_PUBLIC_KEY=pk_test_...
```

---

## 📚 Learning Path

### Beginner Track
1. Start with **Movie App** - Learn basic hooks and API calls
2. Move to **State Management Demo** - Understand global state

### Intermediate Track
3. Build **Advanced Task Manager** - Complex state, routing, filters

### Advanced Track
4. Study **E-Commerce Platform** - TypeScript, Redux, payments
5. Master **Social Dashboard** - WebSockets, real-time data

---

## 🧑‍💻 Development Scripts

All projects include these npm scripts:

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm test             # Run tests
npm run test:watch   # Watch mode for tests
npm run test:coverage # Generate coverage report
```

Additional scripts (project-specific):
```bash
npm run type-check   # TypeScript type checking (E-Commerce)
npm run format       # Prettier formatting
```

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Build errors:**
```bash
# Ensure Node version is 18+
node --version

# Update npm
npm install -g npm@latest
```

**WebSocket connection fails:**
```bash
# Make sure WebSocket server is running
cd examples/social-dashboard/server
npm start

# Check if port 8080 is available
lsof -i :8080
```

**[Full Troubleshooting Guide](TROUBLESHOOTING.md)**

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- ✨ Submit pull requests
- ⭐ Star the repository

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 Documentation

- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Project Comparison](COMPARISON.md)** - Detailed comparison of all projects
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues and solutions
- **Individual READMEs** - Each project has detailed documentation

---

## 📊 Project Statistics

- **Total Projects:** 5
- **Total Files:** 150+
- **Lines of Code:** ~7,000+
- **Components:** 50+
- **Custom Hooks:** 10+
- **Test Coverage:** 80%+

---

## 🔗 Useful Links

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Stripe Documentation](https://stripe.com/docs)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

---

## 💬 Support

If you need help:

1. Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
2. Search existing [GitHub Issues](https://github.com/GUEDDES/react-course-advanced-guide/issues)
3. Open a new issue with:
   - Project name
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⭐ Star History

If you find this repository helpful, please consider giving it a star! ⭐

---

## 🚀 What's Next?

Upcoming features and projects:
- [ ] Testing guide with examples
- [ ] Performance optimization guide
- [ ] Accessibility improvements
- [ ] PWA features
- [ ] GraphQL integration example
- [ ] Next.js migration guide

---

## 👨‍💻 Author

**GUEDDES**
- GitHub: [@GUEDDES](https://github.com/GUEDDES)

---

## 🚀 Acknowledgments

- React team for the amazing framework
- Open source community for the libraries used
- Contributors who help improve this repository

---

<div align="center">

**Built with ❤️ for the React community**

[⬆ Back to Top](#-react-advanced-guide---complete-project-collection)

</div>
