import {
  CHANGE_TAB_TO,
  CLOSE_ACTIVE_TAB,
  CREATE_TAB,
} from "./actionTypes";

import {
  ChangePayload,
  ClosePayload,
  CreatePayload,
} from "./reducer";

export const addTab = (view: string, payload: CreatePayload) => ({
  payload,
  type: CREATE_TAB,
  view,
});

export const closeTab = (view: string, payload: ClosePayload) => ({
  payload,
  type: CLOSE_ACTIVE_TAB,
  view,
});

export const changeTab = (view: string, payload: ChangePayload) => ({
  payload,
  type: CHANGE_TAB_TO,
  view,
});
