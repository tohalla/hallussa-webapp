import { assocPath } from "ramda";
import { getAndCheckJWT } from "../auth/auth";

// helper for ramda cond and reducers
export const anyEquals = <T = any>(items: T[]) => (compare: T) =>
  items.indexOf(compare) !== -1;

// wrapper to inject authentication headers to fetch request
export const authenticatedFetch = async (input: RequestInfo, init?: RequestInit) => {
  const token = await getAndCheckJWT();
  return fetch(input, assocPath(["headers", "authorization"], `Bearer ${token}`, init));
};
