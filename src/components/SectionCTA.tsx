import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SectionCTAProps {
  textKey: string;
  highlightKey: string;
  href?: string;
}

const SectionCTA = ({ textKey, highlightKey, href = "#contato" }: SectionCTAProps) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const scrollTo = () => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="text-center py-12"
    >
      <p className="font-body text-muted-foreground text-lg mb-4">
        {t(textKey)}{" "}
        <span className="text-foreground font-semibold">{t(highlightKey)}</span>
      </p>
      <button
        onClick={scrollTo}
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold font-body hover:bg-secondary/90 transition-all hover:shadow-[0_0_20px_-4px_hsl(168_55%_44%/0.4)] uppercase tracking-wide text-sm group"
      >
        {t("cta.getQuote")}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};

export default SectionCTA;
