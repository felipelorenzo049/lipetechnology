import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu as NavMenu,
  MenuItem,
  ProductItem,
  HoveredLink,
} from "@/components/ui/navbar-menu";

const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop */}
      <div className="hidden md:flex justify-center pt-4">
        <NavMenu setActive={setActive}>
          {/* Logo */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-headline text-lg font-bold gradient-text mr-8 flex items-center tracking-widest"
          >
            LIPE
          </a>

          <MenuItem setActive={setActive} active={active} item="Serviços">
            <div className="flex flex-col space-y-3 text-sm">
              <HoveredLink href="#servicos" onClick={() => scrollTo("#servicos")}>
                Sites Personalizáveis
              </HoveredLink>
              <HoveredLink href="#servicos" onClick={() => scrollTo("#servicos")}>
                Chatbots Consultivos
              </HoveredLink>
              <HoveredLink href="#servicos" onClick={() => scrollTo("#servicos")}>
                SaaS / Plataformas
              </HoveredLink>
              <HoveredLink href="#servicos" onClick={() => scrollTo("#servicos")}>
                Marketing Digital
              </HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Portfólio">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <ProductItem
                title="E-commerce Premium"
                description="Loja online completa com design exclusivo"
                href="#portfolio"
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=140&h=70&fit=crop"
              />
              <ProductItem
                title="App SaaS"
                description="Plataforma de gestão sob medida"
                href="#portfolio"
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=140&h=70&fit=crop"
              />
              <ProductItem
                title="Landing Page"
                description="Página de alta conversão"
                href="#portfolio"
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=140&h=70&fit=crop"
              />
              <ProductItem
                title="Chatbot IA"
                description="Assistente virtual inteligente"
                href="#portfolio"
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=140&h=70&fit=crop"
              />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Planos">
            <div className="flex flex-col space-y-3 text-sm">
              <HoveredLink href="#contato" onClick={() => scrollTo("#contato")}>
                Starter
              </HoveredLink>
              <HoveredLink href="#contato" onClick={() => scrollTo("#contato")}>
                Profissional
              </HoveredLink>
              <HoveredLink href="#contato" onClick={() => scrollTo("#contato")}>
                Enterprise
              </HoveredLink>
            </div>
          </MenuItem>

          <button
            onClick={() => scrollTo("#contato")}
            className="ml-6 px-5 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold font-body hover:bg-accent/90 transition-all hover:shadow-[0_0_20px_-4px_hsl(20_100%_53%/0.4)] uppercase tracking-wide"
          >
            Fale Conosco
          </button>
        </NavMenu>
      </div>

      {/* Mobile */}
      <div className="md:hidden glass">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="font-headline text-2xl font-bold gradient-text">LIPE</span>
            <span className="text-sm font-body text-muted-foreground">Technology</span>
          </a>
          <button className="text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass border-t border-border"
            >
              <div className="flex flex-col gap-4 px-6 py-6">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-left text-foreground font-body hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo("#contato")}
                  className="mt-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium"
                >
                  Fale Conosco
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
