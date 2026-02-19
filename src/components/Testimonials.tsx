import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();
  const quotes = t("testimonials.quotes", { returnObjects: true }) as Array<{ quote: string; author: string; role: string }>;
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % quotes.length), 5000);
    return () => clearInterval(timer);
  }, [quotes.length, paused]);

  const item = quotes[current];

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">{t("testimonials.label")}</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            {t("testimonials.title")}{" "}
            <span className="gradient-text">{t("testimonials.titleHighlight")}</span>
          </h2>
        </motion.div>

        <div
          className="relative glass rounded-2xl p-8 md:p-12 text-center min-h-[250px] flex flex-col items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote size={32} className="text-primary/30 mb-6" />

          <motion.p
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-body text-lg md:text-xl text-foreground/90 leading-relaxed mb-6"
          >
            "{item.quote}"
          </motion.p>

          <motion.div key={`author-${current}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="font-headline font-semibold text-foreground">{item.author}</p>
            <p className="text-sm text-muted-foreground font-body">{item.role}</p>
          </motion.div>

          <div className="flex gap-2 mt-8">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all p-0 min-w-[32px] min-h-[32px] flex items-center justify-center ${i === current ? "bg-primary w-6" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
