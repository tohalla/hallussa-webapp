import axios from "axios";
import i18n from "i18next";
import { AccountPayload } from "../account/actions";
import { apiURL } from "../config";

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
): Promise<string | boolean> =>
  axios(
    `${apiURL}/auth`,
    typeof credentials === "string" // attach authorization header if token provided as credentials
      ? { headers: { authorization: `Bearer ${credentials}` } }
      : {
        data: JSON.stringify(credentials),
        headers: {
          ["Accept-Language"]: i18n.language,
          ["Content-Type"]: "application/json",
        },
        method: "post",
      } // otherwise should use email and password
  ).then((response) => {
    const { token, expiresAt } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("expiresAt", expiresAt);
    window.clearTimeout(refreshTokenTimeout);
    // should attempt to refresh the token a minute before expiring
    refreshTokenTimeout = window.setTimeout(getAndCheckJWT, (Number(expiresAt) - 60) * 1000 - Date.now());
    return true;
  }).catch((error) => {
    if (error.response.status === 401 && typeof credentials === "string") {
      signOut(); // should logout if attempting to use invalid jwt for authentication
    }
    throw error.response.data;
  });

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
) =>
  // send request to create account
  axios.post(
    `${apiURL}/accounts`,
    JSON.stringify(account),
    {headers: {
      ["Accept-Language"]: i18n.language,
      ["Content-Type"]: "application/json",
    }}
  ).then((response) =>
    authenticateAfter && authenticate({email: account.email, password: account.password})
  ).catch((error) => {
    throw error.response.data;
  });
