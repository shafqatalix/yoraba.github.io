---
title: React Performance Guide
date: 2022-12-18
tags: ["react"]
published: true
description: A simple guide to improve performance of react code
layout: post
permalink: /react-performance-guide
---

[React](https://github.com/facebook/react) is a JavaScript library for building user interfaces. It was developed by Facebook, and is often used for building single-page applications and mobile applications.

React allows you to build reusable UI components, which can help you write clean and maintainable code. It uses a [virtual DOM](https://reactjs.org/docs/faq-internals.html) (a lightweight in-memory representation of the actual DOM) to optimize updates and minimize the number of DOM mutations. This can improve the performance of your application, especially in cases where the DOM is updated frequently.

React also introduces the concept of declarative programming, which means that you describe what your UI should look like, and React takes care of rendering it to the screen. This can make it easier to understand and reason about your code, as well as make it easier to test.

React is a popular choice for building modern web applications, and it is often used in conjunction with other tools and libraries such as Redux, React Router, and GraphQL.

## How to improve performance of React component

There are several ways you can improve the performance of a React application:

1. Use the **React.memo()** higher-order component to wrap functional components that don't need to re-render when their props don't change. This is similar to PureComponent but for functional components.
   Here's an example of how to use React.memo():

   ```jsx
   import { memo } from "react";

   const MyComponent = ({ name }) => {
     console.log("Rendering MyComponent");
     return <h1>Hello, {name}!</h1>;
   };

   export default memo(MyComponent);
   ```

   In this example, the **MyComponent** will only be re-rendered if the name prop has changed. If the name prop remains the same, the component will not be re-rendered, which can improve the performance of your application.

   You can also provide a custom comparison function as the second argument to React.memo() to customize the comparison of the props. For example:

   ```jsx
   import { memo } from "react";

   const MyComponent = ({ name, age }) => {
     console.log("Rendering MyComponent");
     return (
       <div>
         <h1>Hello, {name}!</h1>
         <p>You are {age} years old.</p>
       </div>
     );
   };

   export default memo(MyComponent, (prevProps, nextProps) => {
     // Only re-render if the name or age has changed
     return prevProps.name !== nextProps.name || prevProps.age !== nextProps.age;
   });
   ```

   In this example, the MyComponent will only be re-rendered if the name or age props have changed. If either prop remains the same, the component will not be re-rendered, which can improve the performance of your application.

2. Use the **React.lazy()** and Suspense components to lazy-load components that are not immediately needed. This can help reduce the initial bundle size and improve the initial load time of your application.
   Here's an example of how to use React.lazy():

   ```jsx
   import React, { lazy, Suspense } from "react";

   const MyComponent = lazy(() => import("./MyComponent"));

   function App() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <MyComponent />
       </Suspense>
     );
   }
   ```

   In this example, the **MyComponent** component will be imported and rendered only when it is needed. Until then, the Suspense component will render a loading message.

   Note that you need to wrap the lazy component with a Suspense component in order to handle the loading state. You can also customize the loading message by providing a custom component as the fallback prop to the Suspense component.

3. Use the **useMemo()** hook to memoize expensive calculations and functions. This can help avoid unnecessary re-renders and improve the performance of your application.
   Here's an example of how to use useMemo():

   ```jsx
   import { useMemo } from "react";

   function MyComponent({ data }) {
     // Only re-calculate the filteredData if the data or filter has changed
     const filteredData = useMemo(() => {
       return data.filter((item) => item.name.startsWith("A"));
     }, [data]);

     return (
       <ul>
         {filteredData.map((item) => (
           <li key={item.id}>{item.name}</li>
         ))}
       </ul>
     );
   }
   ```

   In this example, the **filteredData** will only be re-calculated if the data prop has changed. If the data prop remains the same, the filteredData will be taken from the cache, which can improve the performance of your application.

4. Use the **useCallback()** hook to memoize expensive calculations and functions. This can help avoid unnecessary re-renders and improve the performance of your application.
   Here's an example of how to use useCallback():

   ```jsx
   import { useCallback } from "react";

   function MyComponent({ data }) {
     // Only re-create the handleClick function if the data has changed
     const handleClick = useCallback(() => {
       console.log(data);
     }, [data]);

     return <button onClick={handleClick}>Click me</button>;
   }
   ```

   In this example, the handleClick function will only be re-created if the data prop has changed. If the data prop remains the same, the handleClick function will be taken from the cache, which can improve the performance of your application.

5. Use the **useEffect()** hook to perform side effects outside of the render cycle. This can help avoid unnecessary re-renders and improve the performance of your application.
   Here's an example of how to use useEffect():

   ```jsx
   import { useEffect, useState } from "react";

   function MyComponent() {
     const [count, setCount] = useState(0);

     // Similar to componentDidMount and componentDidUpdate:
     useEffect(() => {
       console.log(`The count is ${count}`);

       // Similar to componentWillUnmount:
       return () => {
         console.log("Cleaning up");
       };
     });

     return (
       <div>
         <p>You clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}>Click me</button>
       </div>
     );
   }
   ```

   In this example, the useEffect() hook is called after every render, and it logs the current count to the console. It also returns a cleanup function, which is similar to the componentWillUnmount lifecycle method in class components.

   You can also provide an array of dependencies as the second argument to useEffect() to specify when the effect should be run. For example:

   ```jsx
   import { useEffect, useState } from "react";

   function MyComponent({ data }) {
     const [count, setCount] = useState(0);

     // Only run the effect if the data has changed
     useEffect(() => {
       console.log(`The data is ${data}`);
     }, [data]);

     return (
       <div>
         <p>You clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}>Click me</button>
       </div>
     );
   }
   ```

   In this example, the effect will only be run if the data prop has changed. If the data prop remains the same, the effect will not be run, which can improve the performance of your application.

6. Use the **shouldComponentUpdate()** lifecycle method to avoid unnecessary re-renders. This method allows you to determine if a component should be updated or not, based on the props and state changes.

   ```jsx
   class MyComponent extends React.Component {
     shouldComponentUpdate(nextProps, nextState) {
       // Only update the component if the name prop has changed
       return nextProps.name !== this.props.name;
     }

     render() {
       return (
         <div>
           <h1>Hello, {this.props.name}!</h1>
         </div>
       );
     }
   }
   ```

7. Use the **PureComponent** instead of the regular Component class. PureComponent implements **shouldComponentUpdate()** with a shallow comparison of the props and state, which means that it only re-renders if the props or state have changed.

   ```jsx
   class MyComponent extends React.PureComponent {
     render() {
       return (
         <div>
           <h1>Hello, {this.props.name}!</h1>
         </div>
       );
     }
   }
   ```

8. Use Fragments to void additional HTML DOM elements.**React.Fragments** are a way to group a list of children elements without adding extra nodes to the DOM. This can be useful if you want to return multiple elements from a component's render method, but don't want to wrap those elements in an extra div.

   For example, consider the following component that renders a list of items:

   ```jsx
   function List({ items }) {
     return (
       <div>
         {items.map((item) => (
           <div key={item.id}>{item.text}</div>
         ))}
       </div>
     );
   }
   ```

   In this case, each item in the list is rendered inside a div element. If you want to avoid adding the extra div, you can use a React.Fragment instead:

   ```jsx
   function List({ items }) {
     return (
       <React.Fragment>
         {items.map((item) => (
           <React.Fragment key={item.id}>{item.text}</React.Fragment>
         ))}
       </React.Fragment>
     );
   }
   ```

   This will allow you to group the list items without adding any extra nodes to the DOM.

   React.Fragments were introduced in React 16.2 as a way to improve the syntax for returning multiple elements from a component. Prior to React 16.2, you would have to use an extra div or an empty element like <></> to group the elements.

9. Avoid spreading props on React components. In React, you can use the **"..."** spread operator to pass all of an object's properties as props to a DOM element or React component. This is often referred to as "spreading props".

   For example, consider the following object:

   ```jsx
   const myProps = {
     className: "my-class",
     id: "my-id",
     style: { color: "red" },
   };

   //You can spread the properties of this object onto a DOM element like this:
   <div {...myProps}>Hello</div>;
   ```

   This will render a div element with the class **my-class**, the id **my-id**, and a style of color: red.

   You can also spread the properties of an object onto a React component like this:

   ```jsx
   <MyComponent {...myProps} />
   ```

   This will pass all of the properties in **myProps** as props to the MyComponent component.
   There are a few reasons why you might want to avoid spreading props on DOM elements or React components.

   **First**, It can make it harder to understand what props a component is receiving: When you spread props onto a component, it's not immediately clear what props the component is receiving. This can make it harder to understand how a component is being used and how it will behave.

   **Second**, It can lead to unintended consequences: If you spread props onto a component and the component is not designed to handle those props, it could lead to unexpected behavior. For example, if you spread a prop that is intended for a DOM element onto a React component, the component might not know how to handle it and could throw an error.

   **Third**,It can make it harder to optimize your code: When you spread props onto a component, React has to create a new object for each prop, which can make your code less efficient. If you have a lot of props that are being spread onto a component, this can lead to performance issues.

   In general, it's usually best to be explicit about which props you are passing to a component, rather than spreading an entire object of props. This can make your code more readable and easier to understand, and can also help you avoid unintended consequences and performance issues.

10. Virtualizing long lists in React can improve the performance and user experience of your application by limiting the amount of DOM elements that need to be rendered and manipulated at any given time.

    When a list is long, rendering all of the elements at once can take a long time and cause the page to become unresponsive. It can also consume a lot of memory and make it difficult to scroll smoothly. By virtualizing the list, you can limit the number of elements that are rendered and improve the performance of your application.

    To virtualize a list in React, you can use a library like [react-virtualized](https://github.com/bvaughn/react-virtualized) or [react-tiny-virtual-list](https://github.com/clauderic/react-tiny-virtual-list). These libraries provide components that allow you to render only the elements that are currently visible in the list, rather than rendering the entire list at once. They also provide features like smooth scrolling and efficient rendering, which can further improve the performance and user experience of your application.

    Virtualizing long lists is a common technique for optimizing the performance of React applications, and can be especially useful for lists that are very long or that contain complex elements. However, it's worth noting that virtualizing a list can also add some complexity to your code, so you should consider whether the benefits are worth the added effort before implementing virtualization in your application.

11. [Code-splitting](https://reactjs.org/docs/code-splitting.html) is a technique for breaking up a large JavaScript application into smaller, more manageable chunks that can be loaded on demand. This can improve the performance of your application by reducing the amount of code that needs to be downloaded and parsed by the browser when the application first loads.

    In React, you can use the **import()** function to dynamically import a module or component at runtime. This allows you to split your code into smaller chunks that can be loaded on demand, rather than loading everything at once.

    For example, consider the following code that imports a module called **MyModule**:

    ```jsx
    import MyModule from "./MyModule";

    function MyComponent() {
      return <MyModule />;
    }
    ```

    You can use dynamic import to split this code into a separate chunk like this:

    ```jsx
    function MyComponent() {
      const MyModule = React.lazy(() => import("./MyModule"));

      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <MyModule />
        </React.Suspense>
      );
    }
    ```

    In this case, the **MyModule** component will be loaded on demand when it is needed, rather than being loaded upfront with the rest of the application.

    Using dynamic import and code-splitting can be a powerful way to improve the performance of your React application, especially for large applications with many dependencies. However, it's worth noting that code-splitting can also add some complexity to your code, so you should carefully consider whether the benefits are worth the added effort before implementing it in your application.

12. Use the **React Developer Tools** browser extension to [profile your application](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) and identify performance bottlenecks. This can help you understand where your application is spending the most time and how you can optimize it.

These are common pitfalls where react components can cause performance issues, you can simply avoid them using this guide. I hope these tips help! Let me know in comments if you have any other questions or suggestions.

### Helpful resources

- [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html)
- [Optimizing performance in a React application](https://blog.logrocket.com/optimizing-performance-react-application/)
