"use client";

import { useState } from "react";
import {
  Layers,
  Search,
  ExternalLink,
  Flame,
  CheckCircle2,
  Briefcase,
  Code2,
} from "lucide-react";

interface TechItem {
  id: string;
  name: string;
  category: "Languages" | "AI & ML" | "Databases & Vector" | "Cloud & DevOps" | "Web & Microservices" | "Side-Hustle Services";
  description: string;
  demand: "Very High" | "High" | "Moderate";
  tier: "Foundational" | "Advanced" | "Enterprise";
  primaryRole: string;
}

export default function CataloguePage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");

  const techCatalog: TechItem[] = [
    {
      id: "python",
      name: "Python 3.12+",
      category: "Languages",
      description: "Async IO, typing, decorators, generators, and standard ML ecosystem foundation.",
      demand: "Very High",
      tier: "Foundational",
      primaryRole: "AI Solutions Architect & ML Engineer",
    },
    {
      id: "typescript",
      name: "TypeScript 5+",
      category: "Languages",
      description: "Strict types, generic constraints, discriminated unions, and scalable frontend contracts.",
      demand: "Very High",
      tier: "Foundational",
      primaryRole: "Full-Stack AI Engineer",
    },
    {
      id: "pytorch",
      name: "PyTorch 2.x",
      category: "AI & ML",
      description: "Dynamic computational graphs, custom autograd, DataLoader optimization, CUDA primitives.",
      demand: "Very High",
      tier: "Advanced",
      primaryRole: "Senior ML Engineer",
    },
    {
      id: "pgvector",
      name: "PostgreSQL & pgvector",
      category: "Databases & Vector",
      description: "HNSW index search, hybrid BM25 lexical fusion, cosine distance indexing in relational schemas.",
      demand: "Very High",
      tier: "Enterprise",
      primaryRole: "AI Solutions Architect",
    },
    {
      id: "redis",
      name: "Redis & Semantic Caching",
      category: "Databases & Vector",
      description: "In-memory key-value caching, vector similarity search, and sub-10ms prompt response caches.",
      demand: "High",
      tier: "Advanced",
      primaryRole: "Distributed Systems Engineer",
    },
    {
      id: "kafka",
      name: "Apache Kafka",
      category: "Databases & Vector",
      description: "Distributed publish-subscribe event logging, sliding window stream aggregation.",
      demand: "High",
      tier: "Enterprise",
      primaryRole: "Data & Quant Engineer",
    },
    {
      id: "docker",
      name: "Docker & Containerization",
      category: "Cloud & DevOps",
      description: "Multi-stage minimal distroless builds, layer caching, and reproducible production endpoints.",
      demand: "Very High",
      tier: "Foundational",
      primaryRole: "DevOps & MLOps Lead",
    },
    {
      id: "k8s",
      name: "Kubernetes & HPA",
      category: "Cloud & DevOps",
      description: "Pod autoscaling based on GPU utilization, ingress routing, zero-downtime rollouts.",
      demand: "High",
      tier: "Enterprise",
      primaryRole: "DevOps & MLOps Lead",
    },
    {
      id: "fastapi",
      name: "FastAPI & Pydantic v2",
      category: "Web & Microservices",
      description: "High-throughput asynchronous Python microservices with automatic OpenAPI generation.",
      demand: "Very High",
      tier: "Foundational",
      primaryRole: "AI Engineer",
    },
    {
      id: "nextjs",
      name: "Next.js App Router",
      category: "Web & Microservices",
      description: "React Server Components, edge runtime, Server-Sent Events (SSE) streaming for LLMs.",
      demand: "Very High",
      tier: "Advanced",
      primaryRole: "Full-Stack AI Engineer",
    },
    {
      id: "side-rag",
      name: "Enterprise RAG Consulting",
      category: "Side-Hustle Services",
      description: "Architecting document intelligence and legal/medical RAG systems for SMB clients ($3k-$10k/project).",
      demand: "Very High",
      tier: "Enterprise",
      primaryRole: "Technical Freelancer & Consultant",
    },
    {
      id: "side-eval",
      name: "LLM Benchmark & Evals Pipeline",
      category: "Side-Hustle Services",
      description: "Building automated RAGAS and prompt safety evaluation pipelines for startups deploying agents.",
      demand: "High",
      tier: "Advanced",
      primaryRole: "AI Consultant",
    },
  ];

  const categories = [
    "All",
    "Languages",
    "AI & ML",
    "Databases & Vector",
    "Cloud & DevOps",
    "Web & Microservices",
    "Side-Hustle Services",
  ];

  const filtered = techCatalog.filter((item) => {
    const matchesCat = selectedCat === "All" || item.category === selectedCat;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#B59A83]/30 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#6F1737]/10 dark:bg-[#C58F98]/20 text-[#6F1737] dark:text-[#F0C4CC]">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C58F98] dark:text-[#D8A3AB]">
              Curated Technology Ecosystem
            </span>
          </div>
          <h1 className="font-display-serif text-3xl sm:text-4xl text-[#6F1737] dark:text-[#FFF9F0]">
            Technology, Tools & Service Catalogue
          </h1>
          <p className="text-xs text-[#4A3A37] dark:text-zinc-400 mt-0.5">
            Comprehensive directory of programming languages, architectures, tools, and technical side-hustle tracks.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search technologies or services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-[#B59A83]/40 bg-white dark:bg-[#1F1515] text-xs text-[#241A1A] dark:text-[#FFF9F0] focus:outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              selectedCat === cat
                ? "btn-burgundy shadow-xs"
                : "border border-[#B59A83]/40 bg-white/60 dark:bg-[#2E1F21] text-[#241A1A] dark:text-zinc-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="card-coffee p-5 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold uppercase px-2 py-0.5 rounded bg-[#F5EBDD] dark:bg-[#2E1F21] text-[#6F1737] dark:text-[#F0C4CC]">
                  {item.category}
                </span>
                <span className="font-bold text-[#96977A] flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  {item.demand} Demand
                </span>
              </div>

              <h2 className="text-base font-bold text-[#241A1A] dark:text-[#FFF9F0] mt-2">
                {item.name}
              </h2>

              <p className="text-xs text-[#4A3A37] dark:text-zinc-400 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#B59A83]/20 dark:border-zinc-800 flex items-center justify-between text-[11px]">
              <span className="text-[#7E6962] dark:text-zinc-500">
                Tier: <strong className="text-[#241A1A] dark:text-[#FFF9F0]">{item.tier}</strong>
              </span>
              <span className="font-semibold text-[#6F1737] dark:text-[#C58F98]">
                {item.primaryRole}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
