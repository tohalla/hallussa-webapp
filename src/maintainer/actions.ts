import { find } from "ramda";
import { Dispatch } from "redux";
import { APIResponseAction, CALL_API } from "../store/middleware/api/actions";
import { ReduxAPICall } from "../store/middleware/api/api";

export const FETCH_MAINTAINERS_SUCCESS = "FETCH_MAINTAINERS_SUCCESS";
export const CREATE_MAINTAINER_SUCCESS = "CREATE_MAINTAINER_SUCCESS";
export const UPDATE_MAINTAINER_SUCCESS = "UPDATE_MAINTAINER_SUCCESS";
export const DELETE_MAINTAINER_SUCCESS = "DELETE_MAINTAINER_SUCCESS";

export interface MaintainerPayload {
  appliances: ReadonlyArray<number>;
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  organisation: number;
  phone: string;
  updatedAt: string;
}

export interface MaintainerAction {
  type: string;
  payload: MaintainerPayload;
  extra?: object;
}

export const fetchMaintainers = (organisation: number, {bypassCache = false} = {}): ReduxAPICall => ({
  attemptToFetchFromStore: bypassCache ? undefined : (state) =>
    state.entities.maintainers && !Boolean(find(// check if store contains all maintainers defined in organisation
      (maintainer) => typeof state.entities.maintainers[maintainer] === "undefined",
      state.entities.organisations[organisation].maintainers
    )),
  endpoint: `/organisations/${organisation}/maintainers`,
  method: "get",
  parameters: {eager: "appliances"},
  successType: FETCH_MAINTAINERS_SUCCESS,
  type: CALL_API,
});

export const createMaintainer = (organisation: number, maintainer: MaintainerPayload) => async (dispatch: Dispatch) => {
  const response = await dispatch<APIResponseAction<MaintainerPayload>>({
    body: maintainer,
    endpoint: `/organisations/${organisation}/maintainers`,
    method: "post",
    successType: CREATE_MAINTAINER_SUCCESS,
    type: CALL_API,
  });
  return response.payload as MaintainerPayload;
};

export const updateMaintainer = (maintainer: MaintainerPayload) => async (dispatch: Dispatch) => {
  const response = await dispatch<APIResponseAction<MaintainerPayload>>({
    body: maintainer,
    endpoint: `/organisations/${maintainer.organisation}/maintainers/${maintainer.id}`,
    method: "patch",
    successType: UPDATE_MAINTAINER_SUCCESS,
    type: CALL_API,
  });
  return response.payload as MaintainerPayload;
};

export const deleteMaintainer = (maintainer: MaintainerPayload) => ({
  body: maintainer,
  endpoint: `/organisations/${maintainer.organisation}/maintainers/${maintainer.id}`,
  extra: maintainer,
  method: "delete",
  successType: DELETE_MAINTAINER_SUCCESS,
  type: CALL_API,
});
