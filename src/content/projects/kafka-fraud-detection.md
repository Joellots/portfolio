---
title: 'Streaming fraud detection'
period: '2024'
purpose: 'Real-time transaction analysis on Apache Kafka, applying machine learning for low-latency anomaly detection over the stream.'
contribution: 'Sole author. Designed the end-to-end pipeline: synthetic transaction generation, the Kafka Streams topology, Random Forest inference, and live monitoring.'
repo: 'https://github.com/Joellots/Kafka-Streams-and-ML'
order: 3
---

A fraud model is only useful before the transaction settles, and a notebook
score says nothing about whether you can get a verdict out in time. This was
built to work under that constraint and find out where it actually breaks.

**How it works.** A generator produces a synthetic transaction stream onto
Kafka. A Kafka Streams topology handles routing and windowed aggregation, and an
inference stage scores each transaction with a Random Forest classifier trained
offline. Verdicts go back onto a results topic and show up in a live monitoring
view.

The architecture is deliberately ordinary. The point was to build every stage as
one system, because the joins between them are where streaming inference tends
to fall over.

**Where it stops.** The data is synthetic, so the three things that make real
fraud detection hard are all missing: class imbalance, drift, and adversaries
who adapt. I did not record throughput or latency figures. It ran on a
single node, so partitioning and rebalancing were never tested, and the model
never learns from confirmed outcomes.
