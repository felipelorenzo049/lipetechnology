import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { animate, stagger } from "animejs";

type FounderKey = "felipe" | "luigi" | "andre";

// Asymmetric triangle positions inside a 100x100 viewBox.
// (x,y) is the CENTER of each node — cards are positioned at the same %.
type Node = {
  key: FounderKey;
  initial: string;
  x: number;
  y: number;
  accent: string;
  align: "left" | "right" | "center";
};

const NODES: Node[] = [
  { key: "felipe", initial: "F", x: 14, y: 22, accent: "hsl(var(--primary))", align: "left" },
  { key: "luigi", initial: "L", x: 86, y: 34, accent: "hsl(var(--accent))", align: "right" },
  { key: "andre", initial: "A", x: 50, y: 82, accent: "hsl(var(--secondary))", align: "center" },
];

const EDGES: [FounderKey, FounderKey][] = [
  ["felipe", "luigi"],
  ["luigi", "andre"],
  ["andre", "felipe"],
];

const byKey = (k: FounderKey) => NODES.find((n) => n.key === k)!;

const Founders = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const networkRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(networkRef, { once: true, margin: "-80px" });

  // Build a closed path that traces the triangle perimeter for the traveling signal.
  const perimeter = (() => {
    const a = byKey("felipe");
    const b = byKey("luigi");
    const c = byKey("andre");
    return `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y} Z`;
  })();

  // Animate line drawing when in view (anime.js Drawable-style strokeDashoffset).
  useEffect(() => {
    if (!inView || reduced || !svgRef.current) return;
    const lines = svgRef.current.querySelectorAll<SVGLineElement>("line[data-edge]");
    lines.forEach((el) => {
      const length = (el as any).getTotalLength?.() ?? 100;
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length}`;
    });
    animate(Array.from(lines) as any, {
      strokeDashoffset: 0,
      duration: 1200,
      delay: stagger(140),
      easing: "easeOutQuad",
    });
  }, [inView, reduced]);

  return (
    <section id="socios" className="relative py-24 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Editorial header — asymmetric */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
          {/* Left column: kicker + thesis (narrow) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-4 md:pt-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-6 bg-accent/60" />
              <p className="font-mono text-[10px] sm:text-xs text-accent tracking-[0.3em] uppercase">
                {t("founders.kicker")}
              </p>
            </div>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed border-l border-accent/30 pl-5">
              {t("founders.intro")}
            </p>
          </motion.div>

          {/* Right column: oversized asymmetric headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-12 md:col-span-8"
          >
            <h2 className="font-headline font-extrabold leading-[0.92] tracking-tight">
              <span className="block text-5xl sm:text-6xl md:text-8xl text-foreground">
                {t("founders.title")}
              </span>
              <span className="block text-5xl sm:text-6xl md:text-8xl gradient-text italic md:pl-[15%] mt-1">
                {t("founders.titleHighlight")}.
              </span>
            </h2>
            <p className="font-body text-sm md:text-base text-muted-foreground/80 mt-6 max-w-md md:ml-[15%]">
              {t("founders.subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Network: triangle of 3 nodes */}
        <div
          ref={networkRef}
          className="relative w-full aspect-[16/12] md:aspect-[16/9] hidden md:block"
        >
          {/* SVG: connecting lines + traveling signal */}
          <svg
            ref={svgRef}
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="founders-edge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.6" />
              </linearGradient>
              <radialGradient id="founders-signal">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
              </radialGradient>
            </defs>

            {EDGES.map(([a, b], i) => {
              const A = byKey(a);
              const B = byKey(b);
              return (
                <line
                  key={i}
                  data-edge
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="url(#founders-edge)"
                  strokeWidth="0.25"
                  vectorEffect="non-scaling-stroke"
                  style={reduced ? undefined : { strokeDasharray: 200, strokeDashoffset: 200 }}
                />
              );
            })}

            {/* Traveling signal around the perimeter */}
            {!reduced && inView && (
              <>
                <circle r="2.4" fill="url(#founders-signal)">
                  <animateMotion dur="6s" repeatCount="indefinite" path={perimeter} />
                </circle>
                <circle r="0.9" fill="hsl(var(--accent))">
                  <animateMotion dur="6s" repeatCount="indefinite" path={perimeter} />
                </circle>
              </>
            )}
          </svg>

          {/* Nodes / cards positioned over the SVG */}
          {NODES.map((n, idx) => (
            <FounderCard
              key={n.key}
              node={n}
              t={t}
              inView={inView}
              reduced={!!reduced}
              delay={0.4 + idx * 0.15}
            />
          ))}
        </div>

        {/* Mobile: simple stacked list */}
        <div className="md:hidden space-y-6">
          {NODES.map((n, idx) => (
            <motion.article
              key={n.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass rounded-2xl p-6 flex items-center gap-5"
            >
              <NodeCircle node={n} reduced />
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-1">
                  {t(`founders.items.${n.key}.role`)}
                </p>
                <h3 className="font-headline text-xl font-semibold mb-1">
                  {t(`founders.items.${n.key}.name`)}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {t(`founders.items.${n.key}.line`)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const NodeCircle = ({ node, reduced }: { node: Node; reduced: boolean }) => (
  <div className="relative shrink-0 flex items-center justify-center w-20 h-20">
    <span
      aria-hidden
      className={`absolute inset-0 m-auto h-20 w-20 rounded-full blur-2xl opacity-50 ${
        reduced ? "" : "group-hover:opacity-100 transition-opacity duration-500"
      }`}
      style={{ background: node.accent }}
    />
    <span
      aria-hidden
      className="absolute h-[72px] w-[72px] rounded-full border border-border/60 group-hover:border-foreground/40 transition-colors duration-300"
    />
    <span
      className="relative h-14 w-14 rounded-full flex items-center justify-center font-mono text-lg font-semibold text-foreground"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, hsl(var(--card)) 0%, hsl(var(--background)) 90%)",
        boxShadow: `0 0 28px -4px ${node.accent}`,
      }}
    >
      {node.initial}
    </span>
  </div>
);

const FounderCard = ({
  node,
  t,
  inView,
  reduced,
  delay,
}: {
  node: Node;
  t: (k: string) => string;
  inView: boolean;
  reduced: boolean;
  delay: number;
}) => {
  // Card placement: anchor card edge near the node, biased by align
  const align = node.align;
  const cardSide =
    align === "left"
      ? "left-0 md:left-[6%] -translate-y-1/2"
      : align === "right"
      ? "right-0 md:right-[6%] -translate-y-1/2"
      : "left-1/2 -translate-x-1/2 translate-y-2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="absolute"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* The node circle sits at the exact point */}
      <div className="group relative">
        <NodeCircle node={node} reduced={reduced} />

        {/* Detail card floating beside the node */}
        <div
          className={`absolute top-1/2 ${cardSide} w-64 glass rounded-xl p-5 transition-all duration-300 group-hover:-translate-y-[calc(50%+4px)] motion-reduce:transition-none`}
          style={{
            boxShadow: `0 8px 40px -12px ${node.accent}`,
          }}
        >
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-1.5">
            {t(`founders.items.${node.key}.role`)}
          </p>
          <h3 className="font-headline text-2xl font-bold mb-2 text-foreground">
            {t(`founders.items.${node.key}.name`)}
          </h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            {t(`founders.items.${node.key}.line`)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Founders;
