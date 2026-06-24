import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { animate } from "animejs";
import { ScrambleText } from "@/components/ScrambleText";
import { MagneticButton } from "@/components/MagneticButton";
import HeroCore from "@/components/HeroCore";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll-linked parallax tied to the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yMesh = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const signalY = useTransform(scrollYProgress, [0, 1], ["-40%", "120%"]);

  useEffect(() => {
    if (!headlineRef.current) return;
    if (reduced) {
      headlineRef.current.style.opacity = "1";
      headlineRef.current.style.clipPath = "inset(0 0 0 0)";
      setRevealed(true);
      return;
    }
    // Mask/clip-path reveal
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
      {/* Parallax mesh layer */}
      <motion.div
        aria-hidden
        style={{ y: reduced ? 0 : yMesh }}
        className="absolute inset-0 gradient-mesh"
      />
      <div className="absolute inset-0 grid-overlay opacity-20" />

      {/* Subtle film grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Soft floating glows */}
      <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-[15%] w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float-slow" />

      {/* Vertical "signal" line traveling down with scroll */}
      <div aria-hidden className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-40 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
        {!reduced && (
          <motion.div
            style={{ y: signalY }}
            className="absolute left-1/2 -translate-x-1/2 w-[3px] h-16 rounded-full bg-accent shadow-[0_0_24px_hsl(var(--accent)/0.9)]"
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity: reduced ? 1 : opacity, scale: reduced ? 1 : scale, y: reduced ? 0 : yContent }}
        className="relative z-10 container mx-auto px-6 text-center max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="h-px w-8 bg-accent/60" />
          <span className="font-mono text-[10px] sm:text-xs text-accent tracking-[0.3em] uppercase">
            {t("hero.badge")}
          </span>
          <span className="h-px w-8 bg-accent/60" />
        </motion.div>

        <motion.div style={{ y: reduced ? 0 : yTitle }}>
          <h1
            ref={headlineRef}
            className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight mb-8 opacity-0"
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
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 font-body"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 30 }}
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

      {/* Bottom fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-background z-[2] pointer-events-none" />

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
