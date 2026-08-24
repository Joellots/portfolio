---
title: 'Aegis'
period: '2025 – 2026'
purpose: 'Finds malware hiding in encrypted HTTPS traffic, explains why it flagged each connection, and only lets the automated response fire when the evidence holds up.'
contribution: 'My MSc thesis at Innopolis University, written with Isaac Womoakor. I built the detection and explanation side. The automated response layer was joint work, and I owned the logic that decides whether a detection is trusted enough to act on.'
outcome: 'Macro-averaged F1 of 0.972 on held-out data, at a false-positive rate of about two per cent. In an end-to-end simulation with a previously unseen command-and-control implant, the pipeline processed every flow without failing.'
repo: 'https://github.com/Joellots/Aegis'
order: 1
---

Aegis was research, not a product. It has not run in a real security operations
centre, so nothing here describes production behaviour.

**Why not just decrypt the traffic.** Breaking TLS open is expensive, fragile
against certificate pinning, and awkward for privacy. Aegis never decrypts
anything. It classifies connections on shape alone: packet timing, byte
distributions, how long a flow lasts, how it bursts.

**The problem that shape-based detection creates.** A score on its own gives an
analyst nothing to check and nothing to write in a case note. So every verdict
carries an explanation, and each important feature is mapped to a named MITRE
ATT&CK technique rather than a feature index.

**What was measured.** The model was trained on 11,822 flows drawn from 86 real
malware captures collected between 2022 and 2025, covering roughly 25 malware
families. On held-out data it reached a macro-averaged F1 of 0.972, with 24
false positives in the test confusion matrix, a false-positive rate near two
per cent. The feature-to-technique map came down to fourteen associations that
four independent lines of evidence agreed on, with bootstrap stability between
0.90 and 1.00.

**How response is gated.** Enrichment runs through Cortex and MISP, cases open
in TheHive, and enforcement goes through Wazuh Active Response. A confident
score is not enough on its own: model confidence, explanation stability and
outside corroboration are treated as separate checks, and anything disruptive
still needs a person to approve it.

**Where it stops.** The evaluation used a research corpus, so the false-positive
rate on a real network is unknown. Benign traffic in the wild is far more varied
than anything in the training set. Evasion through traffic shaping, padding or
timing changes was out of scope.
