---
title: 'Explainable machine learning for malware detection in encrypted network traffic'
shortTitle: 'Two-tier XAI for encrypted traffic'
tagline: 'Why a SOC needs two different kinds of explanation, and what it costs to run each one'
summary: 'A two-tier explainability pipeline for metadata-only encrypted-malware detection: a deterministic always-on tier for triage and an on-demand tier for forensic investigation. IEEE USBEREIT 2026.'
seoDescription: 'A two-tier explainability pipeline for encrypted-malware detection: always-on EBM explanations for triage, SHAP and LIME for forensics. IEEE USBEREIT 2026.'
kind: 'Conference paper'
period: '2025 — 2026'
status: 'Conference paper'
featured: true
order: 2
stack:
  - Explainable Boosting Machine
  - XGBoost
  - Random Forest
  - SHAP
  - LIME
  - Python
  - scikit-learn
domains:
  - Explainable AI
  - Encrypted traffic analysis
  - Model interpretability
evidence:
  - label: 'Detection F1'
    value: '≥ 0.9989'
    note: 'Consistent across Random Forest, XGBoost and a glass-box EBM on the study dataset.'
  - label: 'EBM explanation latency'
    value: '3.5 ms median'
    note: 'Local explanation per instance — about 3.7× faster than SHAP on the same models.'
  - label: 'Reduced feature set'
    value: '9 features'
    note: 'SHAP-guided consensus subset; near-identical accuracy with more stable explanations.'
links: []
---

## Problem

Explainability in security machine learning is usually discussed as if it were
one requirement. It is at least two, and they pull in opposite directions.

An analyst triaging an alert queue needs an explanation **now**, for every
alert, cheaply and deterministically — otherwise the explanation simply does not
get used. An analyst reconstructing an incident afterwards needs an explanation
that is **thorough**, and can afford to wait seconds for it. Treating these as
the same problem means either paying forensic-grade explanation cost on every
alert, or shipping triage-grade explanations into investigations that need more.

This paper asks what happens if you design for both explicitly, on the specific
problem of detecting malware in encrypted traffic using flow metadata only.

## My role

First author, with I. Womoakor and I. V. Kotenko. I designed the two-tier
pipeline, ran the model comparison and the explanation-cost measurements, and
carried out the feature-reduction and stability analysis.

## Approach

**Tier one — always on, deterministic.** Explainable Boosting Machine term
contributions and XGBoost feature contributions. These are read directly out of
the model rather than approximated after the fact, so they are reproducible and
fast enough to attach to every verdict without changing the shape of the alert
pipeline.

**Tier two — on demand.** SHAP and LIME, invoked when an analyst opens a case
and wants a fuller local picture. The cost is acceptable precisely because it is
paid per investigation rather than per alert.

**Feature reduction as a stability intervention.** SHAP attributions across the
models were used to select a nine-feature consensus subset. The interesting
result is not that accuracy held — with F1 already at 0.9989 there was little
room to move — but that explanations over the reduced set were _more stable_.
Fewer, less correlated features means attribution has fewer ways to spread
itself across interchangeable inputs.

## Evidence and results

F1 ≥ 0.9989 across Random Forest, XGBoost and the glass-box EBM. The
near-identical scores are worth reading carefully: on this dataset the choice
of model is not what distinguishes the approaches, so the glass-box model can be
preferred on explainability grounds at effectively no accuracy cost. That is the
paper's practical argument.

EBM local explanations ran at a 3.5 ms median, roughly 3.7× faster than SHAP on
the same task — the measurement that makes an always-on tier defensible rather
than aspirational.

The nine-feature consensus subset preserved near-perfect accuracy while
improving explanation stability.

<!-- TODO(joel): name the dataset used in the study and add the DOI / IEEE
Xplore link once the proceedings are published. -->

## Limitations

- **Accuracy is suspiciously high.** F1 ≥ 0.9989 across three different model
  families is a property of the dataset as much as of the method. It should be
  read as "these models separate this data almost perfectly", not as an expected
  operational detection rate. The follow-on work — [Aegis](/projects/aegis) —
  scores ≈ 0.97 on live NFStream features, which is the more realistic figure.
- **Stability is not correctness.** A stable explanation is one that does not
  change when the input is perturbed slightly. That is necessary for analyst
  trust and insufficient for it: an explanation can be stably wrong.
- **Latency measured in isolation.** The 3.5 ms median is per-instance
  explanation cost, not end-to-end alert latency under contention.
- **No analyst study.** The claim that these explanations help triage is a
  design argument supported by cost measurements, not a validated human-factors
  result.

## Links

Full citation and details are listed under [publications](/about#publications).
