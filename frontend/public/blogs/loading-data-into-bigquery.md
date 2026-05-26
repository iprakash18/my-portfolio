---
title: Loading Data into BigQuery
excerpt: A practical guide to the various types of data loads supported in Google BigQuery — from cloud storage and local files to Firestore exports, Google Ads, streaming inserts, and DML statements.
author: Prakash Iyyanarappan
publishedDate: 2023-10-19
readTime: 4
tags: [BigQuery, GCP, Google Cloud, Data Engineering, ETL]
category: Cloud Infrastructure
featured: false
sourceUrl: https://medium.com/@iprakash18/loading-data-into-bigquery-c2263b01607f
---

## Types of Data Load in BigQuery

The following types of data loads are supported in Google BigQuery:

- You can **load data from cloud storage or a local file**. The supported records are in **Avro, CSV, or JSON** format.
- **Data exports from Firestore and Datastore** can be uploaded into Google BigQuery.
- You can load data from other **Google services** such as Google Ads Manager and Google Analytics.
- **Streaming inserts** can be actively loaded in BigQuery.
- **Data Manipulation Language (DML)** statements are also used for bulk data upload.

## Data Ingestion Format

Proper data ingestion format is necessary to carry out a successful upload of data.

The following factors play an important role in deciding the data ingestion format:

1. **Schema Support**
2. **Flat Data / Nested and Repeated Fields**
3. **Embedded Newlines**
4. **Encoding**

### Schema Support

One important feature of BigQuery is that it creates a table schema automatically based on the source data. Data formats like **Avro, ORC, and Parquet** are self-describing formats — no specific schema support is needed for these. But for data formats like **JSON and CSV**, an explicit schema can be provided.

### Flat Data / Nested and Repeated Fields

Nested and repeated data help in expressing hierarchical data. All the formats including **Avro, ORC, Parquet, and Firestore exports** support data with nested and repeated fields.

### Embedded Newlines

When data is being loaded from JSON files, the rows need to be **newline delimited**. BigQuery expects newline-delimited JSON files to contain a single record per line.

### Encoding

BigQuery supports **UTF-8 encoding** for both nested, repeated, and flat data. For CSV files, BigQuery additionally supports **ISO-8859-1 encoding** for flat data.

## Load Data into BigQuery

To load data into BigQuery, the following steps must be followed:

1. **Create a dataset and table** in Google BigQuery before uploading any data. To do this on BigQuery, go to the home page and select the resource in which you want to create a dataset.

> **Read the full article on Medium** — the complete step-by-step walkthrough including dataset creation, schema definition, and load command examples is available on the original post: [Loading Data into BigQuery on Medium](https://medium.com/@iprakash18/loading-data-into-bigquery-c2263b01607f)
