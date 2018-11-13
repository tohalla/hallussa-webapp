import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import initialState from "./initialState";
import api from "./middleware/api";

import views from "../components/tabs/reducer";

const getStoreEnhancers = () => {
  const args = [applyMiddleware(thunk, api)];
  if (process.env.NODE_ENV === "development") {
    args.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  return compose(...args);
}

export default createStore(
  combineReducers({
    views,
  }),
  initialState,
  getStoreEnhancers()
);
