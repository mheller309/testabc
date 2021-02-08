import { RootState } from "../reducers";

export const selectDuration = (state: RootState) => {
  return state.media.duration;
};

export const selectProgress = (state: RootState) => {
  return state.media.progress;
};

export const selectPlaying = (state: RootState) => {
  return state.media.playing;
};

export const selectPlayerRef = (state: RootState) => {
  return state.media.playerRef;
};
