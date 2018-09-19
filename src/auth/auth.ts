import { apiUrl } from "../config";

/**
 * fetches, saves and returns new JWT if current one expiring in 10*60*1000ms = 10 minutes,
 * otherwise just returns current token
 */
export const getAndCheckJWT = async (): Promise<string | null | void> => {
  const token = localStorage.getItem("token");
  if (token) {
    const expiresAt = localStorage.getItem("expiresAt");
    if (typeof expiresAt !== "number" || expiresAt - Date.now() < 0) {
      // should remove token if its expired
      return signOut();
    } else if (typeof expiresAt === "number" && expiresAt - Date.now() < 10 * 60 * 1000) {
      // should refresh token if it expires in next 10 minutes
      await authenticate(token);
    }
  }
  return token;
};

export const authenticate = async (credentials: string | {email: string, password: string}) => {
  try {
    const response = await fetch(
      `${apiUrl}/auth`,
      typeof credentials === "string" ? // attach authorization header if token provided as credentials
        {headers: {authorization: `Bearer ${credentials}`}}
      : {method: "POST", body: JSON.stringify(credentials)} // otherwise should use email and password
    );
    const {token, expiresAt} = await response.json();
    localStorage.setItem("token", token);
    localStorage.setItem("expiresAt", expiresAt);
  } catch (e) {
    return signOut();
  }
};

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");
  // TODO: refresh store state or page
};
