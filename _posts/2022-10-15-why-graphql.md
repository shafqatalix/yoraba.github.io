---
title: Why GraphQL
date: 2022-10-15
tags: ["graphql"]
published: true
description: Why GraphQL
layout: post
permalink: /why-graphql
---

[GraphQL](https://graphql.org/) in simple words is query language for APIs and a runtime to fulfill those queries. GraphQL is emerging technology originally developed by Facebook in 2012 and open sourced later in 2015. Today GraphQL is being used by many companies in verity of applications ranging from small, medium and large-scale.

In this article we are going to talk about how GraphQL can add business value to your company's technology ecosystem by providing performance, productivity and quality. The main theme of this article is to visualize business aspect of adopting GraphQL for your projects.

> This article is not technical deep-dive and is intended to highlight GraphQL architecture and business value.

As developers, we like to work on bleeding edge technologies & new frameworks but when it comes to implementing in real-world project within your workplace you need to convince your manager or boss for using that technology. You will hear questions like, What business values it's going to add?

In order to show the business value of the proposed technology you need to get them understand the technology first. No matter how good of a developer your manager was; it wouldn't be easy to understand architecture first time, so you need to start from zero and guide him step-by-step. What actually GraphQL is? How it works? And how we can achieve better performance, productivity and quality for our projects within the company.

## Let's clear the terminology first

It is easy to get confused by terms used in GraphQL with the databases, so before jumping into puddle, first we need to define terminology first.

- Query in GraphQL is **NOT** database query.
- Schema in GraphQL is **NOT** database schema.
- Runtime is term used just to callout GraphQL mechanics on server it is **NOT** like JVM or CLR (.NET). This is simply the code execute on server such as for NodeJS, it is plain javascript code, and for .NET, it is C# code, depending upon the GraphQL implantation you choose for your project.
- It is **NOT** a framework or library, instead it is specification for Backend for Frontend (BFF) kind of framework & has different implementations.

## What really is the GraphQL?

In typical web or mobile application you need to have number of service end-points for fetching data to support various features in the application. GraphQL allows you to define one endpoint for entire application which you can use to fetch or manipulate data. There are two important terms in GraphQL, **query** and **runtime**.

Query is used to fetch data from your client browser or mobile app.

Runtime is combination of **schema** + **revolvers** which work in conjunction to get to data from data source such as database, another service, or virtually anything you can read and write on server.

The following figure shows high-level GraphQL architecture.

{% include image.html file="images/graphql-core.svg"  alt="graphql core" caption="Graphql Core" %}

## Three basic questions for before developing any application?

Developing application require 3 questions about data needs to be answered first. What data I need for application? Where this data is going to come from? And How you, we can fetch the data? The above figure shows exactly how GraphQL mechanics fits into these questions.

- **Schema (What?)** - What data we need for application, this is defined by schema. This just the definition language for your data, very similar to TypeScript syntax.

- **Resolves (Where?)** - Now the next question is to where to get this data, is defined by revolvers. It is just plain code to fetch data, depending upon the choice of your implementation, it can be JavaScript or C# code for fetching data from database, another service or any data source.

- **Query (How?)** - Now we have data, and we know where to get it, final question is how to fetch the data from client web or mobile app, this is defined by query. GraphQL query is JSON like text query to fetch data.

> GraphQL is not framework instead it is RFC specification & has various implementations.

The two popular implementation are:

1. [Apollo](https://www.apollographql.com/docs/) (recommended) - Is open-source set of libraries for GraphQL implementation in almost every major language/framework such as NodeJS, React, Angular & .NET etc. Has excellent tools for various frameworks and languages.
2. [Relay](https://github.com/facebook/relay) - Is also great as it is developed by Facebook, but I find it hard to begin with as starter.

## A typical application example

Let's look at example of typical web/mobile application, where you have client, server and database. Your app need to read data from database and display on UI pretty straightforward. You have service host (which is actually server) and client which loads data and store it in somewhere in state using state management mechanism i.e. [Redux](https://redux.js.org/). The following diagram depicts the whole machinery needed for the application.

{% include image.html file="images/web-or-mobile-app-without-graphql.svg"  alt="web or mobile app without graphql" caption="Web/Mobile app without Graphql" %}

On the left-side we have server which host your service end-points, and reads data from database, external service or virtually any data source. Once the data is loaded from these data sources you might (definitely) want to format the data as per your app frontend requirements.

Client web or mobile app is on right-side, which reads the data from server and renders on UI. This includes code for fetching data and state management.

If we combine all of these together, what type of boilerplate code you need to write to build full-stack application?

1. Service end-points for each feature you need for application.
2. Code to read data from data-source such as databases, or other external services.
3. Data formatting on server before streaming down to client.
4. On client utility code/functions to read data from server.
5. Client side state management configuration.
6. Actual state management code such (Redux/Flux):
   - Actions.
   - Reducers.
   - Action Creators.
7. Client-side state management middleware.
8. Number of state updates affects the performance of application in general, if performance is the concern then you might need to implement some mechanism to reduce number of updates to state potentially re-renders. You might need some sort of batching mechanism, in case of React/Redux you would got with Batched Actions.
9. You might need to implement caching mechanism to reduce number of round trips to server while making service calls.
10. If all of above isn't enough to bleed your eys & ears, you need to write unit-tests for all of the boilerplate code to achieve better quality.

## How it looks with GraphQL?

If you combined all the boilerplate code in above section for client and server, it is the significant amount of code you need to write by hand to complete end-to-end workflow of application.

> The best code is the one you don't have to write!

What if I tell you, all of this can be done without writing most of the code aforementioned? Welcome to GraphQL!

If you look at the following figure and compare it with earlier one, GraphQL with Apollo tools, greatly simplifies architecture and manages majority of the workflow for fetching data and handling state.

{% include image.html file="images/web-or-mobile-app-with-graphql.svg"  alt="web or mobile app with graphql" caption="Web/Mobile app with Graphql"  %}

GraphQL Apollo gives you all the feature you write it by hand earlier plus much more such as:

1. GraphQL simplifies the logic to load and process data for the application by clearly defining Schema, Resolver and Queries.
2. You don't have to define dozens of service end-points to fetch data.
3. Apollo Client handles data fetching from GraphQL server to client app.
4. Apollo Cache handles data cache based on query parameters without needing you to write single line of code for caching; to me this is the blockbuster feature. Parameter based Caching on client-side, is notoriously difficult to achieve if you have to do it manually.
5. GraphQL lets to fetch only the data you need, which isn't possible with traditional services where you get everything returned by service even if you only need less then half of the data. That is where you need separate endpoints for mobile and web, GraphQL eliminate this distinction altogether.
6. You can be more productive as developer, with tool such as Chrome extensions & [VS Code](https://code.visualstudio.com/) extensions for GraphQL, which makes development and debugging flow easier than ever.
7. GraphQL significantly reduces the amount of code you need to write to achieve simple features and spares you more time to spend on building application.

## What is the business value of adopting GraphQL?

There are number of obvious advantages of GraphQL if you follow the points mentioned above but lets divided them into three categories.

### Performance

- Off-loads the work from client browser or app by reducing the boilerplate code, which you have to write otherwise, to achieve state management on client.
- GraphQL lets you request the amount of data you actually need it, which is not possible with REST based services. This reduces the amount of data travel over the wire & improve the response times.
- Apollo GraphQL lets you cache the query response based on parameters, which reduces the number o round trips to the server, and greatly improve performance and user experience.
- Subscriptions allows streaming data from server to client which improve user experience while load long lists of data.
- Lazy-loading queries, allows executing queries with priorities, which lets to load high priority data fetched first without waiting on low priority data. You can achieve this without costing you single line of code.
- In production mode GraphQL queries don't get transmitted over the network, instead you can configure your application to use persisted queries, which sends query hash instead of actual query while fetching the data from server.

### Productivity

- Reduce boilerplate code, which otherwise you have to write in form of using framework such as Redux/Flux, Actions, Action Creators & Reduces etc.
- GraphQL Playground: A playground allows you to run your queries, view documentation & and schema in development environment.
- GraphQL Chrome extension helps to see traces of queries and contents of cache in the browser (similar to Redux extension for Chrome).
- VS Code extension to help navigation through the GraphQL schema and queries.
- No need to have custom framework to handle data loading, instead use industry standard framework tools.
- Apollo GraphQL is very well documented and maintained..

### Quality

- Less amount of code to achieve more features. Less code means less bugs.
- You can mock the entire GraphQL API which makes testing easier.
- You can write automation/e2e test with Jest.
- Easy bench-marking & easy to baseline performance score.

## What is the cost of GraphQL adoption?

The most common concern about GraphQL adoption is; Do we need to re-write everything for GraphQL? Not really, GraphQL require absolute zero change to anything exiting. It can work perfectly fine in conjunction with other frameworks and technologies within your existing system.

Learning Curve - There are two parts of GraphQL adoption:

GraphQL configuration within your application, which is setting up service endpoint, and other stuff for GraphQL to be up and running. This is one-time job at the beginning.
Usage, develop your application features using
GraphQL is significant shift in thinking about data retrieval as compared to REST base web services. In a team environment there is learning curve for developers, the learning curve is not so steep as everybody in the team don't need to know about the configuration instead they just need to lean how to use GraphQL.

For example everybody in the team need to know about how to write schema, revolvers and queries to fetch the data, but not so much about GraphQL's internal mechanics.

## Some common questions?

You can expect any type of questions, depending upon the knowledge of audience.

- Is it secure? - GraphQL is no different from any other service end-point, if you put it behind auth handler etc.
- What about randomly poking the schema from Client? - There are tow things, first this schema is not database schema; second you define what you exactly need in the app, and don't just expose whole database.
- What if I use Fiddler to inspect traffic and change query? - Apollo support Automated Persisted Queries, in which you won't even see query going in HTTP request except for only very first time (which can easily be pre-populated after deployment); so there is no question of tempering with GraphQL query.
- For NodeJS/React/Angular projects, What is TypeScript support? - Apollo tools for GraphQL has very good support for TypeScript.
- What about error handling? Very good Error Handling and tracing mechanism.
- What about larger input forms for collecting data from client? The size of HTTP request depends upon the max allowed size in your app, its nothing specific to GraphQL.

## Conclusion

GraphQL is great technology to fulfill data needs for your applications, and significantly simplifies application development process by reducing boilerplate code throughout the application. REST base services has been primary choice of service oriented applications in the past; there are tones of applications and tools written to support that, GraphQL is going to replace REST but that is significant shift from traditional development, and it is going to take some time to develop awareness and understand of GraphQL in the tech industry.

The hard part of GraphQL adoption is the convincing people who are not so much technical and happened to be your managers; once you cross that barrier and people know how its going to improve overall technical workflow, everything else should not be a piece of cake.

Hope that article would help you in GraphQL adoption!
