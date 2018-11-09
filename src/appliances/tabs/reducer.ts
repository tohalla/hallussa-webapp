import { path } from "ramda";
import reducer, { TabAction } from "../../components/tabs/reducer";
import { initialState } from "../../store";

const p = ["views", "appliances"];

export default (state = path(p, initialState) as object, action: TabAction) =>
  reducer(p, state, action);
