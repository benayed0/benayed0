export const personal = {
  name: 'Aziz Ben Ayed',
  title: 'Full-Stack Engineer',
  tagline: 'Building AI-powered products\nand scalable software systems.',
  bio: 'I engineer products that solve real problems — from robust backends and clean APIs to AI-integrated interfaces. I care about the full stack: performance, developer experience, and the end user.',
  location: 'Tunisia',
  email: 'benayed.aziz.98@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohamed-aziz-ben-ayed-62a018176',
  availableForWork: true,
}

export const stats = [
  { value: '4+', label: 'Years of\nexperience' },
  { value: '20+', label: 'Projects\nshipped' },
  { value: 'Full', label: 'Stack\nengineer' },
  { value: 'AI', label: 'Native\nbuilder' },
]

export const projects = [
  {
    id: 1,
    title: 'Synaptic',
    description: 'AI-native developer platform for building and deploying LLM-powered workflows. Features a visual pipeline builder, real-time observability, and one-click model switching.',
    tech: ['Next.js', 'Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'Redis'],
    live: null,
    featured: true,
    accent: '#7c3aed',
  },
  {
    id: 2,
    title: 'DevFlow',
    description: 'Unified engineering metrics dashboard. Aggregates pull request cycles, deployment frequency, and incident data into actionable team insights.',
    tech: ['React', 'TypeScript', 'Node.js', 'Prisma', 'GitHub API'],
    live: null,
    featured: false,
    accent: '#0891b2',
  },
  {
    id: 3,
    title: 'TalentScan',
    description: 'Resume parsing and candidate ranking engine. Uses NLP to extract structured data from resumes and match candidates against job requirements at scale.',
    tech: ['Python', 'spaCy', 'FastAPI', 'React', 'Docker'],
    live: null,
    featured: false,
    accent: '#059669',
  },
  {
    id: 4,
    title: 'OpenBuild',
    description: 'Open-source project management tool designed for solo engineers and small teams. Kanban, milestones, and GitHub integration built-in.',
    tech: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    live: null,
    featured: false,
    accent: '#d97706',
  },
  {
    id: 5,
    title: 'Infra Pulse',
    description: 'Lightweight infrastructure monitoring agent that streams metrics to a central dashboard. Supports AWS, GCP, and bare metal setups.',
    tech: ['Go', 'Prometheus', 'Grafana', 'Terraform', 'AWS'],
    live: null,
    featured: false,
    accent: '#db2777',
  },
]

export const skills = [
  {
    category: 'Frontend',
    icon: 'Layout',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GraphQL'],
  },
  {
    category: 'Backend',
    icon: 'Server',
    items: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'REST APIs'],
  },
  {
    category: 'AI / ML',
    icon: 'Brain',
    items: ['LangChain', 'OpenAI API', 'Hugging Face', 'Vector DBs', 'RAG', 'Fine-tuning'],
  },
  {
    category: 'Cloud / DevOps',
    icon: 'Cloud',
    items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
  },
]

export const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'Stealth AI Startup',
    period: '2023 — Present',
    description: 'Leading full-stack development of an AI-native SaaS product. Designed the core LLM pipeline, built the developer API, and scaled infrastructure to support rapid growth.',
    highlights: ['LLM pipeline architecture', 'Developer API design', 'Infrastructure scaling'],
    current: true,
  },
  {
    role: 'Software Engineer',
    company: 'Tech Consultancy',
    period: '2021 — 2023',
    description: 'Delivered end-to-end software solutions for B2B clients across fintech and logistics. Owned projects from architecture to production.',
    highlights: ['Full-stack ownership', 'B2B SaaS delivery', 'System architecture'],
    current: false,
  },
  {
    role: 'Software Engineering Intern',
    company: 'SaaS Company',
    period: '2020 — 2021',
    description: 'Built internal tooling and contributed to the core product. Gained hands-on experience with production systems and agile workflows.',
    highlights: ['Internal tooling', 'Production exposure', 'Agile workflows'],
    current: false,
  },
]
