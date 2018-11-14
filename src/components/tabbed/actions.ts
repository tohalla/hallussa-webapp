import { AnyAction } from "redux";

export const OPEN_TAB = "OPEN_TAB";
export const CLOSE_TAB = "CLOSE_TAB";
export const CHANGE_TAB = "CHANGE_TAB";

export interface TabAction extends AnyAction {
  view: string;
}

export interface TabPayload {
  key: string;
  label: string;
  path?: string;
  sticky?: boolean;
}

export const openTab = (view: string, payload: TabPayload) => ({
  payload,
  type: OPEN_TAB,
  view,
});

export const closeTab = (view: string, payload: string) => ({
  payload,
  type: CLOSE_TAB,
  view,
});

export const changeTab = (view: string, payload: string) => ({
  payload,
  type: CHANGE_TAB,
  view,
});
