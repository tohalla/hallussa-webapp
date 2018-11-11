import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import account from "../account/reducer";
import api from "./middleware/api";

export default createStore(
  combineReducers({
    account,
  }),
  applyMiddleware(thunk, api)
);
