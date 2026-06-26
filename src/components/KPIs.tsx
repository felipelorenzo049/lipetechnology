import { useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useCounter = (end: number, inView: boolean, enabled: boolean, duration = 1800) => {
  const [count, setCount] = useState(enabled ? 0 : end);
  useEffect(() => {
    if (!enabled) {
      setCount(end);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * end));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setCount(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, inView, enabled, duration]);
  return count;
};

const KPIs = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  // The telemetry panel "boots up" as it scrolls into view: the panel rises,
  // its gradient borders draw, the header lights up, then the cells stagger in
  // while their counters tick to target.
  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from("[data-kpi='panel']", { opacity: 0, y: 26, scale: 0.985, duration: 0.6, clearProps: "transform,opacity" }, 0)
        .from("[data-kpi='border']", { scaleX: 0, transformOrigin: "center", duration: 0.6, stagger: 0.12 }, 0.1)
        .from("[data-kpi='header']", { opacity: 0, y: -8, duration: 0.4 }, 0.28)
        .from("[data-kpi='cell']", { opacity: 0, y: 14, duration: 0.5, stagger: 0.1, clearProps: "transform,opacity" }, 0.38);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const kpis = [
    { value: 4, suffix: "", labelKey: "kpis.projects", code: "PRJ" },
    { value: 500, suffix: "+", labelKey: "kpis.hoursSaved", code: "HRS" },
    { value: 4.9, suffix: "/5", labelKey: "kpis.satisfaction", code: "NPS", isDecimal: true },
    { value: 100, suffix: "%", labelKey: "kpis.onTime", code: "OTD" },
  ];

  return (
    <section id="kpis" ref={sectionRef} className="py-16 md:py-24">
      <div ref={ref} className="container mx-auto px-6 max-w-6xl">
        <div data-kpi="panel" className="relative rounded-2xl glass border border-border/50 overflow-hidden">
          {/* gradient border accent */}
          <div data-kpi="border" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          <div data-kpi="border" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          {/* telemetry header */}
          <div data-kpi="header" className="flex items-center justify-between px-5 md:px-8 py-3 border-b border-border/40">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent))] animate-pulse" />
              <span className="font-mono text-[10px] md:text-xs tracking-[0.18em] uppercase text-muted-foreground">
                TELEMETRY · LIVE
              </span>
            </div>
            <span className="font-mono text-[10px] md:text-xs text-muted-foreground/70">v1.0</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border/40">
            {kpis.map((kpi, i) => (
              <KPIItem key={kpi.labelKey} kpi={kpi} index={i} inView={inView} reduced={!!reduced} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const KPIItem = ({
  kpi,
  index,
  inView,
  reduced,
}: {
  kpi: { value: number; suffix: string; labelKey: string; code: string; isDecimal?: boolean };
  index: number;
  inView: boolean;
  reduced: boolean;
}) => {
  const { t } = useTranslation();
  const target = kpi.isDecimal ? 49 : kpi.value;
  const count = useCounter(target, inView, !reduced);
  const display = kpi.isDecimal ? (count / 10).toFixed(1) : count;

  return (
    <div data-kpi="cell" className="relative p-6 md:p-8 group">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-[0.2em] text-accent/80">{kpi.code}</span>
        <span className="font-mono text-[10px] text-muted-foreground/60">
          0{index + 1}/0{4}
        </span>
      </div>
      <div className="font-mono text-4xl md:text-5xl font-semibold tabular-nums text-foreground tracking-tight">
        <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent drop-shadow-[0_0_18px_hsl(var(--accent)/0.25)]">
          {display}
        </span>
        <span className="text-accent">{kpi.suffix}</span>
      </div>
      <div className="mt-3 h-px w-full bg-gradient-to-r from-accent/40 via-primary/20 to-transparent" />
      <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.14em] text-muted-foreground mt-3">
        {t(kpi.labelKey)}
      </p>
    </div>
  );
};

export default KPIs;
