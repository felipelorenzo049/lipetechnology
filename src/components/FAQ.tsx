import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionSignal from "@/components/SectionSignal";

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();
  const faqs = t("faq.items", { returnObjects: true, lng: i18n.language }) as Array<{ q: string; a: string }>;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
            {t("faq.label")}
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold mt-3">
            {t("faq.title")}{" "}
            <span className="gradient-text">{t("faq.titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const open = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
