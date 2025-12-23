# 🚀 React Advanced Guide - Complete Learning Platform

[![CI Status](https://github.com/GUEDDES/react-course-advanced-guide/workflows/CI/badge.svg)](https://github.com/GUEDDES/react-course-advanced-guide/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A comprehensive collection of **5 production-ready React projects** and **4 complete courses** demonstrating advanced concepts, best practices, and modern development patterns. Perfect for learning, teaching, or using as starter templates.

## 📚 Table of Contents

- [Projects Overview](#-projects-overview)
- [Courses Overview](#-courses-overview)
- [Quick Start](#-quick-start)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Learning Path](#-learning-path)
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

## 🎓 Courses Overview

| Course | Duration | Level | Topics Covered | Modules |
|--------|----------|-------|----------------|----------|
| **[React Hooks Deep Dive](./courses/react-hooks-deep-dive/README.md)** | 8-10h | Beginner-Advanced | All React Hooks, Custom Hooks | 16 modules |
| **[Performance Optimization](./courses/react-performance-optimization/README.md)** | 10-12h | Intermediate-Advanced | Web Vitals, Code Splitting, Memoization | 20 modules |
| **[Testing Masterclass](./courses/react-testing-masterclass/README.md)** | 12-15h | Beginner-Advanced | Jest, RTL, Playwright, E2E | 24 modules |
| **[Design Patterns](./courses/react-design-patterns/README.md)** | 10-12h | Intermediate-Advanced | HOC, Render Props, Compound Components | 18 modules |

### 🎯 Course Details

#### 🎣 React Hooks Deep Dive
**Master all React Hooks from basics to advanced patterns**

- ✅ useState, useEffect, useContext
- ✅ useMemo, useCallback, useRef
- ✅ useReducer, useLayoutEffect
- ✅ React 18+ hooks (useTransition, useDeferredValue)
- ✅ Custom hooks creation
- ✅ 50+ examples, 20+ exercises

**[Start Course →](./courses/react-hooks-deep-dive/README.md)**

---

#### ⚡ React Performance Optimization
**Build lightning-fast React applications**

- ✅ Performance measurement (React DevTools Profiler)
- ✅ Web Vitals optimization (LCP, FID, CLS)
- ✅ Memoization techniques
- ✅ Code splitting & lazy loading
- ✅ Virtual scrolling
- ✅ Bundle size reduction
- ✅ Before/After benchmarks

**[Start Course →](./courses/react-performance-optimization/README.md)**

---

#### 🧪 React Testing Masterclass
**Write comprehensive tests for React applications**

- ✅ Jest & Vitest setup
- ✅ React Testing Library
- ✅ Component & Hook testing
- ✅ Integration testing
- ✅ E2E testing with Playwright
- ✅ Mocking strategies (MSW)
- ✅ TDD (Test-Driven Development)
- ✅ 100+ test examples

**[Start Course →](./courses/react-testing-masterclass/README.md)**

---

#### 🎨 React Design Patterns
**Master advanced patterns for scalable apps**

- ✅ Compound Components
- ✅ Custom Hooks pattern
- ✅ Provider pattern
- ✅ Container/Presentational
- ✅ State Reducer pattern
- ✅ HOC & Render Props (legacy)
- ✅ Error Boundaries
- ✅ 30+ pattern examples

**[Start Course →](./courses/react-design-patterns/README.md)**

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- Git

### For Projects

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

### For Courses

```bash
# Navigate to a course
cd react-course-advanced-guide/courses/react-hooks-deep-dive

# Install dependencies
npm install

# Start course examples
npm run dev
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

### Course Features

- ✅ Step-by-step modules
- ✅ Interactive examples
- ✅ Hands-on exercises
- ✅ Real-world projects
- ✅ Quiz & solutions
- ✅ Cheat sheets
- ✅ Progress tracking

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

### Testing

- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing
- **MSW** - API mocking

### Performance

- **React DnD** - Drag and drop
- **react-window** - Virtual scrolling
- **Recharts** - Data visualization
- **web-vitals** - Performance monitoring

---

## 📚 Learning Path

### 🌱 Beginner Track (2-3 weeks)

**Week 1: Fundamentals**
1. Movie App → Basic hooks & API
2. State Management Demo → Zustand basics
3. **Course:** React Hooks Deep Dive (Modules 1-3)

**Week 2: Intermediate Concepts**
4. Advanced Task Manager → Complex state, routing
5. **Course:** Testing Masterclass (Modules 1-7)

**Week 3: Practice**
6. Build mini-projects from courses
7. Complete exercises

---

### 🚀 Intermediate Track (4-5 weeks)

**Week 1-2: Advanced Projects**
1. E-Commerce Platform → TypeScript, Redux, Stripe
2. Social Dashboard → WebSockets, real-time

**Week 3: Performance**
3. **Course:** Performance Optimization (Full)
4. Optimize previous projects

**Week 4: Patterns**
5. **Course:** Design Patterns (Full)
6. Refactor code using patterns

**Week 5: Testing**
7. **Course:** Testing Masterclass (Advanced modules)
8. Write comprehensive test suites

---

### 🎯 Advanced Track (Self-Paced)

**Master All Content:**
- ✅ Complete all 5 projects
- ✅ Finish all 4 courses (78 modules total)
- ✅ Build portfolio projects
- ✅ Contribute to open source

**Specialization Paths:**

**Path A: Performance Expert**
→ Performance Optimization Course
→ Optimize all projects
→ Build performance monitoring dashboard

**Path B: Testing Specialist**
→ Testing Masterclass
→ Write tests for all projects
→ Achieve 90%+ coverage

**Path C: Architecture Guru**
→ Design Patterns Course
→ Refactor projects with patterns
→ Create component library

---

## 📁 Repository Structure

```
react-course-advanced-guide/
├── 📁 examples/              # 5 Production Projects
│   ├── movie-app/
│   ├── state-management-demo/
│   ├── advanced-task-manager/
│   ├── ecommerce-platform/
│   └── social-dashboard/
│
├── 📁 courses/               # 4 Complete Courses
│   ├── react-hooks-deep-dive/         (16 modules)
│   ├── react-performance-optimization/ (20 modules)
│   ├── react-testing-masterclass/     (24 modules)
│   └── react-design-patterns/         (18 modules)
│
├── 📁 .github/workflows/    # CI/CD
│   ├── ci.yml
│   └── deploy.yml
│
├── 📄 README.md
├── 📄 CONTRIBUTING.md
├── 📄 COMPARISON.md
├── 📄 TROUBLESHOOTING.md
└── 📄 LICENSE
```

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

# Social Dashboard on port 3002
cd examples/social-dashboard && docker-compose up -d
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

**Continuous Integration** - Runs on every push:
- ✅ Lint all projects
- ✅ Type checking
- ✅ Unit tests
- ✅ Build verification
- ✅ Coverage reports

**Deployment** - Manual or tag-triggered:
- 🚀 Deploy to Vercel
- 🐳 Build Docker images
- 📦 Push to DockerHub

---

## 📊 Course Statistics

| Metric | Total |
|--------|-------|
| **Courses** | 4 |
| **Modules** | 78 |
| **Examples** | 200+ |
| **Exercises** | 60+ |
| **Projects** | 10+ |
| **Hours of Content** | 40-49h |

---

## 📖 Documentation

### Main Guides
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Project Comparison](COMPARISON.md)** - Detailed comparison
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues

### Project-Specific
- [Task Manager Docs](./examples/advanced-task-manager/README.md)
- [E-Commerce Docs](./examples/ecommerce-platform/README.md)
- [Social Dashboard Docs](./examples/social-dashboard/README.md)

### Course-Specific
- [Hooks Course](./courses/react-hooks-deep-dive/README.md)
- [Performance Course](./courses/react-performance-optimization/README.md)
- [Testing Course](./courses/react-testing-masterclass/README.md)
- [Patterns Course](./courses/react-design-patterns/README.md)

---

## 🎯 Use Cases

### For Students
- 📖 Learn React from basics to advanced
- 🏋️ Practice with real projects
- 📝 Complete exercises and quizzes
- 🎓 Build portfolio

### For Teachers
- 📚 Ready-to-use curriculum
- 📊 Structured learning path
- 🎯 Hands-on exercises
- 📹 Example-rich content

### For Developers
- 🚀 Starter templates
- 📖 Reference implementations
- 🛠️ Best practices
- ⚡ Performance patterns

### For Companies
- 👨‍💼 Onboarding material
- 📈 Skill assessment
- 🏗️ Architecture examples
- 🧪 Testing standards

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- ✨ Submit pull requests
- ⭐ Star the repository

---

## 🔗 Useful Links

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
- [Web.dev Performance](https://web.dev/performance/)

---

## 📊 Project + Course Statistics Combined

| Category | Count |
|----------|-------|
| **Total Projects** | 5 |
| **Total Courses** | 4 |
| **Total Modules** | 78 |
| **Total Files** | 300+ |
| **Lines of Code** | 15,000+ |
| **Components** | 80+ |
| **Custom Hooks** | 20+ |
| **Tests** | 100+ |
| **Examples** | 200+ |
| **Learning Hours** | 80-100h |

---

## 💬 Support

If you need help:

1. Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
2. Search existing [GitHub Issues](https://github.com/GUEDDES/react-course-advanced-guide/issues)
3. Open a new issue with details

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⭐ Star History

If you find this repository helpful, please consider giving it a star! ⭐

---

## 🚀 What's Next?

Upcoming additions:
- [ ] Next.js integration course
- [ ] GraphQL with React course
- [ ] React Native course
- [ ] Advanced animations course
- [ ] Accessibility course
- [ ] Video tutorials
- [ ] Live coding sessions

---

## 👨‍💻 Author

**GUEDDES**
- GitHub: [@GUEDDES](https://github.com/GUEDDES)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Open source community
- All contributors

---

<div align="center">

**Built with ❤️ for the React community**

**[⬆ Back to Top](#-react-advanced-guide---complete-learning-platform)**

</div>
