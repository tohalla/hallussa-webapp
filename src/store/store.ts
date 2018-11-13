import { AnyAction, applyMiddleware, createStore, Dispatch } from "redux";
import thunk from "redux-thunk";

import { fetchAccount } from "../account/actions";
import api from "./middleware/api";
import reducers from "./reducer";

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
  reducers,
  applyMiddleware(thunk, api)
);

store.dispatch<any>(fetchAccount());

if (module.hot) {
  module.hot.accept("../reducers", () => store.replaceReducer(reducers));
}

export default store;
