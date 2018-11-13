import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import initialState from "./initialState";
import api from "./middleware/api";

import views from "../components/tabs/reducer";

export default createStore(
  combineReducers({
    views,
  }),
  initialState,
  applyMiddleware(thunk, api),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
