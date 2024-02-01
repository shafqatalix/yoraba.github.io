---
title: React Hooks Simplified
date: 2022-12-20
tags: ["react"]
published: true
description: A simple guide to React Hooks
layout: post
permalink: /react-hooks-simplified
---

React hooks are a new feature in React that allows you to use state and other [React](https://github.com/facebook/react) features without writing a class component. They were introduced in React 16.8 and have since become a popular way to write functional components in React.

There are several benefits to using hooks in React:

1. **Simplified code**: Hooks allow you to use state and other React features in functional components, which can make your code easier to read and understand. You don't need to worry about binding event handlers or managing the component lifecycle, which can make your code more concise and easier to write.

2. **Reusable logic**: Hooks allow you to extract stateful logic from a component and reuse it elsewhere in your application. This can make your code more modular and easier to test.

3. **Better performance**: In some cases, using hooks can improve the performance of your application. For example, the useMemo hook allows you to memoize expensive calculations so that they are only recomputed when necessary, which can improve the efficiency of your code.

Overall, hooks provide a powerful way to use state and other React features in functional components, and can help you write cleaner, more reusable code. They are widely used in modern React applications, and are an important tool to know when developing with React. Here are some examples of common React hooks:

## 1. useState()

**useState()** is a hook that allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update it. Here's an example of how to use useState():

```jsx
import { useState } from "react";

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

In this example, the count variable represents the current state value, and the setCount function is used to update it. When the button is clicked, the setCount function is called with the new count value, which updates the state and causes the component to re-render.

## 2. useEffect()

**useEffect()** is a hook that allows you to perform side effects in functional components. It is similar to the componentDidMount, componentDidUpdate, and componentWillUnmount lifecycle methods in class components. Here's an example of how to use useEffect():

```jsx
import { useEffect, useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

In this example, the useEffect() hook is called after every render, and it updates the document title with the current count.

## 3. useContext()

**useContext()** is a hook that allows you to access the value of a context from a functional component. Here's an example of how to use useContext():

```jsx
import { useContext } from "react";

// Create a context for the current theme (with "light" as the default)
const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <ThemedButton theme={theme} />
    </div>
  );
}

function ThemedButton(props) {
  return <button style={{ background: props.theme }}>I am styled by theme context!</button>;
}
```

## 4. useLayoutEffect()

**useLayoutEffect()** is a hook that allows you to perform side effects that affect the layout of the DOM in functional components. It is similar to the useEffect() hook, but it runs synchronously after the DOM has been updated, rather than asynchronously. This can be useful for cases where you need to read the layout of the DOM or measure the size of an element.

Here's an example of how to use useLayoutEffect():

```jsx
import { useLayoutEffect, useRef } from "react";

function MyComponent() {
  const divRef = useRef(null);

  useLayoutEffect(() => {
    console.log(divRef.current.offsetWidth);
  });

  return <div ref={divRef}>Hello, world!</div>;
}
```

In this example, the useLayoutEffect() hook is called after every render, and it logs the width of the div element to the console. Because the hook runs synchronously after the DOM has been updated, the offsetWidth property will always reflect the current layout of the element.

## 5. useReducer()

**useReducer()** is a hook that allows you to manage state in functional components using a reducer function. It is similar to the reduce() method in JavaScript, and it can be a good alternative to useState() when you have complex state logic or when you want to share state logic between multiple components.

Here's an example of how to use useReducer():

In this example, the ThemeContext is provided with a value of "dark" at the top level of the app

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>The count is {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
}
```

In this example, the **useReducer()** hook is called with a reducer function and an initial state. It returns an array with two elements: the current state and a dispatch function. The dispatch function allows you to dispatch actions that will be passed to the reducer function, which updates the state based on the action type.

I hope these tips help! Let me know in comments if you have any questions or suggestions.

### Helpful resources

- [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)
