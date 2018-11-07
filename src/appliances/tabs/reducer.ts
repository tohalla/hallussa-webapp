import { path } from "ramda";
import reducer, { TabAction } from "../../components/tabs/reducers";
import { initialState } from "../../store";

const p = ["views", "appliance"];

export default (state = path(p, initialState) as object, action: TabAction) =>
  reducer(p, state, action);
