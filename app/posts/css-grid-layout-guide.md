---
title: Mastering CSS Grid Layout
excerpt: Complete guide to CSS Grid layout with practical examples and real-world use cases.
date: 2024-01-16
readTime: 12
---

# Mastering CSS Grid Layout

CSS Grid is a powerful layout system that allows you to create complex, responsive layouts with ease. Let's explore its capabilities.

## Grid Basics

Create a basic grid container:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
```

## Grid Template Areas

Use named grid areas for semantic layouts:

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## Responsive Grid

Create responsive layouts without media queries:

```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
```

## Grid Item Placement

Control individual item placement:

```css
.grid-item {
  grid-column: 2 / 4; /* Start at column 2, end at column 4 */
  grid-row: 1 / 3;    /* Start at row 1, end at row 3 */
}

/* Or use span notation */
.grid-item-span {
  grid-column: span 2; /* Span 2 columns */
  grid-row: span 3;    /* Span 3 rows */
}
```

## Advanced Grid Techniques

### Subgrid (where supported)

```css
.parent-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.child-grid {
  display: grid;
  grid-column: 2 / 4;
  grid-template-columns: subgrid;
}
```

### Grid with Flexbox

Combine Grid and Flexbox for powerful layouts:

```css
.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

## Practical Examples

### Photo Gallery

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 200px;
  gap: 10px;
}

.gallery-item:nth-child(3n) {
  grid-row: span 2;
}
```

### Dashboard Layout

```css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  height: 100vh;
}
```

## Browser Support and Fallbacks

```css
.grid-container {
  /* Fallback for older browsers */
  display: flex;
  flex-wrap: wrap;
  
  /* Grid for modern browsers */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

@supports (display: grid) {
  .grid-container {
    /* Grid-specific styles */
  }
}
```

## Conclusion

CSS Grid is a game-changer for web layouts. With its powerful features and intuitive syntax, you can create complex, responsive designs that were previously difficult or impossible with other CSS layout methods. 