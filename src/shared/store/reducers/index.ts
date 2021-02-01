import { combineReducers } from "redux";

import { reducer as playerReducer, actions as playerActions } from "./input";

const rootReducer = combineReducers({
  player: playerReducer,
});

export const actions = {
  ...playerActions,
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
