import {
  CREATE_ORGANISATION_SUCCESS,
  DELETE_ORGANISATIONS_SUCCESS,
  FETCH_ORGANISATIONS_SUCCESS,
  OrganisationPayload,
  UPDATE_ORGANISATION_SUCCESS
} from "./actions";
import reducer from "./reducer";

describe("organisation handlers", () => {
  it(`initial state should be empty`, () => expect(reducer(undefined, {type: ""})).toEqual({}));

  const organisation: Readonly<OrganisationPayload> = {
    id: 1,
    name: "test organisation",
  };

  it(`should handle ${FETCH_ORGANISATIONS_SUCCESS}`, () => {
    const organisations = {[String(organisation.id)]: organisation, 3: {id: 3, name: "another organisation"}};
    const state = {2: {id: 2, name: "pre-existing organisation"}};
    expect(reducer(state, {type: FETCH_ORGANISATIONS_SUCCESS, payload: organisations}))
      .toEqual({...state, ...organisations});
  });

  it(`should handle ${CREATE_ORGANISATION_SUCCESS}`, () => {
    expect(reducer({}, {type: CREATE_ORGANISATION_SUCCESS, payload: organisation})[organisation.id])
      .toEqual(organisation);
  });

  it(`should handle ${DELETE_ORGANISATIONS_SUCCESS}`, () => {
    expect(reducer(
      {[organisation.id]: organisation},
      {type: DELETE_ORGANISATIONS_SUCCESS, extra: organisation}
    )[organisation.id]).not.toBeDefined();
  });

  it(`should handle ${UPDATE_ORGANISATION_SUCCESS}`, () => {
    const updatedOrganisation = {...organisation, name: "renamed", accounts: []};
    expect(reducer(
      {[organisation.id]: organisation},
      {type: UPDATE_ORGANISATION_SUCCESS, payload: updatedOrganisation}
    )[organisation.id]).toEqual(updatedOrganisation);
  });
});
