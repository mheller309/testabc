import { createAction, createReducer, Reducer } from "@reduxjs/toolkit";

export interface MediaState {
  duration: number | undefined;
  progress: number | undefined;
  playing: boolean;
}

const initialState: MediaState = {
  duration: undefined,
  progress: undefined,
  playing: false,
};

export const actions = {
  setDuration: createAction<number, "@media/setDuration">("@media/setDuration"),
  setProgress: createAction<number, "@media/setProgress">("@media/setProgress"),
  togglePlayStop: createAction<void, "@media/togglePlayStop">(
    "@media/togglePlayStop"
  ),
  toggleRecording: createAction<void, "@media/toggleRecording">(
    "@media/toggleRecording"
  ),
};

export const reducer: Reducer<
  MediaState,
  ReturnType<ValueOf<typeof actions>>
> = createReducer(initialState, (builder) =>
  builder
    .addCase(actions.setDuration, (state, action) => {
      state.duration = action.payload;
    })
    .addCase(actions.setProgress, (state, action) => {
      state.progress = action.payload;
    })
    .addCase(actions.togglePlayStop, (state) => {
      state.playing = !state.playing;
    })
);
