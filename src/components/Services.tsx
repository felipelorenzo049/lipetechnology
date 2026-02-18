import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, MessageSquareText, Layers, TrendingUp, Wrench, ChevronDown } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Sites Personalizáveis",
    short: "Websites que refletem a identidade única do seu negócio. Responsivos, rápidos e feitos para converter.",
    details: ["Design storytelling-first", "Mobile-first responsivo", "SEO local otimizado", "CMS para atualizações fáceis"],
    span: "md:col-span-2 md:row-span-1",
  },
  {
    icon: MessageSquareText,
    title: "Chatbots Consultivos",
    short: "Assistentes inteligentes que qualificam leads 24/7 com a voz da sua marca.",
    details: ["Qualificação automática de leads", "Fluxo de conversa natural", "Treinamento com voz da marca", "Integração WhatsApp & web"],
    span: "md:col-span-1 md:row-span-2",
  },
  {
    icon: Layers,
    title: "SaaS / Plataformas",
    short: "Aplicações web sob medida para operações únicas do seu negócio.",
    details: ["Feito sob medida para seus fluxos", "Arquitetura escalável", "Cloud-hosted & seguro", "Dados em tempo real"],
    span: "md:col-span-1 md:row-span-1",
  },
  {
    icon: TrendingUp,
    title: "Estratégia de Marketing Digital",
    short: "SEO, ads, conteúdo e redes sociais. Não só construímos — ajudamos você a crescer.",
    details: ["SEO & visibilidade local", "Gestão de campanhas", "Estratégia de conteúdo", "Analytics & otimização"],
    span: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Wrench,
    title: "Manutenção & Suporte",
    short: "Suporte contínuo para manter sua presença digital rodando sem problemas.",
    details: ["Monitoramento 24/7", "Atualizações regulares", "Otimização de performance", "Suporte prioritário"],
    span: "md:col-span-1 md:row-span-1",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

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
      <h3 className="font-headline text-lg font-semibold mb-2">{service.title}</h3>
      <p className="text-muted-foreground text-sm font-body leading-relaxed">{service.short}</p>

      {expanded && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 space-y-2"
        >
          {service.details.map((d) => (
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
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">Serviços</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            Tudo que você precisa para{" "}
            <span className="gradient-text">crescer digital</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
