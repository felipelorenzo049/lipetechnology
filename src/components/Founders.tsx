import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type FounderKey = "felipe" | "luigi" | "andre";

const FOUNDERS: { key: FounderKey; initial: string; accent: string }[] = [
  { key: "felipe", initial: "F", accent: "hsl(var(--primary))" },
  { key: "luigi", initial: "L", accent: "hsl(var(--accent))" },
  { key: "andre", initial: "A", accent: "hsl(var(--secondary))" },
];

const Founders = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="socios"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs sm:text-sm text-accent tracking-[0.2em] uppercase mb-5"
          >
            {t("founders.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-headline text-3xl md:text-5xl font-bold leading-tight mb-4"
          >
            {t("founders.title")}{" "}
            <span className="gradient-text">{t("founders.titleHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground font-body text-base md:text-lg"
          >
            {t("founders.subtitle")}
          </motion.p>
        </div>

        {/* Network: nodes + connecting lines */}
        <div ref={ref} className="relative">
          {/* Connecting lines (desktop only) */}
          <svg
            aria-hidden
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="founders-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.0" />
                <stop offset="20%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
                <stop offset="80%" stopColor="hsl(var(--secondary))" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <line
              x1="16"
              y1="50"
              x2="84"
              y2="50"
              stroke="url(#founders-line)"
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FOUNDERS.map((f, idx) => (
              <motion.article
                key={f.key}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.12 }}
                className="group relative glass rounded-2xl p-7 md:p-8 text-center transition-transform duration-300 will-change-transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {/* Node / core */}
                <div className="relative mx-auto mb-6 flex items-center justify-center">
                  {/* outer halo */}
                  <span
                    className="absolute inset-0 m-auto h-24 w-24 rounded-full blur-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-90 motion-reduce:transition-none motion-reduce:group-hover:opacity-40"
                    style={{ background: f.accent }}
                    aria-hidden
                  />
                  {/* ring */}
                  <span
                    className="absolute h-20 w-20 rounded-full border border-border/60 group-hover:border-foreground/40 transition-colors duration-300"
                    aria-hidden
                  />
                  {/* core */}
                  <span
                    className="relative h-16 w-16 rounded-full flex items-center justify-center font-headline text-2xl font-bold text-foreground"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, hsl(var(--card)) 0%, hsl(var(--background)) 90%)",
                      boxShadow: `0 0 24px -4px ${f.accent}`,
                    }}
                  >
                    {f.initial}
                  </span>
                </div>

                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent mb-2">
                  {t(`founders.items.${f.key}.role`)}
                </p>
                <h3 className="font-headline text-xl md:text-2xl font-semibold text-foreground mb-3">
                  {t(`founders.items.${f.key}.name`)}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed">
                  {t(`founders.items.${f.key}.line`)}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founders;
