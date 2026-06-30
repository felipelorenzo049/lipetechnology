import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Globe, MessageSquareText, Layers, TrendingUp, Wrench, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  node = "card",
  className = "",
}: {
  children: React.ReactNode;
  accent: Accent;
  node?: string;
  className?: string;
}) => {
  const a = ACCENT[accent];
  return (
    <div data-svc={node} className={`group relative ${className}`}>
      <div className={`relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-border/80 via-border/30 to-border/10 ${a.border} transition-colors`}>
        <div className={`relative h-full rounded-2xl glass p-5 md:p-6 overflow-hidden transition-all duration-300 ${a.shadow} hover:-translate-y-1`}>
          <div className={`pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full ${a.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          {children}
        </div>
      </div>
    </div>
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
    <CardShell accent={service.accent} node="hero" className="md:col-span-2">
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

const ServiceVisual = ({ serviceKey }: { serviceKey: string }) => {
  const wrap = "mt-4 rounded-lg border border-border/40 bg-background/30 p-2.5 overflow-hidden";
  switch (serviceKey) {
    case "consultativeChatbots":
      return (
        <div className={`${wrap} space-y-1.5`} aria-hidden>
          <div className="h-2.5 w-2/3 rounded-md bg-foreground/[0.12]" />
          <div className="h-2.5 w-1/2 rounded-md bg-accent/35 ml-auto" />
          <div className="h-2.5 w-3/5 rounded-md bg-foreground/[0.12]" />
          <div className="flex items-center gap-1 pt-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-pulse [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-pulse [animation-delay:300ms]" />
          </div>
        </div>
      );
    case "saas":
      return (
        <div className={`${wrap} flex gap-2 items-end`} aria-hidden>
          <div className="w-1/4 space-y-1 self-stretch pt-0.5">
            <div className="h-1.5 rounded bg-foreground/15" />
            <div className="h-1.5 rounded bg-foreground/10" />
            <div className="h-1.5 rounded bg-foreground/10" />
          </div>
          <div className="flex-1 flex items-end gap-1 h-10">
            <div className="flex-1 rounded-sm bg-secondary/40" style={{ height: "40%" }} />
            <div className="flex-1 rounded-sm bg-secondary/60" style={{ height: "70%" }} />
            <div className="flex-1 rounded-sm bg-secondary/50" style={{ height: "52%" }} />
            <div className="flex-1 rounded-sm bg-secondary/80" style={{ height: "95%" }} />
          </div>
        </div>
      );
    case "digitalMarketing":
      return (
        <div className={wrap} aria-hidden>
          <svg viewBox="0 0 100 40" className="w-full h-12" preserveAspectRatio="none">
            <polyline
              points="2,34 22,29 42,31 62,18 82,12 98,4"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="98" cy="4" r="3" fill="hsl(var(--accent))" />
          </svg>
        </div>
      );
    case "maintenance":
      return (
        <div className={wrap} aria-hidden>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[9px] tracking-wider text-secondary">UPTIME</span>
            <span className="font-mono text-[9px] text-foreground/80">99.9%</span>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                className={`h-3.5 flex-1 rounded-[1px] ${i === 6 || i === 17 ? "bg-secondary/35" : "bg-secondary/70"}`}
              />
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

const CompactCard = ({ service }: { service: Service }) => {
  const { t } = useTranslation();
  const a = ACCENT[service.accent];
  const details = t(`services.${service.detailsKey}`, { returnObjects: true }) as string[];

  return (
    <CardShell accent={service.accent}>
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
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // The section assembles as it scrolls into view: the heading rises, the
  // signature service card draws in, then the compact service cards stagger up.
  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from("[data-svc='head'] > *", { opacity: 0, y: 20, duration: 0.55, stagger: 0.08 }, 0)
        .from("[data-svc='hero']", { opacity: 0, y: 28, scale: 0.985, duration: 0.6, clearProps: "transform,opacity" }, 0.2)
        .from("[data-svc='card']", { opacity: 0, y: 22, duration: 0.5, stagger: 0.1, clearProps: "transform,opacity" }, 0.34);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="servicos" ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div data-svc="head" className="mb-12 md:mb-16 max-w-2xl">
          <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">{t("services.label")}</span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 leading-[1.05]">
            {t("services.title")}{" "}
            <span className="gradient-text">{t("services.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground font-body mt-4">{t("services.subtitle")}</p>
        </div>

        {/* Hero card — full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
          <HeroCard service={HERO} />
        </div>

        {/* Uniform compact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {REST.map((s) => (
            <CompactCard key={s.titleKey} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
