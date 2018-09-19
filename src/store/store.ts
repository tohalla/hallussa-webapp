import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import api from "./middleware/api";

export default createStore(
  combineReducers({}),
  applyMiddleware(thunk, api)
);
