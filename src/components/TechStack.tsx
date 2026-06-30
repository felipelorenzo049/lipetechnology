import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import SectionSignal from "@/components/SectionSignal";

// --- Inline SVG Logos (concise) ---
const ReactLogo = () => (
  <svg viewBox="0 0 256 228" className="w-6 h-6" fill="currentColor">
    <circle cx="128" cy="114" r="20" />
    <g fill="none" stroke="currentColor" strokeWidth="10">
      <ellipse cx="128" cy="114" rx="115" ry="44" />
      <ellipse cx="128" cy="114" rx="115" ry="44" transform="rotate(60 128 114)" />
      <ellipse cx="128" cy="114" rx="115" ry="44" transform="rotate(120 128 114)" />
    </g>
  </svg>
);
const NextLogo = () => (
  <svg viewBox="0 0 180 180" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="8">
    <circle cx="90" cy="90" r="82" />
    <path d="M65 55v70l60-70" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const TSLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M3 3h18v18H3V3zm10 14.5v-1.7c.7.4 1.5.7 2.4.7.4 0 .8-.1 1-.3.3-.2.4-.4.4-.7 0-.3-.1-.5-.3-.7-.2-.2-.6-.4-1.3-.7-1.3-.5-2.2-1-2.7-1.6-.4-.5-.7-1.2-.7-2 0-1 .4-1.8 1.1-2.4.7-.6 1.7-.9 2.9-.9.9 0 1.7.1 2.3.3v1.6c-.7-.3-1.4-.5-2.3-.5-.4 0-.7.1-1 .3-.3.2-.4.4-.4.7 0 .3.1.5.3.7.2.2.6.4 1.2.6 1.4.5 2.3 1.1 2.8 1.7.5.6.7 1.3.7 2.1 0 1-.4 1.9-1.1 2.4-.7.6-1.8.9-3.1.9-1 0-2-.2-2.7-.5zM9.5 11H6V9.5h9V11h-3.5v8h-2v-8z" />
  </svg>
);
const SupabaseLogo = () => (
  <svg viewBox="0 0 109 113" className="w-6 h-6" fill="currentColor">
    <path d="M64 110c-3 4-9 2-9-3l-1-67h45c8 0 13 9 8 16L64 110z" opacity=".6" />
    <path d="M45 2c3-4 9-2 9 3l1 67H9c-8 0-13-9-8-16L45 2z" />
  </svg>
);
const NodeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.46c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 01-.12-.21V7.71c0-.09.05-.17.12-.22l7.44-4.29c.07-.04.16-.04.23 0l7.44 4.29c.07.05.12.13.12.22v8.58c0 .08-.05.17-.12.21l-7.44 4.29c-.06.04-.16.04-.23 0L9.99 19.7c-.06-.03-.13-.04-.18-.01-.53.3-.63.34-1.12.51-.13.04-.32.11.07.33l2.48 1.47c.24.13.51.21.78.21s.55-.08.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2zm2 6.79c-2.12 0-3.39.9-3.39 2.41 0 1.63 1.26 2.08 3.3 2.28 2.45.24 2.64.6 2.64 1.08 0 .83-.67 1.18-2.23 1.18-1.97 0-2.4-.49-2.55-1.46a.234.234 0 00-.23-.2H10.4c-.13 0-.22.1-.22.22 0 1.24.67 2.72 3.81 2.72 2.35 0 3.7-.92 3.7-2.54 0-1.61-1.08-2.03-3.37-2.34-2.31-.3-2.54-.46-2.54-1 0-.45.2-1.05 1.91-1.05 1.52 0 2.09.33 2.32 1.36.02.1.11.18.21.18h1.15c.06 0 .12-.03.16-.07.04-.05.06-.11.06-.16-.18-2.11-1.58-3.09-3.9-3.09z" />
  </svg>
);
const TailwindLogo = () => (
  <svg viewBox="0 0 256 154" className="w-6 h-6" fill="currentColor">
    <path d="M128 0C93 0 72 17 64 51c12-17 27-23 44-19 10 2 17 10 24 17 13 13 27 28 60 28 35 0 56-17 64-51-12 17-27 23-44 19-10-2-17-10-24-17C175 15 160 0 128 0zM64 77C29 77 8 94 0 128c12-17 27-23 44-19 10 2 17 10 24 17 13 13 27 28 60 28 35 0 56-17 64-51-12 17-27 23-44 19-10-2-17-10-24-17-13-13-27-28-60-28z" />
  </svg>
);
const FramerLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M4 0h16v8h-8L4 0zm0 8h8l8 8H12v8l-8-8V8z" />
  </svg>
);
const OpenAILogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M22.28 9.82a6 6 0 00-.52-4.91 6.05 6.05 0 00-6.51-2.9A6.07 6.07 0 004.98 4.18a6 6 0 00-4 2.9 6.05 6.05 0 00.75 7.1 5.98 5.98 0 00.51 4.9 6.05 6.05 0 006.52 2.9A5.98 5.98 0 0013.26 24a6.06 6.06 0 005.77-4.21 6 6 0 004-2.9 6.06 6.06 0 00-.75-7.07zM13.26 22.43a4.48 4.48 0 01-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 00.4-.68v-6.74l2.02 1.17a.07.07 0 01.04.05v5.59a4.5 4.5 0 01-4.5 4.5zM3.6 18.3a4.47 4.47 0 01-.54-3.01l.14.08 4.78 2.76c.24.14.54.14.78 0l5.85-3.37v2.33a.08.08 0 01-.04.06l-4.83 2.79a4.5 4.5 0 01-6.14-1.64zM2.34 7.9A4.48 4.48 0 014.7 5.92v5.68c0 .28.15.54.39.68l5.81 3.35-2.02 1.17a.08.08 0 01-.07 0L3.98 14a4.5 4.5 0 01-1.64-6.1zm16.6 3.85L13.1 8.36l2.02-1.16a.08.08 0 01.07 0l4.83 2.79a4.5 4.5 0 01-.68 8.1v-5.67a.79.79 0 00-.4-.67zm2.01-3.02l-.14-.08-4.77-2.78a.78.78 0 00-.79 0L9.4 9.23V6.9a.07.07 0 01.03-.06l4.83-2.79a4.5 4.5 0 016.68 4.66v.02zm-12.64 4.13L6.3 11.71a.08.08 0 01-.04-.06V6.08a4.5 4.5 0 017.37-3.45l-.14.08L8.7 5.46a.8.8 0 00-.4.68v6.72z" />
  </svg>
);
const N8NLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="18" cy="18" r="3" />
    <path d="M8.5 10.5L15.5 7M8.5 13.5L15.5 17" />
  </svg>
);
const LovableLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 21c-.5 0-1-.2-1.4-.6L3.6 13.4a5 5 0 117-7.1l1.4 1.4 1.4-1.4a5 5 0 117 7.1l-7 7c-.4.4-.9.6-1.4.6z" />
  </svg>
);
const VercelLogo = () => (
  <svg viewBox="0 0 256 222" className="w-6 h-6" fill="currentColor">
    <path d="M128 0l128 222H0L128 0z" />
  </svg>
);
const StripeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M13.5 10c0-.7.6-1 1.5-1 1.4 0 3.1.4 4.5 1.1V6c-1.5-.6-3-.9-4.5-.9-3.7 0-6.2 1.9-6.2 5.2 0 5 7 4.2 7 6.4 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-5-1.4v4.1c1.7.7 3.4 1.1 5 1.1 3.8 0 6.4-1.9 6.4-5.2 0-5.4-7-4.4-7-6.4z" />
  </svg>
);
const FigmaLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M8 24a4 4 0 004-4v-4H8a4 4 0 100 8zm-4-12a4 4 0 014-4h4v8H8a4 4 0 01-4-4zm0-8a4 4 0 014-4h4v8H8a4 4 0 01-4-4zm8-4h4a4 4 0 010 8h-4V0zm8 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

type Tech = { id: string; name: string; Logo: () => JSX.Element };
type Cluster = { id: string; label: string; nodes: Tech[] };

const CLUSTERS: Cluster[] = [
  {
    id: "frontend",
    label: "Frontend",
    nodes: [
      { id: "react", name: "React", Logo: ReactLogo },
      { id: "next", name: "Next.js", Logo: NextLogo },
      { id: "ts", name: "TypeScript", Logo: TSLogo },
      { id: "tw", name: "Tailwind", Logo: TailwindLogo },
      { id: "framer", name: "Framer", Logo: FramerLogo },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    nodes: [
      { id: "node", name: "Node.js", Logo: NodeLogo },
      { id: "supa", name: "Supabase", Logo: SupabaseLogo },
      { id: "stripe", name: "Stripe", Logo: StripeLogo },
    ],
  },
  {
    id: "ai",
    label: "IA",
    nodes: [
      { id: "openai", name: "OpenAI", Logo: OpenAILogo },
      { id: "n8n", name: "n8n", Logo: N8NLogo },
      { id: "lovable", name: "Lovable", Logo: LovableLogo },
    ],
  },
  {
    id: "infra",
    label: "Infra",
    nodes: [
      { id: "vercel", name: "Vercel", Logo: VercelLogo },
      { id: "figma", name: "Figma", Logo: FigmaLogo },
    ],
  },
];

// Compute positions of nodes on a circle around the cluster center
function nodePosition(i: number, total: number, radius: number) {
  // distribute around 360 starting at top
  const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

const ClusterCard = ({ cluster, delay }: { cluster: Cluster; delay: number }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const active = hovered !== null;
  const radius = 78;
  const size = 220;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
      onMouseLeave={() => setHovered(null)}
    >
      <div
        className={cn(
          "relative mx-auto rounded-2xl border transition-colors duration-300",
          "border-border/40 bg-card/30 backdrop-blur-sm",
          active && "border-accent/40 bg-card/50",
        )}
        style={{ width: size, height: size }}
      >
        {/* Connection lines SVG */}
        <svg
          viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}
          className={cn(
            "absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0",
          )}
        >
          <defs>
            <linearGradient id={`grad-${cluster.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {cluster.nodes.map((_, i) => {
            const p = nodePosition(i, cluster.nodes.length, radius);
            return (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={p.x}
                y2={p.y}
                stroke={`url(#grad-${cluster.id})`}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={cn(
              "rounded-full px-3 py-1.5 border text-[10px] font-mono uppercase tracking-widest transition-colors",
              active
                ? "border-accent/60 bg-accent/10 text-accent"
                : "border-border/50 bg-background/60 text-muted-foreground",
            )}
          >
            {cluster.label}
          </div>
        </div>

        {/* Nodes */}
        {cluster.nodes.map((node, i) => {
          const p = nodePosition(i, cluster.nodes.length, radius);
          const isHover = hovered === node.id;
          return (
            <motion.button
              key={node.id}
              type="button"
              onMouseEnter={() => setHovered(node.id)}
              onFocus={() => setHovered(node.id)}
              animate={
                reduced
                  ? undefined
                  : { y: [0, -3, 0] }
              }
              transition={
                reduced
                  ? undefined
                  : { duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
              }
              className={cn(
                "absolute flex items-center justify-center w-11 h-11 rounded-xl border bg-card/80 backdrop-blur-sm",
                "transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                isHover
                  ? "border-accent/70 text-accent scale-110 shadow-[0_0_24px_-4px_hsl(var(--accent)/0.6)]"
                  : active
                  ? "border-border/40 text-foreground/90"
                  : "border-border/40 text-muted-foreground hover:text-foreground",
              )}
              style={{
                left: `calc(50% + ${p.x}px - 22px)`,
                top: `calc(50% + ${p.y}px - 22px)`,
              }}
              aria-label={node.name}
            >
              <node.Logo />
            </motion.button>
          );
        })}
      </div>

      {/* Hovered node name */}
      <div className="mt-3 h-5 text-center font-mono text-xs uppercase tracking-wider">
        <span
          className={cn(
            "transition-colors",
            hovered ? "text-accent" : "text-muted-foreground/60",
          )}
        >
          {hovered ? cluster.nodes.find((n) => n.id === hovered)?.name : cluster.label}
        </span>
      </div>
    </motion.div>
  );
};

const comparisonKeys = ["customization", "speed", "cost", "techQuality", "storytelling", "continuousSupport"];
const comparisonData: Record<string, { diy: number; agency: number; lipe: number }> = {
  customization: { diy: 1, agency: 3, lipe: 5 },
  speed: { diy: 4, agency: 2, lipe: 4 },
  cost: { diy: 4, agency: 1, lipe: 3 },
  techQuality: { diy: 2, agency: 4, lipe: 5 },
  storytelling: { diy: 1, agency: 3, lipe: 5 },
  continuousSupport: { diy: 1, agency: 3, lipe: 5 },
};

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} className={i < count ? "fill-accent text-accent" : "text-muted-foreground/30"} />
    ))}
  </div>
);

const TechStack = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="flex justify-center mb-3">
            <SectionSignal align="center" width={170} />
          </div>
          <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
            {t("techstack.techLabel")}
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold mt-3 mb-4">
            {t("techstack.techTitle")}{" "}
            <span className="gradient-text">{t("techstack.techHighlight")}</span>
          </h2>
          <p className="text-muted-foreground font-body text-base leading-relaxed">
            {t("techstack.techSubtitle")}
          </p>
        </motion.div>

        {/* Constellation grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-6xl mx-auto">
          {CLUSTERS.map((c, i) => (
            <ClusterCard key={c.id} cluster={c} delay={i * 0.1} />
          ))}
        </div>

        <div className="text-center mb-24">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-accent/40 bg-accent/5 text-foreground font-semibold font-body hover:bg-accent/10 hover:border-accent/60 transition-all uppercase tracking-wide text-sm group"
          >
            {t("cta.getQuote")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-2xl md:text-3xl font-bold">
            {t("techstack.comparisonTitle")}{" "}
            <span className="gradient-text">{t("techstack.comparisonHighlight")}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto overflow-x-auto"
        >
          <table className="w-full min-w-[500px] glass rounded-xl overflow-hidden">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-4 px-5 font-body text-sm text-muted-foreground font-medium">{t("techstack.criteria")}</th>
                <th className="text-center py-4 px-4 font-body text-sm text-muted-foreground font-medium bg-primary/5 border-l border-primary/10">
                  <span className="gradient-text font-bold">LIPE</span>
                </th>
                <th className="text-center py-4 px-4 font-body text-sm text-muted-foreground font-medium">{t("techstack.diyBuilders")}</th>
                <th className="text-center py-4 px-4 font-body text-sm text-muted-foreground font-medium">{t("techstack.tradAgency")}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonKeys.map((key) => {
                const row = comparisonData[key];
                return (
                  <tr key={key} className="border-b border-border/30 transition-colors hover:bg-primary/[0.03]">
                    <td className="py-3.5 px-5 text-sm font-body font-medium">{t(`techstack.${key}`)}</td>
                    <td className="py-3.5 px-4 text-center bg-primary/5 border-l border-primary/10"><div className="flex justify-center"><Stars count={row.lipe} /></div></td>
                    <td className="py-3.5 px-4 text-center"><div className="flex justify-center"><Stars count={row.diy} /></div></td>
                    <td className="py-3.5 px-4 text-center"><div className="flex justify-center"><Stars count={row.agency} /></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
