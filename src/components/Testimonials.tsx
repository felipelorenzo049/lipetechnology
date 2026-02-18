import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "A LIPE não só fez nosso site — eles contaram nossa história de 40 anos de forma que nunca conseguimos antes.",
    author: "Maria S.",
    role: "Proprietária, Restaurante Sabor & Tradição",
  },
  {
    quote: "Nosso chatbot qualifica clientes enquanto dormimos. É como ter um vendedor 24/7 que conhece cada detalhe do negócio.",
    author: "Carlos R.",
    role: "CEO, EasyLine Brasil",
  },
  {
    quote: "Eles transformaram nossa lojinha de bairro num e-commerce que entrega em 12 cidades. Sem perder nossa cara.",
    author: "Ana L.",
    role: "Fundadora, Empório do Bairro",
  },
  {
    quote: "O sistema de agendamento reduziu conflitos em 60%. Economizo 2 horas por dia. Melhor investimento que fiz.",
    author: "Pedro M.",
    role: "Diretor, Studio Wellness",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">Depoimentos</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            O que nossos clientes{" "}
            <span className="gradient-text">dizem</span>
          </h2>
        </motion.div>

        <div className="relative glass rounded-2xl p-8 md:p-12 text-center min-h-[250px] flex flex-col items-center justify-center">
          <Quote size={32} className="text-primary/30 mb-6" />

          <motion.p
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-body text-lg md:text-xl text-foreground/90 leading-relaxed mb-6"
          >
            "{t.quote}"
          </motion.p>

          <motion.div key={`author-${current}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="font-headline font-semibold text-foreground">{t.author}</p>
            <p className="text-sm text-muted-foreground font-body">{t.role}</p>
          </motion.div>

          {/* Dots */}
          <div className="flex gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
