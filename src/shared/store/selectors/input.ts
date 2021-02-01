import { RootState } from "../reducers";

export const selectUrl = (state: RootState) => {
  return state.player.url;
};
