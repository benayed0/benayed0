export const personal = {
  name: 'Aziz Ben Ayed',
  title: 'Full-Stack Engineer',
  tagline: 'Building AI-powered products\nand scalable software systems.',
  bio: 'I engineer products that solve real problems — from robust backends and clean APIs to AI-integrated interfaces. I care about the full stack: performance, developer experience, and the end user.',
  locations: [
    { name: 'Tunisia', flag: '🇹🇳' },
    { name: 'France',  flag: '🇫🇷' },
  ],
  remote: true,
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
    title: 'MyPubli AI',
    tech: ['Angular', 'NestJS', 'Python', 'Yjs', 'OpenAI', 'OVH API', 'Grafana'],
    featured: true,
    accent: '#7c3aed',
    live:'https://mypubli.ai',
  },
  {
    id: 2,
    title: 'Dream Time',
    tech: ['Angular', 'NestJS', 'Prisma', 'Neon', 'TypeScript'],
    live: null,
    featured: false,
    accent: '#0891b2',
  },
  {
    id: 3,
    title: 'ParkUp',
    tech: ['Flutter', 'Dart', 'NestJS', 'TypeScript', 'Angular'],
    featured: false,
    accent: '#059669',
    live:'https://parkup-nine.vercel.app'
  },
  {
    id: 4,
    title: 'Loopa',
    tech: ['TypeScript', 'NestJS', 'Angular'],
    live: null,
    featured: false,
    accent: '#d97706',
  },
  {
    id: 5,
    title: 'Landwash',
    tech: ['Flutter', 'Dart', 'NestJS', 'MongoDB', 'Firebase', 'WordPress'],
    featured: false,
    accent: '#0e7490',
    live:'https://landwash-app.vercel.app'
  },
  {
    id: 6,
    title: 'Phonix',
    tech: ['TypeScript', 'NestJS', 'Angular'],
    live: 'https://phonixhealth.com',
    featured: false,
    accent: '#7c3aed',
  },
  {
    id: 7,
    title: 'Touraxi',
    tech: ['Flutter', 'Dart'],
    live: null,
    featured: false,
    accent: '#b45309',
  },
  {
    id: 8,
    title: 'Sensor Sensei',
    tech: ['Next.js', 'TypeScript', 'Firebase', 'Chart.js'],
    live: null,
    featured: false,
    accent: '#0f766e',
  },
  {
    id: 9,
    title: 'Christian Brinck',
    tech: ['TypeScript', 'NestJS', 'Python', 'Whisper', 'AWS S3'],
    featured: false,
    accent: '#475569',
    live:'https://christian-brinck-phd.com'
  },
  {
    id: 10,
    title: 'HCS',
    tech: ['Python', 'WhisperX', 'GPT-4', 'Ollama', 'Docker', 'Angular'],
    live: null,
    featured: false,
    accent: '#be185d',
  },
  {
    id: 11,
    title: 'SIAM',
    tech: ['TypeScript', 'NestJS', 'Angular', 'MongoDB'],
    live: null,
    featured: false,
    accent: '#1d4ed8',
  },
  {
    id: 12,
    title: 'Factunorm',
    tech: ['TypeScript', 'NestJS'],
    featured: false,
    accent: '#4f46e5',
    live:'https://factunorm.pages.dev'
  },
  {
    id: 13,
    title: 'Cashflow',
    tech: ['TypeScript', 'NestJS', 'Angular'],
    featured: false,
    accent: '#15803d',
    live:'http://cashflow-web-amber.vercel.app/'
  },
  {
    id: 14,
    title: 'Quittance',
    tech: ['TypeScript', 'HTML', 'CSS'],
    live: null,
    featured: false,
    accent: '#92400e',
  },
  {
    id: 15,
    title: 'Toopeti',
    tech: ['Python', 'NestJS', 'TypeScript', 'AI', 'FFmpeg'],
    live: null,
    featured: false,
    accent: '#dc2626',
  },
]

export const skills = [
  {
    category: 'Frontend',
    icon: 'Layout',
    items: ['Angular (Signals, SSR)', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Turborepo / Nx', 'Socket.io'],
  },
  {
    category: 'Mobile',
    icon: 'Smartphone',
    items: ['Flutter', 'Dart', 'FCM Push Notifications', 'Google Maps SDK', 'Hive (offline)', 'Geospatial'],
  },
  {
    category: 'Backend',
    icon: 'Server',
    items: ['NestJS', 'Python (FastAPI)', 'PostgreSQL', 'MongoDB', 'Prisma / Mongoose', 'BullMQ + Redis'],
  },
  {
    category: 'AI / ML',
    icon: 'Brain',
    items: ['OpenAI API (GPT-4o)', 'WhisperX', 'Ollama (local LLMs)', 'Speaker Diarization', 'GPU Inference', 'Playwright scraping'],
  },
  {
    category: 'Cloud / DevOps',
    icon: 'Cloud',
    items: ['AWS EC2 / S3 / SDK', 'OVH / Tailscale VPN', 'Grafana + Loki + Prometheus', 'Docker + Nginx', 'Serverless Framework', 'Fly.io / Neon'],
  },
]

export const experience = [
  {
    role: 'Full-Stack Engineer',
    company: 'MyPubli',
    period: '2025 — Present',
    description: 'Building a cloud publishing platform from the ground up — Angular frontend, NestJS API, Python AI pipeline, and automated infrastructure with dynamic subdomain assignment and git-based instance updates.',
    highlights: ['Cloud infrastructure', 'Automated deployment', 'AI pipeline'],
    current: true,
  },
  {
    role: 'Full-Stack Engineer',
    company: 'Phonix Health',
    period: '2020 — 2025',
    description: 'Spent 5 years building and scaling phonixhealth.com — from early-stage development to a production health platform. Delivered the Angular frontend, NestJS API, AI module, GPU inference server, and multiple client projects along the way.',
    highlights: ['Health platform', 'GPU inference', 'Client delivery'],
    current: false,
  },
]
