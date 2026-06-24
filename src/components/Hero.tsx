import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { animate } from "animejs";
import { SparklesCore } from "@/components/ui/sparkles";
import { ScrambleText } from "@/components/ScrambleText";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!headlineRef.current || reduced) return;
    animate(headlineRef.current, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700,
      easing: "easeOutQuad",
    });
  }, [i18n.language]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 grid-overlay opacity-30" />

      {/* Sparkles background */}
      <div className="absolute inset-0 z-[1]">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.4}
          particleDensity={isMobile ? 15 : 60}
          className="w-full h-full"
          particleColor="#4B83F0"
          speed={1.5}
        />
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-[15%] w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float-slow" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block font-mono text-xs sm:text-sm text-accent mb-6 tracking-[0.2em] uppercase">
            {t("hero.badge")}
          </span>
        </motion.div>

        <h1
          ref={headlineRef}
          className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 opacity-0"
        >
          <ScrambleText
            trigger={i18n.language}
            duration={1400}
            stagger={22}
            segments={[
              { text: t("hero.title1") + " " },
              { text: t("hero.titleHighlight"), className: "gradient-text" },
              { text: " " + t("hero.title2") },
            ]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("#portfolio")}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            {t("hero.ctaProjects")}
            <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo("#contato")}
            className="flex items-center gap-2 px-8 py-3.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            <MessageCircle size={18} />
            {t("hero.ctaContact")}
          </button>
        </motion.div>
      </div>

      {/* Bottom fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-background z-[2]" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
