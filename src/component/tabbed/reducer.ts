import { assocPath, dissocPath } from "ramda";

import {
  CLOSE_TAB,
  CREATE_TAB,
  RESET_TABS,
  TabAction,
  TabPayload
} from "./actions";

export interface TabbedView {
  tabs: {[key: string]: TabPayload};
}

export interface ViewsState {
  appliances: TabbedView;
  maintainers: TabbedView;
  organisations: TabbedView;
  profile: TabbedView;
}

const initialState: ViewsState = {
  appliances: {tabs: {
    appliances: {key: "appliances", label: ({t}) => t("tab.appliance.appliances"), sticky: true, order: -1},
    new: {
      accent: true,
      activeLabel: ({t}) => t("tab.appliance.new"),
      key: "new",
      label: "add",
      order: 1,
      requirements: {userRole: {allowCreateAppliance: true}},
      sticky: true,
    },
  }},
  maintainers: {tabs: {
    maintainers: {key: "maintainers", label: ({t}) => t("tab.maintainer.maintainers"), sticky: true, order: -1},
    new: {
      accent: true,
      activeLabel: ({t}) => t("tab.maintainer.new"),
      key: "new",
      label: "add",
      order: 1,
      requirements: {userRole: {allowCreateMaintainer: true}},
      sticky: true,
    },
  }},
  organisations: {tabs: {
    details: {key: "organisations", label: ({t}) => t("tab.organisation.details"), sticky: true, order: 0},
    preferences: {
      key: "preferences",
      label: ({t}) => t("tab.organisation.preferences"),
      order: 2,
      requirements: {userRole: {allowUpdateOrganisation: true}},
      sticky: true,
    },
    users: {key: "users", label: ({t}) => t("tab.organisation.users"), sticky: true, order: 1},
  }},
  profile: {tabs: {
    account: {key: "account", label: ({t}) => t("tab.profile.account"), sticky: true, order: 1},
    preferences: {key: "preferences", label: ({t}) => t("tab.profile.preferences"), sticky: true, order: 3},
    security: {key: "security", label: ({t}) => t("tab.profile.security"), sticky: true, order: 2},
  }},
};

const entityHandlers: {[k: string]: (state: ViewsState, action: TabAction) => ViewsState} = {
  [CREATE_TAB]: (state, {view, payload}) => assocPath([view, "tabs", payload.key], payload, state),
  [CLOSE_TAB]: (state, {view, payload}) => dissocPath([view, "tabs", payload.key], state),
  [RESET_TABS]: () => initialState,
};

export default (state = initialState, action: TabAction) =>
  action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;
