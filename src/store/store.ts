import { applyMiddleware, compose, createStore } from "redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { AccountPayload, fetchAccount } from "../account/actions";
import { fetchRoles, UserRolePayload } from "../account/user-role/actions";
import { AppliancePayload } from "../appliance/actions";
import { ViewsState } from "../component/tabbed/reducer";
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
  userRoles: EntityGroup<UserRolePayload>;
}

export interface ReduxState {
  entities: EntitiesState;
  activeRequests: RequestsState;
  session: {
    activeAccount?: number;
    activeOrganisation?: number;
    activeUserRole?: number;
  };
  views: ViewsState;
}

const middleware = [thunk, api];

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
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

  store.dispatch(fetchRoles());

  const activeAccount = store.getState().session.activeAccount;
  if (!activeAccount) {
    return;
  }

  // read current account information from store
  const account = store.getState().entities.accounts[activeAccount] as AccountPayload;
  // default organisation will be the first one on account (consider being able to set default organisation)
  const sOrganisation = localStorage.getItem("organisation"); // read organisation from localstorage
  const organisation = sOrganisation ?
    (account.organisations.find((o) => o.organisation === Number(sOrganisation)) || account.organisations[0])
  : account.organisations[0]; // if not set in storage, use the first one
  if (typeof organisation === "undefined") { return; } // return if no organisations listed under account
  // set selected organisation as active
  return store.dispatch<any>(setActiveOrganisation(organisation.organisation));
};

export const mockStore = configureMockStore(middleware);

export default store;
