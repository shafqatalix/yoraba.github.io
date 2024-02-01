---
title: Simple Guide to Docker containers
date: 2022-12-16
tags: ["docker", "containers"]
published: true
description: Simple Guide to Docker containers
layout: post
permalink: /simple-guide-docker-containers
---

[Docker](https://www.docker.com/) is a popular tool for creating, deploying, and running applications in containers. A container is a lightweight, standalone, and executable package that contains everything an application needs to run, including the application code, libraries, dependencies, and runtime.

Using containers allows developers to package their applications and all of their dependencies into a single, portable package, making it easy to deploy and run applications in any environment. This is particularly useful when working with complex applications that have many dependencies or when working with teams of developers who need to work on the same codebase.

One of the main benefits of using Docker is that it provides a consistent and repeatable environment for building, testing, and deploying applications. Because all of the dependencies are bundled with the application in the container, there is no need to worry about conflicts or inconsistencies between different environments. This makes it easier to develop, test, and deploy applications, especially in larger organizations where multiple teams may be working on the same codebase.

Another advantage of using Docker is that it allows developers to easily scale their applications. Because containers are lightweight and portable, they can be easily moved between different hosts and run on multiple machines. This makes it easy to scale applications up or down as needed, without the need to provision new hardware or reconfigure existing infrastructure.

Here is a simple diagram illustrating the basic architecture of Docker:

{% include image.html file="images/docker-architecture.svg" url="https://github.com/shafqatalix" alt="docker architecture" caption="Docker Architecture"%}

In this diagram:

- The Docker Engine is the core component of Docker, responsible for running containers and managing their lifecycle. It is typically installed on a host machine, and it communicates with other Docker components through APIs.

- The Docker Client is a command-line interface that allows users to interact with the Docker Engine. It allows users to build, run, and manage containers, as well as manage images and volumes.

- The Docker Registry is a storage location for Docker images. It can be either a public registry, such as Docker Hub, or a private registry that is managed by an organization.The Docker Hub is a public registry that allows users to search for and download Docker images. It is hosted by Docker and is the default registry for the Docker Client.

- The Docker Host is a machine that is running the Docker Engine and is used to host containers. It can be a physical machine or a virtual machine, and it can run on various operating systems, including Linux, Windows, and macOS.

This is just a basic overview of the Docker architecture, and there are many other components and features that are not included in this diagram. However, this should give you a general idea of how Docker works and how the various components fit together.

## Simple React and NodeJS application using Docker containers

To create a React app with a Docker container, you will need to follow these steps:

### 1. Install Docker on your machine:

Before you can use Docker, you will need to install it on your machine. You can download the latest version of Docker from the official website (https://www.docker.com/). Once you have downloaded and installed Docker, you should be able to run the docker command from the terminal.

> Docker Desktop is GUI tool for running docker as service on your operating system, if you are on Mac or Linux [Colima](https://github.com/abiosoft/colima) is a great open-source alternative to paid Docker Desktop.

### 2. Create a new React app:

To create a new React app, you will need to have the create-react-app package installed. If you don't have it already, you can install it using the following command:

```bash
npm install -g create-react-app
```

Once you have create-react-app installed, you can create a new React app using the following command:

```bash
create-react-app my-app
```

This will create a new React app with the name my-app in a new directory with the same name.

### 3. Create a Dockerfile:

A Dockerfile is a text file that contains instructions for building a Docker image. To create a Docker image for your React app, you will need to create a Dockerfile in the root directory of your app.

Here is an example of a Dockerfile for a React app:

```bash
FROM node:18

WORKDIR /app

COPY package.json /app/package.json

COPY package-lock.json /app/package-lock.json

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]

```

This Dockerfile specifies the base image ([node:18](https://nodejs.org/en/)) that the image will be built on top of, as well as the instructions for copying the necessary files and running the app.

### 4. Build the Docker image

To build the Docker image, you will need to run the docker build command from the terminal, passing in the path to the Dockerfile as an argument. For example:

```bash
docker build -t my-app .
```

This will build the Docker image for your app and give it the tag my-app.

### 5. Run the Docker container

Once the Docker image has been built, you can run it as a Docker container using the docker run command. For example:

```bash
docker run -p 3000:3000 my-app
```

This will start the Docker container and bind it to port 3000 on your local machine. You should now be able to access your React app by visiting http://localhost:3000 in your web browser.

That's it! You should now have a React app running in a Docker container. You can modify the app and rebuild the Docker image as needed, and the changes will be reflected in the running container.

## Conclusion

A Docker container is a lightweight, standalone, and executable package that includes everything an application needs to run, including the application code, libraries, dependencies, and runtime. Containers are isolated from one another and bundle their own tools, libraries, and configuration files, making them portable and easy to deploy.

Overall, Docker is a powerful tool that allows developers to easily build, deploy, and run applications in containers. Its lightweight, portable nature makes it ideal for creating consistent and scalable environments for application development and deployment.

### Helpful resources

- [Docker CLI](https://docs.docker.com/engine/reference/commandline/cli/)
- [What is Docker - AWS](https://aws.amazon.com/docker/)
- [Colima Docs](https://github.com/abiosoft/colima#readme)
