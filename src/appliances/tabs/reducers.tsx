import { assoc, compose, cond, dissoc, equals, evolve, T } from "ramda";
import { AnyAction } from "redux";

import { initialState } from "../../store";

import {
  CHANGE_TAB_TO,
  CLOSE_ACTIVE_TAB,
  CREATE_NEW_TAB,
} from "./actionTypes";

interface CreateAction extends AnyAction {
  payload: {
    activeTab: string;
    createContent: any;
    createDrawer: any;
    createLabel: any;
  };
}

interface ChangeAction extends AnyAction {
  payload: {
    nextTab: string;
    activeTab: string;
  };
}

interface CloseAction extends AnyAction {
  payload: {
    targetTab: string;
  };
}

interface TabAction extends AnyAction {
  payload: any;
}

interface TabState {
  [key: string]: any;
}

const createTab = (state: TabState = [], action: CreateAction) => {
  const {
    createContent,
    createDrawer,
    createLabel,
  } = action.payload;
  return assoc("new_tab", {
    activeDrawer: createDrawer,
    content: createContent,
    isActive: false,
    label: createLabel,
  }, state);
};

const changeTab = (state: TabState = [], action: ChangeAction) => evolve({
  [action.payload.nextTab]: evolve({
    isActive: () => true,
  }, state[action.payload.nextTab]),
  [action.payload.activeTab]: evolve({
    isActive: () => false,
  }, state[action.payload.activeTab]),
}, state);

const closeTab = (state: TabState = [], action: CloseAction) =>
  dissoc(`${action.payload.targetTab}`, state);

const typeHandler = cond([
  [equals(CREATE_NEW_TAB), (type, state, payload) => createTab(state, payload)],
  [equals(CHANGE_TAB_TO), (type, state, payload) => changeTab(state, payload)],
  [equals(CLOSE_ACTIVE_TAB), (type, state, payload) => closeTab(state, payload)],
  [T, (type, state, payload) => state],
]);

const reducer = (state = initialState, { type, payload }: TabAction) =>
  typeHandler(type, state, payload);

export default reducer;
