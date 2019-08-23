import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { compose, indexBy, path, prop } from "ramda";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { CALL_API, CALL_API_FAILURE, CALL_API_SUCCESS } from "./actions";
import api, { ReduxAPICall } from "./api";

const mockAxios = new MockAdapter(axios);

describe("API middleware", () => {
  const mockStore = configureMockStore([thunk, api]);

  const SUCCESS_TYPE = "SUCCEES";

  const action: ReduxAPICall = {
    endpoint: "/test",
    method: "get",
    successType: SUCCESS_TYPE,
    type: CALL_API,
    url: "_",
  };

  const response =  [{id: 1, name: "a"}, {id: 3, name: "c"}];
  mockAxios
    .onGet(`${action.url}/test`).reply(200, response)
    .onGet(`${action.url}/faulty`).networkError();

  const store = mockStore();
  beforeEach(() => {
    store.clearActions();
    mockAxios.resetHistory();
  });

  it("should call api with requested method", async () => {
    await store.dispatch({...action, method: "put"});
    expect(mockAxios.history.put.length).toBe(1);
  });

  it("successful api call should fire expected actions", async () => {
    await store.dispatch(action);
    expect(store.getActions()).toEqual([
      {
        endpoint: action.endpoint,
        method: action.method,
        payload: {isFetching: true, requestedAt: path([0, "payload", "requestedAt"], store.getActions())},
        type: CALL_API,
      },
      { type: CALL_API_SUCCESS, method: action.method, endpoint: action.endpoint },
      { type: SUCCESS_TYPE, payload: indexBy(compose(String, prop("id")), response)},
    ]);
  });

  it("successful api call should merge additional payload if provided", async () => {
    const additionalPayload = {additionalProperty1: 1, additionalProperty2: 2};
    await store.dispatch({...action, additionalPayload});
    expect(store.getActions()).toEqual([
      {
        endpoint: action.endpoint,
        method: action.method,
        payload: {isFetching: true, requestedAt: path([0, "payload", "requestedAt"], store.getActions())},
        type: CALL_API,
      },
      { type: CALL_API_SUCCESS, method: action.method, endpoint: action.endpoint },
      { type: SUCCESS_TYPE, payload: {...indexBy(compose(String, prop("id")), response), ...additionalPayload}},
    ]);
  });

  it("faulty api call should fire expected actions", async () => {
    await store.dispatch({...action, endpoint: "/faulty"});
    expect(store.getActions()).toEqual([
      {
        endpoint: "/faulty",
        method: action.method,
        payload: {isFetching: true, requestedAt: path([0, "payload", "requestedAt"], store.getActions())},
        type: CALL_API,
      },
      {
        endpoint: "/faulty",
        method: action.method,
        payload: {isFetching: false, error: "Error: Network Error"},
        type: CALL_API_FAILURE,
      },
    ]);
  });

  it("should inject provided parameters", async () => {
    await store.dispatch({...action, parameters: {a: 1, b: 2}});
    expect(mockAxios.history.get[0].url).toBe(`${action.url}${action.endpoint}?a=1&b=2`);
  });

  it("should call onSuccess on successful api call (if provided)", async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    await store.dispatch({...action, onSuccess, onFailure});

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onFailure).not.toHaveBeenCalled();
  });

  it("should call onFailure on faulty api call (if provided)", async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    await store.dispatch({...action, endpoint: "/faulty", onSuccess, onFailure});

    expect(onFailure).toHaveBeenCalledTimes(1);
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
