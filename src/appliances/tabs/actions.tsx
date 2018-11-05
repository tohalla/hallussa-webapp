import {
  CHANGE_TAB_TO,
  CLOSE_ACTIVE_TAB,
  CREATE_NEW_TAB,
} from "./actionTypes";

export const addTab = () => ({
  // TODO: Fix payload
  type: CREATE_NEW_TAB,
});

export const closeTab = (identifier: number) => ({
  // TODO: Fix payload
  payload: {
    id: identifier,
  },
  type: CLOSE_ACTIVE_TAB,
});

export const changeTab = (identifier: number) => ({
  // TODO: Fix payload
  payload: {
    id: identifier,
  },
  type: CHANGE_TAB_TO,
});
