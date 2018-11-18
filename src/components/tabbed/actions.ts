import { AnyAction } from "redux";

export const CREATE_TAB = "CREATE_TAB";
export const CLOSE_TAB = "CLOSE_TAB";

export interface TabAction extends AnyAction {
  view: string;
}

export interface TabPayload {
  key: string;
  label: string;
  activeLabel?: string;
  accent?: boolean;
  sticky?: boolean;
}

export const createTab = (view: string, payload: TabPayload) => ({
  payload,
  type: CREATE_TAB,
  view,
});

export const closeTab = (view: string, payload: string) => ({
  payload,
  type: CLOSE_TAB,
  view,
});
