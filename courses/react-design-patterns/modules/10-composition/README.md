# Module 10: Composition Patterns

## 🎯 Objectives

- ✅ Component composition
- ✅ Slot pattern
- ✅ Layout components

---

## 💻 Slot Pattern

```jsx
function Card({ header, footer, children }) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Usage
<Card
  header={<h2>Title</h2>}
  footer={<button>Action</button>}
>
  <p>Content</p>
</Card>
```

---

## ⏭️ Next Module

[Dependency Injection →](../11-dependency-injection/README.md)
