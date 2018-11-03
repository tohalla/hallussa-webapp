import { combineReducers, createStore } from "redux";

// Temporary static redux state.
const initialState = {
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
      }
    ]
  },
  views: {
    appliance: {
      tabs: {
        listing: {
          activeDrawer: "summary",
          content: "<ApplianceListing drawer={activeDrawer} applianceID={appliance} />",
          label: "Appliance list",
        },
        1: { // Appliance id
          activeDrawer: "summary",
          content: "<Appliance id={id} />",
          label: "My first appliance",
        }
      },
    },
    maintainer: {
      tabs: {
        listing: "ReactComponent",
      }
    }
  },
};

export default createStore(
  combineReducers({}),
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
