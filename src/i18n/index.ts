import i18n from "i18next";
import { prop } from "ramda";
import { initReactI18next } from "react-i18next";

import { apiUrl } from "../config";

export default async () => {
  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      interpolation: {escapeValue: false},
    });

  const languages = await fetch(`${apiUrl}/i18n/languages/`)
    .then((response) => response.json());
  i18n.languages = languages.map(prop("locale"));

  await fetchAndAddTranslations(i18n.language || "en");

  return i18n;
};

const fetchAndAddTranslations = (locale: string, namespace = "translation") =>
  fetch(`${apiUrl}/i18n/languages/${locale}`)
    .then((response) => response.json())
    .then((body) => i18n.addResourceBundle(locale, namespace, body));
