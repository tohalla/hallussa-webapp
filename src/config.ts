const {PROTOCOL, API_PREFIX, WS_PREFIX, BASE_URL, API_PORT, WS_PORT} = process.env;

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? `${window.location.origin}/index.html`
    : window.location.origin;

if (!(BASE_URL)) {
  throw Error("API URL cannot be constructed.");
}

export const apiURL = `${PROTOCOL}://${BASE_URL}${
  API_PORT === "443" || API_PORT === "80" ? "" : `:${API_PORT}`
}${API_PREFIX}`;
