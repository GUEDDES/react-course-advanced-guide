# Module 7: Image Optimization

## 🎯 Objectives

- ✅ Lazy load images
- ✅ Responsive images
- ✅ Modern formats (WebP, AVIF)
- ✅ Blur placeholders

---

## 💻 Techniques

```jsx
// Lazy loading
<img loading="lazy" src="image.jpg" />

// Responsive
<img
  srcSet="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 400px, 800px"
/>

// Modern formats
<picture>
  <source srcSet="image.avif" type="image/avif" />
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Fallback" />
</picture>
```

---

## ⏭️ Next Module

[Bundle Analysis →](../08-bundle-analysis/README.md)
