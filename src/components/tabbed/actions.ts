import { AnyAction } from "redux";

export const OPEN_TAB = "OPEN_TAB";
export const CLOSE_ACTIVE_TAB = "CLOSE_ACTIVE_TAB";
export const CHANGE_TAB_TO = "CHANGE_TAB_TO";

export interface TabAction extends AnyAction {
  view: string;
}

export interface TabPayload {
  key: string;
  label: string;
  path?: string;
  sticky?: boolean;
}

export interface ChangePayload {
  nextTab: string;
}

export interface ClosePayload {
  targetTab: string;
}

export const openTab = (view: string, payload: TabPayload) => ({
  payload,
  type: OPEN_TAB,
  view,
});

export const closeTab = (view: string, payload: ClosePayload) => ({
  payload,
  type: CLOSE_ACTIVE_TAB,
  view,
});

export const changeTab = (view: string, payload: ChangePayload) => ({
  payload,
  type: CHANGE_TAB_TO,
  view,
});
