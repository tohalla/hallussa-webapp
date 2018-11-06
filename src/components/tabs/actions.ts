import {
  CHANGE_TAB_TO,
  CLOSE_ACTIVE_TAB,
  CREATE_NEW_TAB,
} from "./actionTypes";

import {
  ChangePayload,
  ClosePayload,
  CreatePayload,
} from "./reducers";

export const addTab = (payload: CreatePayload, path: string) => ({
  path,
  payload,
  type: CREATE_NEW_TAB,
});

export const closeTab = (payload: ClosePayload, path: string) => ({
  path,
  payload,
  type: CLOSE_ACTIVE_TAB,
});

export const changeTab = (payload: ChangePayload, path: string) => ({
  path,
  payload,
  type: CHANGE_TAB_TO,
});
