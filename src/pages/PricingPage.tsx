import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Badge } from "@/components/ui/badge";

const PricingPage = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const plans = t("pricing.plans", { returnObjects: true }) as Array<{
    name: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
    cta: string;
  }>;

  const scrollToContact = () => {
    window.location.href = "/#contato";
  };

  return (
    <GradientBackground
      className="min-h-screen text-foreground overflow-x-hidden"
      animationDuration={12}
      overlay
      overlayOpacity={0.75}
    >
      <Navbar />
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div ref={ref} className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="font-mono text-sm text-secondary tracking-wider uppercase">
              {t("pricing.label")}
            </span>
            <h1 className="font-headline text-3xl md:text-5xl font-bold mt-3">
              {t("pricing.title")}{" "}
              <span className="gradient-text">{t("pricing.titleHighlight")}</span>
            </h1>
            <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
              {t("pricing.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative glass rounded-2xl p-8 flex flex-col ${
                  plan.popular
                    ? "border-primary/50 glow-primary scale-[1.02]"
                    : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground border-none text-xs font-mono tracking-wider gap-1">
                    <Sparkles size={12} />
                    {t("pricing.popular")}
                  </Badge>
                )}

                <h3 className="font-headline text-xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground font-body text-sm mt-2">
                  {plan.description}
                </p>

                <div className="mt-6 mb-6">
                  <span className="font-headline text-3xl font-bold gradient-text">
                    {plan.price}
                  </span>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm font-body text-foreground/80"
                    >
                      <Check size={16} className="text-secondary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToContact}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all group text-sm ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                      : "bg-muted text-foreground hover:bg-muted/80 border border-border"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center text-muted-foreground text-sm font-body mt-12"
          >
            {t("pricing.note")}
          </motion.p>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </GradientBackground>
  );
};

export default PricingPage;
