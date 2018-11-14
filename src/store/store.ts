import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { AccountPayload, fetchAccount } from "../account/actions";
import { AppliancePayload } from "../appliance/actions";
import { MaintainerPayload } from "../maintainer/actions";
import { OrganisationPayload } from "../organisation/actions";
import api from "./middleware/api";
import reducer, { EntityGroup } from "./reducer";

const composeEnhancers =  process.env.NODE_ENV === "development"
  && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

export interface ReduxState {
  entities: {
    accounts?: EntityGroup<AccountPayload>,
    appliances?: EntityGroup<AppliancePayload>,
    maintainers?: EntityGroup<MaintainerPayload>,
    organisations?: EntityGroup<OrganisationPayload>
  };
  session: {
    activeAccount?: number;
    activeOrganisation?: number;
    isAdmin?: boolean;
  };
  views: {
    appliances: {
      tabs: {}
    },
    maintainers: {
      tabs: {}
    }
  };
}

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, api))
);

store.dispatch<any>(fetchAccount());

if (module.hot) {
  module.hot.accept("../reducers", () => store.replaceReducer(reducer));
}

export default store;
