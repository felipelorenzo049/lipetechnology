import { Linkedin, Instagram, Github } from "lucide-react";

const Footer = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <span className="font-headline text-xl font-bold gradient-text">LIPE</span>
            <span className="text-sm text-muted-foreground ml-2 font-body">Technology</span>
            <p className="text-xs text-muted-foreground font-body mt-2">
              Sites · Chatbots · SaaS · Marketing · Manutenção
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm font-body">
            {[
              { label: "Serviços", href: "#servicos" },
              { label: "Portfólio", href: "#portfolio" },
              { label: "Processo", href: "#processo" },
              { label: "Contato", href: "#contato" },
            ].map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            {[
              { icon: Linkedin, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Github, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-body">
            © 2026 LIPE Technology. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
