import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./translations/en/translation.json";
import translationRO from "./translations/ro/translation.json";

const fallbackLng = ["en"];
const availableLanguages = ["en", "ro"];

const resources = {
  en: {
    translation: translationEN
  },
  ro: {
    translation: translationRO
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,

    detection: {
      checkWhitelist: true
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
