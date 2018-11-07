import { combineReducers, createStore } from "redux";

import applianceTabs from "./appliances/tabs/reducer";

// Temporary static redux state.
// TODO: Move to somewhere smart.
export const initialState = {
  organisation: {
    appliances: [],
    id: 1,
    maintainer: [],
  },
  user: {
    email: "petri.vuorimaa@aalto.fi",
    first: "Petri",
    last: "Vuorimaa",
    organisations: [
      {
        id: 1,
        roles: ["user", "admin"],
      },
    ],
  },
  views: {
    appliance: {
      activeTab: "listing",
      tabs: {
        listing: {
          activeDrawer: "summary",
          content: "<ApplianceListing drawer={activeDrawer} applianceID={appliance} />",
          label: "Appliance list",
          onClose: () => true,
          sticky: true,
        },
        "1": { // Appliance id
          activeDrawer: "summary",
          content: "<Appliance id={id} />",
          label: "My first appliance",
          onClose: () => true,
        },
        new_appliance: {
          activeDrawer: "summary",
          content: "<NewAppliance />",
          label: "New appliance",
          onClose: () => false,
          sticky: true,
        },
      },
    },
    maintainer: {
      tabs: {
        listing: "ReactComponent",
      },
    },
  },
};

export default createStore(
  combineReducers({
    views: combineReducers({
      appliance: combineReducers({
        tabs: applianceTabs,
      }),
    }),
  }),
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
