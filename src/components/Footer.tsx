import { Linkedin, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
            <span className="font-headline text-xl font-bold gradient-text">LIPE</span>
            <span className="text-sm text-muted-foreground ml-2 font-body">Technology</span>
            <p className="text-xs text-muted-foreground font-body mt-2">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-body">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.pricing")}
            </Link>
          </div>

          <div className="flex gap-4">
            {[
              { icon: Linkedin, href: "https://linkedin.com/company/lipetechnology" },
              { icon: Instagram, href: "https://instagram.com/lipetechnology" },
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

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            {t("footer.copyright")}
          </p>
          <div className="flex gap-4 text-xs font-body">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
