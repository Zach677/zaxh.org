---
title: React Hooks Deep Dive
excerpt: Comprehensive guide to React Hooks, from basics to advanced patterns and custom hook creation.
date: 2024-01-25
readTime: 15
---

# React Hooks Deep Dive

React Hooks revolutionized how we write React components. Let's explore hooks from basics to advanced patterns.

## Understanding useState

### Basic Usage

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

### Functional Updates

```jsx
function Counter() {
  const [count, setCount] = useState(0)
  
  const increment = () => {
    // Use functional update when new state depends on previous state
    setCount(prevCount => prevCount + 1)
  }
  
  const incrementTwice = () => {
    // This ensures both increments happen
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
  }
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={incrementTwice}>Increment Twice</button>
    </div>
  )
}
```

## useEffect Patterns

### Cleanup and Dependencies

```jsx
import { useState, useEffect } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
    
    // Cleanup function
    return () => clearInterval(interval)
  }, []) // Empty dependency array = run once on mount
  
  return <div>Seconds: {seconds}</div>
}
```

### Data Fetching

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    let cancelled = false
    
    async function fetchUser() {
      try {
        setLoading(true)
        const response = await fetch(`/api/users/${userId}`)
        const userData = await response.json()
        
        if (!cancelled) {
          setUser(userData)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    
    fetchUser()
    
    return () => {
      cancelled = true
    }
  }, [userId])
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>User not found</div>
  
  return <div>Hello, {user.name}!</div>
}
```

## Advanced Hooks

### useReducer for Complex State

```jsx
import { useReducer } from 'react'

const initialState = {
  items: [],
  loading: false,
  error: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    default:
      return state
  }
}

function ItemList() {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const fetchItems = async () => {
    dispatch({ type: 'FETCH_START' })
    try {
      const response = await fetch('/api/items')
      const items = await response.json()
      dispatch({ type: 'FETCH_SUCCESS', payload: items })
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message })
    }
  }
  
  return (
    <div>
      <button onClick={fetchItems}>Fetch Items</button>
      {state.loading && <div>Loading...</div>}
      {state.error && <div>Error: {state.error}</div>}
      <ul>
        {state.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

### useCallback and useMemo

```jsx
import { useState, useCallback, useMemo } from 'react'

function ExpensiveComponent({ items, onItemClick }) {
  // Memoize expensive calculations
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0)
  }, [items])
  
  // Memoize event handlers
  const handleClick = useCallback((item) => {
    onItemClick(item.id)
  }, [onItemClick])
  
  return (
    <div>
      <p>Total Value: {expensiveValue}</p>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}
```

## Custom Hooks

### useLocalStorage Hook

```jsx
import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
  
  return [storedValue, setValue]
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  )
}
```

### useApi Hook

```jsx
import { useState, useEffect, useCallback } from 'react'

function useApi(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [url])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])
  
  return { data, loading, error, refetch }
}

// Usage
function UserList() {
  const { data: users, loading, error, refetch } = useApi('/api/users')
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

## Hook Rules and Best Practices

### Rules of Hooks

1. Only call hooks at the top level
2. Only call hooks from React functions
3. Use ESLint plugin for enforcement

```jsx
// ❌ Wrong - conditional hook
function BadComponent({ condition }) {
  if (condition) {
    const [state, setState] = useState(0) // This breaks the rules!
  }
}

// ✅ Correct - hook at top level
function GoodComponent({ condition }) {
  const [state, setState] = useState(0)
  
  if (condition) {
    // Use the state conditionally instead
    return <div>{state}</div>
  }
  
  return null
}
```

### Performance Optimization

```jsx
import { memo, useCallback, useMemo } from 'react'

const ExpensiveChild = memo(({ data, onUpdate }) => {
  // This component only re-renders when data or onUpdate changes
  return <div>{data.name}</div>
})

function Parent() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([])
  
  // Memoize callback to prevent unnecessary re-renders
  const handleUpdate = useCallback((id) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, updated: true } : item
    ))
  }, [])
  
  // Memoize expensive computation
  const processedData = useMemo(() => {
    return items.map(item => ({
      ...item,
      processed: true
    }))
  }, [items])
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      {processedData.map(item => (
        <ExpensiveChild
          key={item.id}
          data={item}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  )
}
```

## Conclusion

React Hooks provide a powerful and flexible way to manage state and side effects in functional components. Master the built-in hooks, understand their patterns, and create custom hooks to encapsulate and reuse stateful logic across your application. 