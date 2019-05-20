import { append, assocPath, compose, dissoc, lensPath, over, prop, set } from "ramda";

import { AnyAction } from "redux";
import { getEntityHandlers, getEntityRelationHandlersGenerator } from "./entityHandler";

const getEntityRelationHandlers = getEntityRelationHandlersGenerator<"test">("test");

describe("entity handler", () => {
  const types = {
    create: "create",
    delete: "delete",
    fetch: "fetch",
    update: "update",
  };

  const entityHandlers = getEntityHandlers({types: {...types}});

  it("should return correct amount of handlers, when all types are defined", () =>
    expect(Object.keys(entityHandlers).sort()).toEqual(Object.values(types).sort())
  );

  const reducer = (state: {}, action: AnyAction & {payload: any}): {[key: string]: any} =>
    action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;

  const initialState = {2: {id: 2, name: "pre-existing entity"}};

  const entity = {id:1, name: "an entity"};

  it(`should handle fetch`, () => {
    const payload = {1: entity, 3: {id: 3, name: "another entity"}};
    expect(reducer(initialState, {type: types.fetch, payload}))
      .toEqual({...initialState, ...payload});
  });

  it(`should handle creation`, () => {
    expect(reducer(initialState, {type: types.create, payload: entity}))
      .toEqual({...initialState, [entity.id]: entity});
  });

  it(`should handle deletion`, () => {
    expect(reducer({...initialState, 1: entity}, {type: types.delete, payload: entity})[entity.id]).not.toBeDefined();
  });

  it(`should handle update`, () => {
    const payload = {id: 2, name: "renamed", additional: []};
    expect(reducer(initialState, {type: types.update, payload}))
      .toEqual({2: {id: 2, name: "renamed", additional: []}});
  });
});

describe("entity relation handler", () => {
  const types = {
    add: "add",
    delete: "delete",
    remove: "remove",
    update: "update",
  };

  describe("simple number relations", () => {
    const entityRelationHandlers = getEntityRelationHandlers({
      relation: "relationKey",
      types,
    });

    it("should return correct amount of handlers, when all types are defined", () =>
      expect(Object.keys(entityRelationHandlers).sort()).toEqual(Object.values(types).sort())
    );

    const initialState = {1: {relationKey: [1, 2, 7, 6, 5], otherProps: {}}, 2: {}} as any;

    const reducer = (state = initialState, action: AnyAction & {payload: any}) =>
      action.type in entityRelationHandlers ? entityRelationHandlers[action.type](state, action) : state;

    it("should handle creating relations with only one relation in payload", () =>
      expect(reducer(initialState, {type: types.add, payload: {test: 1, id: 3}}))
        .toStrictEqual(assocPath([1, "relationKey"], [1, 2, 7, 6, 5, 3], initialState))
    );

    it("should handle creating relations with multiple relations in payload", () =>
      expect(reducer(initialState, {type: types.add, payload: [{test: 1, id: 3}, {test: 1, id: 10}]}))
        .toStrictEqual(assocPath([1, "relationKey"], [1, 2, 7, 6, 5, 3, 10], initialState))
    );

    it("should handle removing relations with only one relation in payload", () =>
      expect(reducer(initialState, {type: types.remove, payload: {test: 1, id: 1}}))
        .toStrictEqual(assocPath([1, "relationKey"], [2, 7, 6, 5], initialState))
    );

    it("should handle removing relations with only multiple relations in payload", () =>
      expect(reducer(initialState, {type: types.remove, payload: [{test: 1, id: 1}, {test: 1, id: 7}]}))
        .toStrictEqual(assocPath([1, "relationKey"], [2, 6, 5], initialState))
    );
  });

  describe("more complex relations (e.g. many-to-many with other properties)", () => {
    const parseRelationFromPayload = dissoc("test");
    const entityHandlers = getEntityRelationHandlers({
      getId: compose(String, prop<any>("relationName") as any),
      parseRelationFromPayload,
      relation: "relationKey",
      types,
    });

    const initialState = {
      1: {
        otherProps: {},
        relationKey: [{relationName: 1}, {relationName: 4}, {relationName: 2, additional: "aaa"}],
      },
      2: {},
      3: {relationKey: [{relationName: 1}]},
    } as any;

    const reducer = (state = initialState, action: AnyAction & {payload: any}) =>
      action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;

    const relationL = lensPath([1, "relationKey"]);

    it("should handle creating relations", () => {
      const payload = {test: 1, extra: 5, relationName: 3};
      expect(reducer(initialState, {type: types.add, payload})).toStrictEqual(
        over(relationL, append(parseRelationFromPayload(payload)), initialState)
      );
    });

    it("should handle creating multiple relations with different keys", () => {
      const payload = [
        {test: 1, relationName: 3}, {test: 1, relationName: 15},
        {test: 2, extra: 5, relationName: 3},
      ];
      expect(reducer(initialState, {type: types.add, payload})).toStrictEqual({
        ...initialState,
        1: {
          otherProps: {},
          relationKey: [
            {relationName: 1}, {relationName: 4},
            {relationName: 2, additional: "aaa"},
            {relationName: 3}, {relationName: 15},
          ],
        },
        2: {
          relationKey: [{extra: 5, relationName: 3}],
        },
      });
    });

    it("should remove relations when related entity has been deleted", () => {
      const payload = {relationName: 1};
      expect(reducer(initialState, {type: types.delete, payload})).toStrictEqual({
        ...initialState,
        1: {
          otherProps: {},
          relationKey: [{relationName: 4}, {relationName: 2, additional: "aaa"}],
        },
        3: {relationKey: []},
      });
    });

    it("should handle removing relations", () => {
      const payload = {test: 1, relationName: 2};
      expect(reducer(initialState, {type: types.remove, payload})).toStrictEqual(
        set(
          relationL,
          [{relationName: 1}, {relationName: 4}],
          initialState
        )
      );
    });

    it("should handle removing multiple relations with different keys", () => {
      const payload = [{test: 1, relationName: 2}, {test: 3, relationName: 1}];
      expect(reducer(initialState, {type: types.remove, payload})).toStrictEqual({
        ...initialState,
        1: {
          otherProps: {},
          relationKey: [{relationName: 1}, {relationName: 4}],
        },
        3: {relationKey: []},
      });
    });

    it("should handle updating relations", () => {
      const payload = {test: 1, relationName: 2, additional: "abc"};
      expect(reducer(initialState, {type: types.update, payload})).toStrictEqual(
        set(
          relationL,
          [{relationName: 1}, {relationName: 4}, parseRelationFromPayload(payload)],
          initialState
        )
      );
    });
  });

  describe("other functionality", () => {
    const parseRelationFromPayload = dissoc("test");
    const entityHandlers = getEntityRelationHandlers({
      getId: compose(String, prop<any>("relationName") as any),
      parseRelationFromPayload,
      relation: "relationKey",
      types: {delete: [types.delete, {getId: prop("otherKey"), parseRelationFromPayload: prop("otherKey")}]},
    });
    const initialState = {
      1: {
        otherProps: {},
        relationKey: [{relationName: 4, otherKey: 444}, {relationName: 2, additional: "aaa"}],
      },
      3: {relationKey: [{relationName: 1}]},
    } as any;

    const reducer = (state = initialState, action: AnyAction & {payload: any}) =>
      action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;

    it("should handle deleting relations with specific getId prop", () => {
      expect(reducer(initialState, {type: types.delete, payload: {otherKey: 444}})).toEqual({
        1: {
          otherProps: {},
          relationKey: [{relationName: 2, additional: "aaa"}],
        },
        3: {relationKey: [{relationName: 1}]},
      });
    });
  });
});
