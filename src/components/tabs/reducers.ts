import { assoc, cond, dissoc, equals, mergeDeepRight, omit, T } from "ramda";
import { AnyAction } from "redux";

import { initialState } from "../../store";

import {
  CHANGE_TAB_TO,
  CLOSE_ACTIVE_TAB,
  CREATE_NEW_TAB,
} from "./actionTypes";

export interface TabAction extends AnyAction {
  path: string;
}

export interface CreatePayload {
  activeTab: string;
  createContent: any;
  createDrawer: any;
  createLabel: any;
}

interface CreateAction extends TabAction {
  payload: CreatePayload;
}

export interface ChangePayload {
  nextTab: string;
}

interface ChangeAction extends TabAction {
  payload: ChangePayload;
}

export interface ClosePayload {
  targetTab: string;
}

interface CloseAction extends TabAction {
  payload: ClosePayload;
}

interface TabState {
  [key: string]: any;
}

/**
 * Create new tab and change to it.
 *
 * NOTE: Ramda assoc returns the a state with new tab and
 * this state is passed onwards as the state to changeTab.
 */
const createTab = (state: object, payload: CreatePayload) =>
  changeTab(
    assoc("new_tab", {
      ...omit(["activeTab"], payload),
      sticky: true,
    }, state),
    {
      nextTab: "new_tab",
    }
  );

/**
 * Changes the active tab.
 */
const changeTab = (state: TabState = {}, payload: ChangePayload) =>
  assoc("activeTab", payload.nextTab, state);
/**
 * Closes an open tab from tabs.
 */
const closeTab = (state: TabState = {}, payload: ClosePayload) =>
  dissoc(`${payload.targetTab}`, state);

const typeHandler = cond([
  [equals(CREATE_NEW_TAB), (type, state, payload) => createTab(state, payload)],
  [equals(CHANGE_TAB_TO), (type, state, payload) => changeTab(state, payload)],
  [equals(CLOSE_ACTIVE_TAB), (type, state, payload) => closeTab(state, payload)],
  [T, (type, state, payload) => state],
]);

const reducer = (path: string[], state: object, {payload, type}: TabAction) =>
  typeHandler(type, state, payload);

export default reducer;
