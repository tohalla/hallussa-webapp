import axios, { AxiosRequestConfig } from "axios";
import { assocPath } from "ramda";

import { getAndCheckJWT } from "../auth/auth";

// wrapper to inject authentication headers to fetch request
export const authenticatedFetch = async (url: string, config?: AxiosRequestConfig) => {
  const token = await getAndCheckJWT();
  return axios(url, assocPath(["headers", "authorization"], `Bearer ${token}`, config));
};

export const anyPropEquals = (o1: {[key: string]: any}, o2: {[key: string]: any}) => {
  for (const key in o1) {
    if (o1[key] === o2[key]) {
      return true;
    }
  }
  return false;
};
