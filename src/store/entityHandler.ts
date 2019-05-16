import produce from "immer";
import {
  assoc,
  compose,
  differenceWith,
  dissoc,
  eqBy,
  groupBy,
  indexBy,
  merge,
  path,
  prop
} from "ramda";
import { AnyAction } from "redux";
import { Omit } from "../../misc";
import { EntityGroup } from "./reducer";
import { EntitiesState } from "./store";

interface HandlerTypes {
  add?: string;
  create?: string;
  remove?: string;
  delete?: string;
  update?: string;
  fetch?: string;
}

export const getEntityHandlers = <State extends EntityGroup<{[k: string]: any}>>(
  {types, getId = compose(String, prop<any>("id"))}: {
    types: Omit<HandlerTypes, "remove" | "add">,
    getId?(entity: {[k: string]: any}): string,
  }
) => {
  const handlers: {[key: string]: (state: State, action: AnyAction & {payload: any}) => State} = {};

  if (types.fetch) {
    handlers[types.fetch] = (state, {payload}) => merge(state, payload);
  }

  if (types.create) {
    handlers[types.create] = (state, {payload}) => assoc(getId(payload) as any, payload, state);
  }

  if (types.delete) {
    handlers[types.delete] = (state, {payload}) => dissoc(getId(payload) as any, state);
  }

  if (types.update) {
    handlers[types.update] = (state, {payload}) => produce(state, (draft) => {
      const id = getId(payload);
      draft[id] = {...draft[id], ...payload};
    });
  }

  return handlers;
};

type RelationHandlerTypes = Omit<HandlerTypes, "fetch" | "create">;

interface RelationHandlerFn<Relation> {
  getId(entity: Relation): string;
  parseRelationFromPayload(entity: Relation): any;
}

export const getEntityRelationHandlersGenerator = <T extends string>(key: T) => {
  const getRelationsByKey = <Relation>(payload: Relation) => groupBy(
    compose(String, prop(key)),
    Array.prototype.concat(payload)
  );

  return <Relation extends {[k: string]: any}>({
    relation,
    types,
    getId = compose(String, prop<any>("id")),
    parseRelationFromPayload = prop<any>("id"),
  }: Partial<RelationHandlerFn<Relation>> & {
    types: {[k in keyof RelationHandlerTypes]: string | [string, RelationHandlerFn<Relation>]},
    relation: string,
  }) => {
    const handlers: {
      [key: string]: (
        state: EntitiesState[keyof EntitiesState],
        action: AnyAction & {payload: Relation}
      ) => EntitiesState[keyof EntitiesState]
    } = {};

    if (types.add) {
      const [type, fn] = typeof types.add === "string" ?
        [types.add, {getId, parseRelationFromPayload}] : types.add;
      handlers[type] = (state, action) =>
        produce(state, (draft) => {
          Array.prototype.concat(action.payload).forEach((rel) => {
            if (rel[key]) {
              if (!Array.isArray(path([rel[key], relation], draft))) {
                (draft[rel[key]] as any)[relation] = [];
              }

              (draft[rel[key]] as any)[relation].push(fn.parseRelationFromPayload(rel));
            }
          });
          return draft;
        });
    }
    if (types.remove) {
      const [type, fn] = typeof types.remove === "string" ?
        [types.remove, {getId, parseRelationFromPayload}] : types.remove;
      handlers[type] = (state, action) =>
        produce(state, (draft) => {
          const byKey = getRelationsByKey(action.payload);
          Object.keys(byKey).forEach((k) => {
            (draft[k] as any)[relation] = differenceWith<Relation, Relation>(
              eqBy((a) => typeof a === "object" ? fn.getId(a as any) : a) as any,
              (draft[k] as any)[relation],
              byKey[k].map(fn.parseRelationFromPayload)
            );
          });
          return draft;
        });
    }
    if (types.update) {
      const [type, fn] = typeof types.update === "string" ?
        [types.update, {getId, parseRelationFromPayload}] : types.update;
      handlers[type] = (state, action) =>
        produce(state, (draft) => {
          const byKey = getRelationsByKey(action.payload);
          Object.keys(byKey).forEach((k) => {
            const byId = indexBy(fn.getId, byKey[k]);

            (draft[k] as any)[relation] = (draft[k] as any)[relation].map((rel: Relation) => ({
              ...rel,
              ...fn.parseRelationFromPayload(byId[fn.getId(rel)]),
            }));
          });
          return draft;
        });
    }
    if (types.delete) {
      const [type, fn] = typeof types.delete === "string" ?
        [types.delete, {getId, parseRelationFromPayload}] : types.delete;
      handlers[type] = (state, action) =>
        produce(state, (draft) => {
          const payload = Array.prototype.concat(action.payload);
          Object.values(draft).forEach((entity) => {
            if (Array.isArray(entity[relation])) {
              entity[relation] = differenceWith<Relation, Relation>(
                eqBy((a) => typeof a === "object" ? fn.getId(a as any) : a) as any,
                entity[relation],
                payload.map(fn.parseRelationFromPayload)
              );
            }
          });
        });
    }
    return handlers;
  };
};
