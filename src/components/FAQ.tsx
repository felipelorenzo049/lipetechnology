import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const faqs = t("faq.items", { returnObjects: true, lng: i18n.language }) as Array<{ q: string; a: string }>;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // The section assembles on scroll-in: the heading rises, then the FAQ cards
  // stagger up. Accordion open/close stays on framer.
  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from("[data-faq='head'] > *", { opacity: 0, y: 18, duration: 0.55, stagger: 0.08 }, 0)
        .from("[data-faq='card']", { opacity: 0, y: 18, duration: 0.5, stagger: 0.08, clearProps: "transform,opacity" }, 0.15);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-3xl">
        <div data-faq="head" className="text-center mb-14">
          <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
            {t("faq.label")}
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold mt-3">
            {t("faq.title")}{" "}
            <span className="gradient-text">{t("faq.titleHighlight")}</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const open = openIdx === i;
            return (
              <div
                key={i}
                data-faq="card"
                className={cn(
                  "relative rounded-xl border backdrop-blur-sm transition-colors duration-300 overflow-hidden",
                  open
                    ? "border-accent/50 bg-card/50 shadow-[0_0_24px_-8px_hsl(var(--accent)/0.4)]"
                    : "border-border/50 bg-card/30 hover:border-border",
                )}
              >
                {/* Accent left rail when open */}
                <span
                  className={cn(
                    "absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-primary to-transparent transition-opacity duration-300",
                    open ? "opacity-100" : "opacity-0",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-center gap-4 text-left px-5 sm:px-6 py-5"
                  aria-expanded={open}
                >
                  <span
                    className={cn(
                      "font-mono text-xs tracking-widest transition-colors shrink-0",
                      open ? "text-accent" : "text-muted-foreground/70",
                    )}
                  >
                    Q·{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-headline text-sm md:text-base font-semibold flex-1">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={reduced ? undefined : { rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "shrink-0 flex items-center justify-center w-7 h-7 rounded-full border transition-colors",
                      open
                        ? "border-accent/60 text-accent bg-accent/10"
                        : "border-border/60 text-muted-foreground",
                    )}
                  >
                    <Plus size={14} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pl-[3.25rem] sm:pl-[4.25rem] text-muted-foreground font-body text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
