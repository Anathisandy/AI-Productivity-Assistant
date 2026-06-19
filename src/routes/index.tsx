import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Calendar,
  ClipboardList,
  Users,
  Briefcase,
  Coffee,
  ArrowUpRight,
  Phone,
  Sparkles,
  Bot,
  MessageSquare,
  FileText,
  FileCheck,
  Search,
} from "lucide-react";
import portrait from "@/assets/portrait-collage.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anathi Sandy Gatyeni — Administrative Assistant in Cape Town" },
      {
        name: "description",
        content:
          "Portfolio of Anathi Sandy Gatyeni — administrative assistant, office coordinator, and virtual assistant based in Cape Town, South Africa.",
      },
    ],
  }),
  component: Portfolio,
});

const skills = [
  "Calendar & diary management",
  "Travel & logistics coordination",
  "Minute-taking & reporting",
  "Inbox triage",
  "Document control",
  "Expense & invoice processing",
  "Event coordination",
  "Stakeholder liaison",
];

const experience = [
  {
    role: "Office Administrator",
    org: "Independent / Contract",
    period: "2022 — Present",
    blurb:
      "Coordinating day-to-day office operations, supplier relationships, and executive diaries for small teams across Cape Town.",
  },
  {
    role: "Team Coordinator",
    org: "Hospitality & Services",
    period: "2019 — 2022",
    blurb:
      "Owned scheduling, onboarding paperwork, and internal communications for a 20+ person team — keeping the floor running on time.",
  },
  {
    role: "Office Assistant",
    org: "Professional Services",
    period: "2017 — 2019",
    blurb:
      "Front-of-house, document filing, meeting prep, and client correspondence in a fast-paced consulting environment.",
  },
];

function Portfolio() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <Nav />
      <Hero />
      <Bento />
      <AITools />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav className="mb-10 flex items-center justify-between">
      <a href="#top" className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-md bg-foreground text-background font-display text-sm">
          AG
        </span>
        <span className="hidden text-sm font-medium tracking-wide sm:inline">
          Anathi Gatyeni
        </span>
      </a>
      <div className="flex items-center gap-1 text-sm">
        <a href="#work" className="rounded-full px-3 py-1.5 hover:bg-secondary">
          Work
        </a>
        <a href="#ai-tools" className="rounded-full px-3 py-1.5 hover:bg-secondary font-medium text-amber-800">
          AI Tools
        </a>
        <a href="#experience" className="rounded-full px-3 py-1.5 hover:bg-secondary">
          Experience
        </a>
        <a
          href="#contact"
          className="ml-2 inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-1.5 text-background hover:bg-foreground/90"
        >
          Get in touch <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header id="top" className="mb-10">
      <p className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
        Available for new roles & virtual support
      </p>
      <h1 className="font-display text-[clamp(2.5rem,9vw,7rem)] leading-[0.95] uppercase">
        Anathi Sandy
        <br />
        <span className="text-muted-foreground">Gatyeni</span>
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
        Administrative assistant, office coordinator, and virtual assistant based in
        Cape Town. I keep busy teams organised, on time, and ahead of what's next —
        from inboxes and diaries to travel, documents, and the small details that
        make work feel calm.
      </p>
    </header>
  );
}

function Tile({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border bg-card p-6 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-elegant)] ${className}`}
    >
      {children}
    </div>
  );
}

function Bento() {
  return (
    <section id="work" className="mb-14 grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 sm:grid-cols-6">
      {/* Portrait collage */}
      <Tile className="overflow-hidden p-0 sm:col-span-3 sm:row-span-2">
        <div className="relative h-full min-h-[320px]">
          <img
            src={portrait}
            alt="Workspace collage in warm sand tones"
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent p-6">
            <p className="font-display text-2xl uppercase leading-none">
              Calm,
              <br />
              organised,
              <br />
              on time.
            </p>
          </div>
        </div>
      </Tile>

      {/* Location */}
      <Tile className="sm:col-span-3">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Based in
            </div>
            <div className="font-display text-2xl uppercase">Cape Town, ZA</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Working SAST hours · remote across SA, UK & EU
            </p>
          </div>
        </div>
      </Tile>

      {/* Stats row */}
      <Tile className="sm:col-span-2">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Experience</div>
        <div className="mt-2 font-display text-5xl uppercase">7+</div>
        <p className="mt-1 text-sm text-muted-foreground">years in admin & coordination</p>
      </Tile>
      <Tile className="sm:col-span-1">
        <Coffee className="h-5 w-5 text-muted-foreground" />
        <div className="mt-3 font-display text-3xl">∞</div>
        <p className="text-xs text-muted-foreground">cups of coffee</p>
      </Tile>

      {/* Skills */}
      <Tile className="sm:col-span-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl uppercase">What I do</h2>
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            Services
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {skills.map((s) => (
            <div
              key={s}
              className="rounded-lg border bg-background/60 px-3 py-2.5 text-sm"
            >
              {s}
            </div>
          ))}
        </div>
      </Tile>

      {/* Strength tiles */}
      <Tile className="sm:col-span-2">
        <Calendar className="h-6 w-6" />
        <h3 className="mt-3 font-display text-lg uppercase">Diary & travel</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Schedules that respect everyone's time, trips that just work.
        </p>
      </Tile>
      <Tile className="sm:col-span-2">
        <ClipboardList className="h-6 w-6" />
        <h3 className="mt-3 font-display text-lg uppercase">Docs & reporting</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Clean minutes, tidy files, reports leadership can actually read.
        </p>
      </Tile>
      <Tile className="sm:col-span-2">
        <Users className="h-6 w-6" />
        <h3 className="mt-3 font-display text-lg uppercase">People & follow-up</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Warm comms with clients, suppliers, and the team behind the scenes.
        </p>
      </Tile>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mb-14">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-display text-3xl uppercase sm:text-4xl">Experience</h2>
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          Selected
        </span>
      </div>
      <ol className="divide-y border-y">
        {experience.map((e) => (
          <li
            key={e.role + e.period}
            className="grid gap-2 py-6 sm:grid-cols-[180px_1fr_auto] sm:items-baseline sm:gap-6"
          >
            <div className="text-sm text-muted-foreground">{e.period}</div>
            <div>
              <div className="font-display text-xl uppercase">{e.role}</div>
              <div className="mt-1 text-sm text-muted-foreground">{e.org}</div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed">{e.blurb}</p>
            </div>
            <Briefcase className="hidden h-5 w-5 text-muted-foreground sm:block" />
          </li>
        ))}
      </ol>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="mb-10 overflow-hidden rounded-3xl border bg-foreground p-8 text-background sm:p-12"
    >
      <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr] sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] opacity-70">Let's work together</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] sm:text-6xl">
            Need a steady
            <br />
            pair of hands?
          </h2>
          <p className="mt-4 max-w-md text-sm opacity-80">
            Open to full-time, part-time, and virtual assistant work. Tell me what's on
            your plate and I'll take it from there.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <a
            href="mailto:hello@example.com"
            className="flex items-center justify-between gap-3 rounded-xl bg-background/10 px-4 py-3 hover:bg-background/15"
          >
            <span className="flex items-center gap-3">
              <Mail className="h-4 w-4" /> Email
            </span>
            <ArrowUpRight className="h-4 w-4 opacity-70" />
          </a>
          <a
            href="tel:+27000000000"
            className="flex items-center justify-between gap-3 rounded-xl bg-background/10 px-4 py-3 hover:bg-background/15"
          >
            <span className="flex items-center gap-3">
              <Phone className="h-4 w-4" /> Phone
            </span>
            <ArrowUpRight className="h-4 w-4 opacity-70" />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded-xl bg-background/10 px-4 py-3 hover:bg-background/15"
          >
            <span className="flex items-center gap-3">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </span>
            <ArrowUpRight className="h-4 w-4 opacity-70" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded-xl bg-background/10 px-4 py-3 hover:bg-background/15"
          >
            <span className="flex items-center gap-3">
              <Github className="h-4 w-4" /> GitHub
            </span>
            <ArrowUpRight className="h-4 w-4 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
}

function AITools() {
  const tools = [
    {
      title: "AI Workplace Copilot",
      desc: "An intelligent, context-aware chatbot for quick answers, drafts, and virtual coordination.",
      icon: Bot,
      link: "/chat",
      action: "Chat Now",
      color: "bg-[#fcfaf7] hover:bg-amber-50/50 border-amber-100/60",
    },
    {
      title: "Smart Email Generator",
      desc: "Drafts hyper-professional emails, replies, and inbox triages in seconds with structured prompts.",
      icon: FileText,
      link: "/email",
      action: "Draft Email",
      color: "bg-[#fcfaf7] hover:bg-amber-50/50 border-amber-100/60",
    },
    {
      title: "Meeting Summarizer",
      desc: "Converts messy transcriptions, recordings, or notes into structured meeting minutes and action items.",
      icon: FileCheck,
      link: "/meetings",
      action: "Summarize",
      color: "bg-[#fcfaf7] hover:bg-amber-50/50 border-amber-100/60",
    },
    {
      title: "AI Task Planner",
      desc: "Breaks complex operations down into actionable step-by-step administrative and project tasks.",
      icon: ClipboardList,
      link: "/tasks",
      action: "Plan Tasks",
      color: "bg-[#fcfaf7] hover:bg-amber-50/50 border-amber-100/60",
    },
    {
      title: "AI Research Assistant",
      desc: "Performs quick deep-dives, gathers structured intelligence, and synthesizes reports.",
      icon: Search,
      link: "/research",
      action: "Research",
      color: "bg-[#fcfaf7] hover:bg-amber-50/50 border-amber-100/60",
    },
  ];

  return (
    <section id="ai-tools" className="mb-14 scroll-mt-6">
      <div className="mb-8 rounded-3xl border border-[#e5dfd5] bg-[#f5efe4]/40 p-8 shadow-[var(--shadow-soft)] sm:p-12">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#f0ebe3] px-3.5 py-1 text-xs font-semibold text-amber-900 border border-[#e5dfd5]">
            <Sparkles className="h-3.5 w-3.5 text-amber-700 animate-pulse" />
            Next-Gen Administrative Toolkit
          </div>
          <h2 className="font-display text-3xl uppercase tracking-tight text-foreground sm:text-5xl">
            My Custom AI Workspace
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
            To showcase how I bring cutting-edge productivity into daily operations, I built these bespoke, fully-functional AI workplace tools. Experience firsthand how I automate high-level executive support tasks:
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.title}
                className={`flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-0.5 ${tool.color}`}
              >
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background border shadow-sm">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="font-display text-lg uppercase tracking-wide">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.desc}</p>
                </div>
                <div className="mt-6 pt-4">
                  <a
                    href={tool.link}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-center text-xs font-semibold text-background hover:bg-foreground/90 transition-colors"
                  >
                    {tool.action} <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
      <span>© {new Date().getFullYear()} Anathi Sandy Gatyeni · Cape Town, ZA</span>
      <span>Built with care.</span>
    </footer>
  );
}
