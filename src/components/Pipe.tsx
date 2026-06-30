import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionSignal from "@/components/SectionSignal";
import {
  ExternalLink,
  Rocket,
  Briefcase,
  Car,
  QrCode,
  UtensilsCrossed,
  Gavel,
  Radio,
  type LucideIcon,
} from "lucide-react";
import { animate, stagger } from "animejs";
import { useIsMobile } from "@/hooks/use-mobile";
import ScrollAperture from "@/components/ScrollAperture";

type Stage = "ideacao" | "dev" | "beta" | "live";

type Product = {
  key: string;
  stage: Stage;
  icon: LucideIcon;
  url?: string;
};

const PRODUCTS: Product[] = [
  { key: "flowride", stage: "dev", icon: Car },
  { key: "plateboutique", stage: "dev", icon: UtensilsCrossed },
  { key: "horsebid", stage: "beta", icon: Gavel },
  { key: "festagate", stage: "live", icon: QrCode },
];

const STAGES: Stage[] = ["ideacao", "dev", "beta", "live"];
const STAGE_INDEX: Record<Stage, number> = {
  ideacao: 0,
  dev: 1,
  beta: 2,
  live: 3,
};

const STAGE_COLOR: Record<Stage, string> = {
  ideacao: "hsl(var(--muted-foreground))",
  dev: "hsl(var(--primary))",
  beta: "hsl(var(--accent))",
  live: "hsl(var(--secondary))",
};

const STAGE_CLASSES: Record<
  Stage,
  { dot: string; border: string; shadow: string; text: string }
> = {
  ideacao: {
    dot: "bg-muted-foreground",
    border: "group-hover:border-muted-foreground/60",
    shadow: "group-hover:shadow-[0_8px_30px_-12px_hsl(var(--muted-foreground)/0.4)]",
    text: "text-muted-foreground",
  },
  dev: {
    dot: "bg-primary shadow-[0_0_12px_hsl(var(--primary))]",
    border: "group-hover:border-primary/60",
    shadow: "group-hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.5)]",
    text: "text-primary",
  },
  beta: {
    dot: "bg-accent shadow-[0_0_12px_hsl(var(--accent))]",
    border: "group-hover:border-accent/60",
    shadow: "group-hover:shadow-[0_8px_30px_-12px_hsl(var(--accent)/0.5)]",
    text: "text-accent",
  },
  live: {
    dot: "bg-secondary shadow-[0_0_14px_hsl(var(--secondary))]",
    border: "group-hover:border-secondary/70",
    shadow: "group-hover:shadow-[0_10px_36px_-12px_hsl(var(--secondary)/0.6)]",
    text: "text-secondary",
  },
};

const CLIENTS = [
  { key: "easyline", hasUrl: true, live: true, icon: Radio },
  { key: "winn", hasUrl: false, live: false, icon: Briefcase },
  { key: "milan", hasUrl: false, live: false, icon: Briefcase },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Pipe = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

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
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <div className="flex justify-center mb-4">
            <SectionSignal align="center" width={170} />
          </div>
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

        {isMobile ? (
          <MobilePipe grouped={grouped} />
        ) : (
          <ScrollAperture>
            <DesktopPipe grouped={grouped} reduced={reduced} />
          </ScrollAperture>
        )}

        {/* Clients rail */}
        <div className="mt-24 md:mt-32 pt-12 border-t border-border/40">
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
              const Icon = c.icon;
              const url = c.hasUrl
                ? (t(`pipe.clients.${c.key}.url`) as string)
                : undefined;
              const inner = (
                <div className={`group relative h-full rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-5 transition-all ${c.key === "easyline" ? "hover:border-secondary/50 hover:-translate-y-0.5 cursor-pointer motion-reduce:hover:translate-y-0" : ""}`}>
                  {c.live && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-secondary/40 bg-secondary/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-secondary">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-70 motion-reduce:hidden" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary" />
                      </span>
                      {t("pipe.stages.live")}
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={12} className="text-secondary" />
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

type PipeNode = { dotY: number; cardBottom: number };
type ColGeom = { cx: number; stage: Stage; nodes: PipeNode[] };

const DesktopPipe = ({
  grouped,
  reduced,
}: {
  grouped: Record<Stage, Product[]>;
  reduced: boolean;
}) => {
  const { t } = useTranslation();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "-80px" });
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [geom, setGeom] = useState<{ railY: number; cols: ColGeom[] } | null>(null);

  // Measure real node positions so the circuit always lands on the cards.
  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const sr = stage.getBoundingClientRect();
      setSize({ w: sr.width, h: sr.height });

      const colEls = Array.from(
        stage.querySelectorAll<HTMLElement>("[data-pipe-col]"),
      );
      let pillBottomMax = 0;
      const cols: ColGeom[] = colEls.map((col, i) => {
        const pill = col.querySelector<HTMLElement>("[data-pipe-pill]");
        let cx = 0;
        if (pill) {
          const pr = pill.getBoundingClientRect();
          cx = pr.left - sr.left + pr.width / 2;
          pillBottomMax = Math.max(pillBottomMax, pr.bottom - sr.top);
        }
        const dotEls = Array.from(
          col.querySelectorAll<HTMLElement>("[data-pipe-dot]"),
        );
        const nodes: PipeNode[] = dotEls.map((d) => {
          const dr = d.getBoundingClientRect();
          const dotY = dr.top - sr.top + dr.height / 2;
          const card = d.parentElement?.nextElementSibling as HTMLElement | null;
          const cardBottom = card
            ? card.getBoundingClientRect().bottom - sr.top
            : dotY;
          return { dotY, cardBottom };
        });
        if (!pill && dotEls[0]) {
          const dr = dotEls[0].getBoundingClientRect();
          cx = dr.left - sr.left + dr.width / 2;
        }
        return { cx, stage: STAGES[i], nodes };
      });

      setGeom({ railY: Math.round(pillBottomMax + 26), cols });
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

  // Draw the circuit + reveal the nodes when the section enters view.
  useEffect(() => {
    if (!geom) return;
    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
    const nodes = stageRef.current?.querySelectorAll<HTMLElement>(
      "[data-pipe-node]",
    );

    if (reduced) {
      paths.forEach((p) => {
        p.style.strokeDasharray = "none";
        p.style.strokeDashoffset = "0";
      });
      nodes?.forEach((n) => {
        n.style.opacity = "1";
      });
      return;
    }

    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    if (!inView) return;

    animate(paths, {
      strokeDashoffset: 0,
      duration: 1300,
      delay: stagger(110),
      ease: "outQuad",
    });

    if (nodes) {
      animate(nodes, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 600,
        delay: stagger(70, { start: 300 }),
        ease: "outQuad",
      });
    }
  }, [geom, inView, reduced]);

  const lastCx = geom && geom.cols.length ? geom.cols[geom.cols.length - 1].cx : 0;
  const rail =
    geom && geom.cols.length
      ? `M ${geom.cols[0].cx.toFixed(1)} ${geom.railY} L ${lastCx.toFixed(1)} ${geom.railY}`
      : "";

  // Drops are drawn as segments that live only in the gaps — rail → first dot,
  // then each card's bottom → the next dot — so the line never crosses a card.
  const drops = geom
    ? geom.cols.flatMap((c) => {
        if (!c.nodes.length) return [];
        const cx = c.cx.toFixed(1);
        const segs: { d: string; stage: Stage }[] = [
          {
            d: `M ${cx} ${geom.railY} L ${cx} ${c.nodes[0].dotY.toFixed(1)}`,
            stage: c.stage,
          },
        ];
        for (let i = 1; i < c.nodes.length; i++) {
          segs.push({
            d: `M ${cx} ${c.nodes[i - 1].cardBottom.toFixed(1)} L ${cx} ${c.nodes[i].dotY.toFixed(1)}`,
            stage: c.stage,
          });
        }
        return segs;
      })
    : [];

  return (
    <div ref={stageRef} className="relative">
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
      >
        <defs>
          <linearGradient id="pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.9" />
          </linearGradient>
          <filter id="pipe-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {geom && (
          <>
            <path
              ref={(el) => (pathRefs.current[0] = el)}
              d={rail}
              stroke="url(#pipe-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              filter="url(#pipe-glow)"
            />

            {drops.map((dr, i) => (
              <path
                key={i}
                ref={(el) => (pathRefs.current[i + 1] = el)}
                d={dr.d}
                stroke={STAGE_COLOR[dr.stage]}
                strokeOpacity="0.55"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            ))}

            {!reduced && rail && (
              <circle r="4" fill="hsl(var(--accent))" filter="url(#pipe-glow)">
                <animateMotion dur="5s" repeatCount="indefinite" path={rail} />
              </circle>
            )}
          </>
        )}
      </svg>

      <div className="relative grid grid-cols-4 gap-3">
        {STAGES.map((stage) => (
          <div key={stage} data-pipe-col className="flex flex-col items-center">
            <div
              data-pipe-pill
              data-pipe-node
              className="opacity-0 mt-3 mb-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border/60"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${STAGE_CLASSES[stage].dot}`}
              />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-foreground/80">
                {t(`pipe.stages.${stage}`)}
              </span>
            </div>

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
                <ProductNode key={p.key} product={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StageProgress = ({ stage }: { stage: Stage }) => {
  const current = STAGE_INDEX[stage];
  return (
    <div className="flex items-center gap-1 mt-3">
      {STAGES.map((s, i) => {
        const active = i <= current;
        return (
          <span
            key={s}
            className={`h-0.5 flex-1 rounded-full transition-colors ${
              active ? "" : "bg-border/40"
            }`}
            style={
              active
                ? { backgroundColor: STAGE_COLOR[stage], opacity: 0.85 }
                : undefined
            }
          />
        );
      })}
    </div>
  );
};

const ProductPreview = ({ productKey }: { productKey: string }) => {
  const box = "mt-3 rounded-lg border border-border/40 bg-background/40 p-2 overflow-hidden";
  switch (productKey) {
    case "flowride":
      return (
        <div className={`${box} flex gap-2 items-center`} aria-hidden>
          <div className="h-9 w-12 shrink-0 rounded bg-gradient-to-br from-primary/30 to-secondary/20" />
          <div className="flex-1 space-y-1">
            <div className="h-1.5 w-full rounded bg-foreground/[0.12]" />
            <div className="h-1.5 w-2/3 rounded bg-foreground/[0.08]" />
            <div className="font-mono text-[8px] text-primary">€ 18.900</div>
          </div>
        </div>
      );
    case "plateboutique":
      return (
        <div className={`${box} space-y-1.5`} aria-hidden>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="h-1.5 rounded bg-foreground/[0.12]" style={{ width: `${60 - i * 8}%` }} />
              <div className="h-1.5 w-5 rounded bg-secondary/40" />
            </div>
          ))}
        </div>
      );
    case "horsebid":
      return (
        <div className={box} aria-hidden>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">lance atual</span>
            <span className="inline-flex items-center gap-1 font-mono text-[8px] text-accent">
              <span className="h-1 w-1 rounded-full bg-accent animate-pulse" />
              live
            </span>
          </div>
          <div className="mt-0.5 font-mono text-sm font-semibold text-foreground">R$ 54.000</div>
        </div>
      );
    case "festagate":
      return (
        <div className={`${box} flex items-center gap-2`} aria-hidden>
          <div className="grid grid-cols-3 gap-0.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-[1px] ${[0, 2, 4, 6, 8].includes(i) ? "bg-foreground/70" : "bg-foreground/[0.15]"}`}
              />
            ))}
          </div>
          <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            válido
          </span>
        </div>
      );
    default:
      return null;
  }
};

const ProductNode = ({ product }: { product: Product }) => {
  const { t } = useTranslation();
  const { key, stage, icon: Icon } = product;
  const sc = STAGE_CLASSES[stage];
  const tech = t(`pipe.products.${key}.tech`, {
    returnObjects: true,
  }) as string[];

  return (
    <div
      data-pipe-node
      className="opacity-0 group relative w-full max-w-[240px]"
    >
      <div className="flex justify-center mb-3">
        <span data-pipe-dot className="relative flex h-3 w-3">
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-60 group-hover:opacity-100 blur-[3px] transition-opacity ${sc.dot}`}
          />
          <span className={`relative inline-flex h-3 w-3 rounded-full ${sc.dot}`} />
        </span>
      </div>

      <div
        className={`relative rounded-xl border border-border/60 bg-gradient-to-b from-card/60 to-card/30 backdrop-blur-md p-4 transition-all duration-300 group-hover:-translate-y-1 ${sc.border} ${sc.shadow} motion-reduce:transition-none motion-reduce:group-hover:translate-y-0`}
      >
        {/* subtle gradient edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(120% 60% at 50% 0%, ${STAGE_COLOR[stage]}14, transparent 70%)`,
          }}
        />

        <div className="relative flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Rocket size={10} className="text-primary" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-primary">
              produto
            </span>
          </div>
          <span
            className={`inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/40 px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-wider ${sc.text}`}
          >
            {stage === "live" && (
              <span className="relative flex h-1 w-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-70 motion-reduce:hidden" />
                <span className="relative inline-flex h-1 w-1 rounded-full bg-secondary" />
              </span>
            )}
            {t(`pipe.stages.${stage}`)}
          </span>
        </div>

        <div className="relative flex items-start gap-3">
          <div
            className="shrink-0 rounded-lg border border-border/60 bg-background/40 p-2"
            style={{ color: STAGE_COLOR[stage] }}
          >
            <Icon size={18} />
          </div>
          <div className="min-w-0">
            <h4 className="font-headline text-base font-semibold text-foreground leading-tight truncate">
              {t(`pipe.products.${key}.name`)}
            </h4>
            <p className="text-xs text-muted-foreground font-body mt-0.5 leading-snug">
              {t(`pipe.products.${key}.tagline`)}
            </p>
          </div>
        </div>

        <StageProgress stage={stage} />

        <div className="relative flex flex-wrap gap-1 mt-3">
          {Array.isArray(tech) &&
            tech.map((tg) => (
              <span
                key={tg}
                className="px-1.5 py-0.5 rounded-md bg-muted/50 text-muted-foreground text-[9.5px] font-mono"
              >
                {tg}
              </span>
            ))}
        </div>
        <ProductPreview productKey={key} />

        {/* Hover reveal: full description */}
        <div className="relative grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 motion-reduce:duration-0">
          <div className="overflow-hidden">
            <p className="text-xs text-foreground/70 font-body leading-relaxed pt-3">
              {t(`pipe.products.${key}.description`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------- Mobile ------------------------------- */

const MobilePipe = ({ grouped }: { grouped: Record<Stage, Product[]> }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-10">
      {STAGES.map((stage) => (
        <div key={stage} className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`h-2 w-2 rounded-full ${STAGE_CLASSES[stage].dot}`}
            />
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
                <MobileProductCard key={p.key} product={p} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const MobileProductCard = ({ product }: { product: Product }) => {
  const { t } = useTranslation();
  const { key, stage, icon: Icon } = product;
  const sc = STAGE_CLASSES[stage];
  const tech = t(`pipe.products.${key}.tech`, {
    returnObjects: true,
  }) as string[];

  return (
    <div className="rounded-xl border border-border/60 bg-gradient-to-b from-card/60 to-card/30 backdrop-blur-md p-4">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <Rocket size={10} className="text-primary" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-primary">
            produto
          </span>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/40 px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-wider ${sc.text}`}
        >
          {stage === "live" && (
            <span className="h-1 w-1 rounded-full bg-secondary" />
          )}
          {t(`pipe.stages.${stage}`)}
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div
          className="shrink-0 rounded-lg border border-border/60 bg-background/40 p-2"
          style={{ color: STAGE_COLOR[stage] }}
        >
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <h4 className="font-headline text-base font-semibold text-foreground">
            {t(`pipe.products.${key}.name`)}
          </h4>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            {t(`pipe.products.${key}.tagline`)}
          </p>
        </div>
      </div>

      <StageProgress stage={stage} />

      <p className="text-xs text-foreground/70 font-body mt-3 leading-relaxed">
        {t(`pipe.products.${key}.description`)}
      </p>

      <div className="flex flex-wrap gap-1 mt-3">
        {Array.isArray(tech) &&
          tech.map((tg) => (
            <span
              key={tg}
              className="px-1.5 py-0.5 rounded-md bg-muted/50 text-muted-foreground text-[9.5px] font-mono"
            >
              {tg}
            </span>
          ))}
      </div>
      <ProductPreview productKey={key} />
    </div>
  );
};

export default Pipe;
