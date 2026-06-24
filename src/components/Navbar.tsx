import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu as NavMenu } from "@/components/ui/navbar-menu";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: t("nav.studio"), href: "#socios" },
    { label: t("nav.pipe"), href: "#portfolio" },
    { label: t("nav.horsebid"), href: "#horsebid" },
    { label: t("nav.process"), href: "#processo" },
  ];

  const scrollToImmediate = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNav = (href: string) => {
    setActive(null);
    if (location.pathname === "/") {
      scrollToImmediate(href);
    } else {
      navigate("/" + href);
    }
  };

  const handleMobileNav = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => handleNav(href), 350);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop */}
      <div className="hidden md:flex justify-center pt-4">
        <NavMenu setActive={setActive}>
          <Link
            to="/"
            className="font-headline text-lg font-bold gradient-text mr-8 flex items-center tracking-widest"
          >
            LIPE
          </Link>

          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase cursor-pointer"
            >
              {item.label}
            </button>
          ))}

          <LanguageSwitcher />

          <button
            onClick={() => handleNav("#contato")}
            className="ml-4 px-5 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold font-body hover:bg-secondary/90 transition-all hover:shadow-[0_0_20px_-4px_hsl(168_55%_44%/0.4)] uppercase tracking-wide"
          >
            {t("nav.talkToUs")}
          </button>
        </NavMenu>
      </div>

      {/* Mobile */}
      <div className="md:hidden glass">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-headline text-2xl font-bold gradient-text">LIPE</span>
            <span className="text-sm font-body text-muted-foreground">Technology</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button className="text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleMobileNav(item.href)}
                    className="text-left text-foreground font-body hover:text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleMobileNav("#contato")}
                  className="mt-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium"
                >
                  {t("nav.talkToUs")}
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
