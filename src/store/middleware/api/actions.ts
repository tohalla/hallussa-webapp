import { AnyAction } from "redux";
import { APIMethods } from "./api";

export const CALL_API = "CALL_API";
export const CALL_API_SUCCESS = "CALL_API_SUCCESS";
export const CALL_API_FAILURE = "CALL_API_FAILURE";

export interface APIResponsePayload {
  requestedAt: number;
  isFetching: boolean;
}

export interface APIResponseAction extends AnyAction {
  endpoint: string;
  payload?: Partial<APIResponsePayload>;
  method: APIMethods;
}
