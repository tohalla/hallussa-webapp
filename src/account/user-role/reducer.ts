import { getEntityHandlers } from "../../store/entityHandler";
import {
  FETCH_USER_ROLES_SUCCESS, UserRoleAction
} from "./actions";

const entityHandlers = {
  ...getEntityHandlers({
    types: {
      fetch: FETCH_USER_ROLES_SUCCESS,
    },
  }),
};

export default (state = {}, action: UserRoleAction) =>
  action.type in entityHandlers ? entityHandlers[action.type](state, action) : state;
