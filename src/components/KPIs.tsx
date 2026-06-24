import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SectionSignal from "@/components/SectionSignal";

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
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  const kpis = [
    { value: 4, suffix: "", labelKey: "kpis.projects", code: "PRJ" },
    { value: 500, suffix: "+", labelKey: "kpis.hoursSaved", code: "HRS" },
    { value: 4.9, suffix: "/5", labelKey: "kpis.satisfaction", code: "NPS", isDecimal: true },
    { value: 100, suffix: "%", labelKey: "kpis.onTime", code: "OTD" },
  ];

  return (
    <section id="kpis" className="py-16 md:py-24">
      <div ref={ref} className="container mx-auto px-6 max-w-6xl">
        <div className="mb-4 flex justify-center"><SectionSignal align="center" width={160} /></div>
        <div className="relative rounded-2xl glass border border-border/50 overflow-hidden">
          {/* gradient border accent */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          {/* telemetry header */}
          <div className="flex items-center justify-between px-5 md:px-8 py-3 border-b border-border/40">
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
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative p-6 md:p-8 group"
    >
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
    </motion.div>
  );
};

export default KPIs;
