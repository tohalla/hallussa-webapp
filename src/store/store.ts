import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { fetchAccount } from "../account/actions";
import api from "./middleware/api";
import reducer from "./reducer";

const composeEnhancers =  process.env.NODE_ENV === "development"
  && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

export interface ReduxState {
  entities: {
    accounts?: {},
    organisations?: {}
  };
  session: {
    activeAccount?: number;
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
