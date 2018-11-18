import { AccountPayload } from "../account/actions";
import { apiUrl, baseUrl } from "../config";

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
    } else if (Number(expiresAt) - Date.now() / 1000 < 10 * 60 * 1000) {
      // should refresh token if it expires in next 10 minutes
      await authenticate(token);
    }
  }
  return token;
};

export const authenticate = async (
  credentials: string | { email: string; password: string }
): Promise<boolean> => {
  try {
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
    const { token, expiresAt } = await response.json();
    localStorage.setItem("token", token);
    localStorage.setItem("expiresAt", expiresAt);
    return true;
  } catch (e) {
    signOut();
    return false;
  }
};

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");

  window.location.href = baseUrl;
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
  }
};
