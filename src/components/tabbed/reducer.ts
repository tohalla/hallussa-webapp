import { assocPath, cond, dissocPath, equals, T } from "ramda";

import {
  CLOSE_TAB,
  CREATE_TAB,
  TabAction,
  TabPayload
} from "./actions";

const typeHandler = cond([
  [equals(CREATE_TAB), (type, state, view, payload) =>
    assocPath([view, "tabs", payload.key], payload, state),
  ],
  [equals(CLOSE_TAB), (type, state, view, payload) =>
    dissocPath([view, "tabs", payload], state),
  ],
  [T, (type, state, view, payload) => state],
]);

interface View {
  tabs: {[key: string]: TabPayload};
}

export interface ViewsState {
  appliances: View;
  maintainers: View;
}

const initialState: ViewsState = {
  appliances: {tabs: {
    appliances: {key: "appliances", label: "Appliances", sticky: true},
    new: {key: "new", label: "New appliance", sticky: true},
  }},
  maintainers: {tabs: {
    maintainers: {key: "maintainers", label: "Maintainers", sticky: true},
    new: {key: "new", label: "New maintainer", sticky: true},
  }},
};

export default (
  state = initialState,
  { view, payload, type }: TabAction
) =>
  typeHandler(type, state, view, payload);
