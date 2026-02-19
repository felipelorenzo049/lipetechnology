import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, MessageSquareText, Layers, TrendingUp, Wrench, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const serviceKeys = [
  { icon: Globe, titleKey: "customWebsites", shortKey: "customWebsitesShort", detailsKey: "customWebsitesDetails", span: "md:col-span-2 md:row-span-1" },
  { icon: MessageSquareText, titleKey: "consultativeChatbots", shortKey: "consultativeChatbotsShort", detailsKey: "consultativeChatbotsDetails", span: "md:col-span-1 md:row-span-2" },
  { icon: Layers, titleKey: "saas", shortKey: "saasShort", detailsKey: "saasDetails", span: "md:col-span-1 md:row-span-1" },
  { icon: TrendingUp, titleKey: "digitalMarketing", shortKey: "digitalMarketingShort", detailsKey: "digitalMarketingDetails", span: "md:col-span-1 md:row-span-1" },
  { icon: Wrench, titleKey: "maintenance", shortKey: "maintenanceShort", detailsKey: "maintenanceDetails", span: "md:col-span-1 md:row-span-1" },
];

const ServiceCard = ({ service, index }: { service: typeof serviceKeys[0]; index: number }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const details = t(`services.${service.detailsKey}`, { returnObjects: true }) as string[];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${service.span} group relative rounded-2xl glass p-6 md:p-8 hover:glow-primary transition-all duration-300 cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <service.icon size={24} />
        </div>
        <ChevronDown
          size={18}
          className={`text-muted-foreground transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </div>
      <h3 className="font-headline text-lg font-semibold mb-2">{t(`services.${service.titleKey}`)}</h3>
      <p className="text-muted-foreground text-sm font-body leading-relaxed">{t(`services.${service.shortKey}`)}</p>

      {expanded && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 space-y-2"
        >
          {details.map((d) => (
            <li key={d} className="flex items-center gap-2 text-sm text-foreground/80 font-body">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              {d}
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

const Services = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">{t("services.label")}</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            {t("services.title")}{" "}
            <span className="gradient-text">{t("services.titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {serviceKeys.map((s, i) => (
            <ServiceCard key={s.titleKey} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
