import { assocPath, cond, dissocPath, equals, T } from "ramda";

import {
  CLOSE_TAB,
  CREATE_TAB,
  RESET_TABS,
  TabAction,
  TabPayload
} from "./actions";

interface View {
  tabs: {[key: string]: TabPayload};
}

export interface ViewsState {
  appliances: View;
  maintainers: View;
}

const initialState: ViewsState = {
  appliances: {tabs: {
    appliances: {key: "appliances", label: "Appliances", sticky: true, order: -1},
    new: {accent: true, key: "new", activeLabel: "New appliance", label: "add", sticky: true, order: 1},
  }},
  maintainers: {tabs: {
    maintainers: {key: "maintainers", label: "Maintainers", sticky: true, order: -1},
    new: {accent: true, key: "new", activeLabel: "New maintainer", label: "add", sticky: true, order: 1},
  }},
};

const typeHandler = cond([
  [equals(CREATE_TAB), (type, state, view, payload) =>
    assocPath([view, "tabs", payload.key], payload, state),
  ],
  [equals(CLOSE_TAB), (type, state, view, payload) =>
    dissocPath([view, "tabs", payload], state),
  ],
  [equals(RESET_TABS), (type, state) => initialState],
  [T, (type, state) => state],
]);

export default (
  state = initialState,
  { view, payload, type }: TabAction
) =>
  typeHandler(type, state, view, payload);
