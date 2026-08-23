---
title: 'Automated memory forensics pipeline for real-time malware detection and response'
shortTitle: 'Automated memory forensics'
tagline: 'Turning volatile-memory analysis from a manual investigation step into an automated detection path'
summary: 'A framework that triggers memory acquisition and Volatility3 analysis automatically from Wazuh events, classifies malicious processes with machine learning, and drives SOAR-oriented response scripts.'
seoDescription: 'An automated memory forensics pipeline — Wazuh-triggered acquisition, Volatility3 artefact extraction and machine-learning classification of malicious processes.'
kind: 'Security automation'
period: '2025'
status: 'Prototype'
featured: true
order: 3
stack:
  - Wazuh
  - WinPMEM
  - Volatility3
  - Python
  - scikit-learn
domains:
  - Digital forensics
  - Security automation
  - Malware detection
evidence: []
links: []
---

## Problem

Memory forensics answers questions that disk and network telemetry cannot:
what was actually executing, what was injected into what, what never touched
disk at all. It is also, in most environments, a step someone performs by hand
hours after the event that mattered — by which point the evidence is gone.

The obstacle is that acquisition and analysis are slow, manual and awkward to
trigger. This project asks whether that path can be automated end to end:
detection event in, memory image acquired, artefacts extracted, classification
produced, response invoked — without a human in the middle of the mechanical
parts.

## My role

Sole author. I designed and built the pipeline, the feature-extraction and
classification workflow, and the response scripting.

## Approach

Wazuh acts as the trigger and the transport. When an agent raises a qualifying
event, WinPMEM acquires a memory image on the endpoint and Volatility3 runs a
fixed plugin set against it to extract process, injection and handle artefacts.

Those artefacts are reduced to a feature vector and passed to a classifier
trained on **CIC-MalMem2022**, a public memory-dump dataset covering
obfuscated and hidden malware families. The classification result feeds
SOAR-oriented response scripts that can isolate, kill or flag depending on the
verdict.

Evaluation used simulated ransomware behaviour in a controlled lab environment,
which is the only ethically and practically viable way to exercise the full
acquisition-to-response path repeatedly.

## Evidence and results

The pipeline runs end to end: a Wazuh event triggers acquisition, Volatility3
artefacts are extracted and vectorised automatically, the classifier produces a
verdict, and response scripts execute against it. Detection and response
behaviour were exercised against simulated ransomware activity in a controlled
environment.

<!-- TODO(joel): this project has no recorded quantitative results. If you have
classifier accuracy / precision / recall on CIC-MalMem2022, or acquisition and
analysis wall-clock timings, add them to the `evidence:` block in the
frontmatter of this file and they will render as a results table. Leaving this
empty is better than estimating. -->

## Limitations

- **No quantitative evaluation is published here.** Classifier performance and
  pipeline timings were not recorded in a form I am willing to quote.
- **Windows-only.** WinPMEM and the Volatility3 profiles used are Windows
  specific.
- **Simulated adversary.** Controlled ransomware simulation exercises the
  plumbing; it does not establish detection performance against real,
  actively evasive malware.
- **Acquisition is expensive and visible.** Imaging memory on a live endpoint
  costs time and I/O and is observable to anything already running there.
- **Dataset transfer gap.** A classifier trained on CIC-MalMem2022 dumps is
  being applied to artefacts from a different acquisition path; that shift was
  not characterised.

## Links

<!-- TODO(joel): add the source repository if this work is public. -->
