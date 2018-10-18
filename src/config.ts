const { protocol, hostname } = window.location;

const apiPort = 8080;
export const apiVersion = 1;
export const apiUrl = `${protocol}//${hostname}:${apiPort}/api/v${apiVersion}`;
