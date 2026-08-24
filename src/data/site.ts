/* ===========================================================================
 * SINGLE SOURCE OF TRUTH FOR PERSONAL INFORMATION
 *
 * Everything the page says about Joel lives here. Projects live separately in
 * src/content/projects/.
 * ======================================================================== */

export interface Link {
  readonly label: string;
  readonly href: string;
  /** Icon key resolved by src/components/IconLink.astro. */
  readonly icon: 'email' | 'github' | 'linkedin' | 'scholar' | 'orcid';
}

export interface Role {
  readonly org: string;
  readonly title: string;
  readonly period: string;
  /** One or two lines: what I was responsible for, and what came of it. */
  readonly summary: string;
}

export interface Study {
  readonly degree: string;
  readonly org: string;
  readonly period: string;
}

export interface Publication {
  readonly title: string;
  readonly authors: string;
  readonly venue: string;
  readonly year: string;
  readonly doi: string;
  /** One plain sentence a non-specialist can follow. */
  readonly plain: string;
  /** Detail for the disclosure panel. */
  readonly details: readonly string[];
}

export interface Interest {
  readonly name: string;
  readonly detail: string;
}

/* --------------------------------------------------------------- identity */

export const person = {
  fullName: 'Okore Joel Chidike',
  /** Header brand and conversational references. */
  shortName: 'Joel',
  title: 'Security Engineer & Researcher',
  email: 'okorejoel2017@gmail.com',
  /** Served from public/cv/. */
  cvPath: '/cv/Okore-Joel-Chidike-CV.pdf',
  metaDescription:
    'Joel Okore builds and studies security systems that use machine learning, with a focus on network traffic, explainability and the graph theory behind both.',
} as const;

/** Hero. One short paragraph, plain language. */
export const heroIntro =
  'I build and study security systems that use machine learning. Most of my work has been on network traffic: finding malicious behaviour without decrypting anything, then making the model’s reasoning clear enough that a person can check it.';

/** About. Kept to three short paragraphs. */
export const about: readonly string[] = [
  'I finished an MSc in Security and Network Engineering at Innopolis University, and I am now doing a second MSc in Advanced Combinatorics at MIPT. The maths is deliberate. Graph structure keeps showing up in the problems I care about, so I wanted a proper grounding in it rather than a working knowledge.',
  'Before that I spent time on the practical side: penetration testing, DevOps, and building machine learning pipelines for anomaly detection. That mix is why I care about whether a detection system can actually be run and trusted, not only whether it scores well.',
  'I also teach. I run lab sessions and mentor students in networks, security and distributed systems, and it is reliably the best part of my week.',
];

/* ------------------------------------------------------------------ links */

export const links: readonly Link[] = [
  { label: 'Email', href: `mailto:${person.email}`, icon: 'email' },
  { label: 'GitHub', href: 'https://github.com/Joellots', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joel-okore/', icon: 'linkedin' },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=t1JDwE8AAAAJ&hl=en',
    icon: 'scholar',
  },
  { label: 'ORCID', href: 'https://orcid.org/0009-0003-9896-6902', icon: 'orcid' },
];

/* -------------------------------------------------------------- interests */

/*
 * Sourced from the RESEARCH INTERESTS section of _CV-OKORE.pdf. The wording of
 * each `detail` is intentionally broad: these are standing interests, not a
 * description of finished projects.
 */
export const interests: readonly Interest[] = [
  {
    name: 'Machine Learning',
    detail: 'Models that hold up outside the dataset they were trained on.',
  },
  {
    name: 'Cybersecurity',
    detail: 'Detection, response, and the gap between a working method and a usable one.',
  },
  {
    name: 'Graph Representation Learning',
    detail: 'Turning structure like hosts, flows and relationships into something a model can use.',
  },
  {
    name: 'Graph Neural Networks',
    detail: 'Learning directly on graphs instead of flattening them into feature vectors first.',
  },
  {
    name: 'Temporal and Random Graphs',
    detail:
      'Graphs that change over time, and what random models tell us about the ones that do not.',
  },
  {
    name: 'Network Anomaly Detection',
    detail: 'Separating unusual from malicious, which are not the same problem.',
  },
  {
    name: 'Explainable Artificial Intelligence (XAI)',
    detail:
      'Making a model’s reasoning legible, and cheap enough to produce that people actually use it.',
  },
  {
    name: 'Distributed Systems',
    detail: 'Streaming, orchestration, and keeping analysis fast when the data does not slow down.',
  },
];

/* ------------------------------------------------------------- experience */

export const experience: readonly Role[] = [
  {
    org: 'Laboratory of Information Security, Innopolis University',
    title: 'Junior Researcher & Teaching Assistant',
    period: 'Jan 2026 – Present',
    summary:
      'Teach the practical half of several security and networking courses, from forensics and incident response to offensive security, and mentor students through their lab work. I build and maintain the environments those labs run on.',
  },
  {
    org: 'Innopolis University',
    title: 'DevOps Engineer Intern',
    period: 'May – Sep 2025',
    summary:
      'Built GitOps delivery pipelines for Kubernetes and wired security scanning and monitoring into them. Set up Jenkins agents that scale with demand instead of sitting idle.',
  },
  {
    org: 'CFSS Cyber Forensic Security Solutions',
    title: 'Penetration Tester Intern',
    period: 'Feb – May 2024',
    summary:
      'Tested web applications and APIs for logic and configuration flaws, and wrote findings up so that both the engineers fixing them and the managers funding the fix could act on the same report.',
  },
  {
    org: 'Kazan National Research Technological University',
    title: 'Machine Learning Research Intern',
    period: 'Jan – Apr 2024',
    summary:
      'Built anomaly detection models for network intrusion data and benchmarked them against Zeek, Snort and Suricata.',
  },
];

/* ----------------------------------------------------------- publications */

export const publications: readonly Publication[] = [
  {
    title:
      'Explainable Machine Learning for Effective Malware Detection in Encrypted Network Traffic',
    authors: 'Joel C. Okore, Isaac Womoakor, Igor V. Kotenko',
    venue: 'IEEE USBEREIT',
    year: '2026',
    doi: 'https://doi.org/10.1109/USBEREIT70063.2026.11580625',
    plain:
      'How to explain why a model flagged encrypted traffic as malicious, quickly enough to be useful while someone is still working through an alert queue.',
    details: [
      'The paper splits explanation into two tiers. The first runs on every alert and reads contributions straight out of the model, so it is fast and gives the same answer every time. The second is slower and richer, and runs only when someone opens a case to investigate it.',
      'Models were trained on the Composed Encrypted Malicious Traffic Dataset, which merges five public sources, using flow-level metadata only. No traffic is decrypted.',
      'Random Forest, XGBoost and a glass-box Explainable Boosting Machine all reached F1 of at least 0.9989, so the interpretable model cost nothing in accuracy here. EBM explanations took 3.5 ms at the median, roughly 3.7× faster than SHAP.',
      'Cutting the feature set to a nine-feature consensus subset kept that accuracy and made the explanations more consistent between runs.',
    ],
  },
];

/* -------------------------------------------------------------- education */

export const education: readonly Study[] = [
  {
    degree: 'MSc, Advanced Combinatorics',
    org: 'Moscow Institute of Physics and Technology',
    period: '2025 – 2027 (expected)',
  },
  {
    degree: 'MSc, Security and Network Engineering',
    org: 'Innopolis University',
    period: '2024 – 2026',
  },
  {
    degree: 'BSc, Computer Science and Engineering',
    org: 'Kazan National Research Technological University',
    period: '2020 – 2024',
  },
];

/* ------------------------------------------------------------ navigation */

export const sections: readonly { readonly id: string; readonly label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'interests', label: 'Interests' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'publications', label: 'Publications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
