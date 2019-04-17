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
    appliances: {key: "appliances", label: ({t}) => t("tab.appliance.appliances"), sticky: true, order: -1},
    new: {accent: true, key: "new", activeLabel: ({t}) => t("tab.appliance.new"), label: "add", sticky: true, order: 1},
  }},
  maintainers: {tabs: {
    maintainers: {key: "maintainers", label: ({t}) => t("tab.maintainer.maintainers"), sticky: true, order: -1},
    new: {
      accent: true,
      activeLabel: ({t}) => t("tab.maintainer.new"),
      key: "new",
      label: "add",
      order: 1,
      sticky: true,
    },
  }},
};

const typeHandler = cond<any, any>([
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
