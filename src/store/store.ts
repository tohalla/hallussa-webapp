import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { AccountPayload, fetchAccount } from "../account/actions";
import { AppliancePayload } from "../appliance/actions";
import { MaintainerPayload } from "../maintainer/actions";
import { fetchOrganisations, OrganisationPayload, setActiveOrganisation } from "../organisation/actions";
import api from "./middleware/api/api";
import { RequestsState } from "./middleware/api/reducer";
import reducer, { EntityGroup } from "./reducer";

const composeEnhancers =  process.env.NODE_ENV === "development"
  && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

export interface EntitiesState {
  accounts: EntityGroup<AccountPayload>;
  appliances: EntityGroup<AppliancePayload>;
  maintainers: EntityGroup<MaintainerPayload>;
  organisations: EntityGroup<OrganisationPayload>;
}

export interface ReduxState {
  entities: EntitiesState;
  activeRequests: RequestsState;
  session: {
    activeAccount?: number;
    activeOrganisation?: number;
  };
  views: {
    appliances: { tabs: {} },
    maintainers: { tabs: {} }
  };
}

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, api))
);

if (module.hot) {
  module.hot.accept("../reducers", () => store.replaceReducer(reducer));
}

// fetch initial state to store using API
export const initializeStore = async () => {
  await Promise.all([
    store.dispatch<any>(fetchAccount()), // fetch current account information
    store.dispatch(fetchOrganisations()), // fetch organisations for current account
  ]);

  // read current account information from store
  const account = store.getState().entities.accounts[store.getState().session.activeAccount] as AccountPayload;
  // default organisation will be the first one on account (consider being able to set default organisation)
  const organisation = account.organisations[0];
  if (typeof organisation === "undefined") { return; } // return if no organisations listed under account
  // set selected organisation as active
  return store.dispatch<any>(setActiveOrganisation(organisation.id));
};

export default store;
