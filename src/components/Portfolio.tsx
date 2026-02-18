import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Briefcase, Rocket } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { Badge } from "@/components/ui/badge";

type Project = {
  title: string;
  tagline: string;
  description: string;
  outcome: string;
  metrics: string[];
  tech: string[];
  color: "primary" | "secondary" | "accent";
  type: "produto" | "cliente";
  parent?: string;
};

const projects: Project[] = [
  {
    title: "EasyLine Platform",
    tagline: "E-commerce completo para líder em gestão de filas",
    description:
      "Plataforma e-commerce com homepage 3D interativa, calculadora AI de pedestais, dashboard admin com CRM e integração WhatsApp checkout.",
    outcome: "100% plataforma independente com qualificação de leads por AI",
    metrics: ["28 anos", "35K clientes"],
    tech: ["React 18", "TypeScript", "Three.js", "Supabase", "Framer Motion"],
    color: "primary",
    type: "cliente",
  },
  {
    title: "Plate Boutique by LIPE",
    tagline: "Plataforma completa para restaurantes: do menu ao delivery",
    description:
      "Menu digital com fotos e descrições dos pratos, sistema de reservas online com confirmação automática, pedidos online com gestão de delivery e takeaway, e integração WhatsApp para contato direto e encomendas.",
    outcome: "Restaurantes com presença digital completa e aumento de pedidos",
    metrics: ["Menu digital", "Reservas online", "Take away", "WhatsApp"],
    tech: ["React", "Contentful CMS", "Stripe", "SEO local"],
    color: "secondary",
    type: "produto",
  },
  {
    title: "Agendamento Inteligente",
    tagline: "Plataforma de agendamento com AI by LIPE",
    description:
      "Sistema de agendamento com AI, lembretes automáticos, portal do cliente, integração de pagamento e dashboard de analytics.",
    outcome: "60% redução em conflitos de agenda, 2h/dia economizadas",
    metrics: ["-60% conflitos", "2h/dia", "AI-powered"],
    tech: ["React", "Node.js", "Stripe", "Twilio"],
    color: "primary",
    type: "produto",
  },
  {
    title: "Milan",
    tagline: "Sistema de liquidação de carros para leiloeiro",
    description:
      "Sistema secundário de liquidação de veículos desenvolvido para a Milan, empresa leiloeira. Plataforma que agiliza o processo de venda e liquidação de carros, com gestão de lotes, catálogo online e acompanhamento em tempo real.",
    outcome: "Processo de liquidação digitalizado com gestão completa de lotes",
    metrics: ["Liquidação", "Gestão de lotes", "Tempo real"],
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

const Portfolio = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">
            Nossa Jornada
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            A evolução da{" "}
            <span className="gradient-text">LIPE Technology</span>
          </h2>
          <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto text-sm">
            Produtos próprios e projetos de clientes que mostram como construímos tecnologia com identidade.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Sparkles background */}
          <div className="absolute inset-0 -mx-8 -my-8">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1.4}
              particleDensity={40}
              className="w-full h-full"
              particleColor="hsl(var(--primary))"
              speed={1.5}
            />
          </div>

          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-accent/60 md:-translate-x-px" />

          <div className="space-y-16 md:space-y-20">
            {projects.map((project, i) => (
              <TimelineNode key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineNode = ({ project, index }: { project: Project; index: number }) => {
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
      {/* Dot on the line */}
      <div
        className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full ${dotColorMap[project.color]} -translate-x-1/2 mt-6 z-10 ring-4 ring-background`}
      />

      {/* Card — mobile always right, desktop alternates */}
      <div
        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
          isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
        }`}
      >
        <div
          className={`rounded-2xl border ${colorMap[project.color]} glass p-6 space-y-4`}
        >
          {/* Type badges */}
          <div className="flex flex-wrap gap-2">
            {project.type === "produto" ? (
              <Badge variant="secondary" className="gap-1 text-[10px] font-mono">
                <Rocket size={10} /> Produto LIPE
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1 text-[10px] font-mono">
                <Briefcase size={10} /> Projeto Cliente
              </Badge>
            )}
            {project.parent && (
              <Badge className="text-[10px] font-mono bg-accent/15 text-accent border-accent/30">
                by {project.parent}
              </Badge>
            )}
          </div>

          <div>
            <h3 className="font-headline text-xl font-bold">{project.title}</h3>
            <p className="text-muted-foreground text-sm font-body mt-1">
              {project.tagline}
            </p>
          </div>

          <p className="text-foreground/80 text-sm font-body leading-relaxed">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <span
                key={m}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${badgeColorMap[project.color]}`}
              >
                {m}
              </span>
            ))}
          </div>

          {/* Outcome */}
          <p className="text-sm font-body text-secondary font-medium">
            → {project.outcome}
          </p>

          {/* Tech */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          <button className="flex items-center gap-2 text-sm text-primary font-medium hover:underline mt-2 font-body">
            Ver projeto completo <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;
