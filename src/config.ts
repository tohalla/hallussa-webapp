export const baseUrl =
  process.env.NODE_ENV === "development"
    ? `${window.location.origin}/index.html`
    : window.location.origin;

if (!(process.env.API_URI)) {
  throw Error("API URL cannot be constructed.");
}

export const apiUrl = `${process.env.API_URI}${
  process.env.API_PORT ? `:${process.env.API_PORT}` : ""
}/` + [
  process.env.API_PREFIX,
  process.env.API_VERSION,
].filter(Boolean).join("/");
