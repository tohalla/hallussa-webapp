import { AnyAction } from "redux";

export const CREATE_TAB = Symbol("CREATE_TAB");
export const CLOSE_ACTIVE_TAB = Symbol("CLOSE_ACTIVE_TAB");
export const CHANGE_TAB_TO = Symbol("CHANGE_TAB_TO");

export interface TabAction extends AnyAction {
  view: string;
}

export interface CreatePayload {
  activeTab: string;
  tabName: string;
}

export interface ChangePayload {
  nextTab: string;
}

export interface ClosePayload {
  targetTab: string;
}

export const openTab = (view: string, payload: CreatePayload) => ({
  payload,
  type: CREATE_TAB,
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
