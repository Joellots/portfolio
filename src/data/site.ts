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
  /** Written in the technical register of the CV, but not copied from it. */
  readonly summary: string;
  /** Which timeline the role belongs to. */
  readonly track: 'academic' | 'professional';
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

/** Hero greeting, shown above the tagline. */
export const greeting = 'Hi, I’m Joel';

/** Supplied tagline. Used verbatim. */
export const tagline =
  'I’m Joel Okore, a cybersecurity and machine learning researcher exploring how graph-based methods, trustworthy AI, and secure systems can solve real-world security problems.';

/** Supplied short biography. Used verbatim. */
export const about: readonly string[] = [
  'I am Joel Okore, a cybersecurity and machine learning researcher with a growing interest in graph-based learning, combinatorics, and trustworthy AI. My work focuses on building intelligent security systems that are practical and useful in real-world environments, particularly for detecting and responding to emerging security threats.',
  'I hold an MSc in Security and Network Engineering from Innopolis University and am currently pursuing an MSc in Advanced Combinatorics at the Moscow Institute of Physics and Technology (MIPT), with a focus on strengthening the mathematical foundations that support my work. Beyond research, I enjoy teaching and mentoring students, particularly in computer networks, cybersecurity, and distributed systems.',
  'I’m especially interested in problems that sit between theory and practice, bringing together graph and network theory, machine learning, and secure systems engineering to build technologies we can understand and trust.',
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
    detail:
      'Models that stay reliable on data they were not trained on, and knowing why they fail when they do.',
  },
  {
    name: 'Cybersecurity',
    detail:
      'Detecting and responding to emerging threats, and closing the distance between a method that works in a paper and one a team can actually run.',
  },
  {
    name: 'Graph Representation Learning',
    detail:
      'Encoding relationships between hosts, flows and events so that structure becomes something a model can learn from.',
  },
  {
    name: 'Graph Neural Networks',
    detail:
      'Learning over graph structure directly, instead of flattening it into feature vectors and hoping the structure survives.',
  },
  {
    name: 'Temporal and Random Graphs',
    detail:
      'How networks change over time, and what random graph models predict about the structures we actually observe.',
  },
  {
    name: 'Network Anomaly Detection',
    detail:
      'Telling unusual traffic apart from malicious traffic, which is the harder half of the problem and the one that matters operationally.',
  },
  {
    name: 'Explainable Artificial Intelligence (XAI)',
    detail:
      'Making a model’s reasoning legible, and cheap enough to compute that it gets used during an investigation rather than written up afterwards.',
  },
  {
    name: 'Distributed Systems',
    detail:
      'Streaming architectures, orchestration and observability, so that analysis keeps pace with data that never slows down.',
  },
];

/* ------------------------------------------------------------- experience */

export const experience: readonly Role[] = [
  {
    track: 'academic',
    org: 'Laboratory of Information Security, Innopolis University',
    title: 'Junior Researcher & Teaching Assistant',
    period: 'Jan 2026 – Present',
    summary:
      'Run practical and laboratory sessions across cybersecurity, network engineering, secure software development, digital forensics, incident response and offensive security. I mentor students through TCP/UDP programming, secure network design, vulnerability analysis and incident investigation, and maintain the reproducible environments those labs depend on.',
  },
  {
    track: 'academic',
    org: 'Laboratory of the Faculty of Control and Automation, KNRTU',
    title: 'Machine Learning Research Intern',
    period: 'Jan – Apr 2024',
    summary:
      'Developed anomaly detection models on the KDD Cup ’99 dataset for binary and multiclass attack classification, tuned through feature engineering and hyperparameter search, and evaluated them against Zeek, Snort and Suricata. Built an interactive framework for real-time traffic analysis with automated ML lifecycle management in ZenML.',
  },
  {
    track: 'professional',
    org: 'Innopolis University',
    title: 'DevOps Engineer Intern',
    period: 'May – Sep 2025',
    summary:
      'Built GitOps-based CI/CD workflows for Kubernetes using ArgoCD and Kustomize, with SAST and DAST security validation and Prometheus/Grafana observability wired into the pipeline. Implemented autoscaling for Jenkins agents on Kubernetes, monitored in real time for agent performance and cluster health.',
  },
  {
    track: 'professional',
    org: 'CFSS Cyber Forensic Security Solutions',
    title: 'Penetration Tester Intern',
    period: 'Feb – May 2024',
    summary:
      'Analysed network and web application security mechanisms with Burp Suite, ZAP and Postman to exploit logic vulnerabilities and API misconfigurations, and achieved privilege escalation on Linux through misconfiguration, kernel vulnerabilities and session hijacking. Documented methodology and remediation guidance for technical and non-technical stakeholders, cutting time-to-remediate by 25%.',
  },
];

/** Timeline tracks, in display order. */
export const tracks: readonly { readonly id: Role['track']; readonly label: string }[] = [
  { id: 'academic', label: 'Academic' },
  { id: 'professional', label: 'Professional' },
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
