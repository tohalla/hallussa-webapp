import { AnyAction } from "redux";

export const CREATE_TAB = "CREATE_TAB";
export const CLOSE_TAB = "CLOSE_TAB";
export const CHANGE_TAB = "CHANGE_TAB";

export interface TabAction extends AnyAction {
  view: string;
}

export interface TabPayload {
  key: string | number;
  label: string;
  path?: string;
  sticky?: boolean;
}

export const createTab = (view: string, payload: TabPayload) => ({
  payload,
  type: CREATE_TAB,
  view,
});

export const closeTab = (view: string, payload: string | number) => ({
  payload,
  type: CLOSE_TAB,
  view,
});

export const changeTab = (view: string, payload: string | number) => ({
  payload,
  type: CHANGE_TAB,
  view,
});
