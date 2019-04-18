import { AnyAction } from "redux";
import { TranslationProps } from "../../../misc";

export const CREATE_TAB = "CREATE_TAB";
export const CLOSE_TAB = "CLOSE_TAB";
export const RESET_TABS = "RESET_TABS";

export interface TabAction extends AnyAction {
  view: string;
}

type labelType = ((p: TranslationProps) => string) | string;

export interface TabPayload {
  key: string;
  label: labelType;
  activeLabel?: labelType;
  accent?: boolean;
  sticky?: boolean;
  order?: number;
  createdAt?: number;
}

export const createTab = (view: string, payload: TabPayload) => ({
  payload: {...payload, createdAt: Date.now()},
  type: CREATE_TAB,
  view,
});

export const closeTab = (view: string, payload: string) => ({
  payload,
  type: CLOSE_TAB,
  view,
});

export const resetTabs = { type: RESET_TABS };