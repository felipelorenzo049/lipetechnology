import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Manifesto = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
      <div className="absolute right-0 top-1/3 w-px h-24 bg-gradient-to-b from-transparent via-secondary/40 to-transparent" />

      <div ref={ref} className="container mx-auto px-6 max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-mono text-sm text-secondary tracking-wider uppercase mb-8"
        >
          Nossa filosofia
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-headline text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 mb-8"
        >
          A maioria das agências constrói sites que parecem iguais. Nós construímos tecnologia que{" "}
          <span className="gradient-text font-bold">conta histórias</span>.
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-muted-foreground text-base md:text-lg leading-relaxed font-body"
        >
          Seu restaurante tem anos de tradição? Vamos fazer o site honrar isso. Sua loja é o coração do bairro? 
          Seu site será também. Tecnologia não deve apagar identidade —{" "}
          <span className="text-foreground font-medium">deve ampliá-la</span>.
        </motion.p>
      </div>
    </section>
  );
};

export default Manifesto;
