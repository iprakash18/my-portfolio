---
title: Simplifying Elasticsearch and Kibana Environment using Docker Compose
excerpt: Docker Compose is a tool for defining and running multi-container Docker applications. Learn how to create a containerized installation for Elasticsearch and Kibana with a single command.
author: Prakash Iyyanarappan
publishedDate: 2025-12-01
readTime: 2
tags: [Docker, Elasticsearch, Kibana, ELK, Docker Compose]
category: DevOps
featured: true
sourceUrl: https://medium.com/@iprakash18/elasticsearch-and-kibana-environment-using-docker-compose-58f6d0d4c57f
---

Docker Compose is a tool for defining and running multi-container (Elasticsearch and Kibana) Docker applications. With Compose, you use a YAML file to configure your application's services. Then with a single command, you create and start all the services from your configuration.

In this section, I will describe how to create a containerized installation for Elasticsearch and Kibana.

## Benefits

- You describe the multi-container set up in a clear way and bring up the containers in a single command.
- You can define the priority and dependency of the container to other containers.

## Step-by-Step Instruction

### Step 1: Define services in a Compose file

Create a file called `docker-compose.yml` in your project directory and paste the following:

```yaml
version: '2.2'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:6.6.1
    container_name: elasticsearch
    environment:
      - cluster.name=docker-cluster
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"
    networks:
      - esnet
  kibana:
    image: docker.elastic.co/kibana/kibana:6.6.1
    container_name: kibana
    environment:
      - ./kibana.yml:/usr/share/kibana/config/kibana.yml
    ports:
      - "5601:5601"
    networks:
      - esnet
volumes:
  esdata:
    driver: local
networks:
  esnet:
```

This Compose file defines two services, Elasticsearch and Kibana.

### Step 2: Basic configurations using kibana.yml

Create a file called `kibana.yml` in your project directory.

**Note:** For more configuration options kindly refer the article [kibana.yml](https://www.elastic.co/guide/en/kibana/current/docker.html).

### Step 3: Build and run your app with docker-compose

From your project directory, start up your application by running:

```bash
sudo docker-compose up -d
```

Compose pulls an Elasticsearch and Kibana images, builds an image for your code, and starts the services you defined.

Elasticsearch is available at `http://<hostIP>:9200` and Kibana is available at `http://<hostIP>:5601`.

## Summary

Docker Compose is a useful tool to manage container stacks for your client and manage all related containers with one single command.

*Originally published on [Medium](https://medium.com/@iprakash18/elasticsearch-and-kibana-environment-using-docker-compose-58f6d0d4c57f).*
