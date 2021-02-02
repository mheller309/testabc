import { RootState } from "../reducers";

export const selectDuration = (state: RootState) => {
  return state.media.duration;
};
