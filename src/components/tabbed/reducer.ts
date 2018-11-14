import { assocPath, cond, dissocPath, equals, T } from "ramda";

import {
  CHANGE_TAB_TO,
  CLOSE_ACTIVE_TAB,
  OPEN_TAB,
  TabAction
} from "./actions";

// Changes the active tab.
const changeTab = (state = {}, view: string, payload: string) =>
  assocPath([view, "activeTab"], payload, state);

// Closes an open tab from tabs.
const closeTab = (state = {}, view: string, payload: string) =>
  dissocPath([view, "tabs", payload], state);

const typeHandler = cond([
  [equals(OPEN_TAB), (type, state, view, payload) => assocPath([view, "tabs", payload.key], payload, state)] ,
  [equals(CHANGE_TAB_TO), (type, state, view, payload) => changeTab(state, view, payload)],
  [equals(CLOSE_ACTIVE_TAB), (type, state, view, payload) => closeTab(state, view, payload)],
  [T, (type, state, view, payload) => state],
]);

export default (
  state = {
    appliances: {activeTab: "appliances", tabs: {
      appliances: {label: "Appliances", sticky: true},
      newAppliance: {label: "", sticky: true},
    }},
    maintainers: {activeTab: "maintainers", tabs: {
      maintainers: {label: "Maintainers", sticky: true},
      new: {label: "", sticky: true},
    }},
  },
  { view, payload, type }: TabAction
) =>
  typeHandler(type, state, view, payload);
