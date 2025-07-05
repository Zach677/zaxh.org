---
title: JavaScript Async Programming Patterns
excerpt: Master asynchronous JavaScript with promises, async/await, and advanced patterns for better code organization.
date: 2024-01-22
readTime: 9
---

# JavaScript Async Programming Patterns

Asynchronous programming is fundamental to modern JavaScript. Let's explore different patterns and best practices.

## From Callbacks to Promises

### The Callback Hell Problem

```javascript
// Callback hell - hard to read and maintain
fetchUser(userId, (user) => {
  fetchPosts(user.id, (posts) => {
    fetchComments(posts[0].id, (comments) => {
      console.log('Finally got comments:', comments)
    })
  })
})
```

### Promises to the Rescue

```javascript
// Much cleaner with promises
fetchUser(userId)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log('Comments:', comments))
  .catch(error => console.error('Error:', error))
```

## Async/Await - The Modern Way

```javascript
async function getUserData(userId) {
  try {
    const user = await fetchUser(userId)
    const posts = await fetchPosts(user.id)
    const comments = await fetchComments(posts[0].id)
    return { user, posts, comments }
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}
```

## Parallel Execution

### Promise.all for Concurrent Operations

```javascript
async function fetchAllData() {
  try {
    const [users, posts, categories] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
      fetchCategories()
    ])
    
    return { users, posts, categories }
  } catch (error) {
    // If any promise fails, this catch block runs
    console.error('One or more requests failed:', error)
  }
}
```

### Promise.allSettled for Fault Tolerance

```javascript
async function fetchDataWithFallbacks() {
  const results = await Promise.allSettled([
    fetchCriticalData(),
    fetchOptionalData(),
    fetchAnalytics()
  ])
  
  const successful = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value)
    
  const failed = results
    .filter(result => result.status === 'rejected')
    .map(result => result.reason)
    
  return { successful, failed }
}
```

## Advanced Patterns

### Retry Logic with Exponential Backoff

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url)
      if (response.ok) return response.json()
      throw new Error(`HTTP ${response.status}`)
    } catch (error) {
      if (i === maxRetries - 1) throw error
      
      // Exponential backoff
      const delay = Math.pow(2, i) * 1000
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}
```

### Rate Limiting

```javascript
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests
    this.timeWindow = timeWindow
    this.requests = []
  }
  
  async execute(fn) {
    const now = Date.now()
    
    // Remove old requests outside time window
    this.requests = this.requests.filter(
      time => now - time < this.timeWindow
    )
    
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = Math.min(...this.requests)
      const waitTime = this.timeWindow - (now - oldestRequest)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
    
    this.requests.push(Date.now())
    return fn()
  }
}
```

### Async Iterators

```javascript
async function* fetchPages(baseUrl) {
  let page = 1
  let hasMore = true
  
  while (hasMore) {
    const response = await fetch(`${baseUrl}?page=${page}`)
    const data = await response.json()
    
    yield data.items
    
    hasMore = data.hasNext
    page++
  }
}

// Usage
for await (const items of fetchPages('/api/items')) {
  console.log('Processing page:', items)
}
```

## Error Handling Best Practices

### Global Error Handling

```javascript
// Unhandled promise rejections
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason)
  // Prevent default browser behavior
  event.preventDefault()
})

// Async function wrapper for better error handling
function asyncHandler(fn) {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error('Async error:', error)
      throw error
    }
  }
}
```

### Custom Error Types

```javascript
class NetworkError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'NetworkError'
    this.status = status
  }
}

async function apiCall(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new NetworkError(
        `Request failed: ${response.statusText}`,
        response.status
      )
    }
    return response.json()
  } catch (error) {
    if (error instanceof NetworkError) {
      // Handle network errors specifically
      console.error('Network error:', error.message, error.status)
    }
    throw error
  }
}
```

## Conclusion

Mastering asynchronous JavaScript patterns is essential for building robust, performant applications. Use promises and async/await for clean code, implement proper error handling, and leverage advanced patterns like rate limiting and retry logic when needed. 