import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Search, Target, Hammer, Rocket, ChevronDown } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Descoberta",
    short: "Aprendemos sua história, público e objetivos",
    detail: "Mergulhamos no seu negócio para entender o que o torna único. Entrevistas, análise de mercado e definição de metas claras antes de escrever uma linha de código.",
  },
  {
    icon: Target,
    title: "Estratégia",
    short: "Desenhamos a tecnologia que se encaixa na sua identidade",
    detail: "Wireframes, arquitetura técnica e estratégia de conteúdo alinhados à sua marca. Cada decisão de design serve à sua história.",
  },
  {
    icon: Hammer,
    title: "Construção",
    short: "Construímos com qualidade, velocidade e transparência",
    detail: "Desenvolvimento ágil com entregas semanais. Você acompanha cada etapa e pode dar feedback em tempo real. Código limpo, testado e documentado.",
  },
  {
    icon: Rocket,
    title: "Crescimento",
    short: "Suportamos e otimizamos enquanto você cresce",
    detail: "Lançamento é só o começo. Monitoramos performance, otimizamos conversões e evoluímos sua plataforma conforme seu negócio cresce.",
  },
];

const Process = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="processo" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">Processo</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            Como{" "}
            <span className="gradient-text">trabalhamos</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/40 to-transparent" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-16 md:pl-20"
    >
      {/* Node */}
      <div className="absolute left-3 md:left-5 top-2 w-6 h-6 rounded-full bg-muted border-2 border-primary flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>

      <div
        className="glass rounded-xl p-6 cursor-pointer hover:glow-primary transition-all duration-300"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <step.icon size={20} className="text-primary" />
            <div>
              <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              <h3 className="font-headline text-lg font-semibold">{step.title}</h3>
            </div>
          </div>
          <ChevronDown
            size={18}
            className={`text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </div>
        <p className="text-muted-foreground text-sm mt-2 font-body">{step.short}</p>

        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-foreground/80 text-sm mt-3 font-body leading-relaxed border-t border-border pt-3"
          >
            {step.detail}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Process;
