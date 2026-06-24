import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, MessageSquareText, Layers, TrendingUp, Wrench, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import SectionSignal from "@/components/SectionSignal";

type Accent = "primary" | "secondary" | "accent";
type Service = {
  icon: typeof Globe;
  titleKey: string;
  shortKey: string;
  detailsKey: string;
  accent: Accent;
  code: string;
  popular?: boolean;
};

const HERO: Service = {
  icon: Globe,
  titleKey: "customWebsites",
  shortKey: "customWebsitesShort",
  detailsKey: "customWebsitesDetails",
  accent: "primary",
  code: "WEB·01",
  popular: true,
};

const REST: Service[] = [
  { icon: MessageSquareText, titleKey: "consultativeChatbots", shortKey: "consultativeChatbotsShort", detailsKey: "consultativeChatbotsDetails", accent: "accent", code: "AI·02" },
  { icon: Layers, titleKey: "saas", shortKey: "saasShort", detailsKey: "saasDetails", accent: "secondary", code: "SAAS·03" },
  { icon: TrendingUp, titleKey: "digitalMarketing", shortKey: "digitalMarketingShort", detailsKey: "digitalMarketingDetails", accent: "accent", code: "MKT·04" },
  { icon: Wrench, titleKey: "maintenance", shortKey: "maintenanceShort", detailsKey: "maintenanceDetails", accent: "primary", code: "OPS·05" },
];

const ACCENT: Record<Accent, { text: string; bg: string; glow: string; border: string; shadow: string; chipBorder: string }> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary/10",
    glow: "drop-shadow-[0_0_12px_hsl(var(--primary)/0.55)]",
    border: "hover:border-primary/50",
    shadow: "hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.45)]",
    chipBorder: "border-primary/25",
  },
  secondary: {
    text: "text-secondary",
    bg: "bg-secondary/10",
    glow: "drop-shadow-[0_0_12px_hsl(var(--secondary)/0.55)]",
    border: "hover:border-secondary/50",
    shadow: "hover:shadow-[0_0_40px_-10px_hsl(var(--secondary)/0.45)]",
    chipBorder: "border-secondary/25",
  },
  accent: {
    text: "text-accent",
    bg: "bg-accent/10",
    glow: "drop-shadow-[0_0_12px_hsl(var(--accent)/0.6)]",
    border: "hover:border-accent/50",
    shadow: "hover:shadow-[0_0_40px_-10px_hsl(var(--accent)/0.5)]",
    chipBorder: "border-accent/30",
  },
};

const CardShell = ({
  children,
  accent,
  index,
  className = "",
}: {
  children: React.ReactNode;
  accent: Accent;
  index: number;
  className?: string;
}) => {
  const a = ACCENT[accent];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${className}`}
    >
      <div className={`relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-border/80 via-border/30 to-border/10 ${a.border} transition-colors`}>
        <div className={`relative h-full rounded-2xl glass p-5 md:p-6 overflow-hidden transition-all duration-300 ${a.shadow} hover:-translate-y-1`}>
          <div className={`pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full ${a.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          {children}
        </div>
      </div>
    </motion.div>
  );
};

const MiniWireframe = ({ accent }: { accent: Accent }) => {
  const a = ACCENT[accent];
  return (
    <div className="relative w-full h-full min-h-[200px] rounded-xl border border-border/50 bg-background/40 overflow-hidden">
      {/* top bar */}
      <div className="flex items-center gap-1.5 px-3 h-6 border-b border-border/40 bg-card/40">
        <span className="w-1.5 h-1.5 rounded-full bg-destructive/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
        <span className="ml-2 font-mono text-[9px] text-muted-foreground/70 tracking-wider">lipetec.com/cliente</span>
      </div>
      {/* body */}
      <div className="p-3 grid grid-cols-3 gap-2">
        <div className="col-span-3 h-3 rounded bg-foreground/10" />
        <div className="col-span-2 h-2 rounded bg-foreground/5" />
        <div className="col-span-1 h-2 rounded bg-foreground/5" />
        <div className={`col-span-2 h-16 rounded ${a.bg} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
          <div className={`absolute left-3 bottom-3 w-10 h-2 rounded ${a.text}`} style={{ background: "currentColor" }} />
        </div>
        <div className="col-span-1 space-y-1.5">
          <div className="h-3 rounded bg-foreground/10" />
          <div className="h-3 rounded bg-foreground/10" />
          <div className="h-3 rounded bg-foreground/10" />
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-1.5 mt-1">
          <div className="h-6 rounded border border-border/50 bg-card/60" />
          <div className="h-6 rounded border border-border/50 bg-card/60" />
          <div className="h-6 rounded border border-border/50 bg-card/60" />
        </div>
      </div>
      {/* signal sweep */}
      <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-accent/10 to-transparent group-hover:translate-x-[400%] transition-transform duration-[2200ms] ease-out" />
    </div>
  );
};

const HeroCard = ({ service }: { service: Service }) => {
  const { t } = useTranslation();
  const a = ACCENT[service.accent];
  const details = t(`services.${service.detailsKey}`, { returnObjects: true }) as string[];

  return (
    <CardShell accent={service.accent} index={0} className="md:col-span-2">
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-7 h-full">
        {/* Copy column */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className={`font-mono text-[10px] tracking-[0.22em] uppercase ${a.text} opacity-80`}>
              {service.code}
            </span>
            {service.popular && (
              <Badge className="bg-accent/15 text-accent border border-accent/40 text-[10px] font-mono tracking-[0.18em] uppercase rounded-md">
                {t("services.popular")}
              </Badge>
            )}
          </div>

          <div className={`inline-flex p-3 rounded-xl ${a.bg} mb-4 w-fit transition-transform duration-300 group-hover:scale-110`}>
            <service.icon size={26} className={`${a.text} ${a.glow}`} />
          </div>

          <h3 className="font-headline font-semibold text-2xl md:text-3xl leading-tight mb-2">
            {t(`services.${service.titleKey}`)}
          </h3>
          <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-5">
            {t(`services.${service.shortKey}`)}
          </p>

          <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mt-auto">
            {details.slice(0, 4).map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-foreground/85 font-body">
                <Check size={14} className={`${a.text} mt-0.5 shrink-0`} />
                <span className="leading-snug">{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual column */}
        <div className="hidden md:block">
          <MiniWireframe accent={service.accent} />
        </div>
      </div>
    </CardShell>
  );
};

const CompactCard = ({ service, index }: { service: Service; index: number }) => {
  const { t } = useTranslation();
  const a = ACCENT[service.accent];
  const details = t(`services.${service.detailsKey}`, { returnObjects: true }) as string[];

  return (
    <CardShell accent={service.accent} index={index}>
      <div className="flex items-center justify-between mb-4">
        <span className={`font-mono text-[10px] tracking-[0.22em] uppercase ${a.text} opacity-80`}>
          {service.code}
        </span>
        <div className={`w-1.5 h-1.5 rounded-full ${a.text} animate-pulse`} style={{ background: "currentColor" }} />
      </div>

      <div className={`inline-flex p-2.5 rounded-xl ${a.bg} mb-3 transition-transform duration-300 group-hover:scale-110`}>
        <service.icon size={20} className={`${a.text} ${a.glow}`} />
      </div>

      <h3 className="font-headline font-semibold text-lg leading-tight mb-1.5">
        {t(`services.${service.titleKey}`)}
      </h3>
      <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4 line-clamp-2">
        {t(`services.${service.shortKey}`)}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {details.slice(0, 3).map((d) => (
          <span
            key={d}
            className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border ${a.chipBorder} ${a.text} bg-background/30`}
          >
            {d.split(/[—:·,()]/)[0].trim().slice(0, 28)}
          </span>
        ))}
      </div>
    </CardShell>
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
          <div className="mb-3"><SectionSignal width={160} /></div>
          <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">{t("services.label")}</span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 leading-[1.05]">
            {t("services.title")}{" "}
            <span className="gradient-text">{t("services.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground font-body mt-4">{t("services.subtitle")}</p>
        </motion.div>

        {/* Hero card — full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
          <HeroCard service={HERO} />
        </div>

        {/* Uniform compact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {REST.map((s, i) => (
            <CompactCard key={s.titleKey} service={s} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
