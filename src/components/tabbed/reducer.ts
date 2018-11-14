import { assocPath, cond, dissocPath, equals, T } from "ramda";

import {
  CLOSE_TAB,
  CREATE_TAB,
  TabAction
} from "./actions";

// Closes an open tab from tabs.
const closeTab = (state = {}, view: string, payload: string) =>
  dissocPath([view, "tabs", payload], state);

const typeHandler = cond([
  [equals(CREATE_TAB), (type, state, view, payload) => assocPath([view, "tabs", payload.key], payload, state)] ,
  [equals(CLOSE_TAB), (type, state, view, payload) => closeTab(state, view, payload)],
  [T, (type, state, view, payload) => state],
]);

export default (
  state = {
    appliances: {tabs: {
      appliances: {key: "appliances", label: "Appliances", sticky: true},
      newAppliance: {key: "newAppliance", label: "", sticky: true},
    }},
    maintainers: {tabs: {
      maintainers: {key: "maintainers", label: "Maintainers", sticky: true},
      newMaintainer: {key: "newMaintainer", label: "", sticky: true},
    }},
  },
  { view, payload, type }: TabAction
) =>
  typeHandler(type, state, view, payload);
