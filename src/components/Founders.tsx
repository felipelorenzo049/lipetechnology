import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { animate, stagger } from "animejs";

type FounderKey = "felipe" | "luigi" | "andre";

type Founder = {
  key: FounderKey;
  initial: string;
  accent: string;
  // Position of the card on the desktop grid (percent of the stage area).
  // x/y are the top-left of the card; nodes sit at the top-center of the card.
  col: string; // tailwind col-start / col-span
  offsetY: string; // tailwind mt-* for vertical stagger
};

const FOUNDERS: Founder[] = [
  { key: "felipe", initial: "F", accent: "hsl(var(--primary))", col: "md:col-start-1 md:col-span-4", offsetY: "md:mt-0" },
  { key: "luigi",  initial: "L", accent: "hsl(var(--accent))",  col: "md:col-start-8 md:col-span-5", offsetY: "md:mt-24" },
  { key: "andre",  initial: "A", accent: "hsl(var(--secondary))", col: "md:col-start-4 md:col-span-5", offsetY: "md:mt-16" },
];

const EDGES: [FounderKey, FounderKey][] = [
  ["felipe", "luigi"],
  ["luigi", "andre"],
  ["andre", "felipe"],
];

const Founders = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<FounderKey, HTMLDivElement | null>>({
    felipe: null,
    luigi: null,
    andre: null,
  });
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "-80px" });

  const [points, setPoints] = useState<Record<FounderKey, { x: number; y: number }> | null>(null);
  const [stageSize, setStageSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  // Measure node positions relative to the stage container.
  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const sRect = stage.getBoundingClientRect();
      setStageSize({ w: sRect.width, h: sRect.height });
      const next = {} as Record<FounderKey, { x: number; y: number }>;
      (Object.keys(nodeRefs.current) as FounderKey[]).forEach((k) => {
        const el = nodeRefs.current[k];
        if (!el) return;
        const r = el.getBoundingClientRect();
        next[k] = { x: r.left - sRect.left + r.width / 2, y: r.top - sRect.top + r.height / 2 };
      });
      setPoints(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Animate the edge line draw when in view.
  useEffect(() => {
    if (!points || !svgRef.current) return;
    const lines = svgRef.current.querySelectorAll<SVGLineElement>("line[data-edge]");
    lines.forEach((el) => {
      const length = (el as any).getTotalLength?.() ?? 800;
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = reduced || inView ? "0" : `${length}`;
    });
    if (reduced || !inView) return;
    lines.forEach((el) => {
      const length = (el as any).getTotalLength?.() ?? 800;
      el.style.strokeDashoffset = `${length}`;
    });
    animate(Array.from(lines) as any, {
      strokeDashoffset: 0,
      duration: 1400,
      delay: stagger(180),
      easing: "easeOutQuad",
    });
  }, [points, inView, reduced]);

  // Build perimeter path for the traveling signal.
  const perimeter = points
    ? `M ${points.felipe.x} ${points.felipe.y} L ${points.luigi.x} ${points.luigi.y} L ${points.andre.x} ${points.andre.y} Z`
    : "";

  return (
    <section id="socios" className="relative py-24 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Editorial header — asymmetric */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
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

        {/* Desktop: staggered asymmetric circuit */}
        <div
          ref={stageRef}
          className="relative hidden md:grid grid-cols-12 gap-6 pt-16 pb-8"
        >
          {/* SVG circuit lines (positioned absolutely over the stage) */}
          <svg
            ref={svgRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 w-full h-full overflow-visible z-0"
            width={stageSize.w}
            height={stageSize.h}
          >
            <defs>
              <linearGradient id="founders-edge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.9" />
              </linearGradient>
              <filter id="founders-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="founders-signal">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
              </radialGradient>
            </defs>

            {points &&
              EDGES.map(([a, b], i) => (
                <line
                  key={i}
                  data-edge
                  x1={points[a].x}
                  y1={points[a].y}
                  x2={points[b].x}
                  y2={points[b].y}
                  stroke="url(#founders-edge)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  filter="url(#founders-glow)"
                  opacity="0.85"
                />
              ))}

            {points && !reduced && inView && (
              <>
                <circle r="10" fill="url(#founders-signal)">
                  <animateMotion dur="6s" repeatCount="indefinite" path={perimeter} />
                </circle>
                <circle r="3.5" fill="hsl(var(--accent))">
                  <animateMotion dur="6s" repeatCount="indefinite" path={perimeter} />
                </circle>
              </>
            )}
          </svg>

          {FOUNDERS.map((f, idx) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.18 }}
              className={`relative z-10 col-span-12 ${f.col} ${f.offsetY}`}
            >
              <FounderCard
                founder={f}
                t={t}
                reduced={!!reduced}
                nodeRef={(el) => (nodeRefs.current[f.key] = el)}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: stacked list */}
        <div className="md:hidden space-y-6">
          {FOUNDERS.map((f, idx) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <FounderCard founder={f} t={t} reduced />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NodeCircle = ({
  founder,
  reduced,
  innerRef,
}: {
  founder: Founder;
  reduced: boolean;
  innerRef?: (el: HTMLDivElement | null) => void;
}) => (
  <div
    ref={innerRef}
    className="relative flex items-center justify-center w-20 h-20"
  >
    <span
      aria-hidden
      className={`absolute inset-0 m-auto h-20 w-20 rounded-full blur-2xl opacity-60 ${
        reduced ? "" : "group-hover:opacity-100 transition-opacity duration-500"
      }`}
      style={{ background: founder.accent }}
    />
    <span
      aria-hidden
      className="absolute h-[72px] w-[72px] rounded-full border border-border/70 group-hover:border-foreground/50 transition-colors duration-300"
    />
    <span
      className="relative h-14 w-14 rounded-full flex items-center justify-center font-mono text-lg font-semibold text-foreground"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, hsl(var(--card)) 0%, hsl(var(--background)) 90%)",
        boxShadow: `0 0 28px -4px ${founder.accent}`,
      }}
    >
      {founder.initial}
    </span>
  </div>
);

const FounderCard = ({
  founder,
  t,
  reduced,
  nodeRef,
}: {
  founder: Founder;
  t: (k: string) => string;
  reduced: boolean;
  nodeRef?: (el: HTMLDivElement | null) => void;
}) => {
  return (
    <article
      className="group relative glass rounded-2xl pt-14 pb-6 px-6 text-center transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{
        boxShadow: `0 12px 48px -20px ${founder.accent}`,
      }}
    >
      {/* Node anchored on the top edge, half outside the card */}
      <div className="absolute left-1/2 -top-10 -translate-x-1/2">
        <NodeCircle founder={founder} reduced={reduced} innerRef={nodeRef} />
      </div>

      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-1.5">
        {t(`founders.items.${founder.key}.role`)}
      </p>
      <h3 className="font-headline text-2xl font-bold mb-2 text-foreground">
        {t(`founders.items.${founder.key}.name`)}
      </h3>
      <p className="text-sm text-muted-foreground font-body leading-relaxed">
        {t(`founders.items.${founder.key}.line`)}
      </p>
    </article>
  );
};

export default Founders;
