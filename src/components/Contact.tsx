import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email) {
      toast({ title: t("contact.fillRequired"), variant: "destructive" });
      return;
    }
    toast({ title: t("contact.successTitle"), description: t("contact.successDesc") });
    setForm({ nome: "", email: "", telefone: "", empresa: "", mensagem: "", orcamento: "" });
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <section id="contato" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">{t("contact.label")}</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            {t("contact.title")}{" "}
            <span className="gradient-text">{t("contact.titleHighlight")}</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1.5 block">{t("contact.name")}</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => update("nome", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder={t("contact.namePlaceholder")}
              />
            </div>
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1.5 block">{t("contact.email")}</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder={t("contact.emailPlaceholder")}
              />
            </div>
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1.5 block">{t("contact.phone")}</label>
              <input
                type="tel"
                value={form.telefone}
                onChange={(e) => update("telefone", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder={t("contact.phonePlaceholder")}
              />
            </div>
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1.5 block">{t("contact.company")}</label>
              <input
                type="text"
                value={form.empresa}
                onChange={(e) => update("empresa", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder={t("contact.companyPlaceholder")}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-body text-muted-foreground mb-1.5 block">{t("contact.budget")}</label>
            <select
              value={form.orcamento}
              onChange={(e) => update("orcamento", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">{t("contact.budgetSelect")}</option>
              {budgetOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-body text-muted-foreground mb-1.5 block">{t("contact.message")}</label>
            <textarea
              value={form.mensagem}
              onChange={(e) => update("mensagem", e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              placeholder={t("contact.messagePlaceholder")}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Send size={18} />
            {t("contact.submit")}
          </button>
        </motion.form>

      </div>
    </section>
  );
};

export default Contact;
