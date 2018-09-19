const {
  protocol,
  host,
} = window.location;

export const apiVersion = 1;
export const apiUrl = `${protocol}//${host}:8080/api/v${apiVersion}/`;
