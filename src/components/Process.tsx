import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Search, Target, Hammer, Rocket, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const stepKeys = [
  { icon: Search, titleKey: "discovery", shortKey: "discoveryShort", detailKey: "discoveryDetail" },
  { icon: Target, titleKey: "strategy", shortKey: "strategyShort", detailKey: "strategyDetail" },
  { icon: Hammer, titleKey: "build", shortKey: "buildShort", detailKey: "buildDetail" },
  { icon: Rocket, titleKey: "growth", shortKey: "growthShort", detailKey: "growthDetail" },
];

const Process = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="processo" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">{t("process.label")}</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            {t("process.title")}{" "}
            <span className="gradient-text">{t("process.titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/40 to-transparent" />
          <div className="space-y-8">
            {stepKeys.map((step, i) => (
              <StepCard key={step.titleKey} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ step, index }: { step: typeof stepKeys[0]; index: number }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-16 md:pl-20"
    >
      <div className="absolute left-3 md:left-5 top-2 w-6 h-6 rounded-full bg-muted border-2 border-primary flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>

      <div
        className="glass rounded-xl p-6 cursor-pointer hover:glow-primary transition-all duration-300"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <step.icon size={20} className="text-primary" />
            <div>
              <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              <h3 className="font-headline text-lg font-semibold">{t(`process.${step.titleKey}`)}</h3>
            </div>
          </div>
          <ChevronDown
            size={18}
            className={`text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </div>
        <p className="text-muted-foreground text-sm mt-2 font-body">{t(`process.${step.shortKey}`)}</p>

        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-foreground/80 text-sm mt-3 font-body leading-relaxed border-t border-border pt-3"
          >
            {t(`process.${step.detailKey}`)}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Process;
