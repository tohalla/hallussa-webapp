import { assoc, assocPath, cond, dissocPath, equals, last, omit, T } from "ramda";
import { AnyAction } from "redux";

import {
  CHANGE_TAB_TO,
  CLOSE_ACTIVE_TAB,
  CREATE_TAB,
} from "./actionTypes";

export interface TabAction extends AnyAction {
  view: string;
}

export interface CreatePayload {
  activeTab: string;
  tabName: string;
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
 * Create an editable tab and change to it.
 *
 * NOTE: Ramda assoc returns the a state with new tab and
 * this state is passed onwards as the state to changeTab.
 */
const createTab = (state: object, view: string, payload: CreatePayload) =>
  changeTab(
    assocPath(
      [view, "tabs", payload.tabName],
      state
    ),
    view,
    payload.tabName
  );

/**
 * Changes the active tab.
 */
const changeTab = (state: TabState = {}, view: string, payload: string) =>
  assocPath([view, "activeTab"], payload, state);

/**
 * Closes an open tab from tabs.
 */
const closeTab = (state: TabState = {}, view: string, payload: string) =>
  dissocPath([view, "tabs", payload], state);

const typeHandler = cond([
  [equals(CREATE_TAB), (type, state, view, payload) => createTab(state, view, payload)],
  [equals(CHANGE_TAB_TO), (type, state, view, payload) => changeTab(state, view, payload)],
  [equals(CLOSE_ACTIVE_TAB), (type, state, view, payload) => closeTab(state, view, payload)],
  [T, (type, state, view, payload) => state],
]);

export default (state = {}, { view, payload, type }: TabAction) =>
  typeHandler(type, state, view, payload);
