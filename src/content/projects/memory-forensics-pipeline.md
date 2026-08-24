---
title: 'Automated memory forensics pipeline'
period: '2025'
purpose: 'Automated volatile-memory acquisition and analysis triggered from SIEM events, for malware detection and incident response.'
contribution: 'Sole author. Built the Wazuh-triggered acquisition path with WinPMEM, Volatility3 artefact extraction, the ML classification workflow for malicious process identification, and the SOAR-oriented response scripts.'
repo: 'https://github.com/Joellots/CCF-Project'
order: 2
---

Memory answers questions disk and network logs cannot: what was actually
running, what was injected into what, what never touched disk. The catch is that
acquiring and analysing it is slow and manual, so by the time anyone does it the
evidence is usually gone.

**How it works.** Wazuh acts as both the trigger and the transport. When an
agent raises a qualifying alert, WinPMEM captures a memory image on the
endpoint and Volatility3 runs a fixed set of plugins against it to pull out
process, injection and handle artefacts. Those artefacts become a feature
vector, an XGBoost classifier trained on the CIC-MalMem2022 dataset scores it,
and response scripts act on the verdict.

**How it was exercised.** Simulated ransomware behaviour in a controlled lab,
which is the only sane way to run the full acquisition-to-response path over and
over.

**Where it stops.** I did not record classifier accuracy or timings in a form
worth quoting, so there are no numbers here. It is Windows only. Capturing
memory on a live machine is costly and visible to anything already running on
it. And the classifier was trained on dumps from a different acquisition path
than the one it runs against, which I never characterised.
