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
  mergeWith,
  path,
  prop,
  union
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
      (draft as any)[id] = mergeWith(
        (as, bs) => Array.isArray(as) ? union(as, bs) : bs,
        state[id],
        payload
      );
    });
  }

  return handlers;
};

type RelationHandlerTypes = Omit<HandlerTypes, "fetch" | "create">;

interface RelationHandlerFn<Relation> {
  preprocessPayload(entity: Relation): Relation;
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
    types: {[k in keyof RelationHandlerTypes]: string | [string, Partial<RelationHandlerFn<Relation>>]},
    relation: string,
  }) => {
    const handlers: {
      [key: string]: (
        state: EntitiesState[keyof EntitiesState],
        action: AnyAction & {payload: Relation}
      ) => EntitiesState[keyof EntitiesState]
    } = {};
    if (types.add) {
      const [type, fn] = typeof types.add === "string" ? [types.add, {}] : types.add;
      handlers[type] = (state, action) =>
        produce(state, (draft) => {
          const payload = typeof fn.preprocessPayload === "function" ?
            fn.preprocessPayload(action.payload) : action.payload;
          Array.prototype.concat(payload).forEach((rel) => {
            if (rel[key]) {
              if (!Array.isArray(path([rel[key], relation], draft))) {
                (draft[rel[key]] as any)[relation] = [];
              }

              (draft[rel[key]] as any)[relation].push((fn.parseRelationFromPayload || parseRelationFromPayload)(rel));
            }
          });
          return draft;
        });
    }
    if (types.remove) {
      const [type, fn] = typeof types.remove === "string" ? [types.remove, {}] : types.remove;
      handlers[type] = (state, action) =>
        produce(state, (draft) => {
          const payload = typeof fn.preprocessPayload === "function" ?
            fn.preprocessPayload(action.payload) : action.payload;
          const byKey = getRelationsByKey(payload);
          Object.keys(byKey).forEach((k) => {
            (draft[k] as any)[relation] = differenceWith<Relation, Relation>(
              eqBy((a) => typeof a === "object" ? (fn.getId || getId)(a as any) : a) as any,
              (draft[k] as any)[relation],
              byKey[k].map((fn.parseRelationFromPayload || parseRelationFromPayload))
            );
          });
          return draft;
        });
    }
    if (types.update) {
      const [type, fn] = typeof types.update === "string" ? [types.update, {}] : types.update;
      handlers[type] = (state, action) =>
        produce(state, (draft) => {
          const payload = typeof fn.preprocessPayload === "function" ?
            fn.preprocessPayload(action.payload) : action.payload;
          const byKey = getRelationsByKey(payload);
          Object.keys(byKey).forEach((k) => {
            const byId = indexBy((fn.getId || getId), byKey[k]);

            (draft[k] as any)[relation] = (draft[k] as any)[relation].map((rel: Relation) => ({
              ...rel,
              ...(fn.parseRelationFromPayload || parseRelationFromPayload)(byId[(fn.getId || getId)(rel)]),
            }));
          });
          return draft;
        });
    }
    if (types.delete) {
      const [type, fn] = typeof types.delete === "string" ? [types.delete, {}] : types.delete;
      handlers[type] = (state, action) =>
        produce(state, (draft) => {
          const payload = Array.prototype.concat(
            typeof fn.preprocessPayload === "function" ? fn.preprocessPayload(action.payload) : action.payload
          );
          Object.values(draft).forEach((entity) => {
            if (Array.isArray(entity[relation])) {
              entity[relation] = differenceWith<Relation, Relation>(
                eqBy((a) => typeof a === "object" ? (fn.getId || getId)(a as any) : a) as any,
                entity[relation],
                payload.map((fn.parseRelationFromPayload || parseRelationFromPayload))
              );
            }
          });
        });
    }
    return handlers;
  };
};
