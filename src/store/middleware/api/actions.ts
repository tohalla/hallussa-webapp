import { AnyAction } from "redux";
import { APIMethods } from "./api";

export const CALL_API = "CALL_API";
export const CALL_API_SUCCESS = "CALL_API_SUCCESS";
export const CALL_API_FAILURE = "CALL_API_FAILURE";

export interface RequestPayload {
  requestedAt: number;
  isFetching: boolean;
}

export interface RequestAction extends AnyAction {
  endpoint: string;
  payload?: Partial<RequestPayload>;
  method: APIMethods;
}
