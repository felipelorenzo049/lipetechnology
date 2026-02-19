import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const useCounter = (end: number, inView: boolean, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, inView, duration]);
  return count;
};

const KPIs = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const kpis = [
    { value: 50, suffix: "+", labelKey: "kpis.projects" },
    { value: 12, suffix: "", labelKey: "kpis.countries" },
    { value: 4.9, suffix: "/5", labelKey: "kpis.satisfaction", isDecimal: true },
    { value: 98, suffix: "%", labelKey: "kpis.onTime" },
  ];

  return (
    <section className="py-16 md:py-20">
      <div ref={ref} className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {kpis.map((kpi, i) => (
            <KPIItem key={kpi.labelKey} kpi={kpi} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const KPIItem = ({
  kpi,
  index,
  inView,
}: {
  kpi: { value: number; suffix: string; labelKey: string; isDecimal?: boolean };
  index: number;
  inView: boolean;
}) => {
  const { t } = useTranslation();
  const count = useCounter(kpi.isDecimal ? 49 : kpi.value, inView);
  const display = kpi.isDecimal ? (count / 10).toFixed(1) : count;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <span className="font-headline text-4xl md:text-5xl font-bold gradient-text">
        {display}
        {kpi.suffix}
      </span>
      <p className="text-muted-foreground font-body text-sm mt-2">{t(kpi.labelKey)}</p>
    </motion.div>
  );
};

export default KPIs;
