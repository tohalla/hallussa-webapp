const { protocol, hostname } = window.location;

const apiPort = 8080;

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? `${window.location.origin}/index.html`
    : window.location.origin;

export const apiVersion = 1;
export const apiUrl = `${protocol}//${hostname}:${apiPort}/api/v${apiVersion}`;
