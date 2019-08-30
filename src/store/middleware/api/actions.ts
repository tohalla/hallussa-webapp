import { Method } from "axios";
import { AnyAction } from "redux";

import { Omit } from "../../../../misc";
import { ReduxAPICall } from "./api";

export const CALL_API = "CALL_API";
export const CALL_API_SUCCESS = "CALL_API_SUCCESS";
export const CALL_API_FAILURE = "CALL_API_FAILURE";

export interface APIResponsePayload {
  requestedAt: number;
  isFetching: boolean;
  error?: string;
}

export interface APIResponseAction<T = any> extends AnyAction {
  endpoint: string;
  payload?: Partial<APIResponsePayload> | T;
  method: Method;
}

export const callAPI = (args: Omit<ReduxAPICall, "type">) => ({
  ...args,
  type: CALL_API,
});
