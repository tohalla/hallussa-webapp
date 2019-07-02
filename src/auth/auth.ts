import { AccountPayload } from "../account/actions";
import { apiUrl } from "../config";

let refreshTokenTimeout: number | undefined;

/**
 * fetches, saves and returns new JWT if current one expiring in 10*60*1000ms = 10 minutes,
 * otherwise just returns current token
 */
export const getAndCheckJWT = async (): Promise<string | null | void> => {
  const token = localStorage.getItem("token");
  if (token) {
    const expiresAt = localStorage.getItem("expiresAt");
    if (Number(expiresAt) - Date.now() / 1000 < 0) {
      // should remove token if its expired
      return signOut();
    } else if (Number(expiresAt) - Date.now() / 1000 < 10 * 60) {
      // should refresh token if it expires in next 10 minutes
      await authenticate(token);
    }
  }
  return token;
};

export const authenticate = async (
  credentials: string | { email: string; password: string }
): Promise<boolean> => {
  const response = await fetch(
    `${apiUrl}/auth`,
    typeof credentials === "string" // attach authorization header if token provided as credentials
      ? { headers: { authorization: `Bearer ${credentials}` } }
      : {
        body: JSON.stringify(credentials),
        headers: { ["Content-Type"]: "application/json" },
        method: "post",
      } // otherwise should use email and password
  );
  if (response.ok) {
    const { token, expiresAt } = await response.json();
    localStorage.setItem("token", token);
    localStorage.setItem("expiresAt", expiresAt);
    window.clearTimeout(refreshTokenTimeout);
    // should attempt to refresh the token a minute before expiring
    refreshTokenTimeout = window.setTimeout(getAndCheckJWT, (Number(expiresAt) - 60) * 1000 - Date.now());
    return true;
  }
  if (response.status === 401) {
    if (typeof credentials === "string") {
      signOut(); // should logout if attempting to use invalid jwt for authentication
    }
  }
  throw await response.text();
};

export const signOut = () => {
  window.clearTimeout(refreshTokenTimeout);
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");

  location.href = `${location.protocol}//${location.host}${location.pathname}`;
};

export const register = async (
  account: Pick<AccountPayload, Exclude<keyof AccountPayload, "id" | "organisations">>
    & {retypePassword: string, password: string},
  authenticateAfter = true
) => {
  const response = await fetch(// send request to create account
    `${apiUrl}/accounts`,
    {
      body: JSON.stringify(account),
      headers: { ["Content-Type"]: "application/json" },
      method: "post",
    }
  );
  if (authenticateAfter && response.ok) {
    return authenticate({email: account.email, password: account.password});
  } else {
    throw await response.text();
  }
};
