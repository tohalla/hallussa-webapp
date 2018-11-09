import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import initialState from "./initialState";
import api from "./middleware/api";

import appliances from "../appliances/tabs/reducer";

export default createStore(
  combineReducers({
    views: combineReducers({
      appliances,
    }),
  }),
  initialState,
  applyMiddleware(thunk, api)
);
