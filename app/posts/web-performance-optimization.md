---
title: Web Performance Optimization Guide
excerpt: Comprehensive guide to web performance optimization techniques for faster loading times and better user experience.
date: 2024-01-19
readTime: 11
---

# Web Performance Optimization Guide

Web performance is crucial for user experience and SEO. Here's a comprehensive guide to optimizing your web applications.

## Core Web Vitals

### Largest Contentful Paint (LCP)

Optimize your largest content element:

```html
<!-- Preload critical resources -->
<link rel="preload" href="/hero-image.jpg" as="image">
<link rel="preload" href="/critical-font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Optimize images -->
<img src="/hero-image.jpg" 
     alt="Hero" 
     loading="eager"
     fetchpriority="high"
     width="800" 
     height="600">
```

### First Input Delay (FID)

Reduce JavaScript execution time:

```javascript
// Use requestIdleCallback for non-critical tasks
function processNonCriticalTasks() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Non-critical work here
      processAnalytics()
      loadNonEssentialFeatures()
    })
  } else {
    setTimeout(processNonCriticalTasks, 1)
  }
}

// Code splitting for better performance
const LazyComponent = React.lazy(() => import('./LazyComponent'))
```

### Cumulative Layout Shift (CLS)

Prevent layout shifts:

```css
/* Reserve space for images */
.image-container {
  aspect-ratio: 16 / 9;
  background-color: #f0f0f0;
}

/* Use transform instead of changing layout properties */
.animated-element {
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.animated-element:hover {
  transform: translateX(10px);
}
```

## Resource Optimization

### Image Optimization

```html
<!-- Modern image formats with fallbacks -->
<picture>
  <source srcset="/image.avif" type="image/avif">
  <source srcset="/image.webp" type="image/webp">
  <img src="/image.jpg" alt="Description" loading="lazy">
</picture>

<!-- Responsive images -->
<img srcset="/image-320w.jpg 320w,
             /image-640w.jpg 640w,
             /image-1280w.jpg 1280w"
     sizes="(max-width: 320px) 280px,
            (max-width: 640px) 600px,
            1200px"
     src="/image-640w.jpg"
     alt="Responsive image">
```

### Font Optimization

```css
/* Font display strategy */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom-font.woff2') format('woff2');
  font-display: swap; /* Show fallback font immediately */
}

/* Preload critical fonts */
```

```html
<link rel="preload" href="/fonts/critical-font.woff2" as="font" type="font/woff2" crossorigin>
```

## JavaScript Optimization

### Bundle Splitting

```javascript
// Webpack configuration
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
}

// Dynamic imports
async function loadFeature() {
  const { feature } = await import('./feature.js')
  return feature()
}
```

### Tree Shaking

```javascript
// Use named imports for better tree shaking
import { debounce } from 'lodash-es'

// Instead of
import _ from 'lodash'

// Configure webpack for better tree shaking
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: false,
  },
}
```

## Caching Strategies

### HTTP Caching

```javascript
// Service Worker caching
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images').then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) {
            return response
          }
          return fetch(event.request).then((fetchResponse) => {
            cache.put(event.request, fetchResponse.clone())
            return fetchResponse
          })
        })
      })
    )
  }
})
```

### Browser Caching Headers

```javascript
// Express.js example
app.use('/static', express.static('public', {
  maxAge: '1y', // Cache static assets for 1 year
  etag: true,
  lastModified: true,
}))

// Set cache headers for API responses
app.get('/api/data', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300') // 5 minutes
  res.json(data)
})
```

## Critical Resource Prioritization

### Resource Hints

```html
<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//api.example.com">

<!-- Preconnect for critical third-party resources -->
<link rel="preconnect" href="//fonts.gstatic.com" crossorigin>

<!-- Prefetch for likely next navigation -->
<link rel="prefetch" href="/next-page.html">

<!-- Preload critical resources -->
<link rel="preload" href="/critical.css" as="style">
<link rel="preload" href="/hero.jpg" as="image">
```

### Critical CSS

```html
<style>
  /* Inline critical CSS */
  .header { display: flex; justify-content: space-between; }
  .hero { background: url('/hero.jpg'); height: 60vh; }
</style>

<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/non-critical.css"></noscript>
```

## Performance Monitoring

### Web Vitals Measurement

```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  })
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

### Performance Observer

```javascript
// Monitor long tasks
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 50) {
      console.warn('Long task detected:', entry)
    }
  }
})

observer.observe({ entryTypes: ['longtask'] })

// Monitor layout shifts
const clsObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      console.log('Layout shift:', entry.value)
    }
  }
})

clsObserver.observe({ entryTypes: ['layout-shift'] })
```

## Advanced Techniques

### Intersection Observer for Lazy Loading

```javascript
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove('lazy')
      observer.unobserve(img)
    }
  })
})

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img)
})
```

### Virtual Scrolling

```javascript
class VirtualScroller {
  constructor(container, itemHeight, totalItems) {
    this.container = container
    this.itemHeight = itemHeight
    this.totalItems = totalItems
    this.visibleItems = Math.ceil(container.clientHeight / itemHeight) + 1
    
    this.render()
    container.addEventListener('scroll', this.onScroll.bind(this))
  }
  
  onScroll() {
    const scrollTop = this.container.scrollTop
    const startIndex = Math.floor(scrollTop / this.itemHeight)
    this.render(startIndex)
  }
  
  render(startIndex = 0) {
    const endIndex = Math.min(startIndex + this.visibleItems, this.totalItems)
    const items = []
    
    for (let i = startIndex; i < endIndex; i++) {
      items.push(this.createItem(i))
    }
    
    this.container.innerHTML = ''
    this.container.append(...items)
    this.container.scrollTop = startIndex * this.itemHeight
  }
}
```

## Performance Budget

```javascript
// webpack-bundle-analyzer configuration
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
  performance: {
    maxAssetSize: 250000,
    maxEntrypointSize: 250000,
    hints: 'warning',
  },
}
```

## Conclusion

Web performance optimization is an ongoing process that requires monitoring, measurement, and continuous improvement. Focus on Core Web Vitals, optimize critical resources, implement effective caching strategies, and use performance monitoring tools to ensure your web applications provide excellent user experiences. 