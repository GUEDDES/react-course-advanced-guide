# Module 6: Virtual Lists (Windowing)

## 🎯 Learning Objectives

- ✅ Render only visible items
- ✅ Handle large datasets
- ✅ Use react-window
- ✅ Implement infinite scroll

---

## 📖 Why Virtual Lists?

**Problem:** Rendering 10,000 items = slow
**Solution:** Only render visible items (~20)

---

## 💻 Using react-window

```jsx
import { FixedSizeList } from 'react-window';

function Row({ index, style }) {
  return <div style={style}>Row {index}</div>;
}

function VirtualList() {
  return (
    <FixedSizeList
      height={600}
      itemCount={10000}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

---

## ⏭️ Next Module

[Image Optimization →](../07-image-optimization/README.md)
