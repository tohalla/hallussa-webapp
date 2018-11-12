import { combineReducers } from "redux";

import account from "../account/reducer";
import organisations from "../organisation/reducer";

const byID = combineReducers({
  organisations,
});

export default combineReducers({
  account,
  byID,
});
