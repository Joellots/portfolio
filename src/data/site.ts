/* ===========================================================================
 * SINGLE SOURCE OF TRUTH FOR PERSONAL INFORMATION
 *
 * Everything the site says about Joel — name, bio, links, roles, education,
 * publications, capabilities — lives in this file. Edit here and the whole
 * site updates. Project case studies live separately in src/content/projects/.
 * ======================================================================== */

export interface Link {
  readonly label: string;
  readonly href: string;
  /** Shown as the visible "handle" next to the label on the contact page. */
  readonly handle?: string;
  readonly external?: boolean;
}

export interface Role {
  readonly org: string;
  readonly title: string;
  readonly period: string;
  readonly place: string;
  readonly points: readonly string[];
}

export interface Study {
  readonly org: string;
  readonly credential: string;
  readonly period: string;
  readonly place: string;
  readonly notes: readonly string[];
}

export interface Publication {
  readonly title: string;
  readonly authors: string;
  readonly venue: string;
  readonly year: string;
  readonly status: string;
  readonly summary: readonly string[];
  readonly links?: readonly Link[];
}

export interface Award {
  readonly title: string;
  readonly detail: string;
  readonly period: string;
}

export interface CapabilityGroup {
  readonly name: string;
  readonly items: readonly string[];
}

/* --------------------------------------------------------------- identity */

export const person = {
  fullName: 'Okore Joel Chidike',
  displayName: 'Joel',
  /** Used in <title>, structured data and the OG image. */
  siteName: 'Joel Okore',
  title: 'Security Engineer and Researcher',
  /*
   * TODO(joel): confirm which location should be public. You supplied
   * "Nigeria"; your CV lists "Moscow, Russia" (MIPT / Innopolis). This string
   * is the only place the site prints a location.
   */
  location: 'Nigeria',
  email: 'okorejoel2017@gmail.com',
  /** Served from public/cv/ — replace the PDF there to update the download. */
  cvPath: '/cv/Okore-Joel-Chidike-CV.pdf',
  cvUpdated: 'August 2026',
  tagline:
    'I’m Joel Okore, a cybersecurity and machine learning researcher exploring how graph-based methods, trustworthy AI, and secure systems can solve real-world security problems.',
  /** One-line summary used for meta descriptions and social cards. */
  metaDescription:
    'Joel Okore — security engineer and researcher working on encrypted-traffic analysis, explainable machine-learning detection, and graph-based methods for security.',
} as const;

export const bio: readonly string[] = [
  'I am Joel Okore, a cybersecurity and machine learning researcher with a growing interest in graph-based learning, combinatorics, and trustworthy AI. My work focuses on building intelligent security systems that are practical and useful in real-world environments, particularly for detecting and responding to emerging security threats.',
  'I hold an MSc in Security and Network Engineering from Innopolis University and am currently pursuing an MSc in Advanced Combinatorics at the Moscow Institute of Physics and Technology (MIPT), with a focus on strengthening the mathematical foundations that support my work. Beyond research, I enjoy teaching and mentoring students, particularly in computer networks, cybersecurity, and distributed systems.',
  'I’m especially interested in problems that sit between theory and practice, bringing together graph and network theory, machine learning, and secure systems engineering to build technologies we can understand and trust.',
];

/** Short version used on the home page. */
export const bioShort: readonly string[] = [bio[0]!, bio[2]!];

/* ------------------------------------------------------------------ links */

export const socials: readonly Link[] = [
  {
    label: 'Email',
    href: `mailto:${person.email}`,
    handle: person.email,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Joellots',
    handle: 'github.com/Joellots',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joel-okore/',
    handle: 'linkedin.com/in/joel-okore',
    external: true,
  },
];

/* -------------------------------------------------------- research themes */

export const researchInterests: readonly { readonly name: string; readonly detail: string }[] = [
  {
    name: 'Encrypted traffic analysis',
    detail:
      'Detecting malicious behaviour from flow metadata alone, without decrypting payloads or breaking TLS.',
  },
  {
    name: 'Explainable detection',
    detail:
      'Glass-box and post-hoc explanation methods (EBM, SHAP, LIME) shaped around what an analyst actually needs during triage.',
  },
  {
    name: 'Graph representation learning',
    detail:
      'Graph neural networks, temporal and random graphs, and the combinatorial structure underneath them.',
  },
  {
    name: 'Trustworthy AI for security',
    detail:
      'Stability, calibration and confidence gating — knowing when a model’s output should be allowed to trigger an action.',
  },
  {
    name: 'Security automation',
    detail:
      'SOAR pipelines, automated response, memory forensics, and the operational plumbing that connects detection to action.',
  },
  {
    name: 'Distributed and secure systems',
    detail:
      'Streaming architectures, container orchestration, and observability for security workloads.',
  },
];

/* ------------------------------------------------------------- experience */

export const experience: readonly Role[] = [
  {
    org: 'Innopolis University — Laboratory of Information Security',
    title: 'Junior Researcher / Teaching Assistant',
    period: 'Jan 2026 — Present',
    place: 'Innopolis, Russia',
    points: [
      'Run practical and laboratory sessions for undergraduate and MSc courses in cybersecurity, network engineering, secure software development, digital forensics, incident response, and offensive security.',
      'Mentor students on network and systems security: TCP/UDP programming, secure network design, vulnerability analysis, incident investigation, and security testing.',
      'Develop and maintain laboratory materials and reproducible environments for hands-on exercises in networking, cybersecurity, and secure systems.',
    ],
  },
  {
    org: 'Innopolis University',
    title: 'DevOps Engineer Intern',
    period: 'May 2025 — Sep 2025',
    place: 'Innopolis, Russia',
    points: [
      'Built GitOps-based CI/CD workflows for Kubernetes environments using ArgoCD and Kustomize.',
      'Integrated automated security validation, monitoring and observability pipelines using Prometheus, Grafana, SAST and DAST tooling.',
      'Implemented automatic scaling of Jenkins agents on Kubernetes with real-time Prometheus/Grafana monitoring of agent performance and cluster health.',
    ],
  },
  {
    org: 'CFSS Cyber Forensic Security Solutions',
    title: 'Penetration Tester Intern',
    period: 'Feb 2024 — May 2024',
    place: 'Remote',
    points: [
      'Analysed network and web application security mechanisms with Burp Suite, ZAP and Postman to exploit logic vulnerabilities and API misconfigurations.',
      'Achieved privilege escalation in a Linux environment through misconfiguration, kernel vulnerabilities and session hijacking techniques.',
      'Documented findings and methodology for technical and non-technical stakeholders, with remediation guidance that reduced time-to-remediate by 25%.',
    ],
  },
  {
    org: 'Laboratory of the Faculty of Control and Automation, KNRTU',
    title: 'Machine Learning Research Intern',
    period: 'Jan 2024 — Apr 2024',
    place: 'Kazan, Russia',
    points: [
      'Developed machine learning models for anomaly detection on the KDD Cup ’99 dataset for binary and multiclass attack classification.',
      'Designed and optimised ML workflows with feature engineering, hyperparameter tuning, and comparative evaluation against Zeek, Snort and Suricata.',
      'Built an interactive framework for real-time traffic analysis and automated ML lifecycle management using ZenML.',
    ],
  },
];

/* -------------------------------------------------------------- education */

export const education: readonly Study[] = [
  {
    org: 'Moscow Institute of Physics and Technology (MIPT)',
    credential: 'MSc, Advanced Combinatorics',
    period: 'Aug 2025 — Present (expected Aug 2027)',
    place: 'Moscow, Russia',
    notes: [
      'CGPA 4.83 / 5.0',
      'Coursework: probabilistic methods, linear algebra, advanced graph theory, discrete geometry, random graphs.',
    ],
  },
  {
    org: 'Innopolis University',
    credential: 'MSc, Security and Network Engineering',
    period: 'Aug 2024 — Aug 2026',
    place: 'Innopolis, Russia',
    notes: [
      'CGPA 4.95 / 5.0',
      'Thesis: Real-Time Detection and Automated Response for Malicious HTTPS Traffic Using Explainable ML and SOAR Integration.',
    ],
  },
  {
    org: 'Kazan National Research Technological University (KNRTU)',
    credential: 'BSc, Computer Science and Engineering',
    period: 'Sep 2020 — Aug 2024',
    place: 'Kazan, Russia',
    notes: [
      'CGPA 4.67 / 5.0',
      'Bilateral Educational Agreement Scholarship (Russia–Nigeria); tuition-fee exemption from the Ministry of Science and Higher Education of the Russian Federation.',
    ],
  },
];

/* ----------------------------------------------------------- publications */

export const publications: readonly Publication[] = [
  {
    title:
      'Explainable Machine Learning for Effective Malware Detection in Encrypted Network Traffic',
    authors: 'J. C. Okore, I. Womoakor, and I. V. Kotenko',
    venue:
      'IEEE Ural-Siberian Conference on Biomedical Engineering, Radioelectronics and Information Technology (USBEREIT)',
    year: '2026',
    status: 'Conference paper',
    summary: [
      'Proposes a two-tier explainability pipeline for metadata-only encrypted-malware detection: a deterministic always-on tier (EBM / XGBoost contributions) for SOC triage, and an on-demand tier (SHAP / LIME) for forensic investigation.',
      'Reports F1 ≥ 0.9989 across Random Forest, XGBoost and a glass-box EBM, with EBM local explanations about 3.7× faster than SHAP (3.5 ms median).',
      'Shows that SHAP-guided reduction to a nine-feature consensus subset preserves near-perfect accuracy while improving explanation stability.',
    ],
    // TODO(joel): add the DOI / IEEE Xplore link once the proceedings are published.
    links: [],
  },
];

/* ----------------------------------------------------------------- awards */

export const awards: readonly Award[] = [
  {
    title: 'Open Doors Russian Scholarship Project',
    detail: 'Two-time winner — competitive international scholarship for graduate study in Russia.',
    period: '2023, 2024',
  },
  {
    title: 'Innopolis University Full Academic Scholarship',
    detail: 'Full tuition scholarship for the MSc in Security and Network Engineering.',
    period: '2024 — 2026',
  },
  {
    title: 'Ministry of Science and Higher Education of the Russian Federation',
    detail: 'Tuition-fee exemption scholarship throughout undergraduate studies.',
    period: '2019 — 2024',
  },
  {
    title: 'Bilateral Educational Agreement Scholarship',
    detail: 'International scholarship under the Russia–Nigeria bilateral education agreement.',
    period: '2019 — 2024',
  },
];

/* ----------------------------------------------------------- capabilities */

export const capabilities: readonly CapabilityGroup[] = [
  {
    name: 'Languages',
    items: ['Python', 'Bash', 'C / C++', 'JavaScript', 'SQL'],
  },
  {
    name: 'Machine learning',
    items: ['PyTorch', 'scikit-learn', 'XGBoost', 'pandas', 'NumPy', 'SHAP', 'LIME', 'Matplotlib'],
  },
  {
    name: 'Security & systems',
    items: [
      'Network security',
      'Malware analysis',
      'Intrusion detection',
      'Reverse engineering',
      'Digital forensics',
      'Linux systems programming',
    ],
  },
  {
    name: 'Detection & response tooling',
    items: ['Wazuh', 'TheHive', 'Cortex', 'MISP', 'Suricata', 'Zeek', 'Volatility3', 'NFStream'],
  },
  {
    name: 'Infrastructure & observability',
    items: ['Docker', 'Kubernetes', 'Kafka', 'Git', 'CI/CD', 'Prometheus', 'Grafana', 'ELK Stack'],
  },
  {
    name: 'Research methods',
    items: [
      'Explainable AI',
      'Graph-based learning',
      'Network anomaly detection',
      'Statistical learning',
      'Real-time data analytics',
    ],
  },
];

export const spokenLanguages: readonly string[] = ['English — native / fluent', 'Russian — B2'];

/* ------------------------------------------------------------ navigation */

export const nav: readonly Link[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
