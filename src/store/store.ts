import { AnyAction, applyMiddleware, compose, createStore, Dispatch } from "redux";
import thunk from "redux-thunk";

import { fetchAccount } from "../account/actions";
import views from "../components/tabs/reducer";
import api from "./middleware/api";
import reducers from "./reducer";

const getStoreEnhancers = () => {
  const enhancers = [applyMiddleware(thunk, api)];
  if (
    process.env.NODE_ENV === "development" &&
    typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ === "function"
  ) {
    enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
  }
  return enhancers;
};

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
  compose(...getStoreEnhancers())
);

store.dispatch<any>(fetchAccount());

if (module.hot) {
  module.hot.accept("../reducers", () => store.replaceReducer(reducers));
}

export default store;
