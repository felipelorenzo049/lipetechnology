import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const Manifesto = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
      <div className="absolute right-0 top-1/3 w-px h-24 bg-gradient-to-b from-transparent via-secondary/40 to-transparent" />

      <div ref={ref} className="container mx-auto px-6 max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-mono text-sm text-secondary tracking-wider uppercase mb-8"
        >
          {t("manifesto.label")}
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-headline text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 mb-8"
        >
          {t("manifesto.quote1")}{" "}
          <span className="gradient-text font-bold">{t("manifesto.quoteHighlight")}</span>.
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-muted-foreground text-base md:text-lg leading-relaxed font-body"
        >
          {t("manifesto.description")}{" "}
          <span className="text-foreground font-medium">{t("manifesto.descriptionHighlight")}</span>.
        </motion.p>
      </div>
    </section>
  );
};

export default Manifesto;
