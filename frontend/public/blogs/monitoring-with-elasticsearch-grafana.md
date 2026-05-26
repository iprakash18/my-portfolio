---
title: Monitoring Servers and Docker Containers using Elasticsearch with Grafana
excerpt: Learn how to monitor servers and Docker containers using Grafana, Elasticsearch, Metricbeat, and Skedler Reports. A complete walkthrough of building an Elastic-based monitoring stack with Docker Compose.
author: Prakash Iyyanarappan
publishedDate: 2020-02-01
readTime: 5
tags: [Elasticsearch, Grafana, Metricbeat, Docker Compose, Monitoring, Infrastructure]
category: DevOps
featured: true
sourceUrl: https://medium.com/skedler/monitoring-servers-and-docker-containers-using-elasticsearch-with-grafana-c61dab0a34a2
---

![Elasticsearch + Grafana Monitoring](/images/elk.png)

## Introduction

Infrastructure monitoring is the basis for application performance management. The underlying system’s availability and health must be maximized continually. To achieve this, one has to monitor the system metrics like CPU, memory, network, and disk. Response time lag, if any must be addressed swiftly.

Here we’ll take a look at how to monitor servers (and even Docker containers running inside the server) using Grafana, Elasticsearch, Metricbeat, and Skedler Reports.

## Core Components

- **Grafana** — Analytics & monitoring solution for databases
- **Elasticsearch** — Ingest and index logs
- **Metricbeat** — Lightweight shipper for metrics
- **Skedler Reports** — Automate actionable reports

### Grafana — Analytics & monitoring solution

Grafana allows you to query, visualize, alert on and understand your metrics no matter where they are stored. Create, explore, and share dashboards with your team and foster a data-driven culture.

### Elasticsearch — Ingest and index logs

Elasticsearch is a distributed, RESTful search and analytics engine capable of addressing a growing number of use cases. As the heart of the Elastic Stack, it centrally stores your data so you can discover the expected and uncover the unexpected.

### Metricbeat — Lightweight shipper for metrics

Collect metrics from your systems and services. From CPU to memory, Redis to NGINX, and much more, Metricbeat is a lightweight way to send system and service statistics.

### Skedler Reports — Automate actionable reports

Skedler offers the most powerful, flexible and easy-to-use data monitoring solution that companies use to exceed customer SLAs, achieve compliance, and empower internal IT and business leaders.

## Prerequisites

1. A Linux machine
2. Docker installed
3. Docker Compose installed

```bash
ubuntu@guidanz:~$ mkdir monitoring
ubuntu@guidanz:~$ cd monitoring/
ubuntu@guidanz:~$ vim docker-compose.yml
```

## Setting up Elasticsearch

Create a Docker Compose file for Elasticsearch, and an Elasticsearch configuration file `elasticsearch.yml`. Docker Compose file for Elasticsearch is below:

```yaml
version: "2.1"
services:
  # Elasticsearch container
  elasticsearch:
    container_name: elasticsearch
    hostname: elasticsearch
    image: "docker.elastic.co/elasticsearch/elasticsearch:latest"
    logging:
      options:
        max-file: "3"
        max-size: "50m"
    environment:
      - http.host=0.0.0.0
      - transport.host=127.0.0.1
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms${ES_JVM_HEAP} -Xmx${ES_JVM_HEAP}"
    mem_limit: 1g
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - ./elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
      - esdata:/usr/share/elasticsearch/data
    ports: ['9200:9200']
    healthcheck:
      test: ["CMD", "curl", "-s", "-f", "http://localhost:9200/_cat/health"]
    networks: ['stack']

volumes:
  esdata:
    driver: local
networks: guidanz
```

> **Note:** We will keep extending the same docker file as we move ahead to install other components.

Create an Elasticsearch configuration file `elasticsearch.yml` and paste the config as below:

```yaml
cluster.name: guidanz-stack-cluster
node.name: node-1
network.host: 0.0.0.0
path.data: /usr/share/elasticsearch/data
http.port: 9200
xpack.monitoring.enabled: true
http.cors.enabled: true
http.cors.allow-origin: "*"
http.max_header_size: 16kb
```

Now run docker-compose:

```bash
ubuntu@guidanz:~/monitoring$ docker-compose up -d
```

Access Elasticsearch using the IP and Port at `http://ip_address:9200`.

## Setting up Metricbeat

Now we will set up Metricbeat. It captures all hardware and kernel-related metrics like system-level CPU usage, memory, file system, disk IO, and network IO statistics, as well as top-like statistics for each of the processes running on your systems.

To install Metricbeat, append the `docker-compose.yml`, `metricbeat.yml`, and `modules.d` files as below:

```yaml
metricbeat:
  container_name: metricbeat
  hostname: metricbeat
  user: root # To read the docker socket
  image: docker.elastic.co/beats/metricbeat:latest
  logging:
    options:
      max-file: "3"
      max-size: "50m"
  volumes:
    # Mount the metricbeat configuration so users can make edits.
    - ./metricbeat.yml:/usr/share/metricbeat/metricbeat.yml
    # Mount the modules.d directory into the container.
    - ./modules.d/:/usr/share/metricbeat/modules.d/
    # Enable Metricbeat to monitor the Docker host rather than the Metricbeat container.
    - /proc:/hostfs/proc:ro
    - /sys/fs/cgroup:/hostfs/sys/fs/cgroup:ro
    # Allows us to report on docker from the hosts information.
    - /var/run/docker.sock:/var/run/docker.sock
    # We mount the host filesystem so we can report on disk usage with the system module.
    - /:/hostfs:ro
  command: metricbeat -e -system.hostfs=/hostfs -strict.perms=false
  networks: ['stack']
  restart: on-failure
  depends_on:
    elasticsearch: { condition: service_healthy }
```

Append `metricbeat.yml`:

```yaml
metricbeat.config.modules:
  path: ${path.config}/modules.d/*.yml
  reload.period: 5s
  reload.enabled: true

processors:
  - add_docker_metadata: ~

monitoring.enabled: true
setup.ilm.enabled: false

output.elasticsearch:
  hosts: ["elasticsearch:9200"]

logging.to_files: false

setup:
  kibana.host: "kibana:5601"
  dashboards.enabled: true
```

Create the modules.d folder and add `system.yml`:

```bash
ubuntu@guidanz:~/monitoring$ mkdir modules.d
```

`modules.d/system.yml`:

```yaml
- module: system
  metricsets:
    - core
    - cpu
    - load
    - diskio
    - filesystem
    - fsstat
    - memory
    - network
    - process
    - socket
  enabled: true
  period: 5s
  processes: ['.*']
  cpu_ticks: true
  process.cgroups.enabled: true
  process.include_top_n:
    enabled: true
    by_cpu: 20
    by_memory: 20
```

Then restart everything:

```bash
ubuntu@guidanz:~/monitoring$ docker-compose down
ubuntu@guidanz:~/monitoring$ docker-compose up -d
```

## Setting up Grafana

Now let’s set up Grafana, where we will be using Elasticsearch as a data source. We can have a better dashboard in Grafana for the metrics visualization.

```yaml
grafana:
  image: grafana/grafana
  user: "1000"
  environment:
    - GF_SECURITY_ADMIN_PASSWORD=secure_pass
  volumes:
    - ./grafana_db:/var/lib/grafana
  depends_on:
    - elasticsearch
  ports:
    - '3000:3000'
```

Access Grafana UI from port **3000**. The default user is `admin` and the password you set in the compose file.
