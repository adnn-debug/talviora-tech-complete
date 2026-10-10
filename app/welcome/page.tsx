"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Compass,
  Layers,
  Route,
  FolderGit2,
  Award,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Code2,
  FileText,
  MessageSquareCode,
  Zap,
} from "lucide-react";
import RadarChart from "@/components/RadarChart";
import { careerRolesList, initialUserProfile } from "@/lib/career-data";

export default function WelcomePage() {
  const learningStages = [
    { step: "01", title: "DISCOVER", subtitle: "Diagnostic Analysis", desc: "Evaluate competencies against real market requirements." },
    { step: "02", title: "UNDERSTAND", subtitle: "Deep Principles", desc: "Master architectural fundamentals and systems thinking." },
    { step: "03", title: "PRACTISE", subtitle: "Hands-on Code", desc: "Solve algorithmic patterns and debug intentional code flaws." },
    { step: "04", title: "BUILD", subtitle: "Production Projects", desc: "Construct enterprise RAG, streaming, and distributed apps." },
    { step: "05", title: "PROVE", subtitle: "Verified Artifacts", desc: "Deploy public proof of work with verifiable GitHub repos." },
    { step: "06", title: "APPLY", subtitle: "Real Opportunities", desc: "Match with high-demand roles, mock interviews, and offers." },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF9F0] via-[#F5EBDD] to-[#EBDAC6] dark:from-[#241A1A] dark:via-[#2E1F21] dark:to-[#3B2527] border border-[#C8B39A]/60 dark:border-[#C58F98]/20 p-8 sm:p-12 lg:p-16 shadow-xl">
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6F1737]/10 dark:bg-[#C58F98]/15 border border-[#6F1737]/20 dark:border-[#C58F98]/30 text-xs font-bold text-[#6F1737] dark:text-[#F0C4CC] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C58F98]" />
            <span>Autonomous Career Intelligence & Learning Ecosystem</span>
          </div>

          <h1 className="font-display-serif text-4xl sm:text-6xl lg:text-7xl text-[#6F1737] dark:text-[#FFF9F0] tracking-tight leading-[1.08]">
            Master Technology. <br />
            <span className="font-editorial-italic font-normal text-[#C58F98] dark:text-[#D8A3AB]">
              Prove What You Build.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#3B2527] dark:text-[#F5EBDD] max-w-2xl leading-relaxed">
            TALVIORA TECH is a complete technology-learning and career-intelligence ecosystem.
            Discover what to learn, master it through practice, prove your skills with production architectures, and connect to real industry opportunities.
          </p>

          {/* Free Learning Manifesto Badge */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#96977A] dark:text-[#B5C29A]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% Free Learning Platform • No Subscription Paywalls • Free Community Access</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/assessment"
              className="px-6 py-3.5 rounded-xl bg-[#6F1737] hover:bg-[#55122B] text-[#FFF9F0] dark:bg-[#C58F98] dark:hover:bg-[#D8A3AB] dark:text-[#241A1A] font-bold text-sm tracking-wide transition shadow-md flex items-center gap-2"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Launch AI Diagnostic Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="px-6 py-3.5 rounded-xl border border-[#B59A83] dark:border-[#C58F98]/40 hover:bg-white/50 dark:hover:bg-[#3B2527] text-[#241A1A] dark:text-[#FFF9F0] font-bold text-sm tracking-wide transition flex items-center gap-2"
            >
              <span>Explore Learner Dashboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6-Stage Learning Cycle Strip */}
      <section className="space-y-6">
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C58F98] dark:text-[#D8A3AB]">
            The Core Learning Cycle
          </span>
          <h2 className="font-display-serif text-3xl sm:text-4xl text-[#6F1737] dark:text-[#FFF9F0]">
            From Fundamentals to Industry Impact
          </h2>
          <p className="text-xs text-[#4A3A37] dark:text-zinc-400">
            A cohesive educational framework ensuring you never memorize in a vacuum.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {learningStages.map((stage) => (
            <div
              key={stage.step}
              className="card-coffee p-4 space-y-2 border-t-4 border-t-[#6F1737] dark:border-t-[#C58F98]"
            >
              <span className="font-mono-code font-bold text-xs text-[#C58F98] dark:text-[#D8A3AB]">
                {stage.step}
              </span>
              <h3 className="font-bold text-sm text-[#241A1A] dark:text-[#FFF9F0] tracking-wide">
                {stage.title}
              </h3>
              <p className="text-[10px] uppercase font-bold text-[#96977A]">
                {stage.subtitle}
              </p>
              <p className="text-xs text-[#4A3A37] dark:text-zinc-400 leading-snug">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Interactive Product Previews */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C58F98]">
              Skill Mastery & Alignment
            </span>
            <h2 className="font-display-serif text-3xl sm:text-4xl text-[#6F1737] dark:text-[#FFF9F0]">
              Evaluate Your Acumen Against Senior Industry Standards
            </h2>
            <p className="text-sm text-[#4A3A37] dark:text-zinc-400 leading-relaxed">
              Our multi-axis diagnostic compares your evaluated knowledge against real production requirements for roles like AI Solutions Architect, Senior ML Engineer, and Quant Developer.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#96977A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-[#241A1A] dark:text-[#FFF9F0]">Granular Gap Identification:</strong>
                <p className="text-xs text-[#4A3A37] dark:text-zinc-400">Calculates the exact hours needed to bridge architectural and algorithmic deficiencies.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#96977A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-[#241A1A] dark:text-[#FFF9F0]">Honest Scoring:</strong>
                <p className="text-xs text-[#4A3A37] dark:text-zinc-400">Zero fake metrics. Powered by Google Gemini API with transparent rubrics.</p>
              </div>
            </div>
          </div>

          <Link
            href="/skill-gap"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6F1737] dark:text-[#F0C4CC] hover:underline"
          >
            <span>Explore the Skill Gap Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="lg:col-span-6 card-coffee p-8 flex flex-col items-center justify-center">
          <RadarChart size={300} />
        </div>
      </section>

      {/* 6 Core Pillars Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <h2 className="font-display-serif text-3xl sm:text-4xl text-[#6F1737] dark:text-[#FFF9F0]">
            The 6 Pillars of TALVIORA TECH
          </h2>
          <p className="text-xs text-[#4A3A37] dark:text-zinc-400">
            A unified suite designed for students, universities, recruiters, and engineering professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card-coffee p-6 space-y-3">
            <div className="p-2.5 rounded-xl bg-[#6F1737]/10 dark:bg-[#C58F98]/20 text-[#6F1737] dark:text-[#F0C4CC] w-fit">
              <Route className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#241A1A] dark:text-[#FFF9F0]">Dynamic Personalized Roadmaps</h3>
            <p className="text-xs text-[#4A3A37] dark:text-zinc-400 leading-relaxed">
              16-week structured curricula with interactive module checkpoints, pacing trackers, and curated open-source resources.
            </p>
            <Link href="/roadmap" className="text-xs font-semibold text-[#6F1737] dark:text-[#C58F98] hover:underline block pt-2">
              View Roadmaps →
            </Link>
          </div>

          <div className="card-coffee p-6 space-y-3">
            <div className="p-2.5 rounded-xl bg-[#6F1737]/10 dark:bg-[#C58F98]/20 text-[#6F1737] dark:text-[#F0C4CC] w-fit">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#241A1A] dark:text-[#FFF9F0]">Production Project Lab</h3>
            <p className="text-xs text-[#4A3A37] dark:text-zinc-400 leading-relaxed">
              Real architectural briefs for Hybrid RAG pipelines, streaming feature stores, and distributed workers with evaluation rubrics.
            </p>
            <Link href="/projects" className="text-xs font-semibold text-[#6F1737] dark:text-[#C58F98] hover:underline block pt-2">
              Browse Project Lab →
            </Link>
          </div>

          <div className="card-coffee p-6 space-y-3">
            <div className="p-2.5 rounded-xl bg-[#6F1737]/10 dark:bg-[#C58F98]/20 text-[#6F1737] dark:text-[#F0C4CC] w-fit">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#241A1A] dark:text-[#FFF9F0]">Market Intelligence & Trends</h3>
            <p className="text-xs text-[#4A3A37] dark:text-zinc-400 leading-relaxed">
              Sourced salary benchmarks, hiring velocities, remote percentages, and regional tech compensation analytics.
            </p>
            <Link href="/market" className="text-xs font-semibold text-[#6F1737] dark:text-[#C58F98] hover:underline block pt-2">
              Inspect Market Trends →
            </Link>
          </div>

          <div className="card-coffee p-6 space-y-3">
            <div className="p-2.5 rounded-xl bg-[#6F1737]/10 dark:bg-[#C58F98]/20 text-[#6F1737] dark:text-[#F0C4CC] w-fit">
              <MessageSquareCode className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#241A1A] dark:text-[#FFF9F0]">Technical Interview Simulator</h3>
            <p className="text-xs text-[#4A3A37] dark:text-zinc-400 leading-relaxed">
              Scenario-based architectural and algorithmic prompts evaluated in real time by Gemini AI with constructive critique.
            </p>
            <Link href="/simulator" className="text-xs font-semibold text-[#6F1737] dark:text-[#C58F98] hover:underline block pt-2">
              Launch Interview Prep →
            </Link>
          </div>

          <div className="card-coffee p-6 space-y-3">
            <div className="p-2.5 rounded-xl bg-[#6F1737]/10 dark:bg-[#C58F98]/20 text-[#6F1737] dark:text-[#F0C4CC] w-fit">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#241A1A] dark:text-[#FFF9F0]">Smart Resume & ATS Optimizer</h3>
            <p className="text-xs text-[#4A3A37] dark:text-zinc-400 leading-relaxed">
              Transform weak bullet points into quantified architectural impact statements and scan for high-demand keywords.
            </p>
            <Link href="/resume" className="text-xs font-semibold text-[#6F1737] dark:text-[#C58F98] hover:underline block pt-2">
              Optimize Resume →
            </Link>
          </div>

          <div className="card-coffee p-6 space-y-3">
            <div className="p-2.5 rounded-xl bg-[#6F1737]/10 dark:bg-[#C58F98]/20 text-[#6F1737] dark:text-[#F0C4CC] w-fit">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#241A1A] dark:text-[#FFF9F0]">Verified Proof-of-Work Portfolios</h3>
            <p className="text-xs text-[#4A3A37] dark:text-zinc-400 leading-relaxed">
              Deployable vanity showcases displaying verified competency badges, GitHub deliverables, and readiness credentials.
            </p>
            <Link href="/portfolio" className="text-xs font-semibold text-[#6F1737] dark:text-[#C58F98] hover:underline block pt-2">
              View Portfolio Engine →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
