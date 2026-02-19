import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const whatsappMessages: Record<string, string> = {
  en: "Hello! I'd like to know more about LIPE Technology services.",
  pt: "Olá! Gostaria de saber mais sobre os serviços da LIPE Technology.",
  es: "¡Hola! Me gustaría saber más sobre los servicios de LIPE Technology.",
  it: "Ciao! Vorrei sapere di più sui servizi di LIPE Technology.",
};

const WhatsAppButton = () => {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || "en";
  const message = whatsappMessages[lang] || whatsappMessages.en;
  const url = `https://wa.me/5511940575960?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.a>
  );
};

export default WhatsAppButton;
