---
title: Beginners guide to NodeJS, Express and React 
date: 2022-12-23
tags: ["nodejs", "expressjs", "react"]
published: true 
description: Getting started with NodeJS, Express and React 
layout: post
permalink: /beginners-guide-node-express-react
---

## What is NodeJS?

[Node.js](https://nodejs.org/en/about/) is a popular JavaScript runtime built on Chrome's [V8](https://v8.dev/docs) JavaScript engine. It allows developers to run JavaScript on the server-side, creating server-side applications with JavaScript.

One of the main benefits of using Node.js is its ability to handle a large number of concurrent connections with high throughput, making it a good choice for real-time applications such as chat, news feeds, and online games.

Node.js also has a large and active developer community, which has contributed a vast ecosystem of open-source libraries, known as "packages," that can be easily installed and used in a Node.js application. This makes it easy for developers to build complex applications quickly and efficiently.

In addition to its use as a server-side runtime, Node.js can also be used to build command-line tools and desktop applications.

One thing to note is that Node.js is single-threaded, meaning that it can only execute one task at a time. However, it uses an event-driven, non-blocking I/O model, which makes it efficient at handling many concurrent connections.

To get started with Node.js, you will need to install it on your machine. You can then create a Node.js file, which is simply a JavaScript file with a .js extension, and run it with the Node.js runtime.

Here is a simple example of a Node.js application that listens for HTTP requests on port 5000 and returns a message to the client:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
```

In this example, we are using the built-in http module to create an HTTP server and listen for requests on port 5000. When a request is received, the server sends a response with the message "Hello World!".

There are many other powerful features and capabilities of Node.js, including its support for different database systems, the ability to build scalable network applications, and its use of streams for handling large amounts of data.

Overall, Node.js is a versatile and widely-used runtime that is well-suited for building scalable, real-time applications. Its large developer community and extensive package ecosystem make it a powerful tool for building complex applications quickly and efficiently. While it is possible to build web applications and APIs using just Node.js, using a web application framework like Express.js can make it easier and more efficient to develop and maintain your application.

Here are a few reasons why you might choose to use Express.js instead of just Node.js:

- Routing: Express.js provides a simple and flexible routing system that allows you to define how your application should respond to specific HTTP requests. This makes it easy to build RESTful APIs or create dynamic routes for a web application.

- Middleware: Express.js includes a number of middleware functions that can be used to modify incoming requests, handle errors, and perform other tasks. These middleware functions can be easily added to an Express.js application with just a few lines of code.

- Other features: Express.js also includes a number of other features that can be useful when building web applications, such as support for template engines, the ability to serve static files, and the ability to handle form data.

Overall, using a web application framework like Express.js can make it easier and more efficient to build and maintain web applications and APIs with Node.js. Its routing and middleware capabilities, along with its support for other useful features, make it a popular choice for developers building web applications with Node.js.

## What is ExpressJS?

[Express.js](https://expressjs.com/) is a popular Node.js web application framework that provides a simple and flexible way to create web applications and APIs. It is designed to be minimal and flexible, allowing developers to build custom web applications and APIs quickly and easily.

One of the key features of Express.js is its routing system, which allows developers to define how the application should respond to specific HTTP requests. This makes it easy to build RESTful APIs or create dynamic routes for a web application.

Express.js also includes a number of middleware functions that can be used to modify incoming requests, handle errors, and perform other tasks. These middleware functions can be easily added to an Express.js application with the use of a few lines of code.

In addition to its routing and middleware capabilities, Express.js also includes a number of other features such as support for template engines, the ability to serve static files, and the ability to handle form data.

To get started with Express.js, you will need to have Node.js and the Node Package Manager (NPM) installed on your machine. You can then create a new Express.js application & create a package.json file, which is used to manage dependencies and scripts for your application by running the following command:

```bash
npm init

npm install express

```

Once Express.js is installed, you can create a new file for your application and require the Express.js module. Here is an example of a simple Express.js application that listens for HTTP requests on port 5000 and returns a message to the client:

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});
```

In this example, we are using the built-in **app.get()** method to define a route that listens for GET requests to the root path (/) and sends a response with the message "Hello World!".

Express.js is a powerful and flexible web application framework that makes it easy to build custom web applications and APIs with Node.js. Its routing and middleware capabilities, along with its support for template engines and other features, make it a popular choice for developers building web applications with Node.js.

## How to render React application from server?

Server-rendered [React](https://reactjs.org/) applications are web applications that are rendered on the server, rather than in the browser. This can be useful in a number of situations, such as improving the performance of your application, making your application more SEO-friendly, or allowing you to pre-render certain components or pages.

To build a server-rendered React application, you will need to use a server-side runtime, such as Node.js, and a web application framework, such as Express.js.

One way to build a server-rendered React application with Express.js is to use the react-dom/server module to render your React components to a string on the server, and then send that rendered HTML to the client.

Here is an example of how you might set up a server-rendered React application using Express.js:

```jsx
const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const app = express();

app.get("/", (req, res) => {
  // Render your React component to a string
  const html = ReactDOMServer.renderToString(<YourReactComponent />);

  // Send the rendered HTML to the client
  res.send(html);
});

app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});
```

In this example, we are using the **react-dom/server** module to render a React component to a string, and then sending that rendered HTML to the client with the **res.send()** method.

There are a few other things you will need to consider when building a server-rendered React application with Express.js. For example, you will need to handle client-side routing, ensure that your application can handle server-side rendering of asynchronous data, and optimize the performance of your application.

Overall, building a server-rendered React application with Express.js can be a powerful way to improve the performance, SEO, and pre-rendering capabilities of your application. With the right setup and careful consideration of these additional considerations, you can build a high-performing and scalable server-rendered React application with Express.js.

## How to tell client (browser) that the app is rendered from server?

Client-side hydration is a technique used in server-rendered React applications to enhance the performance of the application on the client side.

In a server-rendered React application, the initial rendering of the application is done on the server, and the resulting HTML is sent to the client. The client's browser then renders the HTML, resulting in a fully-functional React application.

However, this initial rendering can be slow, especially on lower-end devices or slower networks. To improve the performance of the application on the client side, you can use client-side hydration to "hydrate" the already-rendered HTML with React.

To hydrate a server-rendered React application, you will need to include the React library on the client side, and use the **ReactDOM.hydrateRoot()** method to attach the React components to the already-rendered HTML.

Here is an example of how you might use client-side hydration in a server-rendered React application:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.hydrate(document.getElementById("root"), <YourReactComponent />);
```

In this example, we are using the **ReactDOM.hydrateRoot()** method to attach the React components to the already-rendered HTML on the client side. This allows the client's browser to take over the rendering of the React components, improving the performance of the application.

It's important to note that client-side hydration is only necessary in server-rendered React applications. If you are building a client-side-only React application, you can simply use the **ReactDOM.createRoot()** and then **root.render()** method to render your components to the DOM. There other nuances to this, what if the application is rendered with data? I feel that deserves its own blog post.

Overall, client-side hydration is a useful technique for improving the performance of server-rendered React applications on the client side. By hydrating the already-rendered HTML with React, you can take advantage of the performance benefits of server-side rendering while also improving the performance of your application on the client side.

I hope you like the content of this article, if you have any questions or suggestions please let me know in comments, cheers!
