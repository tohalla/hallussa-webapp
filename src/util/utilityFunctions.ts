import { assocPath } from "ramda";
import { getAndCheckJWT } from "../auth/auth";

// wrapper to inject authentication headers to fetch request
export const authenticatedFetch = async (input: RequestInfo, init?: RequestInit) => {
  const token = await getAndCheckJWT();
  return fetch(input, assocPath(["headers", "authorization"], `Bearer ${token}`, init));
};

export const anyPropEquals = (o1: {[key: string]: any}, o2: {[key: string]: any}) => {
  for (const key in o1) {
    if (o1[key] === o2[key]) {
      return true;
    }
  }
  return false;
};
