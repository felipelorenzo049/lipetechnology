import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const budgetOptions = [
  "R$ 5.000–10.000",
  "R$ 10.000–20.000",
  "R$ 20.000+",
  "Não sei ainda",
];

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
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
      toast({ title: "Preencha nome e email", variant: "destructive" });
      return;
    }
    toast({ title: "Mensagem enviada!", description: "Entraremos em contato em breve." });
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
          <span className="font-mono text-sm text-secondary tracking-wider uppercase">Contato</span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3">
            Vamos construir algo{" "}
            <span className="gradient-text">único juntos?</span>
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
              <label className="text-sm font-body text-muted-foreground mb-1.5 block">Nome *</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => update("nome", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1.5 block">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1.5 block">Telefone (WhatsApp)</label>
              <input
                type="tel"
                value={form.telefone}
                onChange={(e) => update("telefone", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <label className="text-sm font-body text-muted-foreground mb-1.5 block">Empresa / Projeto</label>
              <input
                type="text"
                value={form.empresa}
                onChange={(e) => update("empresa", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Nome da empresa"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-body text-muted-foreground mb-1.5 block">Orçamento estimado</label>
            <select
              value={form.orcamento}
              onChange={(e) => update("orcamento", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Selecione...</option>
              {budgetOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-body text-muted-foreground mb-1.5 block">Mensagem (opcional)</label>
            <textarea
              value={form.mensagem}
              onChange={(e) => update("mensagem", e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              placeholder="Conte-nos sobre seu projeto..."
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Send size={18} />
            Enviar mensagem
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <a
            href="https://wa.me/5511940575960?text=Olá! Gostaria de saber mais sobre os serviços da LIPE Technology."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
          >
            <MessageCircle size={20} />
            Fale diretamente pelo WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
