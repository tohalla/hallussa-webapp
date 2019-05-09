export type ColorAccents = "dark" | "light" | "lighter" | "neutral" | "neutral_light";
export type ColorGroup = { [key in ColorAccents]?: string };
export type ColorScale = [string, string, string, string, string, string, string, string, string, string];

export const greyscale: ColorScale = [
  "#000000",
  "#212121",
  "#606060",
  "#929292",
  "#aaaaaa",
  "#bbbbbb",
  "#dfdfdf",
  "#ededed",
  "#f5f5f5",
  "#ffffff",
];

export const text: ColorGroup = {
  dark: greyscale[1],
  light: greyscale[8],
  neutral: greyscale[3],
};

export const primary: ColorGroup = {
  dark: "#18305B",
  light: "#5B739F",
  neutral: "#4F6690",
};

export const accent: ColorGroup = {
  dark: "#D05E00",
  light: "#FF831D",
  neutral: "#ff7400",
};

export const indicator = {
  alert: "#FF831D",
  disabled: "#a9a9a9",
  error: "#CC3300",
  success: "#208844",
};

export const colors: {
  [key: string]: { [key in ColorAccents]?: string } | string | string[];
} = {
  accent,
  greyscale,
  primary,
  text,
};
