import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink, Rocket, Briefcase } from "lucide-react";
import { animate, stagger } from "animejs";
import { useIsMobile } from "@/hooks/use-mobile";

type Stage = "ideacao" | "dev" | "beta" | "live";

type Product = {
  key: string;
  stage: Stage;
};

const PRODUCTS: Product[] = [
  { key: "flowride", stage: "dev" },
  { key: "festagate", stage: "dev" },
  { key: "plateboutique", stage: "dev" },
  { key: "horsebid", stage: "beta" },
];

const STAGES: Stage[] = ["ideacao", "dev", "beta", "live"];

const CLIENTS = [
  { key: "easyline", hasUrl: true },
  { key: "winn", hasUrl: false },
  { key: "milan", hasUrl: false },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Pipe = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const nodesRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  // Draw lines + stagger node entry when in view
  useEffect(() => {
    if (!inView) return;

    const paths = lineRefs.current.filter(Boolean) as SVGPathElement[];

    if (reduced) {
      paths.forEach((p) => {
        p.style.strokeDasharray = "none";
        p.style.strokeDashoffset = "0";
      });
      return;
    }

    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    animate(paths, {
      strokeDashoffset: 0,
      duration: 1400,
      delay: stagger(120),
      ease: "outQuad",
    });

    if (nodesRef.current) {
      const nodes = nodesRef.current.querySelectorAll<HTMLElement>(
        "[data-pipe-node]",
      );
      animate(nodes, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 600,
        delay: stagger(80, { start: 400 }),
        ease: "outQuad",
      });
    }
  }, [inView, reduced]);

  const grouped: Record<Stage, Product[]> = {
    ideacao: [],
    dev: [],
    beta: [],
    live: [],
  };
  PRODUCTS.forEach((p) => grouped[p.stage].push(p));

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs sm:text-sm text-accent tracking-[0.22em] uppercase mb-4"
          >
            {t("pipe.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-headline text-3xl md:text-5xl font-bold leading-tight mb-4"
          >
            {t("pipe.title")}{" "}
            <span className="gradient-text">{t("pipe.titleHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground font-body text-base md:text-lg"
          >
            {t("pipe.subtitle")}
          </motion.p>
        </div>

        {/* Pipe circuit */}
        {isMobile ? (
          <MobilePipe grouped={grouped} reduced={reduced} />
        ) : (
          <DesktopPipe
            grouped={grouped}
            lineRefs={lineRefs}
            nodesRef={nodesRef}
            reduced={reduced}
          />
        )}

        {/* Clients rail */}
        <div className="mt-28 md:mt-36 pt-12 border-t border-border/40">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <p className="font-mono text-[11px] sm:text-xs text-secondary tracking-[0.22em] uppercase mb-3">
              {t("pipe.clientsLabel")}
            </p>
            <h3 className="font-headline text-2xl md:text-3xl font-semibold leading-tight mb-3">
              {t("pipe.clientsTitle")}{" "}
              <span className="gradient-text">
                {t("pipe.clientsTitleHighlight")}
              </span>
            </h3>
            <p className="text-muted-foreground font-body text-sm md:text-base">
              {t("pipe.clientsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {CLIENTS.map((c) => {
              const url = c.hasUrl
                ? (t(`pipe.clients.${c.key}.url`) as string)
                : undefined;
              const inner = (
                <div className="group h-full rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-5 transition-colors hover:border-secondary/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={12} className="text-secondary" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      cliente
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-headline text-lg font-semibold text-foreground">
                        {t(`pipe.clients.${c.key}.name`)}
                      </h4>
                      <p className="text-sm text-muted-foreground font-body mt-0.5">
                        {t(`pipe.clients.${c.key}.tagline`)}
                      </p>
                    </div>
                    {url && (
                      <ExternalLink
                        size={16}
                        className="text-muted-foreground group-hover:text-secondary transition-colors shrink-0"
                      />
                    )}
                  </div>
                </div>
              );
              return url ? (
                <a
                  key={c.key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <div key={c.key}>{inner}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------- Desktop ------------------------------- */

const DesktopPipe = ({
  grouped,
  lineRefs,
  nodesRef,
  reduced,
}: {
  grouped: Record<Stage, Product[]>;
  lineRefs: React.MutableRefObject<(SVGPathElement | null)[]>;
  nodesRef: React.RefObject<HTMLDivElement>;
  reduced: boolean;
}) => {
  const { t } = useTranslation();

  // Horizontal positions for the 4 stage columns (percentage of width)
  const colX = [12.5, 37.5, 62.5, 87.5];
  // Vertical positions
  const headerY = 60;
  const nodeStartY = 170;
  const nodeGap = 150;

  // Build horizontal main line path
  const mainPath = `M ${colX[0]} ${headerY} L ${colX[3]} ${headerY}`;

  // Vertical drops from header to nodes
  const drops: string[] = [];
  STAGES.forEach((stage, i) => {
    const nodes = grouped[stage];
    nodes.forEach((_, ni) => {
      const y = nodeStartY + ni * nodeGap;
      drops.push(`M ${colX[i]} ${headerY} L ${colX[i]} ${y}`);
    });
  });

  const totalHeight =
    nodeStartY +
    Math.max(0, Math.max(...STAGES.map((s) => grouped[s].length)) - 1) *
      nodeGap +
    80;

  return (
    <div className="relative" style={{ minHeight: totalHeight + 40 }}>
      {/* SVG circuit */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 100 ${totalHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.7" />
          </linearGradient>
          <filter id="pipe-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref={(el) => (lineRefs.current[0] = el)}
          d={mainPath}
          stroke="url(#pipe-grad)"
          strokeWidth="0.4"
          fill="none"
          vectorEffect="non-scaling-stroke"
          filter="url(#pipe-glow)"
        />

        {drops.map((d, i) => (
          <path
            key={i}
            ref={(el) => (lineRefs.current[i + 1] = el)}
            d={d}
            stroke="hsl(var(--accent))"
            strokeOpacity="0.45"
            strokeWidth="0.25"
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="0.6 0.6"
          />
        ))}

        {/* Traveling signal */}
        {!reduced && (
          <circle r="1.2" fill="hsl(var(--accent))" filter="url(#pipe-glow)">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path={mainPath}
              rotate="auto"
            />
          </circle>
        )}
      </svg>

      {/* Foreground grid */}
      <div ref={nodesRef} className="relative grid grid-cols-4 gap-4">
        {STAGES.map((stage, i) => (
          <div key={stage} className="flex flex-col items-center">
            {/* Stage header */}
            <div
              data-pipe-node
              className="opacity-0 mt-3 mb-12 px-3 py-1.5 rounded-full glass border border-border/60"
            >
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-foreground/80">
                {t(`pipe.stages.${stage}`)}
              </span>
            </div>

            {/* Nodes */}
            <div className="flex flex-col items-center gap-[60px] w-full px-1">
              {grouped[stage].length === 0 && (
                <div
                  data-pipe-node
                  className="opacity-0 mt-1 text-[11px] font-mono text-muted-foreground/60 italic"
                >
                  {t("pipe.comingSoon")}
                </div>
              )}
              {grouped[stage].map((p) => (
                <ProductNode key={p.key} productKey={p.key} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductNode = ({ productKey }: { productKey: string }) => {
  const { t } = useTranslation();
  const tech = t(`pipe.products.${productKey}.tech`, {
    returnObjects: true,
  }) as string[];

  return (
    <div
      data-pipe-node
      className="opacity-0 group relative w-full max-w-[230px]"
    >
      {/* Node dot */}
      <div className="flex justify-center mb-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 group-hover:opacity-100 blur-[3px] transition-opacity" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent))]" />
        </span>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/60 group-hover:shadow-[0_8px_30px_-12px_hsl(var(--accent)/0.5)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <div className="flex items-center gap-1.5 mb-2">
          <Rocket size={10} className="text-primary" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-primary">
            produto
          </span>
        </div>
        <h4 className="font-headline text-base font-semibold text-foreground leading-tight">
          {t(`pipe.products.${productKey}.name`)}
        </h4>
        <p className="text-xs text-muted-foreground font-body mt-1 leading-snug">
          {t(`pipe.products.${productKey}.tagline`)}
        </p>

        {/* Hover reveal: description + tech */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 motion-reduce:duration-0">
          <div className="overflow-hidden">
            <p className="text-xs text-foreground/70 font-body leading-relaxed pt-3">
              {t(`pipe.products.${productKey}.description`)}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {Array.isArray(tech) &&
                tech.map((tg) => (
                  <span
                    key={tg}
                    className="px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground text-[10px] font-mono"
                  >
                    {tg}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------- Mobile ------------------------------- */

const MobilePipe = ({
  grouped,
}: {
  grouped: Record<Stage, Product[]>;
  reduced: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-10">
      {STAGES.map((stage) => (
        <div key={stage} className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_hsl(var(--accent))]" />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground/80">
              {t(`pipe.stages.${stage}`)}
            </span>
            <span className="flex-1 h-px bg-border/50" />
          </div>

          {grouped[stage].length === 0 ? (
            <p className="text-xs font-mono italic text-muted-foreground/60 pl-5">
              {t("pipe.comingSoon")}
            </p>
          ) : (
            <div className="space-y-3 pl-5">
              {grouped[stage].map((p) => (
                <MobileProductCard key={p.key} productKey={p.key} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const MobileProductCard = ({ productKey }: { productKey: string }) => {
  const { t } = useTranslation();
  const tech = t(`pipe.products.${productKey}.tech`, {
    returnObjects: true,
  }) as string[];

  return (
    <div className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-4">
      <div className="flex items-center gap-1.5 mb-2">
        <Rocket size={10} className="text-primary" />
        <span className="font-mono text-[9px] uppercase tracking-wider text-primary">
          produto
        </span>
      </div>
      <h4 className="font-headline text-base font-semibold text-foreground">
        {t(`pipe.products.${productKey}.name`)}
      </h4>
      <p className="text-xs text-muted-foreground font-body mt-1">
        {t(`pipe.products.${productKey}.tagline`)}
      </p>
      <p className="text-xs text-foreground/70 font-body mt-2 leading-relaxed">
        {t(`pipe.products.${productKey}.description`)}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {Array.isArray(tech) &&
          tech.map((tg) => (
            <span
              key={tg}
              className="px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground text-[10px] font-mono"
            >
              {tg}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Pipe;
