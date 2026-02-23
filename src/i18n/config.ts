import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import pt from "./locales/pt.json";
import es from "./locales/es.json";
import it from "./locales/it.json";

const customLanguageDetector = {
  name: "customNavigator",
  lookup() {
    const browserLang = navigator.language || "";
    const primary = browserLang.split("-")[0];
    // Portuguese speakers → pt, everyone else → en
    return primary === "pt" ? "pt" : "en";
  },
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector(customLanguageDetector);

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      es: { translation: es },
      it: { translation: it },
    },
    supportedLngs: ["en", "pt", "es", "it"],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "customNavigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
