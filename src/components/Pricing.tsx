import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const planKeys = ["essential", "professional", "enterprise"] as const;
const highlights = [false, true, false];

const Pricing = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">{t("pricing.label")}</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            {t("pricing.title")}{" "}
            <span className="gradient-text">{t("pricing.titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {planKeys.map((key, i) => {
            const highlight = highlights[i];
            const features = t(`pricing.${key}.features`, { returnObjects: true }) as string[];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 ${
                  highlight ? "glass glow-primary border-primary/30" : "glass"
                } flex flex-col`}
              >
                {highlight && (
                  <span className="self-start px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-medium mb-4">
                    {t("pricing.mostPopular")}
                  </span>
                )}
                <h3 className="font-headline text-xl font-bold">{t(`pricing.${key}.name`)}</h3>
                <p className="text-muted-foreground text-sm font-body mt-1 mb-4">{t(`pricing.${key}.description`)}</p>
                <p className="font-headline text-2xl font-bold gradient-text mb-6">{t(`pricing.${key}.price`)}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-body text-foreground/80">
                      <Check size={16} className="text-secondary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${
                    highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {t("pricing.cta")}
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground font-body mt-8 max-w-lg mx-auto"
        >
          {t("pricing.disclaimer")}
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
