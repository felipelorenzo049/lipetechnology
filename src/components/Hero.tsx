import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { animate } from "animejs";
import { ScrambleText } from "@/components/ScrambleText";
import { MagneticButton } from "@/components/MagneticButton";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (!headlineRef.current) return;
    if (reduced) {
      headlineRef.current.style.opacity = "1";
      headlineRef.current.style.clipPath = "inset(0 0 0 0)";
      setRevealed(true);
      return;
    }
    headlineRef.current.style.clipPath = "inset(0 100% 0 0)";
    animate(headlineRef.current, {
      opacity: [0, 1],
      translateY: [16, 0],
      clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
      duration: 1100,
      easing: "easeOutQuart",
    });
    setRevealed(true);
  }, [i18n.language, reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-24 md:pt-32 md:pb-20"
    >
      {/* Single soft bloom behind the headline — the only glow in the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,760px)] h-[min(90vw,760px)] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--primary) / 0.18) 0%, hsl(var(--secondary) / 0.12) 35%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity: reduced ? 1 : opacity, y: reduced ? 0 : yContent }}
        className="relative z-10 container mx-auto px-6 text-center max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span className="h-px w-10 bg-accent/60" />
          <span className="font-mono text-[10px] sm:text-xs text-accent tracking-[0.32em] uppercase">
            {t("hero.badge")}
          </span>
          <span className="h-px w-10 bg-accent/60" />
        </motion.div>

        <h1
          ref={headlineRef}
          className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.92] tracking-[-0.035em] mb-10 opacity-0"
        >
          <ScrambleText
            trigger={i18n.language}
            duration={1400}
            stagger={22}
            segments={[
              { text: t("hero.title1") + " " },
              { text: t("hero.titleHighlight"), className: "gradient-text italic" },
              { text: " " + t("hero.title2") },
            ]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-muted-foreground/90 max-w-xl mx-auto mb-14 font-body leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            onClick={() => scrollTo("#portfolio")}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
          >
            {t("hero.ctaProjects")}
            <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("#contato")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-accent/40 text-foreground font-medium hover:bg-accent/10 hover:border-accent"
          >
            <MessageCircle size={18} />
            {t("hero.ctaContact")}
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            animate={reduced ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
