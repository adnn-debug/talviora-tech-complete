export interface LearningResource {
  title: string;
  type: "Documentation" | "Free Course" | "Interactive Lab" | "Book" | "Tutorial";
  url: string;
  isFree: boolean;
}

export interface ProjectIdea {
  level: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  description: string;
  deliverables: string;
}

export interface InterviewConcept {
  question: string;
  coreConcept: string;
}

export interface CatalogueItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  plainLanguageSummary: string;
  description: string;
  purpose: string;
  realWorldApplications: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  prerequisites: string[];
  relatedTech: string[];
  careerRoles: string[];
  industries: string[];
  learningStages: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  recommendedResources: LearningResource[];
  guidedExercises: string[];
  projectIdeas: ProjectIdea[];
  interviewQuestions: InterviewConcept[];
  officialDocsUrl: string;
  pricingNotes: string;
  isFreeOrOpenSource: boolean;
  isAiRelated: boolean;
  sideHustleApplicable: boolean;
  sideHustleUseCases: string[];
  lastReviewedDate: string;
  verificationStatus: "Not independently checked" | "Community Resource" | "Under Review";
}

export interface CatalogueCategory {
  id: string;
  name: string;
  shortName: string;
  iconName: string;
  description: string;
  subcategories: string[];
  relevanceTag: string;
}

export interface PathwayStep {
  step: number;
  technology: string;
  milestone: string;
  projectDeliverable: string;
}

export interface LearningPathway {
  id: string;
  title: string;
  category: string;
  durationWeeks: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  sequence: PathwayStep[];
  starterProject: string;
  capstoneProject: string;
  careerOutcomes: string[];
}

export interface SideHustleService {
  id: string;
  title: string;
  category: string;
  whatItInvolves: string;
  targetClients: string[];
  requiredSkillsAndTools: string[];
  prerequisites: string[];
  starterStartingPoint: string;
  practiceProject: string;
  portfolioEvidence: string[];
  deliveryChecklist: string[];
  commonMistakes: string[];
  clientScoping: string;
  ethicalConsiderations: string;
  pricingConcepts: string;
  clientChannels: string[];
  risksAndLimitations: string;
}

export interface GovernmentCareerPath {
  id: string;
  title: string;
  domain: string;
  recruitingOrganisation: string;
  qualification: string;
  eligibility: string;
  certificationsRecommended: {
    name: string;
    provider: string;
    freePrepUrl: string;
    isExamPaid: boolean;
  }[];
  officialSource: string;
  status: string;
  lastVerified: string;
}

export interface NewsTrendItem {
  id: string;
  headline: string;
  category: string;
  date: string;
  whatHappened: string;
  whyItMatters: string;
  whoShouldCare: string;
  practicalProjectToBuild: string;
  status: "Reference topic";
}

export interface WizardOption {
  id: string;
  label: string;
  description: string;
  tags: string[];
}

export interface WizardQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: WizardOption[];
}

export interface WizardRecommendation {
  id: string;
  title: string;
  category: string;
  fitScore: number;
  whyItFits: string;
  prerequisites: string[];
  learnFirst: string;
  achievableStarterProject: string;
  nextMilestone: string;
  matchedToolIds: string[];
}

export const CATALOGUE_CATEGORIES: CatalogueCategory[] = [
  {
    id: "cat-1",
    name: "Programming Languages",
    shortName: "Languages",
    iconName: "Code2",
    description: "Core algorithmic building blocks across beginner, systems, web, and specialized computing paradigms.",
    subcategories: ["Beginner-Friendly", "Production & Systems", "Specialized & Concurrent"],
    relevanceTag: "Foundational",
  },
  {
    id: "cat-2",
    name: "Frontend Development",
    shortName: "Frontend",
    iconName: "Layout",
    description: "Component architectures, UI frameworks, responsive styling engines, client state, and browser animations.",
    subcategories: ["Frameworks & Metas", "CSS & Styling", "State & Data Fetching", "Testing & Tooling"],
    relevanceTag: "High Demand",
  },
  {
    id: "cat-3",
    name: "Backend Development & APIs",
    shortName: "Backend & APIs",
    iconName: "Server",
    description: "Server-side microservices, REST/GraphQL/gRPC APIs, asynchronous event processing, and security layers.",
    subcategories: ["Runtimes & Frameworks", "API Paradigms", "Auth & Security", "Task Queues & Streaming"],
    relevanceTag: "High Demand",
  },
  {
    id: "cat-4",
    name: "Databases, Storage & Search",
    shortName: "Databases & Storage",
    iconName: "Database",
    description: "Relational engines, NoSQL datastores, vector embeddings indexes, search platforms, and object storage.",
    subcategories: ["Relational SQL", "NoSQL & Document", "Vector & Semantic Search", "ORMs & Migrations"],
    relevanceTag: "Critical Infrastructure",
  },
  {
    id: "cat-5",
    name: "Artificial Intelligence, Machine Learning & Generative AI",
    shortName: "AI, ML & GenAI",
    iconName: "Cpu",
    description: "Foundational ML, deep learning tensors, LLM APIs, vector RAG orchestration, AI agents, and model serving.",
    subcategories: ["Data Science & ML Math", "Deep Learning & Tensors", "LLM APIs & Tool Calling", "Orchestration & Agents"],
    relevanceTag: "Peak Industry Demand",
  },
  {
    id: "cat-6",
    name: "Mobile Application Development",
    shortName: "Mobile Apps",
    iconName: "Smartphone",
    description: "Native iOS/Android frameworks, cross-platform app ecosystems, mobile backend-as-a-service, and store pipelines.",
    subcategories: ["Native iOS & Android", "Cross-Platform", "Mobile Backend & Auth", "Testing & Store Distribution"],
    relevanceTag: "Consumer Reach",
  },
  {
    id: "cat-7",
    name: "UI/UX & Creative Technology",
    shortName: "UI/UX & Creative",
    iconName: "Palette",
    description: "Interface prototyping, design tokens, design systems, 3D WebGL scenes, and human-computer interaction.",
    subcategories: ["Design & Prototyping", "Design Systems", "3D & Creative Web", "UX Research"],
    relevanceTag: "Product Excellence",
  },
  {
    id: "cat-8",
    name: "Cloud Computing, DevOps & Deployment",
    shortName: "Cloud & DevOps",
    iconName: "Cloud",
    description: "Container virtualization, Kubernetes orchestration, infrastructure-as-code, CI/CD, and edge computing.",
    subcategories: ["Cloud Providers", "Containers & Orchestration", "CI/CD & IaC", "Observability & SRE"],
    relevanceTag: "Enterprise Scale",
  },
  {
    id: "cat-9",
    name: "Cybersecurity & Ethical Security Testing",
    shortName: "Cybersecurity",
    iconName: "ShieldAlert",
    description: "Defensive perimeter hardening, penetration testing labs, OWASP vulnerability scanning, and IAM governance.",
    subcategories: ["Network & Packet Analysis", "Web App Security", "Identity & Access Control", "DevSecOps"],
    relevanceTag: "Critical Resilience",
  },
  {
    id: "cat-10",
    name: "Data Science, Analytics & Business Intelligence",
    shortName: "Data & BI",
    iconName: "BarChart3",
    description: "Statistical inference, data wrangling pipelines, interactive BI dashboards, ETL workflows, and reporting.",
    subcategories: ["Data Wrangling", "BI Dashboards & Viz", "Data Warehousing & ETL", "Analytics Engineering"],
    relevanceTag: "Executive Value",
  },
  {
    id: "cat-11",
    name: "Game Development, AR/VR & Interactive Worlds",
    shortName: "Game Dev & Spatial",
    iconName: "Gamepad2",
    description: "Real-time physics engines, 3D mesh rendering, spatial computing headsets, and shader programming.",
    subcategories: ["Game Engines", "Spatial AR/VR", "Shaders & Rendering", "Audio & Physics"],
    relevanceTag: "Interactive Media",
  },
  {
    id: "cat-12",
    name: "Hardware, Robotics & IoT",
    shortName: "Hardware & IoT",
    iconName: "Radio",
    description: "Microcontroller logic, sensor telemetry, real-time operating systems, MQTT brokers, and robotics stacks.",
    subcategories: ["Microcontrollers & SBCs", "Sensors & Telemetry", "Robotics & Actuators", "PCB & Electronics"],
    relevanceTag: "Physical Computing",
  },
  {
    id: "cat-13",
    name: "No-Code, Low-Code & AI Development",
    shortName: "No-Code & AI Dev",
    iconName: "Sparkles",
    description: "Visual logic builders, workflow automation, AI code editors, and rapid prototype creation platforms.",
    subcategories: ["AI Code Accelerators", "Workflow Automation", "Visual App Builders", "Internal Tools"],
    relevanceTag: "Rapid Prototyping",
  },
  {
    id: "cat-14",
    name: "Developer & Collaboration Tools",
    shortName: "Dev Tools",
    iconName: "Terminal",
    description: "Version control branching, static code analysis, code review standards, issue tracking, and developer productivity.",
    subcategories: ["Version Control", "IDEs & Editors", "Code Quality & Linting", "Team Collaboration"],
    relevanceTag: "Daily Workflow",
  },
  {
    id: "cat-15",
    name: "Technology Side Hustles & Independent Services",
    shortName: "Tech Side Hustles",
    iconName: "Briefcase",
    description: "Commercial client offerings: automated workflows, high-converting web apps, technical audits, and digital tools.",
    subcategories: ["Web & App Services", "AI & Automation", "Audits & Technical Consulting", "Digital Products & Micro-SaaS"],
    relevanceTag: "Freelance & Consulting",
  },
  {
    id: "cat-16",
    name: "Software Engineering & Architecture",
    shortName: "Architecture & DSA",
    iconName: "Workflow",
    description: "System design tradeoffs, distributed state, concurrency models, SOLID patterns, and software reliability.",
    subcategories: ["Algorithmic Patterns", "Design Patterns & SOLID", "Distributed System Design", "Testing & Debt Management"],
    relevanceTag: "Staff / Principal Level",
  },
  {
    id: "cat-17",
    name: "Government Technology Careers & Certifications",
    shortName: "GovTech & Certs",
    iconName: "GraduationCap",
    description: "Public-sector technology infrastructure, civic software initiatives, research apprenticeships, and credentials.",
    subcategories: ["Public-Sector IT Pathways", "Cloud Vendor Certifications", "Security Credentials", "Civic Tech Initiatives"],
    relevanceTag: "Public Service & Trust",
  },
  {
    id: "cat-18",
    name: "Technology News, Emerging Tools & Demand Intelligence",
    shortName: "News & Trends",
    iconName: "Flame",
    description: "Dated industry breakthroughs, architectural shifts, benchmark releases, and practical learner project ideas.",
    subcategories: ["AI Architecture Shifts", "Ecosystem Releases", "Market Demand Intelligence", "Open-Source Milestones"],
    relevanceTag: "Forward Looking",
  },
];

export const CATALOGUE_ITEMS: CatalogueItem[] = [
  // ==========================================
  // CAT 1: PROGRAMMING LANGUAGES
  // ==========================================
  {
    id: "lang-python",
    name: "Python 3.12+",
    category: "Programming Languages",
    subcategory: "Beginner-Friendly",
    plainLanguageSummary: "A readable, general-purpose language with an extensive standard library, dominating AI, data science, and web scripting.",
    description: "High-level dynamically typed language featuring concise syntax, comprehensive package ecosystem (PyPI), asynchronous I/O (asyncio), and first-class integration with machine learning C/CUDA runtimes.",
    purpose: "Machine learning, statistical analysis, backend APIs, automation scripting, and scientific computing.",
    realWorldApplications: ["YouTube backend services", "PyTorch machine learning pipelines", "Instagram Django web tier", "NASA scientific modeling"],
    difficulty: "Beginner",
    prerequisites: ["Basic computer literacy", "Understanding of file directories"],
    relatedTech: ["FastAPI", "PyTorch", "NumPy", "Django"],
    careerRoles: ["AI/ML Engineer", "Backend Developer", "Data Scientist", "DevOps Engineer"],
    industries: ["Artificial Intelligence", "Finance & FinTech", "Healthcare", "Aerospace"],
    learningStages: {
      beginner: "Variables, conditions, loops, functions, lists, dicts, file I/O, virtual environments (venv).",
      intermediate: "Object-oriented classes, exceptions, decorators, generators, list comprehensions, type hints (mypy), asyncio.",
      advanced: "Metaclasses, C-extensions, GIL mechanics, memory profiling, multiprocessing, custom async event loops.",
    },
    recommendedResources: [
      { title: "Python Official Docs & Tutorial", type: "Documentation", url: "https://docs.python.org/3/tutorial/", isFree: true },
      { title: "Automate the Boring Stuff with Python", type: "Free Course", url: "https://automatetheboringstuff.com/", isFree: true },
    ],
    guidedExercises: [
      "Write a CLI tool that parses CSV financial transactions and computes category monthly totals.",
      "Build a multi-threaded web scraper respecting robots.txt and saving data as JSON.",
      "Implement an asynchronous health checker for 20 HTTP endpoints using httpx and asyncio.gather.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "CLI Personal Expense Tracker",
        description: "Terminal-based expense manager with category breakdown, budget threshold alerts, and file persistence.",
        deliverables: "Modular Python script, README with setup instructions, and sample CSV data.",
      },
      {
        level: "Intermediate",
        title: "Asynchronous Stock Price Notifier",
        description: "Background daemon fetching live financial market quotes, checking custom alert thresholds, and dispatching webhook alerts.",
        deliverables: "Async Python service with SQLite cache and Discord/Slack webhook dispatch.",
      },
      {
        level: "Advanced",
        title: "Custom Mini ASGI Web Framework",
        description: "Micro-framework implementing the ASGI 3.0 specification from scratch with routing, middleware, and JSON parsing.",
        deliverables: "Clean zero-dependency ASGI core verified against Uvicorn with benchmark report.",
      },
    ],
    interviewQuestions: [
      { question: "Explain the Global Interpreter Lock (GIL) and how it affects CPU-bound vs I/O-bound concurrency.", coreConcept: "GIL locks single-thread execution per bytecode instruction; use multiprocessing for CPU, asyncio for I/O." },
      { question: "What is the difference between deepcopy and shallow copy in Python?", coreConcept: "Shallow copy copies reference pointers of nested objects; deepcopy recursively duplicates all child objects." },
    ],
    officialDocsUrl: "https://docs.python.org/3/",
    pricingNotes: "100% Free and Open-Source (PSF License).",
    isFreeOrOpenSource: true,
    isAiRelated: true,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Custom web scrapers", "Automated Excel/PDF document batch processing", "Micro-SaaS backend APIs"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
  {
    id: "lang-typescript",
    name: "TypeScript 5.x",
    category: "Programming Languages",
    subcategory: "Production & Systems",
    plainLanguageSummary: "JavaScript with compile-time type safety, preventing common runtime bugs and enabling safe refactoring at scale.",
    description: "A typed superset of JavaScript that compiles to plain JavaScript. Provides static type analysis, generic type parameters, discriminated unions, template literal types, and full IDE autocompletion.",
    purpose: "Building robust, maintainable full-stack web applications, microservices, and enterprise web user interfaces.",
    realWorldApplications: ["Next.js web applications", "Slack desktop app", "Visual Studio Code editor", "Stripe API SDKs"],
    difficulty: "Intermediate",
    prerequisites: ["Modern JavaScript (ES6+)", "Functions & Closures", "Asynchronous Promises"],
    relatedTech: ["JavaScript", "React", "Next.js", "Node.js", "Zod"],
    careerRoles: ["Full-Stack Engineer", "Frontend Specialist", "Node.js Backend Developer"],
    industries: ["Enterprise SaaS", "Consumer Web", "FinTech", "E-Commerce"],
    learningStages: {
      beginner: "Primitive types, interfaces, type aliases, union types, function signatures, compiler configuration (tsconfig.json).",
      intermediate: "Generics, narrowing, keyof/typeof, discriminated unions, utility types (Partial, Pick, Omit), mapped types.",
      advanced: "Conditional types, infer keyword, template literal types, branded nominal types, compiler AST plugins.",
    },
    recommendedResources: [
      { title: "TypeScript Official Handbook", type: "Documentation", url: "https://www.typescriptlang.org/docs/handbook/intro.html", isFree: true },
      { title: "Total TypeScript Tutorials by Matt Pocock", type: "Tutorial", url: "https://www.totaltypescript.com/tutorials", isFree: true },
    ],
    guidedExercises: [
      "Convert a 200-line vanilla JS API client into strictly typed TypeScript with zero 'any' keywords.",
      "Create a generic Result<T, E> type with type-safe ok() and err() unwrap helpers.",
      "Implement a type-safe event emitter where event payloads are mapped through a single generic interface.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Strictly Typed Task Matrix",
        description: "Kanban board state management model strictly enforcing task statuses and mutation contracts.",
        deliverables: "TypeScript codebase with tsconfig strict mode enabled and 100% type coverage.",
      },
      {
        level: "Intermediate",
        title: "Type-Safe REST API SDK Generator",
        description: "Library that takes an OpenAPI 3.1 schema and generates fully typed client methods with runtime Zod validation.",
        deliverables: "NPM-publishable package with Jest/Vitest test suite.",
      },
      {
        level: "Advanced",
        title: "Type-Level SQL Query Validator",
        description: "TypeScript type utilities that parse raw SQL string literals at compile time and output inferred table types.",
        deliverables: "TypeScript playground demonstrating compile-time SQL syntax checking using template literal types.",
      },
    ],
    interviewQuestions: [
      { question: "What is the difference between an Interface and a Type Alias in modern TypeScript?", coreConcept: "Interfaces can be declaration merged and represent object structures; types can define unions, primitives, and mapped types." },
      { question: "Explain discriminated unions and how type narrowing operates on them.", coreConcept: "Objects sharing a common literal property allowing switch/if statements to exhaustively narrow types." },
    ],
    officialDocsUrl: "https://www.typescriptlang.org/",
    pricingNotes: "100% Free and Open-Source (Apache 2.0 License).",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Next.js client portals", "Custom Shopify integrations", "Tailored CRM frontend widgets"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
  {
    id: "lang-go",
    name: "Go (Golang) 1.23+",
    category: "Programming Languages",
    subcategory: "Production & Systems",
    plainLanguageSummary: "A compiled, minimalist language built by Google for ultra-fast, concurrent network microservices and cloud infrastructure.",
    description: "Statically typed compiled language with lightweight goroutines, channel-based communication (CSP), lightning-fast compilation, and a lean standard library designed for cloud-native infrastructure.",
    purpose: "Cloud orchestration tools, distributed backends, streaming gateways, microservices, and network proxies.",
    realWorldApplications: ["Docker & Kubernetes runtime", "Terraform engine", "Uber distributed dispatch systems", "Cloudflare edge proxies"],
    difficulty: "Intermediate",
    prerequisites: ["Understanding of pointers & memory", "Basic client-server networking"],
    relatedTech: ["Docker", "Kubernetes", "gRPC", "PostgreSQL"],
    careerRoles: ["Cloud Infrastructure Engineer", "Backend Systems Engineer", "DevOps Engineer"],
    industries: ["Cloud Providers", "FinTech", "High-Frequency Data", "Cybersecurity"],
    learningStages: {
      beginner: "Packages, variables, structs, pointers, slices, maps, error handling without exceptions.",
      intermediate: "Goroutines, channels, sync package (WaitGroup, Mutex), context package, interfaces, unit tests.",
      advanced: "Memory allocation & escape analysis, pprof performance profiling, atomic operations, custom network protocols.",
    },
    recommendedResources: [
      { title: "A Tour of Go", type: "Interactive Lab", url: "https://go.dev/tour/", isFree: true },
      { title: "Go by Example", type: "Tutorial", url: "https://gobyexample.com/", isFree: true },
    ],
    guidedExercises: [
      "Implement a rate-limited concurrent web scraper using buffered channels and sync.WaitGroup.",
      "Build a TCP proxy server in under 150 lines that forwards traffic and logs request byte metrics.",
      "Write a RESTful microservice with Graceful Shutdown using context.WithTimeout.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "CLI HTTP Benchmark Tool",
        description: "Concurrent URL pinger outputting p50, p95, and p99 latency percentiles.",
        deliverables: "Cross-compiled standalone binary for Linux/macOS/Windows.",
      },
      {
        level: "Intermediate",
        title: "Distributed KV Store with Raft Consensus",
        description: "Lightweight in-memory key-value store with leader election and log replication across 3 nodes.",
        deliverables: "Working multi-node Go service tested under simulated node partition.",
      },
      {
        level: "Advanced",
        title: "High-Throughput WebSocket Broadcast Gateway",
        description: "Streaming server sustaining 50,000 concurrent client connections with epoll/kqueue optimization.",
        deliverables: "Go daemon with Grafana metrics dashboard and load test harness.",
      },
    ],
    interviewQuestions: [
      { question: "How does a Goroutine differ from an operating system thread?", coreConcept: "Goroutines have ~2KB starting stack and are scheduled in user space by Go runtime; OS threads use ~1MB kernel space." },
      { question: "Explain the purpose of context.Context in backend request handling.", coreConcept: "Propagates deadlines, cancellation signals, and request-scoped values across API boundaries and goroutines." },
    ],
    officialDocsUrl: "https://go.dev/",
    pricingNotes: "100% Free and Open-Source (BSD 3-Clause).",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["High-speed webhook handlers", "Lightweight micro-SaaS background workers", "Custom ETL sync engines"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
  {
    id: "lang-rust",
    name: "Rust 2024 Edition",
    category: "Programming Languages",
    subcategory: "Specialized & Concurrent",
    plainLanguageSummary: "A systems language providing C++ speed with compile-time memory safety, eliminating segmentation faults and data races.",
    description: "Systems programming language featuring affine type ownership semantics, borrow checking, zero-cost abstractions, fearless concurrency, and WebAssembly compilation target.",
    purpose: "Operating systems, game engines, cryptographic engines, high-performance web tooling, and blockchain protocols.",
    realWorldApplications: ["Linux Kernel modules", "Turbopack bundler in Next.js", "Discord message caching", "Figma WebAssembly canvas engine"],
    difficulty: "Advanced",
    prerequisites: ["Strong familiarity with at least one programming language", "Stack vs Heap memory concepts"],
    relatedTech: ["C++", "WebAssembly", "Tokio", "Solidity"],
    careerRoles: ["Systems Architect", "Rust Core Developer", "Security Engineer", "WebAssembly Specialist"],
    industries: ["Infrastructure Tooling", "Cryptography", "Defense & Aerospace", "Operating Systems"],
    learningStages: {
      beginner: "Cargo setup, primitives, ownership, borrowing rules, references, slices, match pattern matching.",
      intermediate: "Structs, traits, generics, lifetimes ('a), Option/Result error handling, iterators, closures.",
      advanced: "Unsafe Rust, raw pointers, custom allocators, Tokio async runtime, macros (declarative & procedural), FFI with C.",
    },
    recommendedResources: [
      { title: "The Rust Programming Language (The Book)", type: "Book", url: "https://doc.rust-lang.org/book/", isFree: true },
      { title: "Rustlings Interactive Practice", type: "Interactive Lab", url: "https://github.com/rust-lang/rustlings", isFree: true },
    ],
    guidedExercises: [
      "Implement a singly linked list from scratch understanding Box<Node> and Option mechanics.",
      "Write a multi-threaded image thumbnail generator using rayon crate.",
      "Build a zero-allocation JSON parser using nom or winnow combinators.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Fast Markdown to HTML CLI Converter",
        description: "Zero-dependency parser transforming markdown syntax into sanitized HTML.",
        deliverables: "Tested Cargo crate with benchmark comparisons against Python scripts.",
      },
      {
        level: "Intermediate",
        title: "Async Redis Protocol Parser & Server",
        description: "In-memory cache speaking the official RESP (Redis Serialization Protocol) with Tokio async.",
        deliverables: "Working Redis-compatible server tested with standard redis-cli client.",
      },
      {
        level: "Advanced",
        title: "Wasm-Powered In-Browser Vector Engine",
        description: "SIMD-accelerated cosine similarity search engine compiled to WebAssembly running inside browser tabs.",
        deliverables: "Rust crate + WebAssembly glue code indexing 50,000 384-dimensional vectors under 5ms.",
      },
    ],
    interviewQuestions: [
      { question: "Explain the Ownership and Borrowing rules in Rust.", coreConcept: "Each value has one owner; you can have either one mutable reference or multiple immutable references, never both." },
      { question: "What is the difference between Box<T>, Rc<T>, and Arc<T>?", coreConcept: "Box is unique heap allocation; Rc is single-threaded reference counting; Arc is atomic thread-safe reference counting." },
    ],
    officialDocsUrl: "https://www.rust-lang.org/",
    pricingNotes: "100% Free and Open-Source (MIT / Apache 2.0).",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: false,
    sideHustleUseCases: ["High-speed CLI developer utilities", "Cryptographic verification plugins", "WebAssembly graphics modules"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
  {
    id: "lang-sql",
    name: "Modern SQL & Relational Algebra",
    category: "Programming Languages",
    subcategory: "Beginner-Friendly",
    plainLanguageSummary: "The universal declarative language used to query, filter, aggregate, and structure data in relational database systems.",
    description: "Standard ANSI declarative querying language covering DDL, DML, relational joins, subqueries, Common Table Expressions (CTEs), window functions, and transaction control.",
    purpose: "Querying, transforming, aggregating, and joining data across relational databases and analytics data warehouses.",
    realWorldApplications: ["Financial ledger reconciliation", "Business intelligence reporting", "User analytics cohorts", "Multi-tenant SaaS databases"],
    difficulty: "Beginner",
    prerequisites: ["Basic logic and spreadsheet understanding"],
    relatedTech: ["PostgreSQL", "MySQL", "SQLite", "dbt", "Prisma"],
    careerRoles: ["Data Analyst", "Backend Engineer", "Data Engineer", "Business Intelligence Specialist"],
    industries: ["All Tech Sectors", "Banking", "Healthcare", "Supply Chain"],
    learningStages: {
      beginner: "SELECT, WHERE, ORDER BY, GROUP BY, HAVING, aggregate functions (COUNT, SUM, AVG), INNER/LEFT JOIN.",
      intermediate: "Subqueries, Common Table Expressions (WITH clauses), Window functions (ROW_NUMBER, RANK, LAG/LEAD), indexes.",
      advanced: "Recursive CTEs, EXPLAIN ANALYZE execution plans, B-Tree vs Hash index optimization, transaction isolation levels.",
    },
    recommendedResources: [
      { title: "Mode Analytics Interactive SQL Tutorial", type: "Tutorial", url: "https://mode.com/sql-tutorial/", isFree: true },
      { title: "Use The Index, Luke (SQL Indexing Guide)", type: "Book", url: "https://use-the-index-luke.com/", isFree: true },
    ],
    guidedExercises: [
      "Write a query calculating the 7-day rolling average of user signups using window functions.",
      "Reconstruct an organizational hierarchy tree using a recursive Common Table Expression (CTE).",
      "Analyze a slow JOIN query using EXPLAIN ANALYZE and add a composite index that cuts query time by 90%.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "E-Commerce Customer Metrics Report",
        description: "Set of analytical queries computing repeat customer purchase rate, average order value, and top categories.",
        deliverables: "Structured SQL script with test dataset and clear commentary.",
      },
      {
        level: "Intermediate",
        title: "Subscription Churn Cohort Matrix",
        description: "Complex query generating month-over-month retention cohorts for a SaaS business model.",
        deliverables: "SQL script tested on PostgreSQL with documented performance benchmarks.",
      },
      {
        level: "Advanced",
        title: "High-Volume Multi-Tenant Audit Log System",
        description: "Database partitioning strategy by month with automated partition creation and indexing.",
        deliverables: "PostgreSQL DDL schema and migration script with load-test query verification.",
      },
    ],
    interviewQuestions: [
      { question: "What is the difference between WHERE and HAVING in SQL?", coreConcept: "WHERE filters rows before aggregation; HAVING filters groups after GROUP BY aggregation." },
      { question: "Explain the difference between a Clustered and Non-Clustered index.", coreConcept: "Clustered index defines the physical order of table data (1 per table); non-clustered is a separate B-Tree pointing to data rows." },
    ],
    officialDocsUrl: "https://www.postgresql.org/docs/current/tutorial-sql.html",
    pricingNotes: "Open Standard specification. Free database implementations available.",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Database cleanup & migration scripts", "Custom executive dashboard queries", "Data warehouse modeling"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 2: FRONTEND DEVELOPMENT
  // ==========================================
  {
    id: "front-react",
    name: "React 19 & Next.js App Router",
    category: "Frontend Development",
    subcategory: "Frameworks & Metas",
    plainLanguageSummary: "The dominant UI ecosystem for component-driven web interfaces, blending server rendering, streaming, and client reactivity.",
    description: "Component-based declarative library with modern React Server Components (RSC), Actions, use() hook, suspense streaming, and App Router architecture powering performant web applications.",
    purpose: "Building responsive, modern, search-engine optimized web applications and interactive software interfaces.",
    realWorldApplications: ["TALVIORA TECH platform", "Netflix streaming interface", "Airbnb web application", "Stripe customer dashboard"],
    difficulty: "Intermediate",
    prerequisites: ["HTML & CSS", "Modern JavaScript (Destructuring, Array methods, Async/Await)", "TypeScript basics"],
    relatedTech: ["TypeScript", "Tailwind CSS", "Zustand", "TanStack Query"],
    careerRoles: ["Frontend Engineer", "Full-Stack Developer", "UI Systems Architect"],
    industries: ["SaaS", "E-Commerce", "Media & Streaming", "FinTech"],
    learningStages: {
      beginner: "JSX syntax, components, props, useState, useEffect, conditional rendering, list keys.",
      intermediate: "Custom hooks, useMemo/useCallback optimization, Context API, React Server Components vs Client Components, Suspense.",
      advanced: "Server Actions, optimistic updates (useOptimistic), transition scheduling, hydration internals, custom renderer engines.",
    },
    recommendedResources: [
      { title: "React Official Docs (react.dev)", type: "Documentation", url: "https://react.dev/", isFree: true },
      { title: "Next.js Official Documentation & Learn Course", type: "Free Course", url: "https://nextjs.org/learn", isFree: true },
    ],
    guidedExercises: [
      "Build a searchable product filter table with URL query state synchronization without full page reloads.",
      "Implement an optimistic comment submission interface with rollback on simulated network error.",
      "Profile and fix 3 unnecessary re-renders in a complex form using React DevTools Profiler.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Interactive Habit Tracker UI",
        description: "Responsive weekly habit grid with local storage persistence and streak computation.",
        deliverables: "React 19 application with modular components and clean responsive CSS.",
      },
      {
        level: "Intermediate",
        title: "Real-Time Collaborative Notes App",
        description: "Multi-page markdown editor with autosave, dark/light theme toggle, and search filter.",
        deliverables: "Next.js App Router project deployed to Vercel with responsive design.",
      },
      {
        level: "Advanced",
        title: "AI Canvas Interface with Streaming Text",
        description: "Infinite workspace canvas with generative node creation and Server-Sent Event (SSE) token streaming.",
        deliverables: "Production Next.js application with Tailwind CSS, custom canvas engine, and clean error boundaries.",
      },
    ],
    interviewQuestions: [
      { question: "What is the key difference between React Server Components (RSC) and Client Components?", coreConcept: "RSC execute solely on the server, send zero JS bundle to the browser, and can query databases directly; Client components hydrate in the browser." },
      { question: "How does React reconcile virtual DOM diffs and why are keys important in lists?", coreConcept: "Keys provide stable identities across renders; without them React may mutate wrong DOM nodes during re-ordering." },
    ],
    officialDocsUrl: "https://react.dev/",
    pricingNotes: "100% Free and Open-Source (MIT License).",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["SaaS landing pages", "Customer account portals", "Interactive ROI calculators for SMBs"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
  {
    id: "front-tailwind",
    name: "Tailwind CSS v4",
    category: "Frontend Development",
    subcategory: "CSS & Styling",
    plainLanguageSummary: "A utility-first CSS framework allowing rapid, consistent UI development directly in your markup without context switching.",
    description: "High-performance CSS engine using design tokens, CSS custom properties, responsive breakpoints, pseudo-classes, and a zero-runtime CSS compiler for instant styling.",
    purpose: "Crafting beautiful, accessible, responsive design systems and application interfaces rapidly.",
    realWorldApplications: ["GitHub UI elements", "OpenAI ChatGPT interface", "Shopify developer docs", "Vercel website"],
    difficulty: "Beginner",
    prerequisites: ["Basic CSS box model, flexbox, and grid understanding"],
    relatedTech: ["React", "HTML5", "shadcn/ui", "CSS Modules"],
    careerRoles: ["Frontend Developer", "UI/UX Engineer", "Web Designer"],
    industries: ["All Web Industries", "Marketing & Agency", "SaaS Startups"],
    learningStages: {
      beginner: "Utility classes for padding, margin, flexbox, grid, typography, colors, borders.",
      intermediate: "Responsive modifiers (sm, md, lg), state variants (hover, focus, disabled, dark), arbitrary values, @apply.",
      advanced: "Configuring custom design systems, CSS variables integration, container queries, custom plugin creation.",
    },
    recommendedResources: [
      { title: "Tailwind CSS Official Documentation", type: "Documentation", url: "https://tailwindcss.com/docs", isFree: true },
    ],
    guidedExercises: [
      "Recreate an Airbnb listing card with responsive image aspect ratio, badges, and rating stars using only Tailwind.",
      "Build a fully responsive navigation bar with mobile slide-in drawer using pure Tailwind classes.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "SaaS Pricing Comparison Matrix",
        description: "Three-tier pricing table with highlighted popular plan, monthly/annual toggle, and feature checklists.",
        deliverables: "Responsive single page UI matching accessibility color contrast requirements.",
      },
      {
        level: "Intermediate",
        title: "Design System Component Showcase",
        description: "Custom UI library including buttons, alerts, badges, modals, and tooltips using unified design tokens.",
        deliverables: "Interactive Storybook or Next.js preview page showcasing all states.",
      },
    ],
    interviewQuestions: [
      { question: "What are the advantages of utility-first CSS over traditional BEM CSS classes?", coreConcept: "No naming cognitive load, styles scale with zero bundle size explosion, consistent constrained design tokens." },
    ],
    officialDocsUrl: "https://tailwindcss.com/",
    pricingNotes: "100% Free and Open-Source (MIT License).",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["High-speed client landing pages", "Tailwind UI template kits", "Agency client redesigns"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 3: BACKEND DEVELOPMENT & APIS
  // ==========================================
  {
    id: "back-fastapi",
    name: "FastAPI & Pydantic v2",
    category: "Backend Development & APIs",
    subcategory: "Runtimes & Frameworks",
    plainLanguageSummary: "A modern, high-speed Python web framework designed for building RESTful microservices and AI model inference endpoints.",
    description: "ASGI-compliant Python web framework leveraging standard type hints, Starlette for HTTP routing, Pydantic v2 (compiled with Rust) for schema validation, and automatic OpenAPI / Swagger documentation generation.",
    purpose: "Building low-latency Python backend APIs, AI inference wrappers, microservices, and webhook ingest pipelines.",
    realWorldApplications: ["Uber internal ML platform", "Microsoft AI microservices", "Netflix recommendation APIs", "TALVIORA TECH backend routes"],
    difficulty: "Intermediate",
    prerequisites: ["Python 3.10+ typing", "Async/await mechanics", "HTTP status codes and headers"],
    relatedTech: ["Python", "Docker", "PostgreSQL", "PyTorch", "Redis"],
    careerRoles: ["AI Solutions Architect", "Backend Python Engineer", "MLOps Engineer"],
    industries: ["AI & Machine Learning", "FinTech", "Healthcare", "E-Commerce"],
    learningStages: {
      beginner: "Path parameters, query parameters, request bodies with Pydantic models, response models, HTTP exceptions.",
      intermediate: "Dependency injection system (Depends), OAuth2 JWT password flow, background tasks, CORS middleware.",
      advanced: "Custom middleware, lifespan context managers, WebSockets, streaming responses with Server-Sent Events, connection pooling.",
    },
    recommendedResources: [
      { title: "FastAPI Official Documentation", type: "Documentation", url: "https://fastapi.tiangolo.com/", isFree: true },
    ],
    guidedExercises: [
      "Implement an API with Pydantic v2 validation enforcing email formats, password strength, and nested address models.",
      "Build a dependency injection pipeline verifying JWT bearer tokens and injecting the authenticated user object.",
      "Create an endpoint that streams LLM tokens chunk-by-chunk using StreamingResponse and async generators.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "RESTful Inventory Microservice",
        description: "CRUD API for warehouse items with search, pagination, validation, and auto-generated Swagger UI.",
        deliverables: "FastAPI application with SQLite backend and pytest suite.",
      },
      {
        level: "Intermediate",
        title: "Rate-Limited AI Proxy Gateway",
        description: "API gateway that forwards requests to upstream model providers with Redis token-bucket rate limiting and usage tracking.",
        deliverables: "Dockerized FastAPI container with Redis integration and automated tests.",
      },
      {
        level: "Advanced",
        title: "Production RAG Document QA Service",
        description: "Document ingestion pipeline parsing PDFs, chunking text, generating embeddings, and querying pgvector.",
        deliverables: "Complete asynchronous microservice with Swagger documentation, Dockerfile, and health-check endpoints.",
      },
    ],
    interviewQuestions: [
      { question: "How does FastAPI achieve high throughput comparable to NodeJS and Go?", coreConcept: "Async event loop (uvloop) combined with ASGI standard and Pydantic v2 core written in compiled Rust." },
      { question: "Explain how Dependency Injection works in FastAPI using Depends().", coreConcept: "Hierarchical sub-dependency tree resolution before route handler execution, enabling reusable auth, DB sessions, and parameter injection." },
    ],
    officialDocsUrl: "https://fastapi.tiangolo.com/",
    pricingNotes: "100% Free and Open-Source (MIT License).",
    isFreeOrOpenSource: true,
    isAiRelated: true,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Custom AI backend wrappers for businesses", "Automated webhook endpoints", "Private document search APIs"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
  {
    id: "back-nodejs",
    name: "Node.js & Express / NestJS",
    category: "Backend Development & APIs",
    subcategory: "Runtimes & Frameworks",
    plainLanguageSummary: "The ubiquitous JavaScript runtime on Google V8 for creating scalable event-driven backend services and APIs.",
    description: "Asynchronous event-driven JavaScript/TypeScript backend runtime featuring non-blocking I/O, npm ecosystem, clustered worker threads, and enterprise architecture patterns via NestJS.",
    purpose: "Building high-concurrency microservices, real-time collaboration backends, API gateways, and web application servers.",
    realWorldApplications: ["PayPal payment processing tier", "LinkedIn mobile backend", "Netflix edge servers", "Trello real-time boards"],
    difficulty: "Intermediate",
    prerequisites: ["JavaScript Event Loop", "Asynchronous Promises", "HTTP Protocol"],
    relatedTech: ["TypeScript", "PostgreSQL", "Docker", "Socket.IO", "Redis"],
    careerRoles: ["Node.js Backend Developer", "Full-Stack Engineer", "API Architect"],
    industries: ["FinTech", "Social Platforms", "Enterprise Software", "Logistics"],
    learningStages: {
      beginner: "Node modules (CommonJS vs ESM), fs module, http server, Express routing, middleware, request/response cycle.",
      intermediate: "Streams and buffers, database connection pooling, JWT authentication, error handling middleware, validation.",
      advanced: "Cluster module, worker threads, memory leak debugging with heap snapshots, NestJS dependency injection and decorators.",
    },
    recommendedResources: [
      { title: "Node.js Official Guides", type: "Documentation", url: "https://nodejs.org/en/learn", isFree: true },
      { title: "NestJS Official Documentation", type: "Documentation", url: "https://docs.nestjs.com/", isFree: true },
    ],
    guidedExercises: [
      "Implement a streaming file upload handler that calculates MD5 checksums on the fly without loading files into RAM.",
      "Build a NestJS microservice with Guard-based role authentication and validation pipes.",
    ],
    projectIdeas: [
      {
        level: "Intermediate",
        title: "Multi-Tenant E-Commerce REST API",
        description: "API with JWT authentication, role-based access control, Stripe webhook listener, and pagination.",
        deliverables: "TypeScript NestJS project with PostgreSQL database, migrations, and integration tests.",
      },
    ],
    interviewQuestions: [
      { question: "Explain the phases of the Node.js Event Loop.", coreConcept: "Timers, pending callbacks, idle/prepare, poll (I/O), check (setImmediate), and close callbacks." },
    ],
    officialDocsUrl: "https://nodejs.org/",
    pricingNotes: "100% Free and Open-Source (OpenJS Foundation).",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Custom CRM backends", "Stripe payment processors", "Webhook relays"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 4: DATABASES, STORAGE & SEARCH
  // ==========================================
  {
    id: "db-postgres-pgvector",
    name: "PostgreSQL & pgvector",
    category: "Databases, Storage & Search",
    subcategory: "Vector & Semantic Search",
    plainLanguageSummary: "The enterprise open-source relational database upgraded with native high-dimensional vector search for AI embeddings.",
    description: "PostgreSQL 16+ ACID-compliant relational engine extended with pgvector for storing embedding vectors, indexing with HNSW (Hierarchical Navigable Small World) and IVFFlat, and performing cosine/L2 distance search in single SQL statements.",
    purpose: "Unifying relational transactional data and semantic AI embeddings in a single resilient database without running duplicate vector stores.",
    realWorldApplications: ["TALVIORA TECH database layer", "GitLab code search", "Supabase AI vector store", "Financial fraud detection"],
    difficulty: "Intermediate",
    prerequisites: ["SQL fundamentals", "Relational database schema design", "Understanding of vector embeddings"],
    relatedTech: ["PostgreSQL", "SQL", "Supabase", "Python", "Prisma"],
    careerRoles: ["AI Solutions Architect", "Database Administrator", "Senior Backend Engineer"],
    industries: ["AI Enterprise", "Legal Tech", "FinTech", "Healthcare Informatics"],
    learningStages: {
      beginner: "CREATE TABLE with vector(n) column, inserting embedding arrays, calculating cosine distance with <=> operator.",
      intermediate: "Creating HNSW indexes (m and ef_construction parameters), hybrid queries joining relational metadata with vector similarity.",
      advanced: "BM25 full-text + vector Reciprocal Rank Fusion (RRF), memory tuning (work_mem, maintenance_work_mem), partitioned vector tables.",
    },
    recommendedResources: [
      { title: "pgvector GitHub Repository & Docs", type: "Documentation", url: "https://github.com/pgvector/pgvector", isFree: true },
      { title: "PostgreSQL Official Documentation", type: "Documentation", url: "https://www.postgresql.org/docs/", isFree: true },
    ],
    guidedExercises: [
      "Create a PostgreSQL table with 1536-dimensional vectors and insert 5,000 synthetic embeddings.",
      "Benchmark query latency between an unindexed table, an IVFFlat index, and an HNSW index at 99% recall.",
      "Write a hybrid search SQL query combining ts_rank full-text search with vector cosine distance using reciprocal rank fusion.",
    ],
    projectIdeas: [
      {
        level: "Intermediate",
        title: "Semantic Legal Document Search Engine",
        description: "PostgreSQL database storing legal contract clauses with text search, date filtering, and vector semantic similarity.",
        deliverables: "SQL schema, seed script with 500 documents, and query benchmark report.",
      },
      {
        level: "Advanced",
        title: "Enterprise Multi-Tenant RAG Knowledge Base",
        description: "Multi-tenant PostgreSQL schema with Row-Level Security (RLS) ensuring strict isolation across corporate accounts while executing vector similarity search.",
        deliverables: "Complete SQL migration files with RLS policies, HNSW index optimization, and EXPLAIN ANALYZE proof.",
      },
    ],
    interviewQuestions: [
      { question: "What are the trade-offs between HNSW and IVFFlat indexes in pgvector?", coreConcept: "HNSW builds a graph offering superior recall and query speed with higher build time and RAM; IVFFlat clusters data into lists, requiring less RAM but lower recall under updates." },
      { question: "Why is hybrid search (combining lexical BM25 and vector embeddings) superior to pure vector search?", coreConcept: "Vector search excels at conceptual intent but struggles with exact SKU numbers, names, and acronyms; lexical search handles exact keywords while vector handles meaning." },
    ],
    officialDocsUrl: "https://github.com/pgvector/pgvector",
    pricingNotes: "100% Free and Open-Source (PostgreSQL License).",
    isFreeOrOpenSource: true,
    isAiRelated: true,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Enterprise RAG database setup ($3k-$8k per project)", "Company internal wiki semantic search engines"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
  {
    id: "db-redis",
    name: "Redis & Semantic Prompt Caching",
    category: "Databases, Storage & Search",
    subcategory: "Relational SQL",
    plainLanguageSummary: "Ultra-fast in-memory key-value data store used for sub-millisecond caching, session stores, and LLM prompt response caching.",
    description: "In-memory data structure store supporting strings, hashes, sorted sets, streams, Pub/Sub, and vector similarity search. Serves as high-speed cache and semantic deduplication layer for expensive LLM calls.",
    purpose: "Microsecond caching, user session management, rate-limiting counters, and semantic caching for LLMs.",
    realWorldApplications: ["Twitter/X timeline caching", "Stripe API rate limiters", "TALVIORA TECH API response cache", "OpenAI response caching"],
    difficulty: "Intermediate",
    prerequisites: ["Key-value data concepts", "Basic client-server architecture"],
    relatedTech: ["FastAPI", "Node.js", "Docker", "PostgreSQL"],
    careerRoles: ["Distributed Systems Engineer", "Backend Lead", "DevOps Engineer"],
    industries: ["FinTech", "High-Scale Consumer Web", "Gaming", "AI Platforms"],
    learningStages: {
      beginner: "GET, SET, EXPIRE, TTL, key naming conventions, lists, sets, hashes.",
      intermediate: "Transactions (MULTI/EXEC), sorted sets for leaderboards, Pub/Sub channels, Redis pipeline batching.",
      advanced: "Redis Cluster sharding, persistence strategies (RDB vs AOF), Lua scripting inside Redis, vector similarity prompt caching.",
    },
    recommendedResources: [
      { title: "Redis University Free Courses", type: "Free Course", url: "https://university.redis.io/", isFree: true },
      { title: "Redis Commands Documentation", type: "Documentation", url: "https://redis.io/docs/latest/commands/", isFree: true },
    ],
    guidedExercises: [
      "Implement a sliding-window rate limiter in Redis allowing 60 requests per minute per IP address.",
      "Build a semantic prompt cache that checks cosine distance of incoming queries and returns cached completions if similarity exceeds 0.90.",
    ],
    projectIdeas: [
      {
        level: "Intermediate",
        title: "Semantic LLM Response Cache Middleware",
        description: "Drop-in proxy caching OpenAI/Gemini responses in Redis, reducing API costs by 40-70% for repeat queries.",
        deliverables: "Working Python or TypeScript proxy with latency benchmarks.",
      },
    ],
    interviewQuestions: [
      { question: "How does Redis achieve single-threaded high performance?", coreConcept: "Non-blocking multiplexed I/O (epoll/kqueue) and purely in-memory data structures avoiding context switches and disk I/O." },
    ],
    officialDocsUrl: "https://redis.io/",
    pricingNotes: "Community edition available; cloud hosted options have generous free tiers.",
    isFreeOrOpenSource: true,
    isAiRelated: true,
    sideHustleApplicable: true,
    sideHustleUseCases: ["API cost-reduction consulting for startups", "High-concurrency e-commerce inventory locking"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 5: ARTIFICIAL INTELLIGENCE, ML & GENAI
  // ==========================================
  {
    id: "ai-pytorch",
    name: "PyTorch 2.x & TorchDynamo",
    category: "Artificial Intelligence, Machine Learning & Generative AI",
    subcategory: "Deep Learning & Tensors",
    plainLanguageSummary: "The leading deep learning framework for training neural networks, generative models, and research prototypes.",
    description: "Dynamic computational graph framework featuring tensor mathematical primitives, GPU acceleration with CUDA, autograd automatic differentiation, PyTorch 2 torch.compile compiler stack, and Hugging Face integration.",
    purpose: "Training, fine-tuning, and evaluating deep neural networks, computer vision transformers, and large language models.",
    realWorldApplications: ["Tesla Autopilot neural nets", "Meta Llama model training", "OpenAI research models", "Hugging Face transformer ecosystem"],
    difficulty: "Advanced",
    prerequisites: ["Linear algebra (Matrix multiplication, eigenvalues)", "Multivariable calculus (Gradients, chain rule)", "Python 3"],
    relatedTech: ["Python", "NumPy", "Hugging Face", "CUDA", "FastAPI"],
    careerRoles: ["Machine Learning Engineer", "AI Research Scientist", "Computer Vision Specialist"],
    industries: ["Autonomous Vehicles", "Medical Imaging", "Robotics", "GenAI Labs"],
    learningStages: {
      beginner: "Tensors, shapes, broadcasting, autograd (requires_grad, backward), nn.Linear, loss functions, optimizers (AdamW), training loops.",
      intermediate: "Dataset & DataLoader, convolutional networks (CNNs), recurrent & LSTM networks, custom nn.Module architectures, checkpointing.",
      advanced: "Transformer multi-head self-attention from scratch, distributed training (DDP/FSDP), mixed precision (torch.cuda.amp), torch.compile graph capture.",
    },
    recommendedResources: [
      { title: "Deep Learning with PyTorch: A 60 Minute Blitz", type: "Interactive Lab", url: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html", isFree: true },
      { title: "Fast.ai Practical Deep Learning for Coders", type: "Free Course", url: "https://course.fast.ai/", isFree: true },
    ],
    guidedExercises: [
      "Train an MNIST digit recognizer achieving 98%+ accuracy in under 100 lines of PyTorch code.",
      "Implement a Scaled Dot-Product Attention layer from scratch without using nn.MultiheadAttention.",
      "Fine-tune a pretrained ResNet-50 on custom satellite imagery using learning rate scheduling and early stopping.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Medical Chest X-Ray Pneumonia Classifier",
        description: "Transfer learning model classifying chest radiographs with ROC-AUC curve visualization and confusion matrix.",
        deliverables: "Jupyter Notebook with reproducible training loop, validation graphs, and model weights file.",
      },
      {
        level: "Intermediate",
        title: "Character-Level Generative Language Model (nanoGPT)",
        description: "From-scratch Transformer decoder trained on Shakespeare text generating realistic syntax.",
        deliverables: "Clean Python script implementing self-attention, layer norm, residual connections, and sampling logic.",
      },
      {
        level: "Advanced",
        title: "LoRA Fine-Tuned Domain Specific LLM",
        description: "Fine-tuning a 7B parameter open-weights model using Parameter-Efficient Fine-Tuning (PEFT / LoRA) on custom legal corpus.",
        deliverables: "Training pipeline script with quantization (bitsandbytes), evaluation loss logs, and GGUF export for local inference.",
      },
    ],
    interviewQuestions: [
      { question: "Explain the vanishing gradient problem and how Residual Connections (ResNets) solve it.", coreConcept: "Repeated matrix multiplications in deep layers decay gradients toward zero; skip connections add identity mappings so gradients propagate unattenuated." },
      { question: "What is the difference between model parameters and hyperparameters?", coreConcept: "Parameters are learned by optimizer during backpropagation (weights, biases); hyperparameters are pre-configured by engineer (learning rate, batch size, epochs)." },
    ],
    officialDocsUrl: "https://pytorch.org/",
    pricingNotes: "100% Free and Open-Source (Modified BSD).",
    isFreeOrOpenSource: true,
    isAiRelated: true,
    sideHustleApplicable: false,
    sideHustleUseCases: ["Custom image classification for specialized industry clients", "Edge computer vision models for factory defect detection"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
  {
    id: "ai-gemini-sdk",
    name: "Gemini API & Google GenAI SDK",
    category: "Artificial Intelligence, Machine Learning & Generative AI",
    subcategory: "LLM APIs & Tool Calling",
    plainLanguageSummary: "Google's multimodal frontier intelligence platform offering massive context windows, native tool calling, and live audio/video streaming.",
    description: "Multimodal generative AI platform (Gemini 2.5 Flash / Pro) supporting 1M+ token context windows, native function calling, structured JSON output schemas, vision understanding, code execution, and extended thinking.",
    purpose: "Building intelligent agents, enterprise document analyzers, automated workflows, and conversational assistants.",
    realWorldApplications: ["TALVIORA TECH adaptive career simulator", "Google Workspace AI assistance", "Enterprise document synthesis", "Automated code review agents"],
    difficulty: "Beginner",
    prerequisites: ["Python or TypeScript programming", "REST API / SDK basics", "Prompt engineering concepts"],
    relatedTech: ["Python", "TypeScript", "LangChain", "FastAPI", "Next.js"],
    careerRoles: ["AI Solutions Architect", "Full-Stack AI Developer", "Automation Consultant"],
    industries: ["Enterprise Productivity", "Education Tech", "Legal Analysis", "Customer Care"],
    learningStages: {
      beginner: "API key setup, basic text generation, temperature configuration, system instructions, safety settings.",
      intermediate: "Multimodal inputs (images, PDFs, audio), structured output with Pydantic/Zod schemas, chat session history.",
      advanced: "Native function calling with tools, grounding with Google Search, extended thinking configuration, streaming tokens via SSE.",
    },
    recommendedResources: [
      { title: "Google AI for Developers Documentation", type: "Documentation", url: "https://ai.google.dev/docs", isFree: true },
      { title: "Google GenAI Cookbook (GitHub)", type: "Tutorial", url: "https://github.com/google-gemini/cookbook", isFree: true },
    ],
    guidedExercises: [
      "Send a 50-page financial PDF to Gemini and extract structured quarterly revenue metrics adhering to a strict Pydantic model.",
      "Implement a Gemini tool-calling loop where the model calls an external weather or database lookup function before answering.",
      "Build a streaming markdown terminal chatbot using the google-genai Python SDK.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Automated Tech Job Description Analyzer",
        description: "CLI or web tool extracting required skills, experience level, and salary ranges from raw job descriptions into JSON.",
        deliverables: "Working script with error handling and sample outputs.",
      },
      {
        level: "Intermediate",
        title: "Multimodal Invoice Extraction Pipeline",
        description: "Service taking photo invoices, identifying line items, calculating tax verification, and outputting to Google Sheets.",
        deliverables: "FastAPI or Next.js app with file drag-and-drop and export capability.",
      },
      {
        level: "Advanced",
        title: "Autonomous Multi-Tool Career Research Agent",
        description: "Agent that executes multi-step research plans: searching market databases, checking GitHub repos, and generating a verified briefing.",
        deliverables: "Production-ready agent with loop guardrails, execution traces, and citation links.",
      },
    ],
    interviewQuestions: [
      { question: "How does function calling / tool calling work under the hood with frontier LLMs?", coreConcept: "Model is provided JSON schemas of tools; instead of raw answer it emits a structured JSON payload with tool name and arguments; client executes tool and passes result back." },
      { question: "What precautions must be taken to mitigate hallucinations when querying proprietary documents?", coreConcept: "Strict retrieval augmentation (RAG), few-shot domain examples, citation verification, temperature=0, and structured negative constraints." },
    ],
    officialDocsUrl: "https://ai.google.dev/",
    pricingNotes: "Generous free tier (up to 15 RPM for Flash); pay-as-you-go commercial tiers available.",
    isFreeOrOpenSource: false,
    isAiRelated: true,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Client customer support bot deployments ($2k-$5k)", "Automated corporate report synthesis tools"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
  {
    id: "ai-langchain-langgraph",
    name: "LangGraph & AI Agent Workflows",
    category: "Artificial Intelligence, Machine Learning & Generative AI",
    subcategory: "Orchestration & Agents",
    plainLanguageSummary: "A graph-based orchestration framework for building stateful, multi-agent AI systems with cycles, memory, and human-in-the-loop controls.",
    description: "State graph orchestration library that extends beyond linear chains, allowing multi-agent cooperation, cyclic decision loops, durable state checkpointing, error recovery, and human approval steps.",
    purpose: "Building complex autonomous software agents, multi-step research analysts, customer operations copilots, and self-correcting code generators.",
    realWorldApplications: ["Autonomous code review systems", "Complex customer refund verification bots", "Automated competitive intelligence monitors"],
    difficulty: "Advanced",
    prerequisites: ["Python async programming", "LLM tool calling fundamentals", "State machine theory"],
    relatedTech: ["Python", "FastAPI", "Gemini API", "PostgreSQL", "Docker"],
    careerRoles: ["AI Agent Architect", "Lead AI Engineer", "Automation Consultant"],
    industries: ["Enterprise Automation", "Financial Auditing", "Software Engineering Tooling"],
    learningStages: {
      beginner: "StateGraph definition, node functions, edge transitions, compiling the graph, executing simple inputs.",
      intermediate: "Conditional edges, tool execution nodes, memory persistence with SqliteSaver, streaming node outputs.",
      advanced: "Multi-agent supervisor architectures, human-in-the-loop breakpoints (interrupt_before), Postgres durable checkpointers.",
    },
    recommendedResources: [
      { title: "LangGraph Official Documentation", type: "Documentation", url: "https://langchain-ai.github.io/langgraph/", isFree: true },
    ],
    guidedExercises: [
      "Build a 3-node graph that writes a draft, reviews it for tone, and loops back if score < 8.",
      "Implement an agent with an interrupt step requiring human terminal approval before executing a database write.",
    ],
    projectIdeas: [
      {
        level: "Advanced",
        title: "Autonomous Software Bug Triage & Fix Agent",
        description: "Agent that ingests GitHub issues, reads repository code, runs pytest, iterates until tests pass, and prepares a pull request.",
        deliverables: "Working LangGraph pipeline running against local git repositories with detailed trace logs.",
      },
    ],
    interviewQuestions: [
      { question: "Why is a cyclic graph (LangGraph) better than a directed acyclic graph (DAG) for autonomous AI agents?", coreConcept: "Agents require feedback loops to inspect test output, detect errors, and retry tasks iteratively until success criteria are met." },
    ],
    officialDocsUrl: "https://langchain-ai.github.io/langgraph/",
    pricingNotes: "Open-source core library (MIT License). Optional commercial LangSmith platform.",
    isFreeOrOpenSource: true,
    isAiRelated: true,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Enterprise process automation agents ($5k-$15k)", "Automated compliance document check systems"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 6: MOBILE APPLICATION DEVELOPMENT
  // ==========================================
  {
    id: "mob-flutter",
    name: "Flutter & Dart",
    category: "Mobile Application Development",
    subcategory: "Cross-Platform",
    plainLanguageSummary: "Google's UI toolkit for building natively compiled, beautiful mobile, web, and desktop apps from a single codebase.",
    description: "Declarative cross-platform framework rendering through Impeller/Skia engines, compiling Dart ahead-of-time (AOT) to native ARM machine code, with rich Material Design and Cupertino widget libraries.",
    purpose: "Building fluid mobile applications across iOS and Android with 60/120 FPS performance.",
    realWorldApplications: ["Google Pay mobile app", "BMW My BMW car companion", "Alibaba Xianyu app", "Nubank mobile banking"],
    difficulty: "Intermediate",
    prerequisites: ["Object-oriented programming (classes, inheritance)", "Basic UI layout concepts"],
    relatedTech: ["Dart", "Firebase", "Supabase", "Android Studio", "Xcode"],
    careerRoles: ["Mobile App Developer", "Cross-Platform Engineer", "Frontend Specialist"],
    industries: ["FinTech", "Health & Fitness", "E-Commerce", "Smart Home"],
    learningStages: {
      beginner: "Dart language syntax, Stateless vs Stateful widgets, Scaffold, Column, Row, Container, navigation.",
      intermediate: "State management (Provider, Riverpod, Bloc), REST API integration with http/dio, local SQLite/Hive storage.",
      advanced: "Custom platform channels (C/Kotlin/Swift FFI), custom RenderObjects, deep linking, app store release pipelines.",
    },
    recommendedResources: [
      { title: "Flutter Official Documentation", type: "Documentation", url: "https://docs.flutter.dev/", isFree: true },
      { title: "Flutter Codelabs & Tutorials", type: "Interactive Lab", url: "https://docs.flutter.dev/codelabs", isFree: true },
    ],
    guidedExercises: [
      "Build a responsive expense calculator with smooth animated tab transitions in under 300 lines of Dart.",
      "Implement a Riverpod state provider managing an offline-first shopping list synchronized with SQLite.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Clean Student Schedule & Planner App",
        description: "Mobile app with timetable calendar, class assignment checklists, and local notifications.",
        deliverables: "Flutter project tested on Android Emulator with clean architecture.",
      },
      {
        level: "Intermediate",
        title: "AI Personal Habit & Journaling Companion",
        description: "Cross-platform app featuring daily streak tracking, voice-to-text note capture, and weekly progress charts.",
        deliverables: "Complete Flutter app integrated with Firebase/Supabase and local biometric lock.",
      },
    ],
    interviewQuestions: [
      { question: "How does Flutter's rendering pipeline differ from React Native?", coreConcept: "Flutter draws every pixel directly onto the canvas via its own rendering engine (Impeller); React Native relies on a bridge/JSI to instantiate native platform views." },
    ],
    officialDocsUrl: "https://flutter.dev/",
    pricingNotes: "100% Free and Open-Source (BSD License).",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Small business mobile booking apps", "Cross-platform MVP development for founders ($3k-$10k)"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 7: UI/UX & CREATIVE TECHNOLOGY
  // ==========================================
  {
    id: "ui-figma",
    name: "Figma & Design Systems",
    category: "UI/UX & Creative Technology",
    subcategory: "Design & Prototyping",
    plainLanguageSummary: "The industry-standard collaborative design tool for user experience mapping, high-fidelity prototypes, and design tokens.",
    description: "Cloud-based collaborative design platform featuring Auto Layout 5.0, component variants, variable modes (design tokens for light/dark themes), interactive state prototypes, and developer inspect mode.",
    purpose: "Designing user interfaces, conducting user testing, maintaining enterprise design tokens, and developer handoff.",
    realWorldApplications: ["TALVIORA TECH interface specifications", "Uber design system (Base)", "Airbnb design system", "Stripe component library"],
    difficulty: "Beginner",
    prerequisites: ["Visual spatial awareness", "Typography and color basics"],
    relatedTech: ["Tailwind CSS", "shadcn/ui", "Framer", "React"],
    careerRoles: ["Product Designer", "UI/UX Specialist", "Design System Architect"],
    industries: ["All Software Verticals", "Design Agencies", "Enterprise SaaS"],
    learningStages: {
      beginner: "Frames, vector shapes, typography hierarchies, color styles, alignment, grouping, exporting assets.",
      intermediate: "Auto Layout (padding, gap, wrap), reusable Components, Variants, Component properties (boolean, text, instance swap).",
      advanced: "Variables (tokens for spacing, color modes, typography), advanced interactive prototyping with variables and logic, developer handoff tokens.",
    },
    recommendedResources: [
      { title: "Figma Learn Official Tutorials", type: "Tutorial", url: "https://help.figma.com/hc/en-us/categories/360002042553-Figma-design", isFree: true },
    ],
    guidedExercises: [
      "Create a responsive card component with Auto Layout that adapts smoothly from mobile (320px) to desktop (1280px).",
      "Build a tokenized color and spacing variable collection with instant switching between light and dark themes.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Mobile Banking Dashboard High-Fidelity Mockup",
        description: "5-screen mobile user flow including login, account balance, transaction detail, and quick transfer.",
        deliverables: "Figma community file with Auto Layout components and interactive click-through prototype.",
      },
      {
        level: "Intermediate",
        title: "Enterprise SaaS Design System Token Library",
        description: "Complete design system with 25+ atomic components, accessibility contrast ratings, and code tokens mapped to Tailwind CSS.",
        deliverables: "Organized Figma file with component documentation and interactive variant playground.",
      },
    ],
    interviewQuestions: [
      { question: "How do Design Tokens bridge the gap between design in Figma and production code in React?", coreConcept: "Tokens abstract raw hex values into semantic names (e.g. color-surface-primary), allowing single-source-of-truth syncing to Tailwind/CSS variables." },
    ],
    officialDocsUrl: "https://www.figma.com/",
    pricingNotes: "Free Starter plan available (up to 3 Figma files); Professional plans paid per editor.",
    isFreeOrOpenSource: false,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["UI/UX audits for SaaS founders ($1k-$3k)", "Landing page Figma-to-Tailwind designs", "Design system setup"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 8: CLOUD COMPUTING, DEVOPS & DEPLOYMENT
  // ==========================================
  {
    id: "cloud-docker",
    name: "Docker & Container Architecture",
    category: "Cloud Computing, DevOps & Deployment",
    subcategory: "Containers & Orchestration",
    plainLanguageSummary: "Packages applications and all their dependencies into standardized, isolated containers that run reliably anywhere.",
    description: "Container virtualization platform utilizing Linux namespaces, cgroups, layered image filesystems, multi-stage Dockerfiles, and compose orchestrations for reproducible development and production environments.",
    purpose: "Eliminating 'it works on my machine' bugs, packaging microservices, and deploying reproducible application images.",
    realWorldApplications: ["Production container deployments worldwide", "Local database development", "CI/CD automated test runners", "ML model serving packaging"],
    difficulty: "Beginner",
    prerequisites: ["Basic Linux terminal commands", "Understanding of networking ports and file systems"],
    relatedTech: ["Kubernetes", "Linux", "FastAPI", "Node.js", "AWS"],
    careerRoles: ["DevOps Engineer", "MLOps Engineer", "Backend Developer", "Cloud Architect"],
    industries: ["All Cloud Computing Sectors", "FinTech", "Enterprise Software"],
    learningStages: {
      beginner: "Images vs Containers, pulling images, docker run, port mapping (-p), environment variables (-e), basic Dockerfile.",
      intermediate: "Multi-stage builds for minimal distroless image sizes, volumes for local persistence, docker compose for multi-container apps.",
      advanced: "Rootless containers, layer cache optimization, vulnerability scanning (trivy/docker scout), health checks, network bridges.",
    },
    recommendedResources: [
      { title: "Docker Official Get Started Guide", type: "Documentation", url: "https://docs.docker.com/get-started/", isFree: true },
    ],
    guidedExercises: [
      "Write a multi-stage Dockerfile for a Next.js or FastAPI app reducing image size from 1.2GB to under 95MB.",
      "Configure a docker-compose.yml running an application, a PostgreSQL database, and a Redis cache with automatic healthchecks.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Reproducible Full-Stack Local Dev Environment",
        description: "Docker Compose stack orchestrating a web frontend, API backend, PostgreSQL database, and pgAdmin with hot-reloading.",
        deliverables: "Working repository with single command 'docker compose up' launch.",
      },
      {
        level: "Intermediate",
        title: "Hardened Distroless Production Image Pipeline",
        description: "Production container build pipeline featuring non-root users, vulnerability scanning, and minimal attack surface.",
        deliverables: "Multi-stage Dockerfile passing automated Trivy zero-vulnerability checks.",
      },
    ],
    interviewQuestions: [
      { question: "What is the difference between a Container and a Virtual Machine?", coreConcept: "VMs virtualize the entire hardware layer and include a full guest OS kernel; containers share the host Linux kernel and isolate at process level via namespaces and cgroups." },
      { question: "Why are multi-stage Docker builds critical in production deployments?", coreConcept: "They separate build-time tools (compilers, npm packages) from the final minimal runtime image, shrinking image size and eliminating security vulnerabilities." },
    ],
    officialDocsUrl: "https://docs.docker.com/",
    pricingNotes: "Free Community Edition (Moby) & Docker Desktop free for personal/small businesses.",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Containerizing legacy web apps for cloud migration", "Local development environment setup consulting"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
  {
    id: "cloud-k8s",
    name: "Kubernetes (K8s) & Cloud Native",
    category: "Cloud Computing, DevOps & Deployment",
    subcategory: "Containers & Orchestration",
    plainLanguageSummary: "The industrial platform that automates deploying, scaling, and managing containerized applications across server clusters.",
    description: "Production container orchestration system automating pod scheduling, horizontal auto-scaling (HPA), rolling zero-downtime deployments, self-healing, service discovery, and ingress routing.",
    purpose: "High-availability, self-healing container management across multi-node server clusters.",
    realWorldApplications: ["Google Cloud GKE workloads", "Spotify streaming infrastructure", "Amazon EKS enterprise tiers", "Financial transaction clusters"],
    difficulty: "Advanced",
    prerequisites: ["Docker & container basics", "Linux networking & DNS", "YAML configuration syntax"],
    relatedTech: ["Docker", "Helm", "Prometheus", "Terraform", "AWS"],
    careerRoles: ["Site Reliability Engineer (SRE)", "Cloud Architect", "Platform Engineer"],
    industries: ["Enterprise Cloud", "Telecommunications", "Banking & FinTech"],
    learningStages: {
      beginner: "Pods, Deployments, Services (ClusterIP, NodePort, LoadBalancer), kubectl CLI commands, namespaces.",
      intermediate: "ConfigMaps, Secrets, Ingress controllers, PersistentVolumes & PVCs, rolling updates and rollbacks, liveness/readiness probes.",
      advanced: "Horizontal Pod Autoscaler (HPA) using custom metrics, Helm charts, Custom Resource Definitions (CRDs), Operator pattern, service meshes.",
    },
    recommendedResources: [
      { title: "Kubernetes Official Interactive Basics", type: "Interactive Lab", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/", isFree: true },
    ],
    guidedExercises: [
      "Deploy a stateless web app on local Minikube with 3 replicas, zero-downtime rolling update, and a ClusterIP service.",
      "Configure a Horizontal Pod Autoscaler that automatically scales pod replicas from 2 to 10 when CPU utilization exceeds 75%.",
    ],
    projectIdeas: [
      {
        level: "Intermediate",
        title: "High-Availability Web Cluster on Minikube / K3s",
        description: "Complete cluster configuration including Ingress, TLS termination, ConfigMaps, and automated rolling restarts.",
        deliverables: "Set of documented YAML manifests and automated verification script.",
      },
    ],
    interviewQuestions: [
      { question: "Explain the difference between Liveness, Readiness, and Startup probes in Kubernetes.", coreConcept: "Liveness restarts unhealthy pods; Readiness pauses traffic until pod is ready to serve; Startup delays liveness checks for slow-starting applications." },
    ],
    officialDocsUrl: "https://kubernetes.io/",
    pricingNotes: "100% Free and Open-Source (CNCF graduated project). Managed cloud clusters incur node hosting costs.",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Kubernetes migration consulting for growing startups ($5k-$20k)", "Cost-optimization audits on AWS EKS clusters"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 9: CYBERSECURITY & ETHICAL SECURITY
  // ==========================================
  {
    id: "sec-owasp-burp",
    name: "Web Application Security & OWASP Top 10",
    category: "Cybersecurity & Ethical Security Testing",
    subcategory: "Web App Security",
    plainLanguageSummary: "The discipline of testing, identifying, and remediating critical web vulnerabilities before attackers exploit them.",
    description: "Methodologies and tooling (Burp Suite Community, OWASP ZAP, Juice Shop) for identifying SQL injection, Cross-Site Scripting (XSS), Server-Side Request Forgery (SSRF), broken authorization, and cryptographic failures.",
    purpose: "Auditing web applications for security vulnerabilities, compliance verification, and building secure code.",
    realWorldApplications: ["Corporate penetration tests", "Bug bounty hunting", "Secure development lifecycle (SDLC) reviews", "FinTech compliance audits"],
    difficulty: "Intermediate",
    prerequisites: ["HTTP headers, cookies, and status codes", "JavaScript and SQL basics", "Browser DevTools"],
    relatedTech: ["Wireshark", "Linux", "Python", "Docker"],
    careerRoles: ["Penetration Tester", "Application Security Engineer", "Security Analyst"],
    industries: ["Banking & Finance", "Healthcare", "Government & Defense", "E-Commerce"],
    learningStages: {
      beginner: "OWASP Top 10 categories, understanding SQL injection, reflected vs stored XSS, CSRF tokens, using browser inspect tools.",
      intermediate: "Burp Suite intercepting proxy, repeater, intruder basics, testing Broken Object Level Authorization (BOLA/IDOR), testing JWT flaws.",
      advanced: "Server-Side Request Forgery (SSRF) bypasses, prototype pollution, race condition exploits, writing automated security regression tests.",
    },
    recommendedResources: [
      { title: "PortSwigger Web Security Academy (Free Labs)", type: "Interactive Lab", url: "https://portswigger.net/web-security", isFree: true },
      { title: "OWASP Top Ten Official Project", type: "Documentation", url: "https://owasp.org/www-project-top-ten/", isFree: true },
    ],
    guidedExercises: [
      "Exploit and remediate a blind SQL injection vulnerability in an isolated OWASP Juice Shop lab.",
      "Identify an Insecure Direct Object Reference (IDOR) flaw allowing viewing another user's private receipts.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Automated Security Header & SSL Audit Tool",
        description: "Python CLI checking external websites for CSP, HSTS, X-Frame-Options headers and reporting compliance scores.",
        deliverables: "Working script with HTML report output generator.",
      },
      {
        level: "Intermediate",
        title: "Secure Code Audit & Remediation Lab",
        description: "Vulnerable web application repository with documented bug reports, exploitation steps, and PRs containing security patches.",
        deliverables: "Comprehensive penetration test report adhering to industry standards.",
      },
    ],
    interviewQuestions: [
      { question: "What is an Insecure Direct Object Reference (IDOR) and how do you prevent it in backend code?", coreConcept: "Occurs when backend uses user-supplied IDs directly without verifying whether authenticated user has permission; prevent with server-side authorization checks." },
      { question: "Explain the difference between Stored, Reflected, and DOM-based Cross-Site Scripting (XSS).", coreConcept: "Stored saves payload in DB; Reflected reflects immediately in server response; DOM-based executes purely in client browser JavaScript." },
    ],
    officialDocsUrl: "https://owasp.org/",
    pricingNotes: "OWASP resources are 100% Free. Burp Suite Community is free; Professional edition paid.",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Web vulnerability assessments for SMBs ($1k-$4k)", "Responsible bug bounty participation"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 10: DATA SCIENCE, ANALYTICS & BI
  // ==========================================
  {
    id: "data-pandas-bi",
    name: "Python pandas, Power BI & Modern BI",
    category: "Data Science, Analytics & Business Intelligence",
    subcategory: "BI Dashboards & Viz",
    plainLanguageSummary: "Transforming raw, unstructured business data into clean tables, statistical insights, and executive decision dashboards.",
    description: "End-to-end data analytics workflow utilizing Python (pandas, NumPy, Plotly) for cleaning and feature engineering, coupled with business intelligence tools (Power BI, Looker Studio) for interactive executive dashboards.",
    purpose: "Analyzing business KPIs, customer cohorts, marketing attribution, and supply-chain metrics for strategic decision-making.",
    realWorldApplications: ["E-commerce sales dashboards", "SaaS churn analysis", "Financial risk metrics", "TALVIORA TECH analytics views"],
    difficulty: "Beginner",
    prerequisites: ["Basic spreadsheets (Excel/Sheets)", "Basic arithmetic and percentages"],
    relatedTech: ["SQL", "Python", "PostgreSQL", "dbt"],
    careerRoles: ["Data Analyst", "Business Intelligence Engineer", "Analytics Specialist"],
    industries: ["Retail & E-Commerce", "Finance", "Healthcare", "Consulting"],
    learningStages: {
      beginner: "Loading CSV/Excel in pandas, handling nulls, filtering columns, GroupBy summaries, bar and line visualizations.",
      intermediate: "Joining disparate datasets, date/time manipulation, pivot tables, building interactive Power BI dashboards with DAX measures.",
      advanced: "Statistical hypothesis testing, automated weekly reporting scripts, designing star-schema data models for warehouses.",
    },
    recommendedResources: [
      { title: "pandas Official User Guide", type: "Documentation", url: "https://pandas.pydata.org/docs/user_guide/", isFree: true },
    ],
    guidedExercises: [
      "Clean a messy 10,000-row customer dataset with inconsistent date formats, currency symbols, and duplicate emails.",
      "Build a Power BI dashboard computing Customer Lifetime Value (LTV) and 30-day retention curves with interactive slicers.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Tech Industry Salary & Remote Trends Dashboard",
        description: "Interactive dashboard exploring salary distributions across tech roles, experience levels, and geographic regions.",
        deliverables: "Power BI / Tableau / Streamlit interactive dashboard with public demo link.",
      },
    ],
    interviewQuestions: [
      { question: "What is the difference between Star Schema and Snowflake Schema in data modeling?", coreConcept: "Star schema denormalizes dimensions directly around fact table for faster queries; Snowflake normalizes dimensions into sub-tables, reducing redundancy." },
    ],
    officialDocsUrl: "https://pandas.pydata.org/",
    pricingNotes: "pandas is 100% Free. Power BI Desktop is free; Power BI Pro paid for cloud sharing.",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Custom executive dashboard creation ($1.5k-$4k per client)", "Spreadsheet-to-dashboard conversions"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 11: GAME DEV, AR/VR & SPATIAL
  // ==========================================
  {
    id: "game-godot-unity",
    name: "Godot Engine 4 & Unity",
    category: "Game Development, AR/VR & Interactive Worlds",
    subcategory: "Game Engines",
    plainLanguageSummary: "Real-time game engines for crafting 2D and 3D interactive experiences, indie games, and spatial virtual worlds.",
    description: "Real-time rendering, physics, and gameplay scripting engines utilizing node hierarchies (Godot with GDScript/C#) and component systems (Unity with C#) for compiling games across PC, mobile, web, and consoles.",
    purpose: "Building video games, architectural visualizations, interactive simulators, and spatial metaverse experiences.",
    realWorldApplications: ["Indie games on Steam", "Interactive training simulators", "Mobile casual games", "Architectural walkthroughs"],
    difficulty: "Intermediate",
    prerequisites: ["Basic programming logic", "Vector mathematics (2D/3D vectors, angles)"],
    relatedTech: ["Blender", "C#", "Three.js"],
    careerRoles: ["Game Developer", "Gameplay Programmer", "Technical Artist"],
    industries: ["Gaming", "Entertainment", "Defense Training", "Architecture"],
    learningStages: {
      beginner: "Scene trees, nodes, sprites, 2D kinematic character movement, collision detection, user input handling.",
      intermediate: "Signals and events, tilemaps, state machines for animation, UI health bars and menus, audio manager.",
      advanced: "3D lighting and shaders (GLSL), pathfinding algorithms (A*), multiplayer networking with RPCs, performance optimization.",
    },
    recommendedResources: [
      { title: "Godot Engine Official Documentation", type: "Documentation", url: "https://docs.godotengine.org/", isFree: true },
    ],
    guidedExercises: [
      "Implement a responsive 2D platformer character controller with coyote time and jump buffering in Godot.",
      "Build an interactive 3D physics puzzle room with grabbable objects and door triggers.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "2D Retro Arcade Space Defender",
        description: "Complete playable arcade game with waves, score counter, particle explosions, and sound effects.",
        deliverables: "Playable web export hosted on itch.io with source code.",
      },
    ],
    interviewQuestions: [
      { question: "What is the difference between _process(delta) and _physics_process(delta) in Godot?", coreConcept: "_process runs every rendered frame (variable delta); _physics_process runs on fixed synchronized time ticks for consistent physics simulation." },
    ],
    officialDocsUrl: "https://godotengine.org/",
    pricingNotes: "Godot is 100% Free and Open-Source (MIT License, zero royalties forever).",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: false,
    sideHustleUseCases: ["Educational game commissions", "Interactive brand gamification mini-games"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 12: HARDWARE, ROBOTICS & IOT
  // ==========================================
  {
    id: "iot-esp32-arduino",
    name: "ESP32, MicroPython & MQTT",
    category: "Hardware, Robotics & IoT",
    subcategory: "Microcontrollers & SBCs",
    plainLanguageSummary: "Low-cost microcontrollers with built-in Wi-Fi and Bluetooth for automating physical hardware, smart home sensors, and robotics.",
    description: "Dual-core 240MHz microcontroller with integrated Wi-Fi/BLE, programmable via Embedded C++ (Arduino IDE) or MicroPython, connecting physical sensors and relays to cloud dashboards via lightweight MQTT publish-subscribe protocol.",
    purpose: "Building smart connected devices, remote environmental monitors, agricultural automation, and robotics telemetry.",
    realWorldApplications: ["Smart home automation switches", "Industrial temperature monitors", "Agricultural soil telemetry", "Drone sensor telemetry"],
    difficulty: "Intermediate",
    prerequisites: ["Basic DC electronics (Voltage, Current, Resistance, Ohm's Law)", "C++ or Python basics"],
    relatedTech: ["Raspberry Pi", "Linux", "MQTT", "Python"],
    careerRoles: ["Embedded Systems Engineer", "IoT Solutions Architect", "Robotics Firmware Developer"],
    industries: ["Smart Home", "Industrial IoT", "Agriculture", "Automotive"],
    learningStages: {
      beginner: "Breadboarding, GPIO pin control (digitalWrite), reading analog sensors (ADC), PWM LED dimming, serial monitoring.",
      intermediate: "Connecting to Wi-Fi networks, reading I2C/SPI sensors (BME280 temperature/humidity), publishing MQTT telemetry messages.",
      advanced: "Deep sleep power optimization (running on battery for months), Over-The-Air (OTA) firmware updates, dual-core FreeRTOS task scheduling.",
    },
    recommendedResources: [
      { title: "Random Nerd Tutorials (ESP32 Guides)", type: "Tutorial", url: "https://randomnerdtutorials.com/projects-esp32/", isFree: true },
    ],
    guidedExercises: [
      "Connect an ESP32 to Wi-Fi and publish live temperature/humidity readings to an MQTT broker every 60 seconds.",
      "Program an ESP32 to sleep in ultra-low power mode and wake up only on hardware button press interrupt.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Smart Room Climate & Air Quality Monitor",
        description: "Connected desktop sensor displaying temperature, humidity, and CO2 levels on an OLED screen with phone alerts.",
        deliverables: "Working hardware prototype with 3D-printable enclosure file and firmware source code.",
      },
    ],
    interviewQuestions: [
      { question: "Why is MQTT preferred over HTTP for IoT sensor communication?", coreConcept: "MQTT uses minimal binary packet headers (~2 bytes), persistent TCP connection, and publish-subscribe model ideal for low-bandwidth, battery-constrained devices." },
    ],
    officialDocsUrl: "https://www.espressif.com/en/products/socs/esp32",
    pricingNotes: "Hardware boards cost $4-$8; all firmware tools and compilers are free.",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Smart greenhouse telemetry setups for local growers", "Office occupancy and air quality monitoring kits"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 13: NO-CODE, LOW-CODE & AI DEV
  // ==========================================
  {
    id: "nocode-n8n-make",
    name: "n8n & Workflow Automation",
    category: "No-Code, Low-Code & AI Development",
    subcategory: "Workflow Automation",
    plainLanguageSummary: "Self-hostable, visual workflow automation platform that connects APIs, AI models, databases, and business tools without writing boilerplate.",
    description: "Fair-code licensed workflow automation engine supporting 400+ native service integrations, custom JavaScript/Python execution nodes, webhook triggers, AI agent LangChain nodes, and self-hosted Docker deployment.",
    purpose: "Automating enterprise business processes, connecting disconnected SaaS platforms, and deploying autonomous AI workflow pipelines.",
    realWorldApplications: ["Automated customer onboarding sequences", "Invoice processing and CRM syncing", "AI content research pipelines", "DevOps alert routing"],
    difficulty: "Beginner",
    prerequisites: ["Understanding of webhooks, JSON structures, and REST APIs"],
    relatedTech: ["Docker", "PostgreSQL", "FastAPI", "Gemini API"],
    careerRoles: ["AI Automation Consultant", "Solutions Engineer", "Operations Specialist"],
    industries: ["Business Operations", "Marketing & Agency", "SMB Automation", "E-Commerce"],
    learningStages: {
      beginner: "Trigger nodes (Schedule, Webhook), standard actions (Slack, Google Sheets, Email), passing JSON data between nodes.",
      intermediate: "Conditional routing (If/Switch nodes), data transformation with Code nodes (JavaScript), error handling workflows.",
      advanced: "Self-hosting on VPS with Docker and PostgreSQL, creating custom community nodes, deploying multi-step AI agent workflows with tools.",
    },
    recommendedResources: [
      { title: "n8n Official Documentation & Courses", type: "Free Course", url: "https://docs.n8n.io/", isFree: true },
    ],
    guidedExercises: [
      "Create a workflow that listens to incoming Stripe purchase webhooks, updates Google Sheets, and sends a customized Slack alert.",
      "Build an AI summarization workflow that ingests customer support tickets and routes high-urgency items to human agents.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Automated Lead Qualification & CRM Pipeline",
        description: "Workflow capturing form submissions, enriching company data, and scheduling follow-up reminders.",
        deliverables: "Exportable n8n workflow JSON file with test payload data and video walkthrough.",
      },
      {
        level: "Intermediate",
        title: "End-to-End Autonomous Content Research Pipeline",
        description: "Scheduled automation that monitors RSS feeds, synthesizes key takeaways using an LLM API, and posts drafted briefings to Notion.",
        deliverables: "Complete self-contained n8n workflow template with API credentials configuration guide.",
      },
    ],
    interviewQuestions: [
      { question: "What are the advantages of self-hosting n8n compared to proprietary tools like Zapier or Make?", coreConcept: "Zero per-task execution fees, complete data privacy compliance (GDPR/HIPAA), access to full database connections, and custom code node support." },
    ],
    officialDocsUrl: "https://n8n.io/",
    pricingNotes: "Self-hostable Community edition is Free. Hosted cloud plans are paid.",
    isFreeOrOpenSource: true,
    isAiRelated: true,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Client business workflow automation ($1.5k-$6k per project)", "Internal operations retainer services"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
  {
    id: "nocode-cursor-antigravity",
    name: "AI-Assisted Development & IDEs",
    category: "No-Code, Low-Code & AI Development",
    subcategory: "AI Code Accelerators",
    plainLanguageSummary: "Next-generation developer environments augmenting software engineers with repository-wide context, agentic refactoring, and AI pair programming.",
    description: "Advanced AI-augmented engineering environments (Google Antigravity, VS Code, Cursor) that index full codebases, automate multi-file refactoring, execute terminal test loops, and streamline boilerplate generation.",
    purpose: "Multiplying developer engineering velocity, exploring new frameworks rapidly, and diagnosing complex multi-file bugs.",
    realWorldApplications: ["Accelerating TALVIORA TECH platform development", "Enterprise codebase refactoring", "Rapid prototype generation for startups"],
    difficulty: "Beginner",
    prerequisites: ["Familiarity with code editors", "Fundamental understanding of software files and terminal execution"],
    relatedTech: ["TypeScript", "Python", "Git", "Docker"],
    careerRoles: ["AI-Augmented Software Engineer", "Product Builder", "Technical Founder"],
    industries: ["All Software Sectors"],
    learningStages: {
      beginner: "Inline completions, prompt generation, code explanations, refactoring individual functions.",
      intermediate: "Repository-wide context indexing, drafting unit tests from existing code, generating API integrations.",
      advanced: "Agentic development workflows with automated terminal execution, compiler error correction, and multi-file architecture migration.",
    },
    recommendedResources: [
      { title: "Effective AI Pair Programming Guidelines", type: "Tutorial", url: "https://docs.anthropic.com/", isFree: true },
    ],
    guidedExercises: [
      "Use an AI developer tool to generate a comprehensive test suite for a previously untested 300-line utility module.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Full-Stack Landing Page Built with AI Tooling",
        description: "Deploy a modern, responsive landing page built using AI-assisted pair programming in under 3 hours.",
        deliverables: "Live Vercel URL and clean GitHub repository.",
      },
    ],
    interviewQuestions: [
      { question: "What is the critical engineer responsibility when using AI-generated code in production?", coreConcept: "Rigorous verification: understanding every line, verifying edge cases, writing automated tests, and ensuring security/license compliance." },
    ],
    officialDocsUrl: "https://code.visualstudio.com/",
    pricingNotes: "Free editors available; advanced AI model subscriptions require tool-specific plans.",
    isFreeOrOpenSource: true,
    isAiRelated: true,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Rapid MVP delivery for freelance clients", "Legacy code modernization services"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 14: DEVELOPER & COLLABORATION TOOLS
  // ==========================================
  {
    id: "dev-git-github",
    name: "Git, GitHub & Branching Workflows",
    category: "Developer & Collaboration Tools",
    subcategory: "Version Control",
    plainLanguageSummary: "The distributed version control system and collaboration platform that powers virtually all professional software engineering teams.",
    description: "Distributed snapshot version control engine tracking file trees via directed acyclic graphs (DAGs), enabling feature branching, pull request reviews, merge conflicts resolution, and CI/CD automation via GitHub Actions.",
    purpose: "Tracking project history, coordinating team collaboration, performing code reviews, and automating deployment pipelines.",
    realWorldApplications: ["Every modern software company", "Open-source development globally", "TALVIORA TECH source repository"],
    difficulty: "Beginner",
    prerequisites: ["Terminal/command prompt basics"],
    relatedTech: ["VS Code", "Linux", "Docker", "GitHub Actions"],
    careerRoles: ["All Software Developers", "DevOps Engineers", "Technical Leads"],
    industries: ["Every Technology Industry"],
    learningStages: {
      beginner: "git init, clone, add, commit, push, pull, status, diff, .gitignore configuration.",
      intermediate: "Branching strategies (feature branches, trunk-based), merging, resolving merge conflicts, git stash, pull request etiquette.",
      advanced: "Interactive rebase (git rebase -i), cherry-pick, bisect for hunting regressions, reflog for recovering lost commits, submodule management.",
    },
    recommendedResources: [
      { title: "Pro Git Official Book (Free Online)", type: "Book", url: "https://git-scm.com/book/en/v2", isFree: true },
      { title: "Learn Git Branching (Interactive Visualizer)", type: "Interactive Lab", url: "https://learngitbranching.js.org/", isFree: true },
    ],
    guidedExercises: [
      "Simulate a merge conflict between two branches editing the same line and resolve it cleanly using Git CLI.",
      "Use git bisect to find the exact commit that introduced a failing test in a 50-commit history in under 3 minutes.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Professional Developer GitHub Portfolio Repository",
        description: "Cleanly structured profile repository with automated GitHub Actions updating dynamic stats and showcasing verified projects.",
        deliverables: "Live public GitHub profile repository with polished markdown badges.",
      },
    ],
    interviewQuestions: [
      { question: "What is the difference between Git Merge and Git Rebase?", coreConcept: "Merge creates a dedicated merge commit preserving complete history branch topology; rebase replays your commits onto target branch for a linear history." },
    ],
    officialDocsUrl: "https://git-scm.com/",
    pricingNotes: "Git is 100% Free and Open-Source. GitHub offers generous free tiers for public and private repositories.",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: false,
    sideHustleUseCases: ["Repository hygiene cleanup for clients", "Team Git workflow training"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 15: TECHNOLOGY SIDE HUSTLES & SERVICES
  // ==========================================
  {
    id: "hustle-ai-automation",
    name: "AI Business Automation & Workflow Services",
    category: "Technology Side Hustles & Independent Services",
    subcategory: "AI & Automation",
    plainLanguageSummary: "Designing custom automation pipelines that connect client software, AI models, and spreadsheets to eliminate manual data entry.",
    description: "Professional technical service building automated workflows using n8n, Make, Python scripts, and frontier LLM APIs (Gemini/OpenAI) to automate customer support routing, document synthesis, invoice processing, and CRM updates for small-to-medium businesses.",
    purpose: "Delivering measurable time savings (10-40 hours/week) for SMB clients by automating repetitive administrative and operational tasks.",
    realWorldApplications: ["Automated legal brief summarization for boutique law firms", "Real estate lead qualification via WhatsApp/Email", "E-commerce inventory sync across Shopify and accounting software"],
    difficulty: "Intermediate",
    prerequisites: ["Understanding of webhooks & REST APIs", "Familiarity with n8n or Python", "Basic client scoping skills"],
    relatedTech: ["FastAPI", "n8n & Workflow Automation", "Gemini API & Google GenAI SDK", "Python 3.12+"],
    careerRoles: ["Automation Consultant", "Technical Freelancer", "AI Solutions Engineer"],
    industries: ["Real Estate", "Legal", "E-Commerce", "Medical Clinics", "Financial Advisory"],
    learningStages: {
      beginner: "Mastering n8n or Make triggers, webhooks, JSON parsing, basic email alerts.",
      intermediate: "Connecting LLM APIs with structured schemas, building robust error-handling branches, creating client test sandboxes.",
      advanced: "Self-hosting automations on client cloud instances, writing custom Python scripts for edge cases, drafting Service Level Agreements (SLAs).",
    },
    recommendedResources: [
      { title: "n8n Enterprise Automation Blueprints", type: "Documentation", url: "https://n8n.io/workflows/", isFree: true },
    ],
    guidedExercises: [
      "Build a complete simulated client automation: when a PDF invoice is dropped in Google Drive, extract line items into a database and send a Telegram summary.",
    ],
    projectIdeas: [
      {
        level: "Intermediate",
        title: "Client-Ready AI Customer Inquiry Classifier",
        description: "Autonomous pipeline that ingests incoming support emails, classifies urgency and topic with 95%+ accuracy, and drafts contextual replies in the ticketing system.",
        deliverables: "Working workflow, Loom demonstration video, client onboarding questionnaire, and delivery checklist.",
      },
    ],
    interviewQuestions: [
      { question: "How do you scope an automation project to prevent scope creep with non-technical clients?", coreConcept: "Define strict boundary inputs/outputs, explicit list of supported file formats, maximum monthly execution volume, and formal sign-off acceptance criteria." },
    ],
    officialDocsUrl: "https://n8n.io/",
    pricingNotes: "Typical project scope: $1,500 - $6,000 fixed price, plus optional $300-$800/mo maintenance retainer. Zero earnings guarantees.",
    isFreeOrOpenSource: true,
    isAiRelated: true,
    sideHustleApplicable: true,
    sideHustleUseCases: ["End-to-end client process automation", "Maintenance retainers for automated operations"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
  {
    id: "hustle-web-dev",
    name: "High-Converting Web App & Landing Page Services",
    category: "Technology Side Hustles & Independent Services",
    subcategory: "Web & App Services",
    plainLanguageSummary: "Building ultra-fast, accessible, responsive websites and client portals for businesses that need to convert visitors into customers.",
    description: "Modern web development service delivering high-performance, search-optimized websites and customer portals using Next.js, Tailwind CSS, TypeScript, and headless CMS platforms for SMBs, consultants, and startups.",
    purpose: "Replacing slow, outdated WordPress or DIY site-builder websites with modern, lightning-fast web assets that rank well on Google and convert visitors.",
    realWorldApplications: ["Dentist / clinic appointment booking websites", "B2B SaaS product landing pages", "Professional consultancy portfolio sites"],
    difficulty: "Beginner",
    prerequisites: ["HTML, CSS, JavaScript/TypeScript", "Tailwind CSS", "Basic SEO concepts"],
    relatedTech: ["React 19 & Next.js App Router", "Tailwind CSS v4", "TypeScript 5.x", "Figma & Design Systems"],
    careerRoles: ["Freelance Web Developer", "Frontend Consultant", "Digital Agency Owner"],
    industries: ["Local Businesses", "Professional Services", "Technology Startups", "E-Commerce"],
    learningStages: {
      beginner: "Building responsive layouts with Tailwind CSS, integrating contact forms with Resend/Formspree.",
      intermediate: "Next.js static site generation (SSG) for sub-second page loads, Lighthouse 95+ performance optimization, OpenGraph social cards.",
      advanced: "Headless CMS integration (Sanity/Strapi), multi-lingual internationalization (i18n), client analytics integration with privacy compliance.",
    },
    recommendedResources: [
      { title: "Web.dev by Google: Core Web Vitals Guide", type: "Documentation", url: "https://web.dev/explore/fast", isFree: true },
    ],
    guidedExercises: [
      "Build a complete 3-page landing page achieving 98+ scores across Performance, Accessibility, Best Practices, and SEO on Google Lighthouse.",
    ],
    projectIdeas: [
      {
        level: "Beginner",
        title: "Local Specialty Bakery Online Presence & Order Form",
        description: "Responsive 3-page website featuring menu showcase, location map, customer testimonials, and contact inquiry form.",
        deliverables: "Deployed website on Vercel with custom domain setup guide and client handoff documentation.",
      },
    ],
    interviewQuestions: [
      { question: "How do you explain the business value of Core Web Vitals to a non-technical small business owner?", coreConcept: "Google rewards fast sites with higher search rankings; every 1-second delay reduces conversion rates by up to 20%." },
    ],
    officialDocsUrl: "https://nextjs.org/",
    pricingNotes: "Typical project scope: $1,000 - $4,500 fixed fee for standard 3-5 page websites. No income guarantees.",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Local business site overhauls", "Tech startup launch landing pages", "Speed optimization audits"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 16: SOFTWARE ENGINEERING & ARCHITECTURE
  // ==========================================
  {
    id: "arch-system-design",
    name: "System Design & Distributed Architectures",
    category: "Software Engineering & Architecture",
    subcategory: "Distributed System Design",
    plainLanguageSummary: "The principles and patterns for architecting software systems that scale to millions of users with high reliability and low latency.",
    description: "Core architectural principles covering horizontal scaling, load balancers, database sharding and replication, caching tiers (CDN, Redis), message queues (Kafka/RabbitMQ), consistency models (CAP theorem, PACELC), and microservices vs monoliths.",
    purpose: "Designing resilient software infrastructure that handles traffic spikes, hardware failures, and high data volumes gracefully.",
    realWorldApplications: ["Designing Netflix streaming backend", "Architecting Uber dispatch systems", "TALVIORA TECH platform scaling plans"],
    difficulty: "Advanced",
    prerequisites: ["Solid backend development experience", "Databases (SQL vs NoSQL)", "Networking basics (TCP, DNS, HTTP)"],
    relatedTech: ["Go (Golang) 1.23+", "PostgreSQL & pgvector", "Docker & Container Architecture", "Redis & Semantic Prompt Caching"],
    careerRoles: ["Principal Architect", "Senior Staff Engineer", "Engineering Manager"],
    industries: ["High-Scale Consumer Tech", "Cloud Providers", "FinTech Infrastructure"],
    learningStages: {
      beginner: "Vertical vs horizontal scaling, client-server models, stateless services, single-point-of-failure elimination.",
      intermediate: "CAP Theorem (Consistency vs Availability vs Partition Tolerance), database replication (Leader-Follower), caching strategies (Write-Through vs Cache-Aside).",
      advanced: "Event-driven architecture with Kafka, distributed transactions (Saga pattern), rate limiting algorithms (Token Bucket, Leaky Bucket), disaster recovery.",
    },
    recommendedResources: [
      { title: "The System Design Primer (GitHub)", type: "Book", url: "https://github.com/donnemartin/system-design-primer", isFree: true },
    ],
    guidedExercises: [
      "Draw and write an architecture specification for a URL shortener like bit.ly handling 100M new URLs per month.",
      "Design a real-time collaborative document editing backend specifying conflict resolution (OT or CRDTs) and WebSocket scaling.",
    ],
    projectIdeas: [
      {
        level: "Advanced",
        title: "Architectural RFC for High-Throughput Notification Engine",
        description: "Full engineering specification document detailing data flow, queue sizing, fallback mechanisms, database schema, and cost estimation.",
        deliverables: "Comprehensive Markdown RFC document with Mermaid sequence and architecture diagrams.",
      },
    ],
    interviewQuestions: [
      { question: "Explain the CAP theorem and provide real-world examples of CP and AP systems.", coreConcept: "In a network partition (P), you must choose between Consistency (C) or Availability (A); e.g. Banking systems choose CP; social media feeds choose AP." },
      { question: "How does the Saga pattern solve distributed transactions across microservices without 2-Phase Commit?", coreConcept: "A series of local transactions coordinated via choreograph or orchestrator; if one step fails, compensating undo transactions are triggered in reverse." },
    ],
    officialDocsUrl: "https://github.com/donnemartin/system-design-primer",
    pricingNotes: "Free educational knowledge. Architectural concepts apply across all software tiers.",
    isFreeOrOpenSource: true,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Technical advisory for funded startups ($150-$300/hr)", "System design audits"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 17: GOVERNMENT TECH & CERTIFICATIONS
  // ==========================================
  {
    id: "gov-cloud-certs",
    name: "Enterprise Cloud Certifications (AWS & Azure)",
    category: "Government Technology Careers & Certifications",
    subcategory: "Cloud Vendor Certifications",
    plainLanguageSummary: "Industry-recognized credential tracks validating your ability to design, secure, and operate scalable cloud infrastructure.",
    description: "Standardized technical certification roadmaps for major cloud vendors: AWS Certified Solutions Architect (Associate/Professional) and Microsoft Certified: Azure Solutions Architect Expert. Free preparation documentation is clearly distinguished from paid official exams.",
    purpose: "Validating vendor-specific cloud architecture competencies for enterprise employers, government defense contractors, and consulting firms.",
    realWorldApplications: ["Enterprise cloud migrations", "Public sector digital transformation initiatives", "Defense IT compliance"],
    difficulty: "Intermediate",
    prerequisites: ["Basic networking (CIDR, subnets, DNS)", "Virtual servers and storage concepts"],
    relatedTech: ["Docker & Container Architecture", "Kubernetes (K8s) & Cloud Native", "Modern SQL & Relational Algebra"],
    careerRoles: ["Cloud Solutions Architect", "DevOps Consultant", "Government Systems Engineer"],
    industries: ["Public Sector & Government", "Enterprise Consulting", "Healthcare & Finance"],
    learningStages: {
      beginner: "Cloud fundamentals: compute (EC2/VMs), storage (S3/Blob), networking (VPC/VNet), IAM identity basics.",
      intermediate: "Architecting for high availability: multi-AZ deployments, load balancing, relational databases (RDS), cost optimization calculators.",
      advanced: "Enterprise security compliance, disaster recovery across regions, hybrid cloud interconnects (Direct Connect / ExpressRoute).",
    },
    recommendedResources: [
      { title: "AWS Skill Builder Official Free Courses", type: "Free Course", url: "https://explore.skillbuilder.aws/", isFree: true },
      { title: "Microsoft Learn Free Cloud Learning Paths", type: "Interactive Lab", url: "https://learn.microsoft.com/en-us/training/", isFree: true },
    ],
    guidedExercises: [
      "Design an AWS or Azure architecture diagram for a multi-region web app adhering to the Well-Architected Framework.",
    ],
    projectIdeas: [
      {
        level: "Intermediate",
        title: "Terraform-Automated Multi-AZ Cloud Baseline",
        description: "Infrastructure-as-code template creating a secure VPC with public/private subnets, NAT gateways, and security groups.",
        deliverables: "Validated Terraform configuration files with cost projection sheet.",
      },
    ],
    interviewQuestions: [
      { question: "What is the AWS/Azure Shared Responsibility Model for cloud security?", coreConcept: "Cloud provider is responsible for security OF the cloud (hardware, datacenters); customer is responsible for security IN the cloud (data, OS patches, IAM policies)." },
    ],
    officialDocsUrl: "https://aws.amazon.com/certification/",
    pricingNotes: "Free preparation material online on official portals. Official proctored certification exam fees range from $150 to $300 USD.",
    isFreeOrOpenSource: false,
    isAiRelated: false,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Cloud cost audit consulting for companies spending $10k+/mo on AWS/Azure", "Cloud migration scoping"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },

  // ==========================================
  // CAT 18: TECH NEWS & EMERGING TRENDS
  // ==========================================
  {
    id: "news-mcp-protocol",
    name: "Model Context Protocol (MCP) & AI Tooling",
    category: "Technology News, Emerging Tools & Demand Intelligence",
    subcategory: "AI Architecture Shifts",
    plainLanguageSummary: "The open standard connecting AI assistants to local development tools, databases, and enterprise systems.",
    description: "An open standard (Model Context Protocol) introduced by Anthropic that standardizes how AI applications connect to external tools, local filesystems, git repositories, and databases, replacing fragmented proprietary plugin implementations.",
    purpose: "Creating interoperable, reusable tool servers that any compliant AI client or agent can query securely.",
    realWorldApplications: ["Antigravity MCP server integrations", "IDE agent tool execution", "Internal company database query tools"],
    difficulty: "Intermediate",
    prerequisites: ["JSON-RPC protocols", "Node.js or Python programming", "Basic client-server architecture"],
    relatedTech: ["FastAPI & Pydantic v2", "Node.js & Express / NestJS", "TypeScript 5.x", "Gemini API & Google GenAI SDK"],
    careerRoles: ["AI Systems Developer", "Tools & Infrastructure Engineer", "Integration Architect"],
    industries: ["Developer Tooling", "AI Ecosystem", "Enterprise Software"],
    learningStages: {
      beginner: "Understanding JSON-RPC transport over stdio and SSE, inspecting tool manifests, declaring resources and prompts.",
      intermediate: "Building an MCP server in TypeScript or Python exposing custom database queries or REST API operations.",
      advanced: "Securing MCP connections, managing stateful sessions, implementing authentication filters for multi-user deployments.",
    },
    recommendedResources: [
      { title: "Model Context Protocol Official Specification & SDKs", type: "Documentation", url: "https://modelcontextprotocol.io/", isFree: true },
    ],
    guidedExercises: [
      "Create a local MCP server in Python or TypeScript that exposes your local SQLite database schema and safe read-only queries to AI models.",
    ],
    projectIdeas: [
      {
        level: "Intermediate",
        title: "Custom MCP Server for GitHub Issue Management",
        description: "Standardized tool server allowing AI models to search repository issues, create labels, and post pull request review comments.",
        deliverables: "Tested MCP server package adhering to standard protocol specification.",
      },
    ],
    interviewQuestions: [
      { question: "Why is an open standard like MCP critical for the future of AI agents?", coreConcept: "Without standards, every AI client must write custom integrations for every tool; MCP provides a universal adapter pattern (like USB for software)." },
    ],
    officialDocsUrl: "https://modelcontextprotocol.io/",
    pricingNotes: "100% Free and Open-Source Specification.",
    isFreeOrOpenSource: true,
    isAiRelated: true,
    sideHustleApplicable: true,
    sideHustleUseCases: ["Building private MCP tool connectors for enterprises adopting AI assistants"],
    lastReviewedDate: "Not independently reviewed",
    verificationStatus: "Not independently checked",
  },
];

export const LEARNING_PATHWAYS: LearningPathway[] = [
  {
    id: "path-web-dev",
    title: "Modern Full-Stack Web Developer",
    category: "Web Development",
    durationWeeks: 16,
    difficulty: "Beginner",
    summary: "Step-by-step pathway from raw HTML/CSS fundamentals to shipping scalable, typed Next.js applications backed by PostgreSQL databases.",
    sequence: [
      { step: 1, technology: "HTML & Semantic Markup", milestone: "Semantic document structure, accessibility landmarks, forms.", projectDeliverable: "Accessible personal portfolio layout." },
      { step: 2, technology: "CSS & Tailwind CSS", milestone: "Box model, flexbox, grid, responsive utility classes.", projectDeliverable: "Pixel-perfect mobile-first landing page." },
      { step: 3, technology: "JavaScript (ES6+) & TypeScript", milestone: "Closures, async/await, interfaces, generics, DOM events.", projectDeliverable: "Interactive task manager with local storage." },
      { step: 4, technology: "Git & GitHub", milestone: "Branching workflows, pull requests, resolving merge conflicts.", projectDeliverable: "Public repository with clean conventional commits." },
      { step: 5, technology: "React 19 & Next.js App Router", milestone: "Server Components, Client Components, Suspense, Server Actions.", projectDeliverable: "Dynamic multi-page SaaS web application." },
      { step: 6, technology: "PostgreSQL & Database Migrations", milestone: "Relational schema design, foreign keys, indexes, Prisma/Drizzle.", projectDeliverable: "Authenticated backend with secure queries." },
      { step: 7, technology: "Testing & Deployment", milestone: "Unit testing with Vitest, automated CI/CD on Vercel.", projectDeliverable: "Live production web application with 95+ Lighthouse score." },
    ],
    starterProject: "Responsive Personal Portfolio & Project Showcase with Contact Form",
    capstoneProject: "Full-Stack Collaborative Workspace with User Authentication, Team Roles, and Real-Time Notes",
    careerOutcomes: ["Junior/Mid Full-Stack Engineer", "Frontend Specialist", "Freelance Web Consultant"],
  },
  {
    id: "path-ai-engineer",
    title: "AI & Generative AI Solutions Engineer",
    category: "AI & Machine Learning",
    durationWeeks: 20,
    difficulty: "Intermediate",
    summary: "Master the full spectrum from Python numerical foundations and vector math to frontier LLM APIs, semantic search, and agent orchestration.",
    sequence: [
      { step: 1, technology: "Python 3.12+ & Virtual Environments", milestone: "Typing, decorators, generators, asyncio, packaging.", projectDeliverable: "CLI data extraction tool with async HTTP requests." },
      { step: 2, technology: "NumPy & pandas", milestone: "Vectorized operations, array shapes, dataset cleaning, aggregation.", projectDeliverable: "Data wrangling pipeline analyzing 100k records." },
      { step: 3, technology: "PyTorch & Deep Learning Foundations", milestone: "Tensors, autograd, loss functions, custom training loops.", projectDeliverable: "Image classifier or nano-transformer trained on CPU/GPU." },
      { step: 4, technology: "Embeddings & Vector Databases", milestone: "Cosine distance, HNSW indexing, PostgreSQL with pgvector.", projectDeliverable: "Semantic document search engine over PDF files." },
      { step: 5, technology: "Frontier LLM APIs (Gemini & OpenAI)", milestone: "Prompt engineering, structured JSON schemas, native tool calling.", projectDeliverable: "Automated business document analysis pipeline." },
      { step: 6, technology: "LangGraph & Agent Orchestration", milestone: "State graphs, cyclical tool loops, human-in-the-loop approvals.", projectDeliverable: "Multi-step autonomous market research agent." },
      { step: 7, technology: "Model Serving & Production Evaluation", milestone: "FastAPI inference microservice, Docker, RAGAS evaluations.", projectDeliverable: "Production-grade RAG QA service with latency benchmarks." },
    ],
    starterProject: "Semantic PDF Search Engine using Python and Vector Embeddings",
    capstoneProject: "Autonomous Multi-Agent Enterprise Research Assistant with Memory, Citations, and Document Export",
    careerOutcomes: ["AI Solutions Architect", "Generative AI Engineer", "Applied Machine Learning Developer"],
  },
  {
    id: "path-ai-automation",
    title: "AI Automation & Workflow Architect",
    category: "No-Code & Automation",
    durationWeeks: 10,
    difficulty: "Beginner",
    summary: "Build high-impact business automation systems connecting client applications, webhooks, databases, and AI models without writing unnecessary boilerplate.",
    sequence: [
      { step: 1, technology: "HTTP, Webhooks & REST API Fundamentals", milestone: "Understanding JSON payloads, query params, headers, status codes.", projectDeliverable: "Postman test suite verifying 3 third-party APIs." },
      { step: 2, technology: "n8n & Workflow Automation Mechanics", milestone: "Triggers, data flow, conditionals, loops, error catch nodes.", projectDeliverable: "Automated Google Sheets to Slack notification system." },
      { step: 3, technology: "LLM API Integration", milestone: "Injecting prompt templates, structured output parsing, error fallbacks.", projectDeliverable: "Automated customer email classification & reply drafter." },
      { step: 4, technology: "Database & Storage Connectors", milestone: "PostgreSQL, Supabase, Airtable integration, deduplication keys.", projectDeliverable: "CRM contact sync with automatic data enrichment." },
      { step: 5, technology: "Self-Hosting & Secure Operations", milestone: "Deploying n8n on Docker VPS, SSL configuration, webhook security.", projectDeliverable: "Production-hardened self-hosted automation server." },
      { step: 6, technology: "Client Scoping & Commercial Delivery", milestone: "Drafting statements of work, delivery checklists, error alerts.", projectDeliverable: "Client proposal package with video demonstration." },
    ],
    starterProject: "Automated Support Ticket Classifier & SLA Alert Dispatcher",
    capstoneProject: "End-to-End Client Lead Ingestion, Verification, CRM Sync, and Tailored AI Proposal Generation Engine",
    careerOutcomes: ["AI Automation Consultant", "Operations Solutions Engineer", "Independent Automation Freelancer"],
  },
  {
    id: "path-data-analytics",
    title: "Data Analyst & Business Intelligence Specialist",
    category: "Data & BI",
    durationWeeks: 12,
    difficulty: "Beginner",
    summary: "Transform raw organizational data into crisp executive metrics, automated queries, and interactive KPI dashboards.",
    sequence: [
      { step: 1, technology: "Spreadsheets (Excel / Google Sheets)", milestone: "VLOOKUP/XLOOKUP, pivot tables, summary statistics, chart creation.", projectDeliverable: "Financial model analyzing business unit profitability." },
      { step: 2, technology: "Modern SQL & Relational Querying", milestone: "JOINs, GROUP BY, aggregations, CTEs, Window functions.", projectDeliverable: "Customer cohort retention analysis in PostgreSQL." },
      { step: 3, technology: "Python with pandas & Plotly", milestone: "Data cleaning, missing value strategies, automated CSV transformations.", projectDeliverable: "Automated monthly sales summary report generator." },
      { step: 4, technology: "Power BI / Looker Studio Dashboards", milestone: "Star schema modeling, DAX calculated measures, interactive filters.", projectDeliverable: "Executive sales and operational KPI dashboard." },
      { step: 5, technology: "Data Storytelling & Executive Presentation", milestone: "Insight distillation, actionable recommendations, documentation.", projectDeliverable: "Comprehensive data brief with presentation deck." },
    ],
    starterProject: "E-Commerce Customer Retention & Churn Cohort Dashboard",
    capstoneProject: "Enterprise Revenue Intelligence Dashboard with Forecasting and Real-Time Margin Alerts",
    careerOutcomes: ["Junior/Mid Data Analyst", "Business Intelligence Developer", "Operations Analyst"],
  },
  {
    id: "path-cybersecurity",
    title: "Cybersecurity Defense & Application Security",
    category: "Cybersecurity",
    durationWeeks: 18,
    difficulty: "Intermediate",
    summary: "Learn ethical security testing, network packet inspection, web vulnerability exploitation, and defensive code hardening.",
    sequence: [
      { step: 1, technology: "Networking Fundamentals & Wireshark", milestone: "OSI model, TCP/IP handshakes, DNS resolution, packet capture.", projectDeliverable: "Network traffic analysis report identifying anomalies." },
      { step: 2, technology: "Linux Administration & Command Line", milestone: "File permissions, SSH hardening, user groups, systemd services.", projectDeliverable: "Hardened Ubuntu server baseline with UFW firewall." },
      { step: 3, technology: "Web Security & OWASP Top 10", milestone: "SQL injection, XSS, CSRF, IDOR, SSRF vulnerabilities.", projectDeliverable: "Completed PortSwigger Academy beginner lab badge." },
      { step: 4, technology: "Intercepting Proxies (Burp Suite & ZAP)", milestone: "Request tampering, repeater testing, fuzzing parameters.", projectDeliverable: "Manual vulnerability assessment of OWASP Juice Shop." },
      { step: 5, technology: "DevSecOps & Secure Coding", milestone: "SAST/DAST scanners, dependency audits, container hardening.", projectDeliverable: "GitHub Actions security pipeline with automated scanners." },
      { step: 6, technology: "Reporting & Responsible Disclosure", milestone: "Writing professional vulnerability reports with CVSS scoring.", projectDeliverable: "Formal executive penetration test report." },
    ],
    starterProject: "Automated Security Header and SSL/TLS Configuration Audit Script",
    capstoneProject: "Full Web Application Penetration Test Report with Verified Proof-of-Concepts and Remediation Patches",
    careerOutcomes: ["Application Security Engineer", "Junior Penetration Tester", "SOC Analyst"],
  },
  {
    id: "path-side-hustle",
    title: "Technology Side-Hustle & Service Launchpad",
    category: "Freelance & Consulting",
    durationWeeks: 8,
    difficulty: "Beginner",
    summary: "A practical commercial launchpad helping you master one high-demand technical service, build portfolio proof, and safely deliver for real clients.",
    sequence: [
      { step: 1, technology: "Service Selection & Market Demand", milestone: "Pick 1 specialized service (e.g. Next.js landing pages or n8n automation).", projectDeliverable: "Service scope definition and target client avatar document." },
      { step: 2, technology: "Technical Tool Mastery", milestone: "Master the exact tooling required without tangential distractions.", projectDeliverable: "Completed rapid build test in under 6 hours." },
      { step: 3, technology: "Build 2 Proof-of-Concept Projects", milestone: "Develop 2 production-grade demonstration projects for real use cases.", projectDeliverable: "Live demo links with public GitHub repos or Loom videos." },
      { step: 4, technology: "Portfolio Case Studies & Handoff Checklist", milestone: "Document before/after metrics, architecture diagrams, delivery checklist.", projectDeliverable: "Published case study page with verified performance scores." },
      { step: 5, technology: "Client Scoping, Contracts & Ethical Outreach", milestone: "Statement of Work (SOW) template, scope boundary rules, fair pricing.", projectDeliverable: "Complete client onboarding and delivery kit." },
    ],
    starterProject: "High-Performance 3-Page Website for a Local Business with 98+ Lighthouse Score",
    capstoneProject: "Client-Ready Technical Service Offering with 2 Live Proof Projects, SOW Template, and Delivery Checklist",
    careerOutcomes: ["Technical Freelancer", "Independent Digital Consultant", "Agency Founder"],
  },
];

export const SIDE_HUSTLE_SERVICES: SideHustleService[] = [
  {
    id: "hustle-srv-1",
    title: "High-Converting Website & Landing Page Development",
    category: "Web Development",
    whatItInvolves: "Building sub-second, responsive, accessible marketing websites and landing pages for businesses using Next.js, Tailwind CSS, or Webflow.",
    targetClients: ["Local medical/dental practices", "B2B SaaS startups launching products", "Professional consultants and executive coaches"],
    requiredSkillsAndTools: ["Next.js / React or Webflow", "Tailwind CSS", "Figma design basics", "Core Web Vitals optimization"],
    prerequisites: ["Basic HTML/CSS/JS knowledge", "Understanding of responsive layouts"],
    starterStartingPoint: "Redesign a local business's clunky 10-year-old website as a voluntary demonstration project to build your first portfolio piece.",
    practiceProject: "A 3-page modern dental clinic website featuring online appointment inquiry, Google Reviews embed, location map, and 98+ Lighthouse score.",
    portfolioEvidence: [
      "Live Vercel URL with responsive design across mobile/desktop",
      "Lighthouse report screenshot showing 95+ performance",
      "Short Loom video explaining design and conversion decisions",
    ],
    deliveryChecklist: [
      "Mobile responsive testing across iPhone and Android viewports",
      "All contact forms tested and delivering to client email inbox",
      "SEO meta tags (title, description, OpenGraph image) configured",
      "Google Analytics / privacy-friendly tracking tags placed",
      "Custom domain DNS configured and SSL certificate active",
    ],
    commonMistakes: [
      "Overpromising custom complex features without charging for them",
      "Not getting client text copy and images before starting development",
      "Neglecting mobile optimization (where 60%+ of traffic originates)",
    ],
    clientScoping: "Define exact number of pages (e.g. 3 pages max), maximum revisions (e.g. 2 rounds), and specify that client provides approved text and photography.",
    ethicalConsiderations: "Never guarantee search ranking #1 or specific sales conversions. Guarantee technical speed, responsive design, and delivery on agreed timeline.",
    pricingConcepts: "Fixed project price: $1,000 to $4,500 based on complexity. Monthly hosting & maintenance retainer: $100-$300/mo.",
    clientChannels: ["Direct outreach to local businesses with poor mobile sites", "Referrals from accountants and design agencies", "Upwork / Contra profiles with verified work"],
    risksAndLimitations: "Client delays in providing feedback or content. Protect yourself with milestone payments (50% upfront, 50% on launch).",
  },
  {
    id: "hustle-srv-2",
    title: "AI Business Automation & Workflow Pipelines",
    category: "AI & Automation",
    whatItInvolves: "Creating automated workflows that connect software tools (CRM, email, spreadsheets, accounting) and apply AI to categorize, summarize, and route data.",
    targetClients: ["Real estate agencies handling hundreds of leads", "E-commerce stores managing returns", "Law offices reviewing high volumes of intake forms"],
    requiredSkillsAndTools: ["n8n or Make", "Gemini API or OpenAI API", "Webhooks & REST APIs", "Google Sheets / Airtable"],
    prerequisites: ["Basic logic and understanding of JSON data structures"],
    starterStartingPoint: "Automate your own daily information workflow (e.g. RSS news to email summary) to thoroughly master trigger-action mechanics.",
    practiceProject: "An automated lead qualification system that receives website form submissions, queries company info, scores urgency using an LLM, and posts alerts to Slack.",
    portfolioEvidence: [
      "Exportable workflow JSON template",
      "Loom video recording walking through a live test run with data moving in real-time",
      "Diagram showing the before/after operational time savings",
    ],
    deliveryChecklist: [
      "All webhook authentication secrets secured in environment variables",
      "Error notification branch configured (sends alert if an API fails)",
      "Rate limits and token costs calculated for client expectations",
      "Client training walkthrough video recorded",
    ],
    commonMistakes: [
      "Building without error-handling: when one API goes down, the entire pipeline crashes silently",
      "Failing to account for model hallucination on critical financial figures",
    ],
    clientScoping: "Specify input data sources, exact API credentials needed, expected daily volume, and explicit fallback handling.",
    ethicalConsiderations: "Ensure customer personally identifiable information (PII) is not transmitted to unapproved public AI models without client consent.",
    pricingConcepts: "Fixed implementation fee: $1,500 - $6,000 depending on workflow depth. Maintenance retainer: $300 - $800/mo.",
    clientChannels: ["LinkedIn outreach to operations managers", "Partnering with boutique marketing agencies", "Local business networking groups"],
    risksAndLimitations: "Third-party APIs changing endpoints or rate limits. Document dependency risks clearly in your scope of work.",
  },
  {
    id: "hustle-srv-3",
    title: "Executive Data Analytics & Business Intelligence Dashboards",
    category: "Data & BI",
    whatItInvolves: "Connecting messy spreadsheets and databases into clean, automated executive dashboards that display key performance indicators in real time.",
    targetClients: ["Growing e-commerce brands needing profit/ad spend clarity", "SaaS startups tracking MRR and churn cohorts", "Local businesses managing multi-branch revenue"],
    requiredSkillsAndTools: ["Power BI, Tableau, or Looker Studio", "SQL", "Excel / Google Sheets", "Data modeling (Star Schema)"],
    prerequisites: ["Strong spreadsheet formula and SQL querying skills"],
    starterStartingPoint: "Download an open public retail dataset and build a comprehensive executive dashboard with 5 critical metrics and filter slicers.",
    practiceProject: "An interactive E-commerce Profit & Retention Dashboard showing gross margin by product category, 30-day repeat customer rate, and advertising ROI.",
    portfolioEvidence: [
      "Interactive link to public dashboard on Looker Studio or Tableau Public",
      "Case study detailing how specific dashboard insights inform business decisions",
    ],
    deliveryChecklist: [
      "Data refresh automation scheduled and verified",
      "Calculated KPI formulas audited against client raw accounting numbers",
      "Color palette aligned with client brand identity",
      "Mobile view formatted for executive smartphone viewing",
    ],
    commonMistakes: [
      "Cluttering the screen with 20 charts instead of highlighting the 4 vital decision metrics",
      "Not verifying data definitions with client (e.g. how they define 'active customer')",
    ],
    clientScoping: "Define exact data sources (e.g. Shopify + QuickBooks), specific list of 5-8 KPIs, and data refresh frequency.",
    ethicalConsiderations: "Maintain strict non-disclosure agreement (NDA) standards regarding confidential client revenue and customer data.",
    pricingConcepts: "Fixed dashboard setup: $1,200 - $4,000. Ongoing monthly data maintenance & reporting: $250 - $600/mo.",
    clientChannels: ["Direct outreach to founders on LinkedIn", "Freelance platforms with verified data portfolio", "Accounting firm partnerships"],
    risksAndLimitations: "Messy client source data with missing records. Include an initial 'Data Audit & Cleaning' phase in your agreement.",
  },
  {
    id: "hustle-srv-4",
    title: "Technical SEO & Web Speed Optimization Audits",
    category: "Performance & SEO",
    whatItInvolves: "Auditing and optimizing existing websites to achieve sub-second load times, passing Core Web Vitals, and correcting indexing errors.",
    targetClients: ["E-commerce stores with slow Shopify or WooCommerce sites", "B2B companies whose sites rank on page 2 of Google", "Marketing agencies lacking in-house technical developers"],
    requiredSkillsAndTools: ["Google Lighthouse & PageSpeed Insights", "Chrome DevTools Performance tab", "Image optimization techniques", "Next.js / WordPress / Shopify"],
    prerequisites: ["Understanding of browser rendering, CSS/JS blocking, and image compression"],
    starterStartingPoint: "Run a free PageSpeed audit on 5 slow local business websites and document the 3 biggest performance bottlenecks.",
    practiceProject: "A comprehensive Performance Audit Report for a slow WordPress site, detailing step-by-step how to reduce Largest Contentful Paint (LCP) from 4.8s to 1.2s.",
    portfolioEvidence: [
      "Before and after PageSpeed score comparison (e.g. 38 to 96)",
      "PDF sample audit report with actionable developer recommendations",
    ],
    deliveryChecklist: [
      "Images converted to modern WebP/AVIF formats and properly sized",
      "Render-blocking JavaScript deferred or minimized",
      "Font preloading configured to eliminate layout shifts (CLS)",
      "Caching headers and CDN compression (Gzip/Brotli) enabled",
    ],
    commonMistakes: [
      "Focusing only on desktop speed while ignoring mobile performance",
      "Breaking site functionality (e.g. analytics or forms) while over-minifying scripts",
    ],
    clientScoping: "Offer in two tiers: Tier 1 is an Audit Report with recommendations ($500); Tier 2 is Full Implementation & Remediation ($1,500 - $3,500).",
    ethicalConsiderations: "Do not guarantee page 1 rankings; explain that speed is a critical ranking factor and conversion multiplier, but content relevance is also needed.",
    pricingConcepts: "Audit only: $400 - $800. Audit + Technical Fixes: $1,500 - $3,500.",
    clientChannels: ["Reaching out to companies with slow mobile site scores", "Shopify app store partner communities", "Agency white-label contracts"],
    risksAndLimitations: "Client using low-tier shared hosting that limits server response time (TTFB). Clarify hosting limitations upfront.",
  },
];

export const GOVERNMENT_CAREER_PATHS: GovernmentCareerPath[] = [
  {
    id: "gov-path-1",
    title: "Public Sector Systems & Database Architect",
    domain: "National Informatics & Public Digital Infrastructure",
    recruitingOrganisation: "National Informatics Centre (NIC) / State IT Corporations / Civil Tech Agencies",
    qualification: "B.Tech / B.E. / MCA in Computer Science / IT or equivalent recognized degree",
    eligibility: "Standard technical degree requirements with competitive examination or GATE score qualification depending on recruitment notification cycle.",
    certificationsRecommended: [
      { name: "PostgreSQL Certified Associate / Professional", provider: "PostgreSQL community / EnterpriseDB", freePrepUrl: "https://www.postgresql.org/docs/", isExamPaid: true },
      { name: "Linux Foundation Certified System Administrator (LFCS)", provider: "The Linux Foundation", freePrepUrl: "https://training.linuxfoundation.org/resources/", isExamPaid: true },
    ],
    officialSource: "https://www.nic.in/",
    status: "Reference information; not a current vacancy",
    lastVerified: "Not independently checked",
  },
  {
    id: "gov-path-2",
    title: "Cyber Defense Analyst & Incident Responder",
    domain: "National Cyber Coordination & Critical Infrastructure Protection",
    recruitingOrganisation: "CERT-In / Defence Research Technical Cadres / Public Sector Undertakings (PSUs)",
    qualification: "B.Tech / M.Tech in Cybersecurity / CS / Electronics or equivalent",
    eligibility: "Citizen eligibility matching statutory age limits; technical written test and interview clearance.",
    certificationsRecommended: [
      { name: "CompTIA Security+ (SY0-701)", provider: "CompTIA", freePrepUrl: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-training-course/", isExamPaid: true },
      { name: "Certified Information Systems Security Professional (CISSP)", provider: "(ISC)²", freePrepUrl: "https://www.isc2.org/certifications/cissp", isExamPaid: true },
    ],
    officialSource: "https://www.cert-in.org.in/",
    status: "Reference information; not a current vacancy",
    lastVerified: "Not independently checked",
  },
  {
    id: "gov-path-3",
    title: "Scientific Computing & Satellite Data Software Engineer",
    domain: "Space Exploration & Aerospace Scientific Systems",
    recruitingOrganisation: "ISRO / Space Applications Centre / National Remote Sensing Centre",
    qualification: "B.E. / B.Tech in Computer Science with minimum 65% aggregate marks or 6.84 CGPA",
    eligibility: "ISRO Centralised Recruitment Board (ICRB) written exam and technical interview.",
    certificationsRecommended: [
      { name: "Certified Kubernetes Administrator (CKA)", provider: "CNCF / Linux Foundation", freePrepUrl: "https://kubernetes.io/docs/home/", isExamPaid: true },
      { name: "NVIDIA Deep Learning Institute Fundamentals", provider: "NVIDIA DLI", freePrepUrl: "https://www.nvidia.com/en-us/training/", isExamPaid: false },
    ],
    officialSource: "https://www.isro.gov.in/Careers.html",
    status: "Reference information; not a current vacancy",
    lastVerified: "Not independently checked",
  },
];

export const NEWS_TREND_ITEMS: NewsTrendItem[] = [
  {
    id: "news-1",
    headline: "Frontier Multimodal Models Adopt Extended Thinking & Test-Time Compute",
    category: "AI Architecture Shifts",
    date: "Date not checked",
    whatHappened: "Major frontier model releases (Gemini 2.5/3.0, reasoning models) now dedicate internal 'thinking tokens' before answering, executing chain-of-thought verification.",
    whyItMatters: "Drastically reduces hallucinations on complex math, architectural system design, and competitive coding benchmarks.",
    whoShouldCare: "Full-Stack AI developers, software architects, and algorithmic interview candidates.",
    practicalProjectToBuild: "Build a multi-step code generation assistant that prompts models to output reasoning traces before generating unit tests.",
    status: "Reference topic",
  },
  {
    id: "news-2",
    headline: "Model Context Protocol (MCP) Rapidly Emerges as Industry Standard for AI Agents",
    category: "Developer Tooling",
    date: "Date not checked",
    whatHappened: "Anthropic and ecosystem open-source maintainers standardized MCP, allowing AI agents to connect seamlessly to any local or cloud tool through standard JSON-RPC.",
    whyItMatters: "Eliminates duplicate proprietary plugin SDKs across different AI clients.",
    whoShouldCare: "Backend engineers, developer tooling architects, and automation consultants.",
    practicalProjectToBuild: "Create a private MCP server exposing your company's PostgreSQL schema and run queries through an AI client securely.",
    status: "Reference topic",
  },
  {
    id: "news-3",
    headline: "Small Specialized Models (SLMs) and Local Inference Surge in Enterprise Adoption",
    category: "Ecosystem Releases",
    date: "Date not checked",
    whatHappened: "High-performance open-weights models (7B-14B) running via Ollama and vLLM now match previous-generation massive frontier models on specific classification and coding tasks.",
    whyItMatters: "Allows enterprises to process sensitive private data locally on modest GPU hardware without external API egress costs.",
    whoShouldCare: "Privacy-focused software engineers, healthcare/legal developers, and cost-conscious startups.",
    practicalProjectToBuild: "Set up a local Ollama container processing sensitive mock medical records with 100% offline isolation.",
    status: "Reference topic",
  },
];

export const WIZARD_QUESTIONS: WizardQuestion[] = [
  {
    id: "interest",
    title: "What technology domain sparks your interest most?",
    subtitle: "Select the area you feel most curious about exploring right now.",
    options: [
      { id: "ai", label: "Artificial Intelligence & LLMs", description: "Building AI agents, prompt systems, document intelligence, and smart applications.", tags: ["ai", "python", "data"] },
      { id: "web", label: "Web & Full-Stack Development", description: "Crafting beautiful interactive websites, web applications, and customer portals.", tags: ["web", "frontend", "backend"] },
      { id: "data", label: "Data Science & Business Dashboards", description: "Analyzing numbers, finding patterns, and presenting executive visual insights.", tags: ["data", "sql", "bi"] },
      { id: "cyber", label: "Cybersecurity & Ethical Defense", description: "Securing systems, inspecting networks, testing vulnerabilities, and protecting data.", tags: ["cyber", "security", "linux"] },
      { id: "automation", label: "Business Automation & Tech Services", description: "Connecting APIs, eliminating repetitive tasks, and building client side hustles.", tags: ["automation", "nocode", "sidehustle"] },
      { id: "cloud", label: "Cloud Systems & DevOps", description: "Deploying scalable server infrastructure, containers, and high-availability systems.", tags: ["cloud", "devops", "docker"] },
    ],
  },
  {
    id: "experience",
    title: "What is your current level of programming experience?",
    subtitle: "Be completely honest—there are excellent starting points for every level.",
    options: [
      { id: "none", label: "Absolute Beginner", description: "Zero prior coding experience or only dabbled in spreadsheets/visual tools.", tags: ["beginner", "foundational"] },
      { id: "some", label: "Some Coding Experience", description: "Familiar with basic variables, loops, and HTML/CSS or introductory Python.", tags: ["intermediate", "transition"] },
      { id: "experienced", label: "Practicing Developer", description: "Comfortable building applications in at least one modern programming language.", tags: ["advanced", "systems"] },
    ],
  },
  {
    id: "goal",
    title: "What is your primary practical objective?",
    subtitle: "Your goal determines whether you should focus on deep theory, rapid portfolio building, or commercial services.",
    options: [
      { id: "career", label: "Career Transition or Tech Job", description: "Preparing to qualify for junior or mid-level software/AI engineering positions.", tags: ["job", "deep"] },
      { id: "sidehustle", label: "Freelancing & Client Side Hustles", description: "Providing practical technical services to small businesses and founders.", tags: ["commercial", "freelance"] },
      { id: "project", label: "Build a Specific Project or Startup", description: "Bringing an idea, MVP, or university capstone project to life.", tags: ["mvp", "practical"] },
      { id: "exploration", label: "Broad Technical Literacy", description: "Understanding how modern technology works to communicate better at work.", tags: ["literacy", "overview"] },
    ],
  },
  {
    id: "learning_style",
    title: "How do you learn best?",
    subtitle: "Choose the learning modality that keeps you motivated and engaged.",
    options: [
      { id: "hands_on", label: "Building Real Projects from Day 1", description: "Learn by doing, troubleshooting bugs, and shipping working software.", tags: ["projects"] },
      { id: "structured", label: "Structured Step-by-Step Curriculum", description: "Clear sequence, reading documentation, guided exercises, and milestones.", tags: ["structured"] },
      { id: "visual", label: "Visual & Interactive Tools First", description: "Drag-and-drop builders, visual workflows, and low-code accelerators.", tags: ["visual"] },
    ],
  },
  {
    id: "time",
    title: "How much study time can you commit weekly?",
    subtitle: "Consistency is vastly more important than cramming.",
    options: [
      { id: "low", label: "3 to 5 hours / week", description: "Light part-time exploration around a busy full-time schedule.", tags: ["part_time"] },
      { id: "medium", label: "8 to 15 hours / week", description: "Dedicated evening and weekend study for steady progression.", tags: ["regular"] },
      { id: "high", label: "20+ hours / week", description: "Intensive focus or full-time career sprint.", tags: ["intensive"] },
    ],
  },
  {
    id: "budget",
    title: "What is your preferred budget for external tools & exams?",
    subtitle: "Every fundamental skill can be learned 100% free with open-source tools.",
    options: [
      { id: "free", label: "100% Free Resources & Open-Source Only", description: "Zero spending on paid courses or proprietary tools.", tags: ["free"] },
      { id: "modest", label: "Modest Budget for Hosting & Tools ($10-$30/mo)", description: "Comfortable paying for domain names, cloud VPS, or API credits.", tags: ["modest"] },
      { id: "pro", label: "Willing to Invest in Professional Certifications", description: "Budget available for official vendor exam vouchers (AWS, Azure, CompTIA).", tags: ["pro"] },
    ],
  },
];

export const RECOMMENDATION_BLUEPRINTS: Record<string, WizardRecommendation> = {
  "ai": {
    id: "rec-ai",
    title: "Generative AI & LLM Solutions Engineer Track",
    category: "AI & Machine Learning",
    fitScore: 96,
    whyItFits: "Matches your passion for modern intelligence models, combining practical Python workflows with frontier API tool calling and document intelligence.",
    prerequisites: ["Python fundamentals", "Understanding of API calls and JSON"],
    learnFirst: "Python 3.12 syntax, virtual environments, and Google GenAI / Gemini API text generation.",
    achievableStarterProject: "Automated Tech Job Description Analyzer that extracts structured salary and skill requirements from raw text.",
    nextMilestone: "Build a semantic document QA search engine over your own PDF notes using vector embeddings and PostgreSQL pgvector.",
    matchedToolIds: ["lang-python", "ai-gemini-sdk", "db-postgres-pgvector", "back-fastapi"],
  },
  "web": {
    id: "rec-web",
    title: "Modern Full-Stack React & Next.js Engineer Track",
    category: "Web Development",
    fitScore: 94,
    whyItFits: "Perfect balance of visual creativity and engineering rigor, giving you the power to build and ship complete web applications from scratch.",
    prerequisites: ["Basic computer literacy", "Curiosity about browser layout and interactivity"],
    learnFirst: "HTML5 semantic tags, responsive Tailwind CSS layouts, and modern JavaScript functions.",
    achievableStarterProject: "Responsive Personal Portfolio and Habit Tracker UI deployed live on Vercel with clean mobile styling.",
    nextMilestone: "Full-Stack Next.js App Router application with user authentication, PostgreSQL database, and dark/light design system.",
    matchedToolIds: ["front-react", "front-tailwind", "lang-typescript", "db-postgres-pgvector"],
  },
  "data": {
    id: "rec-data",
    title: "Modern Data Analyst & Business Intelligence Track",
    category: "Data & BI",
    fitScore: 92,
    whyItFits: "Direct pathway to high-value organizational impact by turning confusing spreadsheets into executive decision dashboards.",
    prerequisites: ["Comfortable with numbers and basic spreadsheet calculations"],
    learnFirst: "SQL SELECT queries, filtering, aggregations, and Power BI / Looker Studio visual design.",
    achievableStarterProject: "Interactive Tech Salary & Remote Work Trends Dashboard with filterable salary percentiles.",
    nextMilestone: "End-to-end cohort retention analysis script in Python pandas with automated monthly PDF reports.",
    matchedToolIds: ["lang-sql", "data-pandas-bi", "lang-python"],
  },
  "cyber": {
    id: "rec-cyber",
    title: "Ethical Security Testing & Cyber Defense Track",
    category: "Cybersecurity",
    fitScore: 95,
    whyItFits: "High-integrity, mission-critical discipline focused on understanding computer networks, discovering vulnerabilities, and hardening systems.",
    prerequisites: ["Curiosity about how the internet works under the hood", "Patience with command-line tools"],
    learnFirst: "TCP/IP networking handshakes, Linux terminal navigation, and the OWASP Top 10 vulnerabilities.",
    achievableStarterProject: "Automated Website Security Header and SSL Audit CLI tool written in Python.",
    nextMilestone: "Complete PortSwigger Web Security Academy practitioner labs and submit an authorized penetration test report on OWASP Juice Shop.",
    matchedToolIds: ["sec-owasp-burp", "lang-python", "cloud-docker"],
  },
  "automation": {
    id: "rec-automation",
    title: "AI Business Automation & Client Services Launchpad",
    category: "Freelance & Consulting",
    fitScore: 98,
    whyItFits: "The fastest route to monetizable technical skills, allowing you to solve real operations bottlenecks for small businesses without months of raw syntax struggle.",
    prerequisites: ["Understanding of webhooks and basic spreadsheet logic"],
    learnFirst: "n8n or Make trigger-action workflows, webhook listening, and connecting LLM APIs for text classification.",
    achievableStarterProject: "Automated Customer Support Ticket Classifier & SLA Notification System.",
    nextMilestone: "Deliver your first end-to-end client workflow: automatic invoice data extraction into Google Sheets with WhatsApp/Slack alerts.",
    matchedToolIds: ["nocode-n8n-make", "ai-gemini-sdk", "hustle-ai-automation", "hustle-web-dev"],
  },
  "cloud": {
    id: "rec-cloud",
    title: "Cloud Infrastructure, Containers & DevOps Track",
    category: "Cloud & DevOps",
    fitScore: 93,
    whyItFits: "Focuses on the engine room of modern software—automating deployments, packaging applications with Docker, and architecting resilient clusters.",
    prerequisites: ["Basic Linux command line familiarity", "Understanding of client-server networking"],
    learnFirst: "Docker containerization, writing clean multi-stage Dockerfiles, and docker compose orchestration.",
    achievableStarterProject: "Reproducible Full-Stack Local Development Environment running frontend, API, database, and Redis with one command.",
    nextMilestone: "Kubernetes pod autoscaling and automated GitHub Actions CI/CD pipeline deploying to cloud infrastructure.",
    matchedToolIds: ["cloud-docker", "cloud-k8s", "lang-go", "gov-cloud-certs"],
  },
};
