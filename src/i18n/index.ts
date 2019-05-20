import i18n from "i18next";
import { prop } from "ramda";
import { initReactI18next } from "react-i18next";

import { apiUrl } from "../config";

export default async () => {
  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: ["fback", "en"],
      interpolation: {escapeValue: false},
    });

  const [languages] = await Promise.all([
    fetch(`${apiUrl}/i18n/languages`).then((response) => response.json()),
    fetchAndAddTranslations("fback"),
    fetchAndAddTranslations(i18n.language || "en"),
  ]);
  i18n.languages = languages.map(prop("locale"));

  return i18n;
};

const fetchAndAddTranslations = (locale: string, namespace = "translation") =>
  fetch(`${apiUrl}/i18n/languages/${locale}`)
    .then((response) => response.json())
    .then((body) => i18n.addResourceBundle(locale, namespace, body));
