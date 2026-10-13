import {
  CareerRole,
  SkillGapItem,
  AssessmentQuestion,
  RoadmapPhase,
  IndustryProject,
  InterviewQuestion,
  UserProfile,
} from "./types";

export const initialUserProfile: UserProfile = {
  id: "",
  name: "",
  email: "",
  targetRole: "",
  experienceLevel: "",
  readinessScore: 0,
  weeklyHours: 0,
  currentStreakDays: 0,
  verifiedBadgesCount: 0,
  githubUrl: "",
  linkedinUrl: "",
  portfolioSlug: "",
  bio: "",
  skills: {},
};

export const careerRolesList: CareerRole[] = [
  {
    id: "ai-solutions-architect",
    title: "AI Solutions Architect",
    category: "AI & ML",
    description: "Designs enterprise-grade AI ecosystems, neural pipeline integrations, high-throughput model serving, and secure vector search architectures.",
    keySkills: ["System Design", "LLMs & RAG", "Python", "Cloud Architecture", "Vector Databases", "API Security"],
  },
  {
    id: "machine-learning-engineer",
    title: "Senior ML & MLOps Engineer",
    category: "AI & ML",
    description: "Translates research models into reliable production endpoints. Owns training loops, model quantization, Kubeflow pipelines, and inference optimization.",
    keySkills: ["PyTorch", "Python", "MLOps", "Docker & K8s", "Model Quantization", "CUDA"],
  },
  {
    id: "fullstack-ai-engineer",
    title: "Full-Stack AI Application Engineer",
    category: "Software Engineering",
    description: "Builds responsive, streaming AI interfaces using Next.js, WebSockets, Python microservices, Supabase authentication, and vector embeddings.",
    keySkills: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Prompt Engineering"],
  },
  {
    id: "quantitative-analyst",
    title: "Quant Developer & Financial Analyst",
    category: "Data & Quant",
    description: "Engineers stochastic pricing algorithms, high-frequency tick databases, statistical arbitrage backtests, and high-performance C++/Python calculations.",
    keySkills: ["Advanced Math & Stats", "Python", "C++", "SQL & Time Series", "Risk Modeling"],
  },
  {
    id: "distributed-systems-engineer",
    title: "Distributed Systems & Cloud Engineer",
    category: "Systems & Security",
    description: "Constructs fault-tolerant, resilient backend architectures, consensus mechanisms (Raft), message queues (Kafka), and cloud scaling primitives.",
    keySkills: ["Go / Rust", "Kubernetes", "Kafka", "Distributed Consensus", "gRPC", "Observability"],
  },
];

export const skillGapsList: SkillGapItem[] = [
  {
    skill: "PyTorch & Deep Learning Primitives",
    category: "Machine Learning",
    actionableStep: "Build custom neural network autograd layers and train a Transformer classifier from scratch on GPU.",
    recommendedResource: "Talviora Neural Lab: Modules 4-7 & PyTorch Docs",
  },
  {
    skill: "Production System Design & Microservices",
    category: "Architecture",
    actionableStep: "Design distributed caching with Redis, write-ahead logs, idempotency keys, and database partitioning strategies.",
    recommendedResource: "Talviora System Blueprint: High-Throughput Model Serving",
  },
  {
    skill: "Docker, Kubernetes & MLOps Pipelines",
    category: "DevOps",
    actionableStep: "Containerize a multi-container FastAPI + Triton inference server with health checks, Docker Compose, and CI/CD tests.",
    recommendedResource: "Talviora Infrastructure Sprint: Docker to Production",
  },
  {
    skill: "SQL Optimization & PostgreSQL Indexing",
    category: "Data Engineering",
    actionableStep: "Analyze EXPLAIN ANALYZE query plans, B-Tree vs GIN indexes for pgvector, and partition high-volume audit logs.",
    recommendedResource: "PostgreSQL Advanced Performance Mastery",
  },
  {
    skill: "Advanced Graph & Dynamic Programming DSA",
    category: "Computer Science",
    actionableStep: "Solve 25 targeted medium/hard problems covering Dijkstra, Topological Sort, Memoization, and Knapsack variations.",
    recommendedResource: "Talviora DSA Sprint Tracker: Module 8",
  },
];

export const assessmentQuestionsList: AssessmentQuestion[] = [
  {
    id: 1,
    category: "Web & API Architecture",
    title: "Client-Side vs Server-Side Execution",
    expectedTask: "Explain the architectural boundary between client and server code in modern web applications.",
    taskType: "explain",
    difficulty: "Foundational",
    questionType: "Foundational Knowledge",
    question:
      "When a user signs in or submits a credit card payment on a website, which part of the application must be responsible for validating secrets, charging the card, and writing changes to the database?",
    codeSnippet: `// Client (Browser) vs Server (Backend) Boundary
function handleCheckout(paymentDetails) {
  // Where must payment verification and database writes happen?
  // Option 1: Browser JavaScript
  // Option 2: Trusted Backend Server
}`,
    explanation:
      "Security-critical operations like credential verification and payment processing must always occur on a trusted server. Client-side browser code can be inspected, modified, or bypassed by anyone using developer tools.",
    hint: "Think about who controls the environment: the user's browser is untrusted, while your server is a secure, private environment.",
    options: [
      {
        label: "A",
        text: "The backend server, because client browser code can be inspected and altered by any user.",
        weight: 25,
        skillTags: ["Web Architecture", "API Security", "Backend Development"],
      },
      {
        label: "B",
        text: "The user's web browser, using JavaScript stored inside localStorage to save hosting costs.",
        weight: 5,
        skillTags: ["Frontend"],
      },
      {
        label: "C",
        text: "The DNS server that translated the domain name into an IP address.",
        weight: 0,
        skillTags: ["Networking"],
      },
      {
        label: "D",
        text: "The CSS stylesheet that styled the checkout button layout.",
        weight: 0,
        skillTags: ["Frontend"],
      },
    ],
  },
  {
    id: 2,
    category: "AI & Machine Learning Foundations",
    title: "Text Embeddings & Semantic Meaning",
    expectedTask: "Choose the accurate explanation of how text embeddings represent meaning for AI applications.",
    taskType: "choose",
    difficulty: "Foundational",
    questionType: "Foundational Knowledge",
    question:
      "Modern AI systems convert sentences into 'vector embeddings' before searching or generating text. What does an embedding actually represent, and why is it useful?",
    codeSnippet: `// Converting natural language to vector coordinates
const vectorA = embed("automobile maintenance");
const vectorB = embed("car repair");
// Result: vectorA and vectorB have high mathematical similarity (~0.93)`,
    explanation:
      "An embedding is a list of numbers representing coordinates in a semantic concept space. Because computers understand numbers better than raw text, embeddings allow programs to determine that 'automobile maintenance' and 'car repair' mean nearly the same thing, even without shared words.",
    hint: "Notice that 'automobile' and 'car' share zero letters, yet an AI understands they are closely related.",
    options: [
      {
        label: "A",
        text: "A list of numeric coordinates capturing semantic meaning, allowing computers to measure mathematical similarity between phrases.",
        weight: 25,
        skillTags: ["AI & ML", "Vector Databases", "LLMs & RAG"],
      },
      {
        label: "B",
        text: "An encrypted hash string like SHA-256 used strictly to scramble passwords in transit.",
        weight: 5,
        skillTags: ["Cybersecurity"],
      },
      {
        label: "C",
        text: "An exact alphabetical count of vowels and consonants in each sentence.",
        weight: 0,
        skillTags: ["Data Structures"],
      },
      {
        label: "D",
        text: "A compressed video file that plays back a model's training process.",
        weight: 0,
        skillTags: ["AI & ML"],
      },
    ],
  },
  {
    id: 3,
    category: "Full-Stack Web & Streaming UX",
    title: "Streaming AI Responses with React & Next.js",
    expectedTask: "Choose the component structure that renders static content immediately while streaming dynamic AI text.",
    taskType: "choose",
    difficulty: "Intermediate",
    questionType: "Practical Problem-Solving",
    question:
      "You are building an AI learning assistant that displays a user's static profile header alongside a live, streaming AI response. How should you structure your React and Next.js components so the page displays immediately without waiting for the full AI response to finish?",
    codeSnippet: `// Next.js App Router streaming architecture
export default function AssistantPage() {
  return (
    <div>
      <UserProfileHeader user={currentUser} />
      <Suspense fallback={<LoadingSpinner />}>
        <StreamingAiAssistant prompt={prompt} />
      </Suspense>
    </div>
  );
}`,
    explanation:
      "React Server Components with Suspense allow the static layout (the profile header) to render immediately. Meanwhile, the dynamic AI assistant streams generated tokens across HTTP as they arrive using a ReadableStream, giving users an instant, responsive experience.",
    hint: "Look at the Suspense boundary: it lets part of the page show right away while other parts load asynchronously in the background.",
    options: [
      {
        label: "A",
        text: "Render the static profile immediately on the server, and wrap the AI response in a React Suspense boundary that streams tokens over a ReadableStream.",
        weight: 25,
        skillTags: ["Next.js", "TypeScript", "Frontend Architecture"],
      },
      {
        label: "B",
        text: "Block page loading until the AI finishes generating its entire answer, displaying a blank screen for 8 seconds.",
        weight: 5,
        skillTags: ["Frontend Architecture"],
      },
      {
        label: "C",
        text: "Fetch tokens using rapid, un-debounced polling every 10 milliseconds inside a raw useEffect hook.",
        weight: 0,
        skillTags: ["Frontend"],
      },
      {
        label: "D",
        text: "Pre-render the entire AI conversation statically at build time with hardcoded mock answers.",
        weight: 0,
        skillTags: ["Frontend"],
      },
    ],
  },
  {
    id: 4,
    category: "Search Systems & Scale",
    title: "Indexing 10 Million Records for Sub-100ms Search",
    expectedTask: "Compare indexing strategies to balance fast query speed with accurate search recall at scale.",
    taskType: "compare",
    difficulty: "Intermediate",
    questionType: "Practical Problem-Solving",
    question:
      "You need to build a search feature that searches through 10 million document records. Users require search results within 100 milliseconds. Which indexing approach provides the best balance of fast query response time and high search accuracy?",
    codeSnippet: `// Vector Search Index Configuration
const searchConfig = {
  totalRecords: 10_000_000,
  targetLatencyMs: 100,
  indexStructure: ??? // Which structure provides sub-linear retrieval?
};`,
    explanation:
      "Scanning 10 million items one-by-one (brute force) takes multiple seconds per query. Graph-based indexes like HNSW (Hierarchical Navigable Small World) cluster vectors into navigable layers, allowing queries to find top results in logarithmic/sub-linear time (milliseconds) rather than scanning all records.",
    hint: "Think about looking up a word in an organized index vs reading every single page of a 10,000-page book.",
    options: [
      {
        label: "A",
        text: "An Approximate Nearest Neighbor graph index (such as HNSW) combined with vector quantization for sub-linear search time.",
        weight: 25,
        skillTags: ["System Design", "Vector Databases", "LLMs & RAG"],
      },
      {
        label: "B",
        text: "A brute-force scan that calculates distances against every single record sequentially on each request.",
        weight: 5,
        skillTags: ["System Design"],
      },
      {
        label: "C",
        text: "Downloading all 10 million records to the user's browser localStorage and filtering with a JavaScript loop.",
        weight: 0,
        skillTags: ["Frontend"],
      },
      {
        label: "D",
        text: "Opening a raw CSV file and running regular expressions across it on every search.",
        weight: 0,
        skillTags: ["Backend Development"],
      },
    ],
  },
  {
    id: 5,
    category: "Code Reading & Debugging",
    title: "Debugging an Asynchronous State Bug",
    expectedTask: "Debug this JavaScript function and identify why it returns 'Hello undefined' or displays stale data.",
    taskType: "debug",
    difficulty: "Intermediate",
    questionType: "Code Reading & Debugging",
    question:
      "A developer wrote the function below to fetch a user profile and return a greeting. However, users report that the function consistently returns 'Hello undefined'. What is the bug in this code?",
    codeSnippet: `function getUserGreeting(userId) {
  let profile = null;
  fetch('/api/users/' + userId)
    .then(response => response.json())
    .then(data => {
      profile = data;
    });
  return "Hello " + profile.name;
}`,
    explanation:
      "Network fetch requests are asynchronous. In the snippet, 'return Hello + profile.name' executes immediately on the main thread before the server network response arrives. Because profile is still null when return runs, the code fails. The fix is to use async/await or return the Promise chain.",
    hint: "Pay attention to when the .then() callback runs compared to when the final return statement executes.",
    options: [
      {
        label: "A",
        text: "The return statement runs synchronously before the network request resolves, accessing profile while it is still null.",
        weight: 25,
        skillTags: ["TypeScript", "Frontend", "Debugging"],
      },
      {
        label: "B",
        text: "The '+' concatenation operator cannot be used with string variables in JavaScript.",
        weight: 5,
        skillTags: ["TypeScript"],
      },
      {
        label: "C",
        text: "The userId argument must be converted to Roman numerals before making a web request.",
        weight: 0,
        skillTags: ["TypeScript"],
      },
      {
        label: "D",
        text: "Fetch requests are only allowed inside CSS files, not JavaScript.",
        weight: 0,
        skillTags: ["Web Architecture"],
      },
    ],
  },
  {
    id: 6,
    category: "Database Concurrency & Integrity",
    title: "Debugging an E-Commerce Race Condition",
    expectedTask: "Debug this database transaction to prevent two concurrent buyers from purchasing the same remaining item.",
    taskType: "debug",
    difficulty: "Intermediate",
    questionType: "Code Reading & Debugging",
    question:
      "During a product drop, exactly 1 item remains in stock. Two shoppers click 'Purchase' at the exact same millisecond. Look at the database transaction below. Why does this code allow both shoppers to complete the purchase (overselling by 1), and how do you fix it?",
    codeSnippet: `BEGIN TRANSACTION;
-- Step 1: Read current stock count
SELECT stock FROM inventory WHERE item_id = 101;
-- Step 2: (Application check: if stock > 0 ...)
-- Step 3: Decrement stock
UPDATE inventory SET stock = stock - 1 WHERE item_id = 101;
COMMIT;`,
    explanation:
      "Without locking or an atomic condition, both parallel queries read stock = 1 before either executes the UPDATE. Both pass the check and decrement the count to 0, resulting in two sales. The fix is to add row-level locking (SELECT ... FOR UPDATE) or use an atomic guard: 'UPDATE ... WHERE item_id = 101 AND stock > 0'.",
    hint: "What happens if Transaction B executes Step 1 before Transaction A executes Step 3?",
    options: [
      {
        label: "A",
        text: "Both transactions read stock = 1 before either writes an update. Fix it with 'SELECT ... FOR UPDATE' or an atomic check 'AND stock > 0'.",
        weight: 25,
        skillTags: ["SQL", "Database Optimization", "System Design"],
      },
      {
        label: "B",
        text: "SQL table names must be enclosed in double dollar signs to prevent simultaneous reads.",
        weight: 5,
        skillTags: ["SQL"],
      },
      {
        label: "C",
        text: "Remove the COMMIT statement so the database discards the purchase after completion.",
        weight: 0,
        skillTags: ["SQL"],
      },
      {
        label: "D",
        text: "Run the database transaction inside client-side localStorage on the buyer's phone.",
        weight: 0,
        skillTags: ["Frontend"],
      },
    ],
  },
  {
    id: 7,
    category: "System Resilience & Production Operations",
    title: "Handling 50x Traffic Spikes Under Pressure",
    expectedTask: "Compare API gateway patterns and choose the strategy that protects servers from crashing during traffic spikes.",
    taskType: "compare",
    difficulty: "Advanced",
    questionType: "Scenario-Based",
    question:
      "A marketing campaign causes API traffic to surge 50 times beyond normal volume within 3 minutes. Your database CPU hits 98% and response times degrade rapidly. Which gateway architecture pattern best protects the system from cascading failure?",
    codeSnippet: `// Real-world traffic incident
const currentRPS = 50_000; // Normal traffic: 1,000 requests/sec
const databaseLoad = 0.98; // 98% CPU utilization
// How should the API gateway respond?`,
    explanation:
      "When servers are overloaded, allowing requests to queue up indefinitely causes out-of-memory crashes. Implementing rate limiting (Token Bucket) caps traffic to manageable rates, Circuit Breakers fail fast on failing services to give them time to recover, and asynchronous queues absorb burst traffic safely.",
    hint: "Think about crowd control at an event: letting everyone push into a crowded room causes a stampede. You need a turnstile (rate limiter) and an orderly waiting line (queue).",
    options: [
      {
        label: "A",
        text: "Implement rate limiting (e.g. Token Bucket in Redis), activate Circuit Breakers to fail fast on overloaded services, and queue non-critical tasks asynchronously.",
        weight: 25,
        skillTags: ["Algorithms & DSA", "System Design", "Cloud & DevOps"],
      },
      {
        label: "B",
        text: "Increase server request timeout to 120 seconds so all 50,000 requests wait in server RAM simultaneously.",
        weight: 5,
        skillTags: ["System Design"],
      },
      {
        label: "C",
        text: "Disable all HTTPS security certificates to reduce server cryptographic math.",
        weight: 0,
        skillTags: ["Cybersecurity"],
      },
      {
        label: "D",
        text: "Hard reboot the main database every 60 seconds whenever CPU usage exceeds 50%.",
        weight: 0,
        skillTags: ["Cloud & DevOps"],
      },
    ],
  },
  {
    id: 8,
    category: "Distributed Systems & Fault Tolerance",
    title: "Distributed Idempotency & Network Retries",
    expectedTask: "Explain how to guarantee that a payment executes exactly once despite automatic client network retries.",
    taskType: "explain",
    difficulty: "Advanced",
    questionType: "Advanced Challenge",
    question:
      "In a mobile banking application, a user taps 'Transfer $50'. The server successfully charges the account, but a mobile network disconnect drops the confirmation response before reaching the user's screen. The user's app automatically retries the request 3 seconds later. How do you guarantee the customer is not charged a second time?",
    codeSnippet: `// Client retry with Idempotency Key
POST /api/v1/transfers
Headers:
  Authorization: Bearer <token>
  Idempotency-Key: "txn_order_99482_attempt1"
Body: { "recipient": "acc_481", "amount": 5000 }`,
    explanation:
      "An Idempotency Key is a unique identifier generated by the client for an operation. The server records the key alongside the initial transaction result. When a retry arrives with the identical key, the server recognizes the operation was already completed and returns the original cached result without re-executing the transfer.",
    hint: "If you give the server a unique receipt number for the request, the server can check whether it already processed that exact receipt.",
    options: [
      {
        label: "A",
        text: "Require a unique client-generated Idempotency Key stored with the transaction; on duplicates, return the original cached result without re-executing.",
        weight: 25,
        skillTags: ["System Design", "API Security", "Cloud & DevOps"],
      },
      {
        label: "B",
        text: "Disable client network retries entirely and display a generic failure notice whenever any packet drops.",
        weight: 5,
        skillTags: ["System Design"],
      },
      {
        label: "C",
        text: "Inspect the user's battery percentage and reject payments if the battery is below 20%.",
        weight: 0,
        skillTags: ["Frontend"],
      },
      {
        label: "D",
        text: "Execute every incoming charge regardless of duplicates and let customer support manually issue refunds later.",
        weight: 0,
        skillTags: ["Backend Development"],
      },
    ],
  },
];


export const roadmapPhasesList: RoadmapPhase[] = [
  {
    phaseNumber: 1,
    phaseTitle: "Foundations of High-Performance Engineering & Data Structures",
    status: "not-started",
    durationWeeks: "Weeks 1 - 4",
    estimatedHours: 48,
    modules: [
      {
        id: "m-101",
        title: "Advanced Python Metaprogramming & Type Hinting",
        description: "Decorators, generators, context managers, async IO, and strict typing with mypy.",
        hours: 10,
        completed: false,
        resourceLink: "https://docs.python.org/3/library/asyncio.html",
      },
      {
        id: "m-102",
        title: "Algorithmic Patterns: Two Pointers, Sliding Window & Heaps",
        description: "Mastering array optimizations, monotonic queues, and binary search boundaries.",
        hours: 14,
        completed: false,
      },
      {
        id: "m-103",
        title: "Relational Schema Design, B-Trees & Index Tuning",
        description: "PostgreSQL internal architecture, WAL, EXPLAIN ANALYZE, and composite indexes.",
        hours: 12,
        completed: false,
      },
      {
        id: "m-104",
        title: "REST & gRPC Microservice Contracts",
        description: "Building production endpoints with FastAPI, Pydantic v2 schemas, and protocol buffers.",
        hours: 12,
        completed: false,
      },
    ],
  },
  {
    phaseNumber: 2,
    phaseTitle: "Applied Deep Learning & PyTorch Model Architectures",
    status: "not-started",
    durationWeeks: "Weeks 5 - 8",
    estimatedHours: 52,
    modules: [
      {
        id: "m-201",
        title: "PyTorch Tensors, Autograd & Custom Training Loops",
        description: "Writing robust nn.Module classes, custom datasets, DataLoader workers, and GPU training.",
        hours: 14,
        completed: false,
      },
      {
        id: "m-202",
        title: "Transformer Deep Dive: Attention, Positional Encoding & Heads",
        description: "Implementing scaled dot-product attention and multi-head attention from scratch.",
        hours: 16,
        completed: false,
      },
      {
        id: "m-203",
        title: "Model Quantization, LoRA & Parameter-Efficient Fine-Tuning",
        description: "Quantizing 7B models with bitsandbytes (4-bit, 8-bit), QLoRA, and PEFT library.",
        hours: 12,
        completed: false,
      },
      {
        id: "m-204",
        title: "Vector Search Foundations & Embeddings (pgvector / FAISS)",
        description: "Chunking strategies, cosine similarity math, HNSW index parameters, and hybrid lexical search.",
        hours: 10,
        completed: false,
      },
    ],
  },
  {
    phaseNumber: 3,
    phaseTitle: "Distributed Systems, Enterprise RAG & Agentic Workflows",
    status: "not-started",
    durationWeeks: "Weeks 9 - 12",
    estimatedHours: 56,
    modules: [
      {
        id: "m-301",
        title: "Production RAG Architecture: Reranking & Context Compression",
        description: "Integrating Cohere/BGE cross-encoders, reciprocal rank fusion (RRF), and hallucination guardrails.",
        hours: 16,
        completed: false,
      },
      {
        id: "m-302",
        title: "Agentic Tool Use, Function Calling & State Graphs",
        description: "Building autonomous agents with LangGraph / LlamaIndex, loop limits, and state rollbacks.",
        hours: 14,
        completed: false,
      },
      {
        id: "m-303",
        title: "Caching Layers with Redis & Semantic Embedding Caching",
        description: "Reducing LLM inferencing latency by 70% using semantic cache hits with vector thresholding.",
        hours: 12,
        completed: false,
      },
      {
        id: "m-304",
        title: "System Design for 100k+ Concurrent AI Queries",
        description: "Load balancing, streaming SSE backpressure, rate-limiting tokens, and graceful degradation.",
        hours: 14,
        completed: false,
      },
    ],
  },
  {
    phaseNumber: 4,
    phaseTitle: "Production MLOps, CI/CD, Observability & Deployment",
    status: "not-started",
    durationWeeks: "Weeks 13 - 16",
    estimatedHours: 44,
    modules: [
      {
        id: "m-401",
        title: "Containerization with Docker & Multi-Stage Builds",
        description: "Creating minimal distroless Docker images for Python and Next.js applications.",
        hours: 10,
        completed: false,
      },
      {
        id: "m-402",
        title: "Kubernetes Deployments, HPA & Ingress Controllers",
        description: "Deploying inference pods with Horizontal Pod Autoscaling based on GPU utilization.",
        hours: 12,
        completed: false,
      },
      {
        id: "m-403",
        title: "LLM Observability with OpenTelemetry & Tracing",
        description: "Logging token usage, latency percentiles (p50, p95, p99), and trace trees with Langfuse/Arize.",
        hours: 12,
        completed: false,
      },
      {
        id: "m-404",
        title: "Portfolio Verification & Mock Technical Screenings",
        description: "End-to-end system design interview simulations, code defenses, and public portfolio deployment.",
        hours: 10,
        completed: false,
      },
    ],
  },
];

export const industryProjectsList: IndustryProject[] = [
  {
    id: "proj-rag-enterprise",
    title: "Enterprise Hybrid RAG Engine with Semantic Caching & Hallucination Guardrails",
    tagline: "Sub-80ms document intelligence system with reciprocal rank fusion and vector indexing.",
    difficulty: "Production-Grade",
    estimatedHours: 35,
    techStack: ["Next.js 15", "FastAPI", "pgvector", "Redis", "Google Gemini API", "Docker"],
    architecturalOverview: "An enterprise document ingestion pipeline that parses multi-format PDFs, computes embeddings asynchronously via Celery workers, persists chunk vectors to PostgreSQL (pgvector) using HNSW indexing, and executes hybrid search (BM25 + Dense Cosine). Features a Redis semantic cache layer that checks cosine similarity of queries before dispatching to LLMs, cutting inference API costs by 68%.",
    architectureDiagramType: "Microservices & Distributed Vector Store",
    deliverables: [
      "FastAPI backend with streaming Server-Sent Events (SSE) endpoints",
      "Next.js App Router front-end with responsive chat UI and citation footnotes",
      "PostgreSQL pgvector schema with HNSW index configuration and migration scripts",
      "Redis semantic caching middleware with configurable cosine similarity threshold",
      "Automated evaluation test suite assessing hallucination rate using RAGAS metrics",
      "GitHub repository README with architecture diagram and docker-compose deployment file",
    ],
    rubricCriteria: [
      "Inference Latency: Sub-100ms for cached queries, sub-1.2s for cold queries",
      "Vector Recall: Top-5 retrieval precision > 88% on benchmark query set",
      "Code Quality: Type-safe schemas with Pydantic v2 and TypeScript interfaces",
      "Security: Environment secrets handling and API key rotation safeguards",
    ],
    githubTemplateUrl: "https://github.com/talviora-tech/enterprise-rag-blueprint",
    liveDemoUrl: "https://rag-demo.talviora.tech",
  },
  {
    id: "proj-stream-feature-store",
    title: "Real-Time Feature Store & Distributed Event Pipeline",
    tagline: "High-throughput stream processing engine for financial & ML feature engineering.",
    difficulty: "Advanced",
    estimatedHours: 28,
    techStack: ["Python", "Apache Kafka", "Redis", "PostgreSQL", "Docker", "FastAPI"],
    architecturalOverview: "Architects a dual-storage feature store separating low-latency online serving (Redis) from historical offline batch analytics (PostgreSQL/DuckDB). Ingests clickstream and transaction events via Kafka topics, computes rolling aggregates (e.g., 5-minute sliding window fraud scores), and serves feature vectors with <5ms p99 latency.",
    architectureDiagramType: "Event-Driven Kappa Architecture",
    deliverables: [
      "Kafka producer generating synthetic event streams with configurable throughput",
      "Stream consumer processing windowed aggregates and writing to Redis feature tables",
      "Low-latency REST / gRPC feature retrieval API with point-in-time correctness",
      "Comprehensive benchmark report documenting latency under 5,000 requests/sec load",
    ],
    rubricCriteria: [
      "Point-in-Time Correctness: Zero data leakage between train/test intervals",
      "Throughput Resilience: Graceful backpressure handling during ingestion spikes",
    ],
  },
  {
    id: "proj-distributed-crawler",
    title: "Fault-Tolerant Distributed Web Scraper & Knowledge Graph Builder",
    tagline: "Distributed worker cluster extracting unstructured web data into structured Neo4j graph nodes.",
    difficulty: "Production-Grade",
    estimatedHours: 32,
    techStack: ["Python", "RabbitMQ", "Neo4j", "Docker Swarm", "Playwright"],
    architecturalOverview: "Coordinated cluster of headless browser workers with distributed work-stealing queues, politeness delays, proxy rotation, and entity extraction to construct a live knowledge graph of tech job market requirements.",
    architectureDiagramType: "Distributed Worker Pool with Graph Database",
    deliverables: [
      "Work coordinator with deduplication Bloom filters",
      "Worker nodes handling dynamic JavaScript rendering and HTML sanitization",
      "Entity extraction pipeline mapping raw job descriptions to standardized skills taxonomy",
      "Interactive Neo4j graph visualization dashboard",
    ],
    rubricCriteria: [
      "Deduplication Accuracy: Zero duplicate URL fetches across 100k page crawls",
      "Fault Recovery: Automatic dead-letter recovery when worker nodes crash",
    ],
  },
];


export const interviewQuestionsList: InterviewQuestion[] = [
  {
    id: "iq-101",
    role: "AI Solutions Architect",
    category: "Technical Architecture",
    prompt: "Design a scalable RAG infrastructure for an enterprise with 50,000 employees searching confidential documents. How do you handle role-based document permissions (RBAC) during vector similarity retrieval without leaking private chunks?",
    sampleAnswerOverview: "Pre-filtering vs post-filtering metadata in vector indexes: Store tenant ID and ACL security group hashes in vector payload metadata. Apply boolean filters during HNSW graph traversal rather than filtering after top-k retrieval to eliminate information leakage and maintain high recall.",
    rubricKeyPoints: [
      "Explained metadata payload filtering inside the vector index (e.g. pgvector / Qdrant)",
      "Discussed trade-off between pre-filtering (index performance) and post-filtering (recall dropping below k)",
      "Addressed document updates & index synchronization when permissions change",
    ],
  },
  {
    id: "iq-102",
    role: "Senior Machine Learning Engineer",
    category: "Technical Architecture",
    prompt: "Your large language model inference service experiences severe latency spikes (p99 > 8 seconds) during peak hours. How do you diagnose whether the bottleneck is GPU memory bandwidth, compute bound, or token scheduling, and what steps do you take to resolve it?",
    sampleAnswerOverview: "Use continuous batching (vLLM / PagedAttention), analyze KV cache memory fragmentation, and monitor GPU compute (SM utilization) vs memory bus utilization using nvidia-smi / DCGM metrics. Implement speculative decoding and FP8/INT4 quantization if memory-bandwidth bound.",
    rubricKeyPoints: [
      "Identified memory bandwidth vs compute bound characteristics of autoregressive token generation",
      "Recommended PagedAttention to eliminate KV cache fragmentation",
      "Mentioned continuous batching and speculative decoding",
    ],
  },
  {
    id: "iq-103",
    role: "Full-Stack AI Application Engineer",
    category: "Coding & Data Structures",
    prompt: "Explain how you implement Server-Sent Events (SSE) streaming for LLM tokens in Next.js App Router with React 19, including handling unexpected connection drops, client-side state reconciliation, and markdown formatting during live generation.",
    sampleAnswerOverview: "Create a route handler returning a ReadableStream with 'text/event-stream' headers. On client, consume via EventSource or fetch with response.body.getReader(), buffering chunks to handle multi-byte UTF-8 boundaries and incremental markdown parsing.",
    rubricKeyPoints: [
      "Detailed ReadableStream with Response headers in App Router",
      "Addressed buffer decoding for multi-byte Unicode split across chunks",
      "Explained cancellation tokens to abort upstream LLM calls when user navigates away",
    ],
  },
];
