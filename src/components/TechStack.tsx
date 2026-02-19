import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const techs = [
  "React", "Next.js", "TypeScript", "Supabase", "Firebase", "Node.js",
  "Three.js", "Framer Motion", "Tailwind CSS", "Figma",
  "OpenAI", "Gemini", "Stripe", "Shopify", "WhatsApp API",
];

const comparisonKeys = ["customization", "speed", "cost", "techQuality", "storytelling", "continuousSupport"];
const comparisonData: Record<string, { diy: number; agency: number; lipe: number }> = {
  customization: { diy: 1, agency: 3, lipe: 5 },
  speed: { diy: 4, agency: 2, lipe: 4 },
  cost: { diy: 4, agency: 1, lipe: 3 },
  techQuality: { diy: 2, agency: 4, lipe: 5 },
  storytelling: { diy: 1, agency: 3, lipe: 5 },
  continuousSupport: { diy: 1, agency: 3, lipe: 5 },
};

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} className={i < count ? "fill-accent text-accent" : "text-muted-foreground/30"} />
    ))}
  </div>
);

const TechStack = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">{t("techstack.techLabel")}</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            {t("techstack.techTitle")}{" "}
            <span className="gradient-text">{t("techstack.techHighlight")}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-24"
        >
          {techs.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.04 }}
              className="px-4 py-2 rounded-full glass text-sm font-mono text-foreground/80 hover:glow-primary hover:text-foreground transition-all cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-2xl md:text-3xl font-bold">
            {t("techstack.comparisonTitle")}{" "}
            <span className="gradient-text">{t("techstack.comparisonHighlight")}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto overflow-x-auto"
        >
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-body text-sm text-muted-foreground font-medium">{t("techstack.criteria")}</th>
                <th className="text-center py-4 px-4 font-body text-sm text-muted-foreground font-medium">{t("techstack.diyBuilders")}</th>
                <th className="text-center py-4 px-4 font-body text-sm text-muted-foreground font-medium">{t("techstack.tradAgency")}</th>
                <th className="text-center py-4 px-4 font-body text-sm text-muted-foreground font-medium">
                  <span className="gradient-text font-bold">LIPE</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonKeys.map((key) => {
                const row = comparisonData[key];
                return (
                  <tr key={key} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm font-body font-medium">{t(`techstack.${key}`)}</td>
                    <td className="py-3 px-4 text-center"><div className="flex justify-center"><Stars count={row.diy} /></div></td>
                    <td className="py-3 px-4 text-center"><div className="flex justify-center"><Stars count={row.agency} /></div></td>
                    <td className="py-3 px-4 text-center"><div className="flex justify-center"><Stars count={row.lipe} /></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
