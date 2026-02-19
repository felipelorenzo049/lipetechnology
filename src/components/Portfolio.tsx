import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Briefcase, Rocket, ArrowRight } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

type Project = {
  title: string;
  i18nKey: string;
  metricsKeys: string[];
  tech: string[];
  color: "primary" | "secondary" | "accent";
  type: "produto" | "cliente";
  parent?: string;
};

const projects: Project[] = [
  {
    title: "EasyLine Platform",
    i18nKey: "easyline",
    metricsKeys: ["easylineMetric1", "easylineMetric2"],
    tech: ["React 18", "TypeScript", "Three.js", "Supabase", "Framer Motion"],
    color: "primary",
    type: "cliente",
  },
  {
    title: "Plate Boutique by LIPE",
    i18nKey: "plate",
    metricsKeys: ["plateMetric1", "plateMetric2", "plateMetric3", "plateMetric4"],
    tech: ["React", "Contentful CMS", "Stripe", "SEO local"],
    color: "secondary",
    type: "produto",
  },
  {
    title: "Agendamento Inteligente",
    i18nKey: "agendamento",
    metricsKeys: ["agendamentoMetric1", "agendamentoMetric2", "agendamentoMetric3"],
    tech: ["React", "Node.js", "Stripe", "Twilio"],
    color: "primary",
    type: "produto",
  },
  {
    title: "Milan",
    i18nKey: "milan",
    metricsKeys: ["milanMetric1", "milanMetric2", "milanMetric3"],
    tech: ["React", "TypeScript", "Tailwind CSS"],
    color: "secondary",
    type: "cliente",
  },
];

const colorMap: Record<string, string> = {
  primary: "border-primary/30 hover:border-primary/60",
  secondary: "border-secondary/30 hover:border-secondary/60",
  accent: "border-accent/30 hover:border-accent/60",
};

const badgeColorMap: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

const dotColorMap: Record<string, string> = {
  primary: "bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.5)]",
  secondary: "bg-secondary shadow-[0_0_12px_hsl(var(--secondary)/0.5)]",
  accent: "bg-accent shadow-[0_0_12px_hsl(var(--accent)/0.5)]",
};

interface PortfolioProps {
  preview?: boolean;
}

const Portfolio = ({ preview = false }: PortfolioProps) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  const displayProjects = preview ? projects.slice(0, 2) : projects;

  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">
            {t("portfolio.label")}
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            {t("portfolio.title")}{" "}
            <span className="gradient-text">{t("portfolio.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto text-sm">
            {t("portfolio.subtitle")}
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 -mx-8 -my-8">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1.4}
              particleDensity={isMobile ? 10 : 40}
              className="w-full h-full"
              particleColor="#4B83F0"
              speed={1.5}
            />
          </div>

          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-accent/60 md:-translate-x-px" />

          <div className="space-y-16 md:space-y-20">
            {displayProjects.map((project, i) => (
              <TimelineNode key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>

        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold font-body hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.4)] uppercase tracking-wide text-sm"
            >
              {t("portfolio.viewAll")} <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const TimelineNode = ({ project, index }: { project: Project; index: number }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex items-start"
    >
      <div
        className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full ${dotColorMap[project.color]} -translate-x-1/2 mt-6 z-10 ring-4 ring-background`}
      />

      <div
        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
          isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
        }`}
      >
        <div
          className={`rounded-2xl border ${colorMap[project.color]} glass p-6 space-y-4`}
        >
          <div className="flex flex-wrap gap-2">
            {project.type === "produto" ? (
              <Badge variant="secondary" className="gap-1 text-[10px] font-mono">
                <Rocket size={10} /> {t("portfolio.productBadge")}
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1 text-[10px] font-mono">
                <Briefcase size={10} /> {t("portfolio.clientBadge")}
              </Badge>
            )}
          </div>

          <div>
            <h3 className="font-headline text-xl font-bold">{project.title}</h3>
            <p className="text-muted-foreground text-sm font-body mt-1">
              {t(`portfolio.${project.i18nKey}.tagline`)}
            </p>
          </div>

          <p className="text-foreground/80 text-sm font-body leading-relaxed">
            {t(`portfolio.${project.i18nKey}.description`)}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.metricsKeys.map((key) => (
              <span
                key={key}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${badgeColorMap[project.color]}`}
              >
                {t(`portfolio.metrics.${key}`)}
              </span>
            ))}
          </div>

          <p className="text-sm font-body text-secondary font-medium">
            → {t(`portfolio.${project.i18nKey}.outcome`)}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          <button className="flex items-center gap-2 text-sm text-primary font-medium hover:underline mt-2 font-body">
            {t("portfolio.viewProject")} <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;
