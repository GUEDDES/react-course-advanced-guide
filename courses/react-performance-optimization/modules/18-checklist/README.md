# Module 18: Optimization Checklist

## ✅ Frontend Performance Checklist

### Code
- [ ] React.memo on expensive components
- [ ] useMemo for expensive calculations
- [ ] useCallback for functions passed to children
- [ ] Code splitting with React.lazy
- [ ] Tree shaking enabled
- [ ] Dead code elimination

### Assets
- [ ] Images optimized (WebP/AVIF)
- [ ] Images lazy loaded
- [ ] Responsive images (srcset)
- [ ] Fonts subset and preloaded
- [ ] CSS minified
- [ ] Remove unused CSS

### Network
- [ ] HTTP/2 enabled
- [ ] Brotli/Gzip compression
- [ ] CDN for static assets
- [ ] Resource hints (preload, prefetch)
- [ ] Caching headers configured

### Rendering
- [ ] SSR/SSG where appropriate
- [ ] Streaming SSR
- [ ] Critical CSS inlined
- [ ] Defer non-critical JS
- [ ] Minimize layout shifts (CLS < 0.1)

### Metrics
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] TTI < 3.8s
- [ ] TBT < 200ms

---

## ⏭️ Next Module

[Case Studies →](../19-case-studies/README.md)
