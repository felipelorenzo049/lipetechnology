import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Search, Target, Hammer, Rocket, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const stepKeys = [
  { icon: Search, titleKey: "discovery", shortKey: "discoveryShort", detailKey: "discoveryDetail", code: "P·01" },
  { icon: Target, titleKey: "strategy", shortKey: "strategyShort", detailKey: "strategyDetail", code: "P·02" },
  { icon: Hammer, titleKey: "build", shortKey: "buildShort", detailKey: "buildDetail", code: "P·03" },
  { icon: Rocket, titleKey: "growth", shortKey: "growthShort", detailKey: "growthDetail", code: "P·04" },
];

const Process = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 30%"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="processo" ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 max-w-xl"
        >
          <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">{t("process.label")}</span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 leading-[1.05]">
            {t("process.title")}{" "}
            <span className="gradient-text">{t("process.titleHighlight")}</span>
          </h2>
        </motion.div>

        <div ref={trackRef} className="relative">
          {/* rail */}
          <div className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-border/40" />
          {/* fill */}
          {reduced ? (
            <div className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-secondary" />
          ) : (
            <motion.div
              style={{ height: fillHeight }}
              className="absolute left-5 md:left-6 top-0 w-px bg-gradient-to-b from-primary via-accent to-secondary shadow-[0_0_10px_hsl(var(--accent)/0.6)]"
            />
          )}

          <div className="space-y-10 md:space-y-12">
            {stepKeys.map((step, i) => (
              <StepCard
                key={step.titleKey}
                step={step}
                index={i}
                progress={scrollYProgress}
                reduced={!!reduced}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({
  step,
  index,
  progress,
  reduced,
}: {
  step: typeof stepKeys[0];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // node lights up when fill passes its position
  const threshold = (index + 0.5) / stepKeys.length;
  const nodeOpacity = useTransform(progress, [threshold - 0.05, threshold], [0.35, 1]);
  const nodeScale = useTransform(progress, [threshold - 0.05, threshold], [0.9, 1.1]);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-14 md:pl-20"
    >
      {/* node */}
      <motion.div
        style={reduced ? undefined : { opacity: nodeOpacity, scale: nodeScale }}
        className="absolute left-2 md:left-3 top-3 w-7 h-7 rounded-full bg-background border-2 border-accent flex items-center justify-center shadow-[0_0_16px_hsl(var(--accent)/0.55)]"
      >
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      </motion.div>

      <div
        className="relative glass rounded-xl p-5 md:p-6 cursor-pointer border border-border/50 hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_-10px_hsl(var(--accent)/0.4)]"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-primary/10">
              <step.icon size={18} className="text-primary" />
            </div>
            <div className="min-w-0">
              <span className="font-mono text-[10px] tracking-[0.2em] text-accent/80 uppercase">{step.code}</span>
              <h3 className="font-headline text-lg md:text-xl font-semibold leading-tight">
                {t(`process.${step.titleKey}`)}
              </h3>
            </div>
          </div>
          <ChevronDown
            size={18}
            className={`text-muted-foreground/70 transition-transform shrink-0 ${expanded ? "rotate-180" : ""}`}
          />
        </div>
        <p className="text-muted-foreground text-sm mt-3 font-body">{t(`process.${step.shortKey}`)}</p>

        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-foreground/80 text-sm mt-3 font-body leading-relaxed border-t border-border/50 pt-3"
          >
            {t(`process.${step.detailKey}`)}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Process;
