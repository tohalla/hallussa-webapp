import { assocPath, cond, dissocPath, equals, T } from "ramda";

import {
  CHANGE_TAB_TO,
  CLOSE_ACTIVE_TAB,
  CREATE_TAB,
  CreatePayload,
  TabAction
} from "./actions";

/**
 * Create an editable tab and change to it.
 *
 * NOTE: Ramda assoc returns the a state with new tab and
 * this state is passed onwards as the state to changeTab.
 */
const createTab = (state: object, view: string, payload: CreatePayload) =>
  changeTab(
    assocPath([view, "tabs", payload.tabName], state),
    view,
    payload.tabName
  );

/**
 * Changes the active tab.
 */
const changeTab = (state = {}, view: string, payload: string) =>
  assocPath([view, "activeTab"], payload, state);

/**
 * Closes an open tab from tabs.
 */
const closeTab = (state = {}, view: string, payload: string) =>
  dissocPath([view, "tabs", payload], state);

const typeHandler = cond([
  [equals<symbol>(CREATE_TAB), (type, state, view, payload) => createTab(state, view, payload)],
  [equals<symbol>(CHANGE_TAB_TO), (type, state, view, payload) => changeTab(state, view, payload)],
  [equals<symbol>(CLOSE_ACTIVE_TAB), (type, state, view, payload) => closeTab(state, view, payload)],
  [T, (type, state, view, payload) => state],
]);

export default (
  state = {
    appliances: {activeTab: undefined, tabs: []},
    maintainers: {activeTab: undefined, tabs: []},
  },
  { view, payload, type }: TabAction
) =>
  typeHandler(type, state, view, payload);
