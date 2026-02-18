import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    price: "R$ 8.000–12.000",
    description: "Ideal para começar sua presença digital",
    features: [
      "Site personalizado",
      "5-8 páginas",
      "Mobile responsivo",
      "SEO básico",
      "3 meses de suporte",
    ],
    highlight: false,
  },
  {
    name: "Profissional",
    price: "R$ 15.000–25.000",
    description: "Para quem quer crescer com inteligência",
    features: [
      "Tudo do Essencial",
      "Chatbot consultivo",
      "Integrações (WhatsApp, pagamento)",
      "Analytics avançado",
      "6 meses de suporte",
    ],
    highlight: true,
  },
  {
    name: "Enterprise / SaaS",
    price: "Sob consulta",
    description: "Plataformas e soluções sob medida",
    features: [
      "Plataformas customizadas",
      "Aplicações web complexas",
      "Dashboards & analytics",
      "Arquitetura escalável",
      "Suporte contínuo",
    ],
    highlight: false,
  },
];

const Pricing = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">Investimento</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            Planos que{" "}
            <span className="gradient-text">fazem sentido</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-8 ${
                plan.highlight
                  ? "glass glow-primary border-primary/30"
                  : "glass"
              } flex flex-col`}
            >
              {plan.highlight && (
                <span className="self-start px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-medium mb-4">
                  Mais popular
                </span>
              )}
              <h3 className="font-headline text-xl font-bold">{plan.name}</h3>
              <p className="text-muted-foreground text-sm font-body mt-1 mb-4">{plan.description}</p>
              <p className="font-headline text-2xl font-bold gradient-text mb-6">{plan.price}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-body text-foreground/80">
                    <Check size={16} className="text-secondary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
                className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Fale conosco
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground font-body mt-8 max-w-lg mx-auto"
        >
          Cada projeto é único. Valores finais dependem do escopo. Agende uma conversa para orçamento personalizado.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
