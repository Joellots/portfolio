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
  readonly icon: 'telegram' | 'email' | 'github' | 'linkedin' | 'scholar';
}

export interface Role {
  readonly org: string;
  readonly title: string;
  readonly period: string;
  /**
   * One concise line in the technical register of the CV, short enough to sit
   * beside the timeline spine without wrapping into a wall of text.
   */
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

export interface SkillGroup {
  readonly name: string;
  /** Glyph key resolved by src/components/SkillIcon.astro. */
  readonly icon: 'code' | 'model' | 'shield' | 'stack';
  readonly items: readonly string[];
}

/* --------------------------------------------------------------- identity */

export const person = {
  fullName: 'Okore Joel Chidike',
  /** The name used in visible copy, titles and social metadata. */
  displayName: 'Joel Okore',
  /** Header brand and conversational references. */
  shortName: 'Joel',
  title: 'Security Engineer & Researcher',
  email: 'okorejoel2017@gmail.com',
  metaDescription:
    'Joel Okore builds and studies security systems that use machine learning, with a focus on network traffic, explainability and the graph theory behind both.',
} as const;

/** Hero greeting, shown above the tagline. */
export const greeting = 'Hi, I’m Joel';

/**
 * What I actually work on, drawn from the summary and skills sections of the
 * CV. Shown under the greeting in place of a paragraph.
 */
export const keywords: readonly string[] = [
  'Cybersecurity',
  'AI/ML',
  'Network security',
  'Anomaly detection',
  'Graph-based methods',
  'Security automation',
];

/** Supplied short biography. Used verbatim. */
export const about: readonly string[] = [
  'I am Joel Okore, a cybersecurity and machine learning researcher with a growing interest in graph-based learning, combinatorics, and trustworthy AI. My work focuses on building intelligent security systems that are practical and useful in real-world environments, particularly for detecting and responding to emerging security threats.',
  'I hold an MSc in Security and Network Engineering from Innopolis University and am currently pursuing an MSc in Advanced Combinatorics at the Moscow Institute of Physics and Technology (MIPT), with a focus on strengthening the mathematical foundations that support my work. Beyond research, I enjoy teaching and mentoring students, particularly in computer networks, cybersecurity, and distributed systems.',
];

/* ------------------------------------------------------------------ links */

export const links: readonly Link[] = [
  { label: 'Telegram', href: 'https://t.me/JoelOkore', icon: 'telegram' },
  { label: 'Email', href: `mailto:${person.email}`, icon: 'email' },
  { label: 'GitHub', href: 'https://github.com/Joellots', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joel-okore/', icon: 'linkedin' },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=t1JDwE8AAAAJ&hl=en',
    icon: 'scholar',
  },
];

/* -------------------------------------------------------------- interests */

/*
 * Verbatim from the RESEARCH INTERESTS section of _CV-OKORE.pdf, with
 * "Explainable AI" written out in full.
 */
export const interests: readonly string[] = [
  'Machine Learning',
  'Cybersecurity',
  'Graph Representation Learning',
  'Temporal and Random Graphs',
  'Network Anomaly Detection',
  'Explainable Artificial Intelligence (XAI)',
  'Distributed Systems',
];

/* ------------------------------------------------------------- experience */

export const experience: readonly Role[] = [
  {
    org: 'Laboratory of Information Security, Innopolis University',
    title: 'Junior Researcher & Teaching Assistant',
    period: 'Jan 2026 – Present',
    summary:
      'Practical and laboratory sessions across cybersecurity, network engineering and digital forensics, and student mentoring.',
  },
  {
    org: 'Innopolis University',
    title: 'DevOps Engineer Intern',
    period: 'May – Sep 2025',
    summary:
      'GitOps CI/CD for Kubernetes with ArgoCD and Kustomize, plus SAST, DAST and Prometheus/Grafana observability.',
  },
  {
    org: 'CFSS Cyber Forensic Security Solutions',
    title: 'Penetration Tester Intern',
    period: 'Feb – May 2024',
    summary:
      'Web and API security testing with Burp Suite and ZAP, Linux privilege escalation, and remediation reporting.',
  },
  {
    org: 'Laboratory of the Faculty of Control and Automation, KNRTU',
    title: 'Machine Learning Research Intern',
    period: 'Jan – Apr 2024',
    summary:
      'Anomaly detection models on the KDD Cup ’99 dataset, benchmarked against Zeek, Snort and Suricata.',
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
      'An explainable ML framework for detecting malicious encrypted traffic from flow-level metadata alone, and what feature selection costs and buys in the trade-off between detection performance and interpretability.',
    details: [
      'A two-tier explainability pipeline. Tier 1 is fast and always on, suited to real-time SOC triage: Explainable Boosting Machine term contributions and XGBoost feature contributions, read straight out of the model rather than approximated after the fact. Tier 2 is a high-fidelity, on-demand module using SHAP and LIME for forensic investigation.',
      'Models were trained on the Composed Encrypted Malicious Traffic Dataset, which integrates five public sources, using metadata-derived flow statistics and temporal patterns. Nothing is decrypted.',
      'Feature selection compared ANOVA statistical filtering against SHAP importance ranking on tree-based models. Random Forest, XGBoost and the glass-box EBM all reached F1 of at least 0.9989, so on this data interpretability cost nothing in detection performance.',
      'EBM was the fastest explainer at 3.5 ms p50 and 285 explanations per second, roughly 3.7× faster than SHAP and 1.8× faster than LIME. A nine-feature consensus subset preserved detection performance while improving explanation consistency.',
    ],
  },
];

/* ----------------------------------------------------------------- skills */

/*
 * Grouped as in the SKILLS section of the CV. "Research Areas & Methods" is
 * deliberately not repeated here — those already appear under interests.
 */
export const skills: readonly SkillGroup[] = [
  {
    name: 'Programming languages',
    icon: 'code',
    items: ['Python', 'Bash', 'C / C++', 'JavaScript', 'SQL'],
  },
  {
    name: 'Machine learning & data science',
    icon: 'model',
    items: ['PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'SHAP', 'LIME'],
  },
  {
    name: 'Cybersecurity & systems',
    icon: 'shield',
    items: [
      'Network security',
      'Malware analysis',
      'Intrusion detection',
      'Reverse engineering',
      'Distributed systems',
      'Linux systems programming',
    ],
  },
  {
    name: 'Infrastructure & observability',
    icon: 'stack',
    items: ['Docker', 'Kubernetes', 'Kafka', 'Git', 'CI/CD', 'Prometheus', 'Grafana', 'ELK Stack'],
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

export const sections: readonly {
  readonly id: string;
  readonly label: string;
  /** Shown on narrow viewports; the rest are desktop-only. */
  readonly compact?: boolean;
}[] = [
  { id: 'about', label: 'About', compact: true },
  { id: 'interests', label: 'Interests' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects', compact: true },
  { id: 'experience', label: 'Experience', compact: true },
  { id: 'publications', label: 'Publications', compact: true },
  { id: 'contact', label: 'Contact', compact: true },
];
