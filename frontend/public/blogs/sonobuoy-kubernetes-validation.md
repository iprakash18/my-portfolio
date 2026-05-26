---
title: 'Sonobuoy: Validate your Kubernetes Configuration'
excerpt: Sonobuoy is a conformance testing tool that makes it simpler to understand the condition of a Kubernetes cluster by running a variety of configuration tests in an accessible and non-destructive manner.
author: Prakash Iyyanarappan
publishedDate: 2022-09-04
readTime: 3
tags: [Sonobuoy, Kubernetes, K8s, Security, CNCF]
category: DevOps
featured: true
sourceUrl: https://medium.com/@iprakash18/sonobuoy-validate-your-kubernetes-configuration-5d30ce82ae7b
---

![Sonobuoy](https://miro.medium.com/v2/resize:fit:700/1*op-REo540UvWVncdKJDAzw.png)

Sonobuoy is a conformance testing tool that makes it simpler to understand the condition of a Kubernetes cluster by running a variety of configuration tests in an accessible and non-destructive manner. The plugins include the Kubernetes conformance tests and it provides customizable, extendable, and cluster-agnostic reporting for your Kubernetes.

This tool is used by cluster owners to ensure their Kubernetes cluster follows CNCF guidelines through these test use cases:

1. Integrated end-to-end conformance testing of Kubernetes
2. Workload debugging
3. Custom data collection through extensible plugins

## Evaluation of Sonobuoy

Sonobuoy is a conformance testing tool that makes it simpler to understand the condition of Kubernetes by running a variety of configuration tests in an accessible and non-destructive manner.

The Sonobuoy project is an open-source tool designed to provide visibility into a cluster by running diagnostics that capture cluster events to produce informative and comprehensive reports.

### Conformance Testing

It helps to ensure that a cluster is configured accurately, and its behavior follows official Kubernetes specifications.

### Workload Debugging

It is used to deliver diagnostics for troublesome workloads that are difficult to debug.

### Custom Tests and Data Collection

It uses a variety of community custom plugins to test custom configurations.

## When to Use Sonobuoy

- Each time a new cluster is built and deployed
- Any time there are minor changes in software or configuration, or changes in the control plane
- Whenever there are major changes to cluster software version, policies, or configuration

## Features

- Cluster agnostic
- Enabled on air-gapped clusters
- Extensible through plugins

## Prerequisites

1. Up and running Kubernetes cluster — full access
2. An admin kubeconfig file, and the `KUBECONFIG` environment variable set
3. `kubectl` installed for some advanced workflows
4. Docker installed for the `sonobuoy images` subcommand

## Strengths

- It provides customizable, extendable, and cluster-agnostic reporting for your Kubernetes cluster. It helps you understand how your setup fits the industry business standards and whether you need to make any changes.
- Customizable plugins allow customers to write their custom plugins to fit their organizational standards.
- **No Internet Access? No Problem.** The end-to-end Kubernetes test suites run to validate your cluster’s status without an internet connection.

## Weaknesses

- **Provisioning time** — A full conformance test could take an hour or more while consuming significant resources during that time.
- It does not provide a user interface to view the conformance test results and drill down into the specific test cases that failed.

## Commands & Usage

### Quick Sanity Test

Use the following command to check the status of each of the plugins:

```bash
sonobuoy run --wait --mode quick
```

### Standard Conformance Tests

To run the standard conformance tests with Sonobuoy:

```bash
sonobuoy run --wait
```

### Raw Logs

You can view the raw logs from the running containers:

```bash
sonobuoy logs
```

### Sonobuoy Namespace

List resources in the sonobuoy namespace and get the **e2e** pod:

```bash
kubectl get all -n sonobuoy
```

### Run a Specific Plugin

You can specify running just one module or plugin:

```bash
sonobuoy run --plugin e2e
sonobuoy run --plugin systemd-logs
```

### Check Status During a Run

```bash
sonobuoy status
```

### Result Analysis

Get the results from the plugins (e.g. e2e test results):

```bash
results=$(sonobuoy retrieve)
```

Inspect results for test failures — this will list the number of tests failed and their names.

### Detailed Results Contents

Sonobuoy output is a gzipped tarball, named in the following manner:

```
YYYmmDDHHMM_sonobuoy_<uuid>.tar.gz
```

### Clean-Up

The below command deletes the Sonobuoy namespaces as well as a few cluster-scoped resources that Sonobuoy created during the run:

```bash
sonobuoy delete --wait
```

## Conclusion

Sonobuoy enables us to see what is performing deep under the cluster. Sonobuoy supports keeping the Kubernetes cluster more robust and achieving maturity in container management within the organization. Likewise, Sonobuoy in connection with Kubernetes allows an understanding of whether the cluster fits the specific business standards.
