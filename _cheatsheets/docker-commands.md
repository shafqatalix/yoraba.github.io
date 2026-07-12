---
title: Docker Commands
description: Common Docker commands for containers and images.
---

# Docker Commands Cheatsheet

## Images

```bash
docker images               # List images
docker pull <image>          # Pull an image
docker build -t <name> .    # Build from Dockerfile
docker rmi <image>          # Remove an image
```

## Containers

```bash
docker ps                   # List running containers
docker ps -a                # List all containers
docker run <image>          # Run a container
docker stop <id>            # Stop a container
docker rm <id>              # Remove a container
```

## Docker Compose

```bash
docker compose up           # Start services
docker compose down         # Stop services
docker compose logs         # View logs
```
