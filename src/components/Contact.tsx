import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionSignal from "@/components/SectionSignal";

const inputCls =
  "w-full px-4 py-3 rounded-lg bg-background/40 border border-border/60 text-foreground text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition-colors backdrop-blur-sm";
const labelCls =
  "text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2 block";

const whatsappMessages: Record<string, string> = {
  en: "Hello! I'd like to know more about LIPE Technology services.",
  pt: "Olá! Gostaria de saber mais sobre os serviços da LIPE Technology.",
  es: "¡Hola! Me gustaría saber más sobre los servicios de LIPE Technology.",
  it: "Ciao! Vorrei sapere di più sui servizi di LIPE Technology.",
};

const Contact = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const budgetOptions = t("contact.budgetOptions", { returnObjects: true }) as string[];
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    mensagem: "",
    orcamento: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const lang = i18n.resolvedLanguage || "en";
  const waUrl = `https://wa.me/5511940575960?text=${encodeURIComponent(
    whatsappMessages[lang] || whatsappMessages.en,
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email) {
      toast({ title: t("contact.fillRequired"), variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name: form.nome,
        email: form.email,
        phone: form.telefone || null,
        company: form.empresa || null,
        budget: form.orcamento || null,
        message: form.mensagem || null,
      });
      if (error) throw error;
      toast({ title: t("contact.successTitle"), description: t("contact.successDesc") });
      setForm({ nome: "", email: "", telefone: "", empresa: "", mensagem: "", orcamento: "" });
    } catch {
      toast({ title: "Erro ao enviar", description: "Tente novamente mais tarde.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <section id="contato" className="relative py-24 md:py-32 overflow-hidden">
      {/* Decorative signal circuit */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sig" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 120 L300 120 L360 60 L900 60 L960 120 L1200 120"
          stroke="url(#sig)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M0 700 L240 700 L300 760 L900 760 L960 700 L1200 700"
          stroke="url(#sig)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="360" cy="60" r="2.5" fill="hsl(var(--accent))" />
        <circle cx="900" cy="60" r="2.5" fill="hsl(var(--accent))" />
        <circle cx="300" cy="760" r="2.5" fill="hsl(var(--accent))" />
        <circle cx="900" cy="760" r="2.5" fill="hsl(var(--accent))" />
      </svg>

      <div ref={ref} className="relative container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
            {t("contact.label")}
          </span>
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold mt-4 leading-[1.05] tracking-tight">
            {t("contact.title")}{" "}
            <span className="gradient-text">{t("contact.titleHighlight")}</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.3)]"
        >
          {/* Top accent rail */}
          <span className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>{t("contact.name")}</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => update("nome", e.target.value)}
                className={inputCls}
                placeholder={t("contact.namePlaceholder")}
              />
            </div>
            <div>
              <label className={labelCls}>{t("contact.email")}</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputCls}
                placeholder={t("contact.emailPlaceholder")}
              />
            </div>
            <div>
              <label className={labelCls}>{t("contact.phone")}</label>
              <input
                type="tel"
                value={form.telefone}
                onChange={(e) => update("telefone", e.target.value)}
                className={inputCls}
                placeholder={t("contact.phonePlaceholder")}
              />
            </div>
            <div>
              <label className={labelCls}>{t("contact.company")}</label>
              <input
                type="text"
                value={form.empresa}
                onChange={(e) => update("empresa", e.target.value)}
                className={inputCls}
                placeholder={t("contact.companyPlaceholder")}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>{t("contact.budget")}</label>
            <Select value={form.orcamento} onValueChange={(val) => update("orcamento", val)}>
              <SelectTrigger className="w-full bg-background/40 border-border/60 text-foreground text-sm font-body backdrop-blur-sm focus:border-accent/60 focus:ring-2 focus:ring-accent/20 h-12">
                <SelectValue placeholder={t("contact.budgetSelect")} />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className={labelCls}>{t("contact.message")}</label>
            <textarea
              value={form.mensagem}
              onChange={(e) => update("mensagem", e.target.value)}
              rows={4}
              className={`${inputCls} resize-none`}
              placeholder={t("contact.messagePlaceholder")}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="group flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-lg bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground font-semibold hover:shadow-[0_0_30px_-4px_hsl(var(--primary)/0.6)] transition-all disabled:opacity-50"
            >
              <Send size={16} />
              {submitting ? "..." : t("contact.submit")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial sm:px-6 inline-flex items-center justify-center gap-2 py-3.5 rounded-lg border border-accent/40 bg-accent/5 text-foreground font-semibold hover:bg-accent/10 hover:border-accent/60 transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
