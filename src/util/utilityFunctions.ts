import axios, { AxiosRequestConfig } from "axios";
import i18n from "i18next";
import { lensProp, merge, over } from "ramda";

import { getAndCheckJWT } from "../auth/auth";

export const headersLens = lensProp("headers");

// wrapper to inject authentication headers to fetch request
export const authenticatedFetch = async (url: string, config?: AxiosRequestConfig) => {
  const token = await getAndCheckJWT();
  return axios(url, over(
    headersLens,
    merge({
      authorization: `Bearer ${token}`,
      ["Accept-Language"]: i18n.language,
    }),
    config
   ));
};

export const anyPropEquals = (o1: {[key: string]: any}, o2: {[key: string]: any}) => {
  for (const key in o1) {
    if (o1[key] === o2[key]) {
      return true;
    }
  }
  return false;
};
