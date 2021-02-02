import { combineReducers } from "redux";

import * as input from "./input";
import * as media from "./media";

const rootReducer = combineReducers({
  input: input.reducer,
  media: media.reducer,
});

export const actions = {
  ...input.actions,
  ...media.actions,
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
