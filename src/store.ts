import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

export default createStore(
  combineReducers({}),
  applyMiddleware(thunk)
);
