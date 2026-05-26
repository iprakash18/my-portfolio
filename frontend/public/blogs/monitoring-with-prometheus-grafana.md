---
title: Monitoring Servers and Docker Containers using Prometheus with Grafana
excerpt: Infrastructure monitoring is the basis for all application performance management. Learn how to monitor servers and Docker containers using Grafana, Prometheus, Node Exporter, CAdvisor and Skedler Reports.
author: Prakash Iyyanarappan
publishedDate: 2020-01-14
readTime: 4
tags: [Docker, Grafana, Prometheus, Docker Compose, Infrastructure, Monitoring]
category: DevOps
featured: true
sourceUrl: https://medium.com/skedler/monitoring-servers-and-docker-containers-using-prometheus-with-grafana-87cf961fe1e0
---

![Prometheus + Grafana Monitoring Stack](https://miro.medium.com/v2/resize:fit:700/1*IA_vXX4ndCVISMIQXMZnUw.png)

## Introduction

Infrastructure monitoring is the basis for application performance management. The underlying system’s availability and health must be maximized continually. To achieve this, one has to monitor the system metrics like CPU, memory, network, and disk. Response time lag, if any must be addressed swiftly. Here we'll take a look at how to Monitor servers (and even Docker Containers running inside the Server) using Grafana, Prometheus, Node Exporter, CAdvisor and Skedler Reports.

## Core Components

- **Grafana** — Analytics & monitoring solution for databases
- **Prometheus** — Event monitoring and alerting
- **Node Exporter** — Monitoring Linux host metrics
- **WMI Exporter** — Monitoring Windows host metrics
- **CAdvisor** — Monitoring metrics for running containers
- **Skedler Reports** — Automating actionable reports

### Grafana — Analytics & monitoring solution for database

Grafana equips users to query, visualize, and monitor metrics, no matter where the underlying data is stored. With Grafana, one can also set alerts for metrics that require attention, apart from creating, exploring, and sharing dashboards with their team and fostering a data-driven culture.

### Prometheus — Event monitoring and alerting

Prometheus is an open-source system monitoring and alerting toolkit originally built at SoundCloud. Since its inception in 2012, many companies and organizations have adopted Prometheus, and the project has a very active developer and user community. It is now a standalone open source project and maintained independently of any company.

### Node Exporter — Monitoring Linux host metrics

Node Exporter is a Prometheus exporter for hardware and OS metrics with pluggable metric collectors. It allows measuring various machine resources such as memory, disk, and CPU utilization.

### WMI Exporter — Monitoring Windows host metrics

Prometheus exporter for Windows machines, using the WMI (Windows Management Instrumentation).

### CAdvisor — Monitoring metrics for running containers

It stands for Container Advisor and is used to aggregate and process all the metrics for the running containers.

### Skedler Reports — Automate actionable reports

Skedler offers the most powerful, flexible and easy-to-use data monitoring solution that companies use to exceed customer SLAs, achieve compliance, and empower internal IT and business leaders.

## Prerequisites

1. A Linux machine
2. Docker installed
3. Docker Compose installed

Login to your Linux machine, update the repository and install Docker and Docker Compose.

Create a directory, say `monitoring`:

```bash
ubuntu@guidanz:~$ mkdir monitoring
ubuntu@guidanz:~$ cd monitoring/
ubuntu@guidanz:~$ vim docker-compose.yml
```

## Setting up Prometheus

Now, create a Docker Compose file for Prometheus. You also need to create a Prometheus configuration file, `prometheus.yml`. Docker Compose file for Prometheus as below:

> **Note:** We will keep extending the same docker file as we move forward to install other components.

```yaml
version: '3'
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - ./prometheus_db:/var/lib/prometheus
      - ./prometheus_db:/prometheus
      - ./prometheus_db:/etc/prometheus
      - ./alert.rules:/etc/prometheus/alert.rules
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--web.route-prefix=/'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
    restart: unless-stopped
    ports:
      - '9090:9090'
    networks:
      - monitor-net
```

Create a Prometheus configuration file and paste the config as below:

```yaml
global:
  scrape_interval: 5s
  external_labels:
    monitor: 'prakash-monitor'
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['monitoring.guidanz.com:9090'] ## IP Address of the localhost
```

The compose file consists of two volume mappings to the container. One is the Prometheus configuration and the other one (`prometheus_db`) is to store the Prometheus database locally. Now run the docker-compose:

```bash
ubuntu@guidanz:~/monitoring$ mkdir prometheus_db
ubuntu@guidanz:~/monitoring$ docker-compose up -d
```

Access Prometheus using the IP and Port and you will see the Prometheus UI at `http://ip_address:9090`.

## Setting up Node Exporter

Now we will set up Node Exporter. It is one of the best components used along with Prometheus to capture metrics from the server where Prometheus is running. It captures all hardware and kernel-related metrics like **CPU, Memory, Disk, Disk Read/Write**, etc.

To install the Node Exporter, simply append the `docker-compose.yml` file and `prometheus.yml` file as below.

```yaml
node-exporter:
  image: prom/node-exporter
  ports:
    - '9100:9100'
```

Append `prometheus.yml`:

```yaml
- job_name: 'node-exporter'
  static_configs:
    - targets: ['monitoring.guidanz.com:9100']
```

The composite `docker-compose.yml` will now look like:

```yaml
version: '3'
services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - ./prometheus_db:/var/lib/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    ports:
      - '9090:9090'
  node-exporter:
    image: prom/node-exporter
    ports:
      - '9100:9100'
```

Now create the Node Exporter container and restart the Prometheus container:

```bash
ubuntu@guidanz:~/monitoring$ docker-compose start node-exporter
ubuntu@guidanz:~/monitoring$ docker-compose restart prometheus
```

Or simply do compose up and down:

```bash
ubuntu@guidanz:~/monitoring$ docker-compose down
ubuntu@guidanz:~/monitoring$ docker-compose up -d
```

Now check the Targets in Prometheus, you will see node-exporter as a target.

## Setting up CAdvisor

Now append the docker-compose with the below code:

```yaml
cadvisor:
  image: google/cadvisor:latest
  ports:
    - '8080:8080'
  volumes:
    - /:/rootfs:ro
    - /var/run:/var/run:rw
    - /sys:/sys:ro
    - /var/lib/docker/:/var/lib/docker:ro
```

Also append `prometheus.yml` to add the CAdvisor service:

```yaml
- job_name: 'cAdvisor'
  static_configs:
    - targets: ['monitoring.guidanz.com:8080']
```

Access CAdvisor from the URL: `http://IP_Address:8080/docker/`

## Setting up Grafana

Now we will set up Grafana, where we will be using Prometheus as a data source. We can have a better dashboard in Grafana for the metrics visualization.

Append the code in the above docker compose and restart:

```yaml
grafana:
  image: grafana/grafana
  user: "1000"
  environment:
    - GF_SECURITY_ADMIN_PASSWORD=secure_pass
  volumes:
    - ./grafana_db:/var/lib/grafana
  depends_on:
    - prometheus
  ports:
    - '3000:3000'
```

Access Grafana UI from port **3000**. The default user is `admin` and the password is what you set in the compose file.
