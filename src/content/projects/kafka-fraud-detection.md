---
title: 'Real-time machine-learning fraud detection with Kafka Streams'
shortTitle: 'Streaming fraud detection'
tagline: 'An end-to-end streaming pipeline: generation, transport, inference and monitoring, built to hold latency under load'
summary: 'A streaming analytics pipeline that scores transactions for fraud as they arrive, built on Apache Kafka with a Random Forest classifier and live monitoring of the inference path.'
seoDescription: 'A real-time fraud detection pipeline on Apache Kafka: streaming transaction generation, Random Forest inference, and live monitoring of the inference path.'
kind: 'Streaming analytics'
period: '2024'
status: 'Prototype'
featured: false
order: 4
stack:
  - Apache Kafka
  - Kafka Streams
  - Python
  - scikit-learn
  - pandas
domains:
  - Streaming systems
  - Anomaly detection
  - Real-time analytics
evidence: []
links: []
---

## Problem

Fraud scoring is only useful before a transaction settles. A model that is
accurate in a notebook and evaluated in batch has not been tested against the
constraint that actually matters: producing a verdict inside the window where
acting on it is still possible.

This project was built to work in that regime — to put a classifier behind a
real streaming transport and find out where the latency and back-pressure
problems actually live.

## My role

Sole author. I built the full pipeline: synthetic transaction generation, the
Kafka topology, the inference service, and the monitoring and visualisation
layer.

## Approach

A generator produces a synthetic transaction stream onto Kafka. A Kafka Streams
topology handles routing and windowed aggregation, and an inference stage scores
each transaction with a Random Forest classifier trained offline on labelled
transaction data. Verdicts are published back onto a results topic and surfaced
through a live monitoring view.

The architecture is deliberately conventional. The point of the exercise was to
build every stage — generation, streaming, inference, monitoring — as one system
rather than to invent a novel detector, because the integration seams are where
streaming inference actually fails.

## Evidence and results

The pipeline runs end to end with sustained synthetic load: transactions are
generated, streamed, scored and visualised in a single continuous flow, with
Random Forest classification identifying suspicious transactions in the stream.

<!-- TODO(joel): no throughput, latency or classifier metrics were recorded for
this project. If you still have them (messages/sec sustained, p95 end-to-end
latency, classifier precision/recall), add them to the `evidence:` block in this
file's frontmatter to render a results table. -->

## Limitations

- **Synthetic data.** The transaction stream is generated, so class balance,
  drift and adversarial adaptation — the three things that make production fraud
  detection hard — are all absent.
- **No recorded performance figures.** Throughput and latency were observed
  during development but not measured in a form worth quoting.
- **Single-node deployment.** The topology was never exercised across a
  multi-broker cluster, so partitioning and rebalancing behaviour is untested.
- **Offline-trained model, no feedback loop.** The classifier does not learn
  from confirmed outcomes, which is precisely how real fraud systems stay
  current.

## Links

<!-- TODO(joel): add the source repository if this work is public. -->
