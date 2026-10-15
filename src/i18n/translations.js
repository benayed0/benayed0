export const translations = {
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      experience: 'Experience',
      contact: 'Contact',
      getInTouch: 'Get in touch',
      available: 'Available',
      openTo: 'Open to opportunities',
    },
    hero: {
      tagline1: 'Full-stack product engineer shipping',
      tagline2: 'production SaaS end to end',
      tagline3: '— web, mobile, payments, and infrastructure.',
      bio: 'I take products from empty repo to real users on my own — API, web and native apps, billing, compliance, and the servers they run on. Lately: a French e-invoicing SaaS used by 160+ businesses and a loyalty platform that lives in Apple & Google Wallet.',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      downloadCV: 'Download CV',
    },
    about: {
      label: 'About',
      heading1: 'Engineer. Builder.',
      heading2: 'Problem solver.',
      sub: "I've spent the last several years building software that people actually use — from internal tools and APIs to full-stack SaaS products and AI integrations.",
      body: 'My approach is grounded in clarity: clean architecture, intentional abstractions, and code that the next engineer can reason about without a guide. I work best in small, focused teams where ownership is high and bureaucracy is low.',
      stats: [
        { value: '6+', label: 'Years of\nexperience' },
        { value: '15+', label: 'Projects\nshipped' },
        { value: '160+', label: 'Businesses on\nFactunorm' },
        { value: '3', label: 'Live SaaS\nproducts' },
      ],
      cards: [
        {
          title: 'Product-minded',
          description: 'I think about users first, systems second. Good software solves real problems.',
        },
        {
          title: 'Full-stack depth',
          description: "Comfortable from database schema to UI animation. No layer is someone else's problem.",
        },
        {
          title: 'AI-native builder',
          description: 'LLMs, embeddings, RAG pipelines — I build AI into products, not demos.',
        },
        {
          title: 'Bias for shipping',
          description: 'Ideas are worthless without execution. I move fast without cutting corners.',
        },
      ],
    },
    projects: {
      label: 'Projects',
      heading1: "Things I've",
      heading2: 'built.',
      allRepos: 'All repositories',
      featured: 'Featured',
      visitLive: 'Visit live site',
      technicalDetails: 'Technical details',
      moreProjects: 'More work',
      status: { inDev: 'In development' },
      items: {
        1: {
          tagline: 'Real-time collaborative AI writing for researchers.',
          snippet: 'AI writing platform for medical researchers. Collaborate in real time on scientific articles — the platform sources references, interprets figures, and generates full sections automatically.',
          technical: 'The Python generation engine selects the optimal LLM per call by token count (gpt-4.1-nano / gpt-4.1 / gpt-4o-mini / gpt-5), with a self-hosted Llama 3.3 70B on EC2 as an air-gapped fallback — all behind a single ask_ai() abstraction. Scientific figures go through a 3-step multi-turn vision pipeline (classify → extract context → quantitative interpretation) with explicit anti-hallucination guards. References chain through PubMed → CrossRef → Google Scholar → concurrent bs4 + Playwright scrapers raced with FIRST_COMPLETED cancellation. Per-article OpenAI spend is attributed to the exact calling function via call-stack introspection, buffered in a thread-safe singleton, and auto-flushed every 60 seconds with re-queue on failure. Article generation runs inside isolated Jupyter kernels; new writing logic ships via hot-swap notebook replacement at zero downtime. Real-time multi-user collaboration via Yjs CRDT. Deployed on Kubernetes with pod topology spread and graceful Yjs WebSocket draining on SIGTERM. Grafana + Loki + Prometheus over a Tailscale VPN mesh. Windows Office COM on a dedicated Windows Server 2022 handles document conversion.',
        },
        2: {
          tagline: 'Premium watch e-commerce for Tunisia, bilingual with RTL.',
          snippet: 'Premium watch e-commerce for the Tunisian market. Shop in French or Arabic with full RTL layout, track your order in real time, and check out as a guest — no account required.',
          technical: 'Turborepo monorepo with 13+ NestJS feature modules (auth, catalog, cart, orders, promotions, reviews, delivery, notifications, analytics). Angular 21 SSR storefront for SEO with bilingual FR/AR and full RTL layout. Guest cart merge with stock-aware conflict resolution on login. Order state machine (PENDING → CONFIRMED → SHIPPED → DELIVERED) with full audit trail and immutable data snapshots at order time. 5-role RBAC, event-driven email queue with delivery state tracking, and a unified S3-compatible storage abstraction (Cloudflare R2 / RustFS) backed by Neon PostgreSQL.',
        },
        4: {
          tagline: 'API-first SaaS with a clean frontend and dedicated marketing site.',
          snippet: 'API-first SaaS with a polished Angular frontend and a dedicated marketing site.',
          technical: 'SaaS product with Angular frontend, NestJS backend, and a dedicated marketing site. Built for scale with a clean API-first architecture.',
        },
        5: {
          tagline: 'On-demand car wash marketplace with real-time slot booking.',
          snippet: 'On-demand car wash booking in Tunisia. Pick a time slot, a team comes to you — with subscriptions, geolocation-based assignment, and real-time availability across multiple teams.',
          technical: 'O(n log n) sweep line algorithm for real-time slot availability across multiple teams, and MongoDB 2dsphere geospatial queries for location-based booking assignment. Dual Firebase projects (client + intern apps) with FCM push notifications. Subscription management with auto-renewal. WordPress shortcode plugin for embedded web booking. Zero-downtime rolling deployments via GitHub Actions with automatic health-check verification and rollback. Resource-budgeted Docker Compose targeting OVH VPS. Rate-limited API with Helmet.js security headers.',
        },
        6: {
          tagline: "Therapists, parents, kids, and doctors — one platform.",
          snippet: "Health platform connecting therapists, parents, children, and doctors. Kids work through gamified emotion challenges, therapists follow progress remotely, and AI verifies each challenge. Built over 5 years; the next version is in development ahead of public launch.",
          technical: "9-service platform serving parents, therapists, kids, and doctors. Multi-tenant architecture with Socket.io real-time updates, a gamification engine, and a GPU inference server that verifies challenge photos with AI. Angular SSR web app with Leaflet and Google Maps, and Node/NestJS APIs with PDFKit report generation. Integrates AWS CloudFront, S3, and Transcribe Streaming; Firebase (FCM, Firestore, RTDB); ElevenLabs speech synthesis; Google Translate; and Stripe payments. GitHub Actions CI/CD with SSH-based rolling EC2 deployments and PM2 process clustering.",
        },
        7: {
          tagline: 'Tunisia in your pocket — transport and tourism, natively mobile.',
          snippet: 'Flutter mobile app for transport and tourism in Tunisia with location-based service discovery.',
          technical: 'Flutter mobile app for tourism and transport in Tunisia. Native mobile experience with location-based service discovery.',
        },
        8: {
          tagline: 'Edge sensor data ingested live and visualized in the browser.',
          snippet: 'Live IoT dashboard for M5Stack sensors. Hardware readings streamed to the browser in real time via Firebase.',
          technical: 'IoT dashboard for M5Stack sensor data. Real-time ingestion via Firebase, visualized with Chart.js in a Next.js app — built for hardware monitoring at the edge.',
        },
        9: {
          tagline: 'Research platform with AI audio transcription, built end-to-end.',
          snippet: 'Research platform for a PhD researcher. Upload audio recordings, get AI-generated transcripts — built and delivered end-to-end as a single engagement.',
          technical: 'Research platform with Angular frontend, NestJS API, Python audio transcription module (Whisper), S3 file storage with presigned URLs, and a JWT email-verification flow — delivered end-to-end as a single engagement.',
        },
        10: {
          tagline: 'AI that scores how well doctors communicate with patients.',
          snippet: 'AI tool that listens to doctor-patient consultations and scores communication quality. Record a session, get a structured clinical assessment across 19 dimensions.',
          technical: 'AI system scoring doctor-patient communication using the Healthcare Communication Scale — 4 clinical patterns (H1–H4), 6+3 behavioural variables, and 19 scoring dimensions. WhisperX diarization on GPU (EC2 g4dn) automatically identifies the doctor\'s voice. Dual LLM support: GPT-4 for cloud inference, local Ollama/Mistral for air-gapped deployments. Angular 17 frontend with real-time status polling and AWS S3 file upload. Runs as an isolated Docker multi-service pipeline (WhisperX, Ollama, and scoring containers).',
        },
        11: {
          tagline: 'Full ERP for logistics — drivers, trucks, and payroll in one place.',
          snippet: 'ERP for a Tunisian logistics company. Manage drivers, trucks, inventory, and payroll — attendance tracked, paychecks generated, invoices exported to PDF.',
          technical: 'Payroll engine computing night-shift multipliers, overtime, and holiday bonuses from raw attendance records. MongoDB aggregation pipelines track vacation earned, used, and remaining per employee. Gate pass and invoice system with auto-generated reference codes, nested document population, and PDF export. Angular 17 standalone components with Material Design, JWT authentication, and role-based route guards.',
        },
        12: {
          tagline: "Compliant French e-invoicing for micro-entrepreneurs — web, iOS & Android.",
          snippet: "E-invoicing SaaS for French freelancers and micro-businesses, ready for the national e-invoicing mandate. Create a compliant invoice in under two minutes — by form, by voice, or by scanning a receipt — on web, iOS, and Android. Used by 160+ businesses.",
          technical: "Generates Factur-X 1.08 EXTENDED (EN 16931 + CIUS-FR) PDF/A-3 invoices with embedded CII XML, validated in CI on every push with Mustang and veraPDF. SIRET numbers are checked in real time against the INSEE SIRENE API, and invoices are transmitted through a certified e-invoicing platform (PA). PostgreSQL Row-Level Security isolates tenants at the database level — a dedicated non-bypass role plus a lint that fails the build on unscoped queries. Legal archives go to Cloudflare R2 under an append-only SHA-256 hash chain, so any tampering is detectable. Billing runs on Stripe (cards and SEPA Direct Debit) on the web and RevenueCat in-app purchases on iOS. Gemini extracts data from scanned purchase receipts. Nx monorepo: NestJS 11 API, Angular SSR, and Capacitor iOS/Android apps with self-hosted over-the-air updates, plus BullMQ/Redis jobs. A multi-agent security audit I ran surfaced 18 findings (2 critical); 16 are fixed.",
        },
        13: {
          tagline: '30-day cash flow forecasting with automatic solvency scoring.',
          snippet: 'Treasury tool for Tunisian SMEs. Track bills of exchange, forecast your cash position 30 days ahead, and know which clients are credit risks at a glance.',
          technical: 'Strict traite (bill-of-exchange) state machine with separate transition tables for client vs. supplier flows — invalid state jumps are impossible. Client solvency recalculates automatically on every state change: a single IMPAYÉE triggers a full scoring pass (VERT / ORANGE / ROUGE). JWT rotation with 15-min access tokens and 7-day refresh with revocation tracking. Multi-tenancy baked in from day one via request-scoped interceptor. Global audit interceptor logs every CREATE/UPDATE/DELETE automatically. 30-day cash flow forecast and daily cron for overdue detection — all amounts in 3-decimal TND precision.',
        },
        14: {
          tagline: 'Generate rental receipts instantly — no server, no signup.',
          snippet: 'Instant rental receipt generator. Fill in the details, download a PDF — runs entirely in the browser, no account needed.',
          technical: 'Lightweight client-side web tool for generating rental receipt PDFs. Fast, printable, and fully browser-side — no backend, no signup.',
        },
        15: {
          tagline: 'Web content in, publish-ready reels out — fully automated.',
          snippet: 'Paste a TikTok link or a topic, get a publish-ready short-form video back. Script, voiceover, footage, and subtitles — fully automated, no timeline editing.',
          technical: 'Playwright scrapes TikTok and web content with anti-detection handling. Whisper-timestamped transcribes audio with word-level timing for frame-accurate subtitle sync. GPT-4o generates short-form scripts with intelligent keyword retry — falls back to broader search terms when specific queries return no usable content. Content relevance filtering skips non-educational material before any expensive API call. ElevenLabs TTS produces the voiceover, Runway ML gen3 generates background footage, and MoviePy composites everything into a publish-ready reel — fully automated.',
        },
        16: {
          tagline: "Digital loyalty cards that live in Apple & Google Wallet.",
          snippet: "Loyalty platform for cafés, shops, and multi-location brands. Customers join by scanning a QR code and get a stamp or points card straight in Apple or Google Wallet — no app to download. Merchants run campaigns, reward regulars, and see who is drifting away.",
          technical: "Issues Apple Wallet (PassKit) and Google Wallet passes with server-rendered stamp strips that update live after every scan, while staying within Google's per-pass notification quota. Stamp and points programs across multiple locations, with time-boxed campaign multipliers (highest wins on overlap). Nx monorepo: NestJS + Prisma/PostgreSQL API, Angular merchant console, Expo cashier app with OTA updates, and an Astro marketing site — translated into English, Polish, and French. CPU-heavy work (image rendering, password hashing, pass signing, PDFs) runs through a lane-based gate with two-tier load shedding, so a 4 GB VPS stays responsive under bursts. Push-to-deploy via a GitHub webhook, systemd, Redis, and Caddy.",
        },
      },
    },
    skills: {
      label: 'Stack',
      heading1: 'Tools of',
      heading2: 'the craft.',
      alsoFamiliarWith: 'Also familiar with:',
      categories: {
        Frontend: 'Frontend',
        Mobile: 'Mobile',
        Backend: 'Backend',
        'AI / ML': 'AI / ML',
        'Cloud / DevOps': 'Cloud / DevOps',
      },
    },
    experience: {
      label: 'Experience',
      heading1: 'The',
      heading2: 'journey.',
      subtitle: 'A condensed view of my professional path — focused on impact and scope rather than titles.',
      current: 'Current',
      items: [
        {
          role: 'Founder & Product Engineer',
          description: 'Designing, building, and running two SaaS products solo. Factunorm: Factur-X e-invoicing used by 160+ French businesses, with web, iOS, and Android apps, Stripe and RevenueCat billing, Postgres Row-Level Security, and tamper-evident archiving. iStampr: a loyalty platform delivering stamp and points cards as Apple and Google Wallet passes, with a merchant console and a cashier app.',
          highlights: ['Factur-X / EN 16931 compliance', 'Postgres RLS multi-tenancy', 'Stripe + RevenueCat billing', 'Apple & Google Wallet passes'],
        },
        {
          role: 'Full-Stack Engineer',
          description: 'Building an AI-powered scientific publishing platform — real-time multi-user editing with Yjs CRDT, a multi-source reference resolver (DOI → CrossRef → PubMed → Scholar → ORCID), OpenAI integration with per-article cost tracking, and fully automated OVH infrastructure with dynamic subdomain assignment and Grafana observability.',
          highlights: ['Yjs CRDT collaboration', 'Multi-source reference resolver', 'Automated infrastructure'],
        },
        {
          role: 'Full-Stack Engineer',
          description: 'Spent 5 years owning the full stack at Phonix Health — built the Angular frontend, NestJS API, AI module, and GPU inference server from the ground up. Delivered multiple AI-heavy client projects on top: a doctor-patient communication scorer (WhisperX + GPT-4), a research platform, and an on-demand car wash marketplace.',
          highlights: ['Multi-tenant health SaaS', 'GPU inference server', 'AI client projects'],
        },
      ],
    },
    contact: {
      label: 'Contact',
      heading1: "Let's build",
      heading2: 'something great.',
      bio: "I'm always open to interesting projects, collaborations, and conversations. Whether you have a specific opportunity or just want to connect — reach out.",
      links: [
        { label: 'Email', description: 'Best for project inquiries' },
        { label: 'LinkedIn', value: 'Aziz Ben Ayed', description: 'Professional background' },
      ],
      responseTime: 'Typical response time:',
      responseValue: '24–48 hours',
    },
    footer: {
      builtWith: 'Built with React & Vite.',
    },
  },

  fr: {
    nav: {
      about: 'À propos',
      projects: 'Projets',
      skills: 'Compétences',
      experience: 'Expérience',
      contact: 'Contact',
      getInTouch: 'Me contacter',
      available: 'Disponible',
      openTo: 'Ouvert aux opportunités',
    },
    hero: {
      tagline1: 'Ingénieur produit full-stack qui livre des',
      tagline2: 'SaaS en production de bout en bout',
      tagline3: '— web, mobile, paiements et infrastructure.',
      bio: "J'emmène seul des produits du dépôt vide jusqu'à de vrais utilisateurs — API, apps web et natives, facturation, conformité et les serveurs qui les font tourner. Récemment : un SaaS de facturation électronique utilisé par plus de 160 entreprises et une plateforme de fidélité intégrée à Apple et Google Wallet.",
      viewProjects: 'Voir les projets',
      contactMe: 'Me contacter',
      downloadCV: 'Télécharger CV',
    },
    about: {
      label: 'À propos',
      heading1: 'Ingénieur. Créateur.',
      heading2: 'Résolveur de problèmes.',
      sub: "J'ai passé ces dernières années à construire des logiciels que les gens utilisent réellement — des outils internes et APIs aux produits SaaS full-stack et intégrations IA.",
      body: "Mon approche est ancrée dans la clarté : une architecture propre, des abstractions intentionnelles et du code sur lequel le prochain ingénieur peut raisonner sans guide. Je travaille mieux dans des équipes petites et concentrées où la responsabilité est élevée et la bureaucratie est faible.",
      stats: [
        { value: '6+', label: "Ans d'\nexpérience" },
        { value: '15+', label: 'Projets\nlivrés' },
        { value: '160+', label: 'Entreprises sur\nFactunorm' },
        { value: '3', label: 'SaaS\nen production' },
      ],
      cards: [
        {
          title: 'Orienté produit',
          description: "Je pense d'abord aux utilisateurs, ensuite aux systèmes. Un bon logiciel résout de vrais problèmes.",
        },
        {
          title: 'Maîtrise full-stack',
          description: "À l'aise du schéma de base de données à l'animation UI. Aucune couche n'est le problème de quelqu'un d'autre.",
        },
        {
          title: 'Développeur IA natif',
          description: "LLMs, embeddings, pipelines RAG — j'intègre l'IA dans les produits, pas dans les démos.",
        },
        {
          title: 'Biais vers la livraison',
          description: "Les idées ne valent rien sans exécution. J'avance vite sans rogner sur la qualité.",
        },
      ],
    },
    projects: {
      label: 'Projets',
      heading1: "Ce que j'ai",
      heading2: 'construit.',
      allRepos: 'Tous les dépôts',
      featured: 'En vedette',
      visitLive: 'Voir le site',
      technicalDetails: 'Détails techniques',
      moreProjects: 'Autres projets',
      status: { inDev: 'En développement' },
      items: {
        1: {
          tagline: "Écriture scientifique collaborative en temps réel, propulsée par l'IA.",
          snippet: "Plateforme d'écriture pour chercheurs médicaux. Collaborez en temps réel sur des articles scientifiques — la plateforme cherche les références, interprète les figures et génère les sections automatiquement.",
          technical: "Le moteur de génération Python sélectionne le LLM optimal à chaque appel selon le nombre de tokens (gpt-4.1-nano / gpt-4.1 / gpt-4o-mini / gpt-5), avec un Llama 3.3 70B auto-hébergé sur EC2 comme fallback local — derrière une unique abstraction ask_ai(). Les figures scientifiques passent par un pipeline de vision en 3 étapes conversationnelles (classification → extraction de contexte → interprétation quantitative) avec gardes anti-hallucination explicites. Les références sont résolues en cascade PubMed → CrossRef → Google Scholar → scrapers bs4 + Playwright en parallèle avec annulation au premier résultat (FIRST_COMPLETED). Le coût OpenAI par article est attribué à la fonction appelante exacte par introspection de la pile d'appels, bufferisé dans un singleton thread-safe et vidé automatiquement toutes les 60 secondes avec re-queue sur échec. La génération s'exécute dans des kernels Jupyter isolés ; la logique d'écriture est déployée par hot-swap de notebook sans interruption. Collaboration multi-utilisateurs en temps réel via Yjs CRDT. Kubernetes avec pod topology spread et vidage gracieux des WebSockets Yjs au SIGTERM. Grafana + Loki + Prometheus via VPN Tailscale. Office COM sur Windows Server 2022 dédié pour la conversion de documents.",
        },
        2: {
          tagline: "E-commerce de montres premium pour la Tunisie, bilingue avec RTL.",
          snippet: "E-commerce de montres premium pour le marché tunisien. Achetez en français ou en arabe avec layout RTL complet, suivez votre commande en temps réel et commandez en invité — sans compte.",
          technical: "Monorepo Turborepo avec 13+ modules NestJS (auth, catalogue, panier, commandes, promotions, avis, livraison, notifications, analytics). Storefront Angular 21 SSR pour le SEO, bilingue FR/AR avec layout RTL complet. Fusion de paniers invités avec résolution de conflits de stock à la connexion. Machine à états des commandes (EN ATTENTE → CONFIRMÉE → EXPÉDIÉE → LIVRÉE) avec audit complet et snapshots immuables. RBAC 5 rôles, file d'emails événementielle avec suivi de livraison, et abstraction de stockage S3-compatible (Cloudflare R2 / RustFS) sur Neon PostgreSQL.",
        },
        4: {
          tagline: "SaaS API-first avec un frontend épuré et un site marketing dédié.",
          snippet: "SaaS API-first avec un frontend Angular épuré et un site marketing dédié.",
          technical: "Produit SaaS avec frontend Angular, backend NestJS et un site marketing dédié. Conçu pour la scalabilité avec une architecture API-first.",
        },
        5: {
          tagline: "Marketplace de lavage auto à la demande avec réservation en temps réel.",
          snippet: "Réservation de lavage auto à la demande en Tunisie. Choisissez un créneau, une équipe se déplace — avec abonnements, assignation géolocalisée et disponibilité en temps réel.",
          technical: "Algorithme de balayage O(n log n) pour la disponibilité des créneaux en temps réel sur plusieurs équipes, et requêtes géospatiales MongoDB 2dsphere pour l'assignation géolocalisée des réservations. Deux projets Firebase distincts (apps client et intervenant) avec notifications FCM. Gestion des abonnements avec renouvellement automatique. Plugin shortcode WordPress pour la réservation web embarquée. Déploiements rolling sans interruption via GitHub Actions avec vérification automatique des health checks et rollback. API limitée en débit avec headers de sécurité Helmet.js.",
        },
        6: {
          tagline: "Thérapeutes, parents, enfants et médecins — une seule plateforme.",
          snippet: "Plateforme de santé reliant thérapeutes, parents, enfants et médecins. Les enfants relèvent des défis émotionnels gamifiés, les thérapeutes suivent leurs progrès à distance et l'IA vérifie chaque défi. Construite sur 5 ans ; la nouvelle version est en développement avant son lancement public.",
          technical: "Plateforme de 9 services pour parents, thérapeutes, enfants et médecins. Architecture multi-tenant avec Socket.io temps réel, moteur de gamification et serveur d'inférence GPU qui vérifie les photos des défis par IA. Application web Angular SSR avec Leaflet et Google Maps, APIs Node/NestJS avec génération de rapports PDFKit. Intègre AWS CloudFront, S3 et Transcribe Streaming ; Firebase (FCM, Firestore, RTDB) ; synthèse vocale ElevenLabs ; Google Translate ; et paiements Stripe. CI/CD GitHub Actions avec déploiements rolling EC2 par SSH et clustering PM2.",
        },
        7: {
          tagline: "La Tunisie dans votre poche — transport et tourisme, nativement mobile.",
          snippet: "Application mobile Flutter pour le transport et le tourisme en Tunisie avec découverte de services basée sur la localisation.",
          technical: "Application mobile Flutter pour le tourisme et le transport en Tunisie. Expérience native épurée avec découverte de services basée sur la localisation.",
        },
        8: {
          tagline: "Données de capteurs ingérées en direct et visualisées dans le navigateur.",
          snippet: "Tableau de bord IoT en direct pour les capteurs M5Stack. Les lectures matérielles sont streamées dans le navigateur en temps réel via Firebase.",
          technical: "Tableau de bord IoT pour les données de capteurs M5Stack. Ingestion en temps réel via Firebase, visualisées avec Chart.js dans une app Next.js — conçu pour la surveillance matérielle en périphérie.",
        },
        9: {
          tagline: "Plateforme de recherche avec transcription audio IA, livrée de bout en bout.",
          snippet: "Plateforme de recherche pour un doctorant. Déposez des enregistrements audio, obtenez des transcriptions générées par IA — livré de bout en bout en mission complète.",
          technical: "Plateforme de recherche avec frontend Angular, API NestJS, module Python de transcription audio (Whisper), stockage S3 avec URLs présignées et workflow de vérification email par JWT — livré de bout en bout en mission complète.",
        },
        10: {
          tagline: "Une IA qui évalue la qualité de communication des médecins avec leurs patients.",
          snippet: "Outil IA qui écoute les consultations médecin-patient et score la qualité de communication. Enregistrez une session, obtenez une évaluation clinique structurée sur 19 dimensions.",
          technical: "Système IA qui score la communication médecin-patient selon le framework HCS — 4 patterns cliniques (H1–H4), 6+3 variables comportementales et 19 dimensions de scoring. La diarisation WhisperX sur GPU (EC2 g4dn) identifie automatiquement la voix du médecin. Support dual LLM : GPT-4 pour l'inférence cloud, Ollama/Mistral local pour les déploiements isolés. Frontend Angular 17 avec polling temps réel et upload S3. Pipeline Docker multi-services isolé (conteneurs WhisperX, Ollama et scoring).",
        },
        11: {
          tagline: "ERP logistique complet — conducteurs, camions et paies au même endroit.",
          snippet: "ERP pour une entreprise logistique tunisienne. Gérez conducteurs, camions, inventaire et paies — présences suivies, bulletins générés, factures exportées en PDF.",
          technical: "Moteur de paie calculant les majorations de nuit, heures supplémentaires et primes de jours fériés à partir des pointages bruts. Pipelines d'agrégation MongoDB pour le suivi des congés acquis, pris et restants par employé. Système de bons de sortie et factures avec codes auto-générés, population de documents imbriqués et export PDF. Composants Angular 17 standalone avec Material Design, authentification JWT et gardes de routes basés sur les rôles.",
        },
        12: {
          tagline: "Facturation électronique conforme pour les micro-entrepreneurs — web, iOS et Android.",
          snippet: "SaaS de facturation électronique pour les indépendants et micro-entreprises français, prêt pour la réforme de la facturation électronique. Une facture conforme en moins de deux minutes — par formulaire, à la voix ou en scannant un justificatif — sur web, iOS et Android. Utilisé par plus de 160 entreprises.",
          technical: "Génère des factures PDF/A-3 Factur-X 1.08 EXTENDED (EN 16931 + CIUS-FR) avec XML CII embarqué, validées en CI à chaque push par Mustang et veraPDF. Les SIRET sont vérifiés en temps réel via l'API INSEE SIRENE, et les factures sont transmises via une plateforme agréée (PA). La Row-Level Security PostgreSQL isole les tenants au niveau de la base — rôle sans contournement dédié et lint qui fait échouer le build sur toute requête non scopée. Les archives légales sont stockées sur Cloudflare R2 sous une chaîne de hachage SHA-256 en ajout seul : toute altération est détectable. Facturation via Stripe (carte et prélèvement SEPA) sur le web et achats intégrés RevenueCat sur iOS. Gemini extrait les données des justificatifs d'achat scannés. Monorepo Nx : API NestJS 11, Angular SSR, apps Capacitor iOS/Android avec mises à jour OTA auto-hébergées, et jobs BullMQ/Redis. Un audit de sécurité multi-agents que j'ai mené a relevé 18 failles (dont 2 critiques) ; 16 sont corrigées.",
        },
        13: {
          tagline: "Prévisions de trésorerie à 30 jours avec scoring de solvabilité automatique.",
          snippet: "Outil de trésorerie pour les PME tunisiennes. Suivez vos traites, projetez votre trésorerie à 30 jours et identifiez vos clients à risque d'un coup d'œil.",
          technical: "Machine à états stricte pour les traites avec des tables de transitions séparées pour les flux clients et fournisseurs — les sauts d'état invalides sont impossibles. La solvabilité client se recalcule automatiquement à chaque changement d'état : un seul IMPAYÉE déclenche un scoring complet (VERT / ORANGE / ROUGE). Rotation JWT avec tokens d'accès de 15 min et refresh de 7 jours avec suivi des révocations. Multi-tenancy intégré dès le départ via intercepteur de requête. Intercepteur d'audit global enregistre automatiquement chaque CREATE/UPDATE/DELETE. Prévisions à 30 jours et cron quotidien de détection des retards — tous les montants en précision 3 décimales pour le dinar.",
        },
        14: {
          tagline: "Générez des quittances de loyer instantanément — sans serveur, sans inscription.",
          snippet: "Générateur de quittances de loyer instantané. Remplissez les champs, téléchargez un PDF — entièrement dans le navigateur, sans compte.",
          technical: "Outil web léger côté client pour générer des quittances de loyer en PDF. Rapide, imprimable et entièrement dans le navigateur — aucun backend, aucune inscription.",
        },
        15: {
          tagline: "Contenu web en entrée, vidéos prêtes à publier en sortie — entièrement automatisé.",
          snippet: "Collez un lien TikTok ou un sujet, obtenez une vidéo courte prête à publier. Script, voix-off, images et sous-titres — entièrement automatisé, sans montage.",
          technical: "Playwright scrape TikTok et le web avec gestion anti-détection. Whisper-timestamped transcrit l'audio avec un timing mot par mot pour une synchronisation des sous-titres précise à l'image. GPT-4o génère des scripts courts avec retry intelligent sur les mots-clés — repli vers des termes plus larges si la recherche spécifique ne retourne rien. Un filtre de pertinence écarte le contenu non éducatif avant tout appel API coûteux. ElevenLabs TTS produit la voix-off, Runway ML gen3 génère la vidéo de fond, MoviePy composite le tout en une vidéo prête à publier — entièrement automatisé.",
        },
        16: {
          tagline: "Des cartes de fidélité qui vivent dans Apple et Google Wallet.",
          snippet: "Plateforme de fidélité pour cafés, commerces et enseignes multi-sites. Le client scanne un QR code et reçoit une carte à tampons ou à points directement dans Apple ou Google Wallet — aucune app à télécharger. Le commerçant lance des campagnes, récompense ses habitués et repère ceux qui décrochent.",
          technical: "Émet des passes Apple Wallet (PassKit) et Google Wallet avec des bandeaux de tampons rendus côté serveur, mis à jour en direct après chaque scan tout en respectant le quota de notifications de Google par passe. Programmes à tampons et à points sur plusieurs établissements, avec campagnes multiplicatrices limitées dans le temps (la plus forte l'emporte en cas de chevauchement). Monorepo Nx : API NestJS + Prisma/PostgreSQL, console commerçant Angular, app caisse Expo avec mises à jour OTA et site marketing Astro — traduits en anglais, polonais et français. Les tâches lourdes (rendu d'images, hachage de mots de passe, signature des passes, PDF) passent par une file à couloirs avec délestage à deux niveaux, pour qu'un VPS de 4 Go reste réactif lors des pics. Déploiement au push via webhook GitHub, systemd, Redis et Caddy.",
        },
      },
    },
    skills: {
      label: 'Stack',
      heading1: 'Outils du',
      heading2: 'métier.',
      alsoFamiliarWith: 'Également familier avec :',
      categories: {
        Frontend: 'Interface',
        Mobile: 'Mobile',
        Backend: 'Serveur',
        'AI / ML': 'IA / ML',
        'Cloud / DevOps': 'Cloud / DevOps',
      },
    },
    experience: {
      label: 'Expérience',
      heading1: 'Le',
      heading2: 'parcours.',
      subtitle: "Un aperçu condensé de mon parcours professionnel — axé sur l'impact et la portée plutôt que sur les titres.",
      current: 'En cours',
      items: [
        {
          role: 'Fondateur & Ingénieur Produit',
          description: "Conception, développement et exploitation de deux produits SaaS en solo. Factunorm : facturation électronique Factur-X utilisée par plus de 160 entreprises françaises, avec apps web, iOS et Android, facturation Stripe et RevenueCat, Row-Level Security PostgreSQL et archivage infalsifiable. iStampr : plateforme de fidélité qui délivre des cartes à tampons et à points sous forme de passes Apple et Google Wallet, avec console commerçant et app caisse.",
          highlights: ['Conformité Factur-X / EN 16931', 'Multi-tenant RLS PostgreSQL', 'Facturation Stripe + RevenueCat', 'Passes Apple & Google Wallet'],
        },
        {
          role: 'Ingénieur Full-Stack',
          description: "Construction d'une plateforme de publication scientifique propulsée par l'IA — édition multi-utilisateurs en temps réel avec Yjs CRDT, résolution de références multi-sources (DOI → CrossRef → PubMed → Scholar → ORCID), intégration OpenAI avec suivi des coûts par article, et infrastructure OVH entièrement automatisée avec assignation dynamique de sous-domaines et observabilité Grafana.",
          highlights: ['Collaboration Yjs CRDT', 'Résolveur de références', 'Infrastructure automatisée'],
        },
        {
          role: 'Ingénieur Full-Stack',
          description: "5 ans à posséder le stack complet chez Phonix Health — construction du frontend Angular, de l'API NestJS, du module IA et du serveur d'inférence GPU de zéro. Livraison de plusieurs projets clients à forte composante IA : un scorer de communication médecin-patient (WhisperX + GPT-4), une plateforme de recherche, et une marketplace de lavage auto à la demande.",
          highlights: ['SaaS santé multi-tenant', "Serveur d'inférence GPU", 'Projets clients IA'],
        },
      ],
    },
    contact: {
      label: 'Contact',
      heading1: 'Construisons',
      heading2: 'quelque chose de grand.',
      bio: "Je suis toujours ouvert aux projets intéressants, aux collaborations et aux conversations. Que vous ayez une opportunité spécifique ou que vous souhaitiez simplement vous connecter — contactez-moi.",
      links: [
        { label: 'Email', description: 'Idéal pour les demandes de projets' },
        { label: 'LinkedIn', value: 'Aziz Ben Ayed', description: 'Parcours professionnel' },
      ],
      responseTime: 'Temps de réponse typique :',
      responseValue: '24–48 heures',
    },
    footer: {
      builtWith: 'Construit avec React & Vite.',
    },
  },
}
