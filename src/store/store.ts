import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import api from "./middleware/api";
import reducers from "./reducers";

const store = createStore(
  reducers,
  applyMiddleware(thunk, api)
);

if (module.hot) {
  module.hot.accept("../reducers", () => store.replaceReducer(reducers));
}

export default store;
