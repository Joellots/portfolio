---
title: 'Aegis: explainable detection and trust-aware automated response for malicious HTTPS traffic'
shortTitle: 'Aegis'
tagline: 'Metadata-only malware detection over encrypted traffic, with explanations analysts can act on and a response layer that will not fire on a guess'
summary: 'Aegis detects malicious behaviour in encrypted HTTPS traffic from flow metadata alone, explains each decision in MITRE ATT&CK terms, and gates automated response on the confidence of that explanation. Built as MSc research at Innopolis University.'
seoDescription: 'Metadata-only malware detection in encrypted HTTPS traffic, with MITRE ATT&CK explanations and trust-gated automated response. MSc research, Innopolis University.'
kind: 'MSc research · systems'
period: '2025 — 2026'
status: 'Research prototype'
featured: true
order: 1
stack:
  - NFStream
  - XGBoost
  - SHAP
  - Explainable Boosting Machine
  - Apache Kafka
  - Wazuh
  - TheHive
  - Cortex
  - MISP
  - Python
domains:
  - Encrypted traffic analysis
  - Explainable AI
  - MITRE ATT&CK
  - Security automation
evidence:
  - label: 'Detection F1'
    value: '≈ 0.97'
    note: 'NFStream flow features, 11,800 sessions across 25 real Windows malware families.'
  - label: 'False-positive rate'
    value: '0.5%'
    note: 'Measured on out-of-distribution traffic held out from training.'
  - label: 'Training corpus'
    value: '11,800 sessions'
    note: 'Drawn from 25 real Windows malware families.'
  - label: 'ATT&CK mapping stability'
    value: '90 — 100%'
    note: 'Bootstrap stability of the feature-to-technique mapping, confirmed by four independent methods.'
  - label: 'Technique-assignment accuracy'
    value: '87.5%'
    note: 'End-to-end, from flow features through to the assigned ATT&CK technique.'
links: []
disclosure: 'Aegis was developed as part of my MSc research and has not been deployed in an operational SOC. References to security teams describe its intended use rather than a verified production setting.'
---

## Problem

Most malicious traffic now arrives over TLS. That leaves defenders with two
unappealing options: terminate and inspect the encrypted channel — expensive,
brittle, and increasingly at odds with certificate pinning and privacy
expectations — or fall back on reputation lists that miss anything new.

A third option is to classify on the _shape_ of a connection rather than its
contents: packet timing, byte distributions, flow duration, burst structure.
Statistical models do this well. The difficulty is what happens next. A model
that emits "malicious, 0.91" gives an analyst nothing to verify, nothing to
write in a case note, and no defensible reason to let an automated system act on
it. Detection accuracy was never the bottleneck; **actionability** was.

Aegis is my attempt to close that gap end to end: detect on metadata alone,
explain the detection in the vocabulary defenders already use, and only allow
automation to act when the explanation itself is stable enough to justify it.

## My role

This was my MSc thesis at Innopolis University — _Real-Time Detection and
Automated Response for Malicious HTTPS Traffic Using Explainable ML and SOAR
Integration_.

I designed and built the detection and explainability stack: the NFStream
feature pipeline, model selection and training, the explanation tiers, and the
empirical feature-to-ATT&CK mapping together with its validation. The SOAR
response layer — threat-intelligence enrichment through Cortex and MISP,
TheHive case automation, and Wazuh Active-Response enforcement — was
**co-developed**; I was responsible for the trust-gating logic that decides
whether a detection is permitted to trigger a response at all.

Aegis extends the earlier USBEREIT paper from an offline study into a running
system with a live feature pipeline and a response path.

## Approach

The system is four stages, and each one exists because the stage after it needs
something specific.

**1 — Metadata-only feature extraction.** NFStream produces per-flow statistical
features from live or captured traffic. Nothing is decrypted; no payload is
retained. This is the constraint that makes the whole approach deployable
alongside pinned certificates and privacy requirements, and it is fixed before
anything else is designed.

**2 — Two-tier explanation.** The earlier paper established the structure and
Aegis inherits it. A deterministic, always-on tier — Explainable Boosting
Machine term contributions and XGBoost feature contributions — runs with every
verdict, because triage cannot wait on an expensive explainer. A second,
on-demand tier (SHAP, LIME) is available for forensic depth once an analyst is
already looking at a case. Splitting the two is what makes explanation
affordable at line rate.

**3 — Feature-to-ATT&CK mapping.** The paper annotated features with qualitative
semantics: _this feature tends to correspond to beaconing behaviour_. In Aegis
that annotation became an empirically validated mapping from flow features to
MITRE ATT&CK techniques, cross-checked by four independent methods and bootstrap
resampled to measure how much of the mapping survives perturbation. The output
is the part an analyst actually reads: not "feature 34 was high" but a named
technique with a stability figure attached.

**4 — Trust-gated response.** Enrichment through Cortex and MISP, case creation
in TheHive, and enforcement through Wazuh Active-Response. The gate between
detection and enforcement is a decision matrix over model confidence,
explanation stability and enrichment corroboration. A verdict that is confident
but poorly explained does not reach the enforcement path — it opens a case for a
human instead. This is the design position of the whole project: automation
earns its authority from the quality of the explanation, not from the
probability score alone.

## Evidence and results

The figures in the results table above come from the MSc research evaluation.
They describe performance on a held-out research corpus, not on production
network traffic.

The detection result — F1 ≈ 0.97 at a 0.5% false-positive rate — is lower than
the near-perfect scores in the earlier paper. That is the honest consequence of
moving from a curated offline dataset to live NFStream features over 25 real
Windows malware families, and the drop is the more informative number of the
two.

The mapping results matter more to the argument. A feature-to-technique mapping
that is 90–100% stable under bootstrap resampling is one an analyst can rely on
across cases rather than one that reshuffles per sample; 87.5% end-to-end
technique-assignment accuracy is the figure that determines whether the ATT&CK
label attached to a case note is worth reading.

<!-- TODO(joel): add the confusion matrix, per-family breakdown and the names of
the four independent validation methods once the thesis is cleared for release. -->

## Limitations

- **Not operationally deployed.** Aegis has run in a research environment, not
  in a SOC. Sustained-load behaviour, analyst workflow fit, and alert fatigue
  under real volume are all unmeasured.
- **Research corpus, not production traffic.** 25 Windows malware families is a
  meaningful spread but not a representative sample of what crosses a real
  network. Benign traffic diversity is the harder gap: a 0.5% false-positive
  rate on research traffic is not a promise of the same rate on an enterprise
  network.
- **Windows-only malware scope.** No Linux, macOS or mobile families are
  represented.
- **Mapping is correlational.** The feature-to-ATT&CK mapping is empirically
  validated for stability and accuracy on this corpus. It does not establish
  that a feature _causes_ a technique classification, and it inherits whatever
  bias the corpus has.
- **Metadata-only cuts both ways.** The same constraint that makes the approach
  deployable also means it cannot see anything that is only visible in the
  payload.
- **Adversarial robustness untested.** Traffic shaping, padding and timing
  perturbation are all plausible evasions that were out of scope.

## Links

<!-- TODO(joel): add the source repository, the thesis PDF and — once the
proceedings are published — the DOI for the USBEREIT paper this work extends. -->

The published paper this project builds on is listed under
[publications](/about#publications).
