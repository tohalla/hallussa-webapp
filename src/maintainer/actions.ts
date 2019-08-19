import { Dispatch } from "redux";
import { CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";

export const FETCH_MAINTAINERS_SUCCESS = "FETCH_MAINTAINERS_SUCCESS";
export const CREATE_MAINTAINER_SUCCESS = "CREATE_MAINTAINER_SUCCESS";
export const UPDATE_MAINTAINER_SUCCESS = "UPDATE_MAINTAINER_SUCCESS";
export const DELETE_MAINTAINER_SUCCESS = "DELETE_MAINTAINER_SUCCESS";

export interface MaintainerPayload {
  appliances: ReadonlyArray<number>;
  maintenanceTasks?: ReadonlyArray<number>;
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  language?: string;
  lastName: string;
  organisation: number;
  phone: string;
  updatedAt: string;
}

export interface MaintainerAction {
  type: string;
  payload: MaintainerPayload;
}

export const fetchMaintainers = (organisation: number, {bypassCache = false} = {}): ReduxAPICall => ({
  endpoint: `/organisations/${organisation}/maintainers`,
  method: "get",
  parameters: {eager: "appliances"},
  successType: FETCH_MAINTAINERS_SUCCESS,
  type: CALL_API,
});

export const createMaintainer = (
  organisation: number,
  maintainer: MaintainerPayload
) => (dispatch: Dispatch<ReduxAPICall>) => dispatch({
  data: maintainer,
  endpoint: `/organisations/${organisation}/maintainers`,
  method: "post",
  successType: CREATE_MAINTAINER_SUCCESS,
  type: CALL_API,
});

export const updateMaintainer = (maintainer: MaintainerPayload) => (dispatch: Dispatch<ReduxAPICall>) => dispatch({
  data: maintainer,
  endpoint: `/organisations/${maintainer.organisation}/maintainers/${maintainer.id}`,
  method: "patch",
  successType: UPDATE_MAINTAINER_SUCCESS,
  type: CALL_API,
});

export const deleteMaintainer = (maintainer: MaintainerPayload): ReduxAPICall => ({
  additionalPayload: maintainer,
  data: maintainer,
  endpoint: `/organisations/${maintainer.organisation}/maintainers/${maintainer.id}`,
  method: "delete",
  successType: DELETE_MAINTAINER_SUCCESS,
  type: CALL_API,
});
