# State Management Demo 🎯

## Overview

Comprehensive demo comparing different React state management solutions:
- Context API
- Zustand
- Redux Toolkit

## Features

- ✅ Counter (basic state)
- ✅ Todo list (arrays)
- ✅ User profile (objects)
- ✅ Shopping cart (complex state)
- ✅ Theme switching
- ✅ Async operations

## Installation

```bash
npm install
npm run dev
```

## State Management Solutions Compared

### Context API
**Pros:**
- Built-in React
- No extra dependencies
- Good for simple state

**Cons:**
- Can cause unnecessary re-renders
- Verbose for complex state
- No built-in devtools

### Zustand
**Pros:**
- Minimal boilerplate
- Great DX
- Built-in devtools
- No Provider needed

**Cons:**
- External dependency
- Less ecosystem

### Redux Toolkit
**Pros:**
- Battle-tested
- Huge ecosystem
- Excellent devtools
- Time-travel debugging

**Cons:**
- More boilerplate
- Steeper learning curve
- Overhead for simple apps

## Project Structure

```
src/
├── components/
│   ├── context/       # Context API examples
│   ├── zustand/       # Zustand examples
│   └── redux/         # Redux examples
├── stores/
│   ├── context/       # Context providers
│   ├── zustand/       # Zustand stores
│   └── redux/         # Redux slices
├── App.tsx
└── main.tsx
```

## Usage Examples

See each folder for implementation details.
