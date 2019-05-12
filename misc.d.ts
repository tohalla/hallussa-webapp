import i18next from "i18next";

export type TranslationProps = {t: i18next.TFunction}

type Omit<A, B extends keyof A> = Pick<A, Exclude<keyof A, B extends object ? keyof B : B>>;
