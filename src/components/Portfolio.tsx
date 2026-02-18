import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "EasyLine Platform",
    tagline: "E-commerce completo para líder em gestão de filas",
    description: "Plataforma e-commerce com homepage 3D interativa, calculadora AI de pedestais, dashboard admin com CRM e integração WhatsApp checkout.",
    outcome: "100% plataforma independente com qualificação de leads por AI",
    metrics: ["28 anos", "35K clientes", "R$0,99/dia"],
    tech: ["React 18", "TypeScript", "Three.js", "Supabase", "Framer Motion"],
    color: "primary",
  },
  {
    title: "História no Prato",
    tagline: "Site para restaurante tradicional de 40 anos",
    description: "Website contando a história de 40 anos de receitas familiares com timeline interativa, menu online com origem dos pratos e sistema de reservas.",
    outcome: "340% de aumento em reservas nos primeiros 3 meses",
    metrics: ["40 anos", "+340% reservas", "3 meses"],
    tech: ["React", "Contentful CMS", "Animações custom"],
    color: "secondary",
  },
  {
    title: "De Bairro para o Mundo",
    tagline: "E-commerce para loja de bairro expandindo online",
    description: "Catálogo com mapa de entrega local, integração WhatsApp para pedidos, sincronização de estoque e seção de histórias de clientes.",
    outcome: "Alcançou clientes em 12 novas cidades mantendo identidade local",
    metrics: ["12 cidades", "Identidade local", "WhatsApp"],
    tech: ["Next.js", "Shopify API", "Google Maps"],
    color: "accent",
  },
  {
    title: "Agendamento Inteligente",
    tagline: "Plataforma de agendamento com AI",
    description: "Sistema de agendamento com AI, lembretes automáticos, portal do cliente, integração de pagamento e dashboard de analytics.",
    outcome: "60% redução em conflitos de agenda, 2h/dia economizadas",
    metrics: ["-60% conflitos", "2h/dia", "AI-powered"],
    tech: ["React", "Node.js", "Stripe", "Twilio"],
    color: "primary",
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

const Portfolio = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">Portfólio</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            Projetos que{" "}
            <span className="gradient-text">contam histórias</span>
          </h2>
        </motion.div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {projects.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <ProjectCard key={project.title} project={project} index={i} reverse={!isEven} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
  reverse,
}: {
  project: typeof projects[0];
  index: number;
  reverse: boolean;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-6 md:gap-10 items-center`}
    >
      {/* Image placeholder */}
      <div className={`w-full md:w-1/2 aspect-video rounded-2xl border ${colorMap[project.color]} glass flex items-center justify-center`}>
        <div className="text-center p-8">
          <div className={`font-headline text-2xl font-bold gradient-text mb-2`}>{project.title}</div>
          <p className="text-muted-foreground text-sm font-body">Preview disponível em breve</p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 space-y-4">
        <div>
          <h3 className="font-headline text-xl md:text-2xl font-bold">{project.title}</h3>
          <p className="text-muted-foreground text-sm font-body mt-1">{project.tagline}</p>
        </div>

        <p className="text-foreground/80 text-sm font-body leading-relaxed">{project.description}</p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-3">
          {project.metrics.map((m) => (
            <span key={m} className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${badgeColorMap[project.color]}`}>
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
            <span key={t} className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-mono">
              {t}
            </span>
          ))}
        </div>

        <button className="flex items-center gap-2 text-sm text-primary font-medium hover:underline mt-2 font-body">
          Ver projeto completo <ExternalLink size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export default Portfolio;
