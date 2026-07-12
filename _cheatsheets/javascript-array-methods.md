---
title: JavaScript Array Methods
description: Quick reference for JavaScript array methods.
---

# JavaScript Array Methods Cheatsheet

## Iteration

```javascript
arr.forEach(fn)             // Execute fn for each element
arr.map(fn)                 // Transform each element
arr.filter(fn)              // Keep elements where fn returns true
arr.reduce(fn, init)        // Reduce to single value
arr.find(fn)                // First element matching fn
arr.findIndex(fn)           // Index of first match
```

## Modification

```javascript
arr.push(el)                // Add to end
arr.pop()                   // Remove from end
arr.unshift(el)             // Add to beginning
arr.shift()                 // Remove from beginning
arr.splice(i, n, ...items)  // Remove/insert at index
```

## Search & Test

```javascript
arr.includes(el)            // Check if element exists
arr.indexOf(el)             // Find index of element
arr.every(fn)               // All elements pass test
arr.some(fn)                // At least one passes test
```

## Transform

```javascript
arr.flat(depth)             // Flatten nested arrays
arr.flatMap(fn)             // Map then flatten
arr.slice(start, end)       // Extract section
arr.concat(arr2)            // Merge arrays
arr.sort(fn)                // Sort in place
arr.reverse()               // Reverse in place
```
