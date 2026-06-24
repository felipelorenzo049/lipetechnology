import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, MessageSquareText, Layers, TrendingUp, Wrench, ChevronDown, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

type Service = {
  icon: typeof Globe;
  titleKey: string;
  shortKey: string;
  detailsKey: string;
  span: string;
  popular?: boolean;
  accent: "primary" | "secondary" | "accent";
  code: string;
};

const serviceKeys: Service[] = [
  // Hero card — large
  { icon: Globe, titleKey: "customWebsites", shortKey: "customWebsitesShort", detailsKey: "customWebsitesDetails", span: "md:col-span-3 md:row-span-2", popular: true, accent: "primary", code: "WEB·01" },
  // Tall card
  { icon: MessageSquareText, titleKey: "consultativeChatbots", shortKey: "consultativeChatbotsShort", detailsKey: "consultativeChatbotsDetails", span: "md:col-span-2 md:row-span-2", accent: "accent", code: "AI·02" },
  // Small cards
  { icon: Layers, titleKey: "saas", shortKey: "saasShort", detailsKey: "saasDetails", span: "md:col-span-2 md:row-span-1", accent: "secondary", code: "SAAS·03" },
  { icon: TrendingUp, titleKey: "digitalMarketing", shortKey: "digitalMarketingShort", detailsKey: "digitalMarketingDetails", span: "md:col-span-1 md:row-span-1", accent: "accent", code: "MKT·04" },
  { icon: Wrench, titleKey: "maintenance", shortKey: "maintenanceShort", detailsKey: "maintenanceDetails", span: "md:col-span-2 md:row-span-1", accent: "primary", code: "OPS·05" },
];

const ACCENT: Record<Service["accent"], { text: string; bg: string; glow: string; border: string; shadow: string }> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary/10",
    glow: "drop-shadow-[0_0_12px_hsl(var(--primary)/0.55)]",
    border: "hover:border-primary/50",
    shadow: "hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.45)]",
  },
  secondary: {
    text: "text-secondary",
    bg: "bg-secondary/10",
    glow: "drop-shadow-[0_0_12px_hsl(var(--secondary)/0.55)]",
    border: "hover:border-secondary/50",
    shadow: "hover:shadow-[0_0_40px_-10px_hsl(var(--secondary)/0.45)]",
  },
  accent: {
    text: "text-accent",
    bg: "bg-accent/10",
    glow: "drop-shadow-[0_0_12px_hsl(var(--accent)/0.6)]",
    border: "hover:border-accent/50",
    shadow: "hover:shadow-[0_0_40px_-10px_hsl(var(--accent)/0.5)]",
  },
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const details = t(`services.${service.detailsKey}`, { returnObjects: true }) as string[];
  const a = ACCENT[service.accent];
  const isHero = service.span.includes("col-span-3");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`${service.span} group relative`}
    >
      {/* gradient border wrapper */}
      <div className={`relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-border/80 via-border/30 to-border/10 ${a.border} transition-colors`}>
        <div
          className={`relative h-full rounded-2xl glass p-5 md:p-7 cursor-pointer overflow-hidden transition-all duration-300 ${a.shadow} hover:-translate-y-1`}
          onClick={() => setExpanded(!expanded)}
        >
          {/* corner signal */}
          <div className={`pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full ${a.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

          {service.popular && (
            <Badge className="absolute top-4 right-4 bg-accent/15 text-accent border border-accent/40 text-[10px] font-mono tracking-[0.18em] uppercase rounded-md">
              {t("services.popular")}
            </Badge>
          )}

          <div className="flex items-center justify-between mb-4">
            <span className={`font-mono text-[10px] tracking-[0.22em] uppercase ${a.text} opacity-80`}>
              {service.code}
            </span>
            {!service.popular && (
              <ChevronDown
                size={16}
                className={`text-muted-foreground/60 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            )}
          </div>

          <div className={`inline-flex p-3 rounded-xl ${a.bg} mb-4 transition-transform duration-300 group-hover:scale-110`}>
            <service.icon size={isHero ? 28 : 22} className={`${a.text} ${a.glow}`} />
          </div>

          <h3 className={`font-headline font-semibold mb-2 ${isHero ? "text-2xl md:text-3xl" : "text-lg"}`}>
            {t(`services.${service.titleKey}`)}
          </h3>
          <p className={`text-muted-foreground font-body leading-relaxed ${isHero ? "text-base" : "text-sm"}`}>
            {t(`services.${service.shortKey}`)}
          </p>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 overflow-hidden"
            >
              <div className="h-px bg-gradient-to-r from-border via-border/40 to-transparent mb-4" />
              <ul className="space-y-2 mb-4">
                {details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-foreground/80 font-body">
                    <div className={`w-1.5 h-1.5 rounded-full ${a.bg} ${a.text} mt-1.5 shrink-0`} style={{ background: "currentColor" }} />
                    {d}
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                onClick={(e) => e.stopPropagation()}
                className={`inline-flex items-center gap-2 text-sm font-semibold ${a.text} font-body group/cta`}
              >
                {t("services.getQuote")}
                <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-1" />
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">{t("services.label")}</span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 leading-[1.05]">
            {t("services.title")}{" "}
            <span className="gradient-text">{t("services.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground font-body mt-4">{t("services.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-3 gap-4 md:gap-5 auto-rows-fr">
          {serviceKeys.map((s, i) => (
            <ServiceCard key={s.titleKey} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
