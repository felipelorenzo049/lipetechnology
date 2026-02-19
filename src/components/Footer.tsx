import { Linkedin, Instagram, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoLipe from "@/assets/logo-lipe.png";

const Footer = () => {
  const { t } = useTranslation();
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: t("nav.services"), href: "#servicos" },
    { label: t("nav.portfolio"), href: "#portfolio" },
    { label: t("nav.process"), href: "#processo" },
    { label: t("nav.contact"), href: "#contato" },
  ];

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <img src={logoLipe} alt="LIPE Technology" className="h-6" />
            <span className="text-sm text-muted-foreground ml-2 font-body">Technology</span>
            <p className="text-xs text-muted-foreground font-body mt-2">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex gap-6 text-sm font-body">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>

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
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
