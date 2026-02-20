import { useState } from "react";
import { Menu, X, Globe, MessageSquare, LayoutDashboard, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Menu as NavMenu,
  MenuItem,
  ProductItem,
  HoveredLink,
} from "@/components/ui/navbar-menu";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const navLinks = [
    { label: t("nav.services"), href: "#servicos" },
    { label: t("nav.portfolio"), href: "#portfolio" },
    { label: t("nav.process"), href: "#processo" },
    { label: t("nav.pricing"), href: "/pricing", isRoute: true },
    { label: t("nav.contact"), href: "#contato" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop */}
      <div className="hidden md:flex justify-center pt-4">
        <NavMenu setActive={setActive}>
          {/* Logo */}
          <Link
            to="/"
            className="font-headline text-lg font-bold gradient-text mr-8 flex items-center tracking-widest"
          >
            LIPE
          </Link>

          <MenuItem setActive={setActive} active={active} item={t("nav.services")}>
            <div className="flex flex-col space-y-1 min-w-[240px]">
              <HoveredLink href="#servicos" onClick={() => scrollTo("#servicos")} icon={Globe} description={t("nav.customWebsitesDesc")}>
                {t("nav.customWebsites")}
              </HoveredLink>
              <HoveredLink href="#servicos" onClick={() => scrollTo("#servicos")} icon={MessageSquare} description={t("nav.consultativeChatbotsDesc")}>
                {t("nav.consultativeChatbots")}
              </HoveredLink>
              <HoveredLink href="#servicos" onClick={() => scrollTo("#servicos")} icon={LayoutDashboard} description={t("nav.saasDesc")}>
                {t("nav.saasTitle")}
              </HoveredLink>
              <HoveredLink href="#servicos" onClick={() => scrollTo("#servicos")} icon={TrendingUp} description={t("nav.digitalMarketingDesc")}>
                {t("nav.digitalMarketing")}
              </HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item={t("nav.portfolio")}>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <ProductItem
                title={t("nav.premiumEcommerce")}
                description={t("nav.premiumEcommerceDesc")}
                href="#portfolio"
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=140&h=70&fit=crop"
              />
              <ProductItem
                title={t("nav.saasApp")}
                description={t("nav.saasAppDesc")}
                href="#portfolio"
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=140&h=70&fit=crop"
              />
              <ProductItem
                title={t("nav.landingPage")}
                description={t("nav.landingPageDesc")}
                href="#portfolio"
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=140&h=70&fit=crop"
              />
              <ProductItem
                title={t("nav.aiChatbot")}
                description={t("nav.aiChatbotDesc")}
                href="#portfolio"
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=140&h=70&fit=crop"
              />
            </div>
          </MenuItem>

          <button
            onClick={() => scrollTo("#processo")}
            className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase cursor-pointer"
          >
            {t("nav.process")}
          </button>

          <Link
            to="/pricing"
            className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase cursor-pointer"
          >
            {t("nav.pricing")}
          </Link>

          <LanguageSwitcher />

          <button
            onClick={() => scrollTo("#contato")}
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
                {navLinks.map((link) => (
                  link.isRoute ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-left text-foreground font-body hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="text-left text-foreground font-body hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  )
                ))}
                <button
                  onClick={() => scrollTo("#contato")}
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
