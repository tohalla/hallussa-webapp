import axios from "axios";
import i18n from "i18next";
import { prop } from "ramda";
import { initReactI18next } from "react-i18next";

import { apiURL } from "../config";

export default async () => {
  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: ["fback", "en"],
      interpolation: {escapeValue: false},
    });

  const [languages] = await Promise.all([
    axios(`${apiURL}/i18n/languages`).then(prop("data")),
    fetchAndAddTranslations("fback"),
    fetchAndAddTranslations(i18n.language || "en"),
  ]);

  i18n.language = "en"; // will be passed in Accept-Language header
  i18n.languages = languages.map(prop("locale"));

  return i18n;
};

const fetchAndAddTranslations = (locale: string, namespace = "translation") =>
  axios(`${apiURL}/i18n/languages/${locale}`)
    .then(prop("data"))
    .then((translations) => i18n.addResourceBundle(locale, namespace, translations));
