const protocol = "http";
const url = "192.168.1.82";
const apiPort: string = "8080";
const apiPrefix = "/api/v1";
const wsPrefix = "/ws";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? `${window.location.origin}/index.html`
    : window.location.origin;

export const apiURL = `${protocol}://${url}${
  apiPort === "443" || apiPort === "80" ? "" : `:${apiPort}`
}${apiPrefix}`;

export const wsURL = `${protocol === "http" ? "ws" : "wss"}://${url}${
  apiPort === "443" || apiPort === "80" ? "" : `:${apiPort}`
}${wsPrefix}`;
