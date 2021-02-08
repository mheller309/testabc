import { createAction, createReducer, Reducer } from "@reduxjs/toolkit";
import { createRef, RefObject } from "react";
import ReactPlayer from "react-player";

export interface MediaState {
  duration: number | undefined;
  progress: number | undefined;
  playing: boolean;
  playerRef: RefObject<ReactPlayer>;
}

const initialState: MediaState = {
  duration: undefined,
  progress: undefined,
  playing: false,
  playerRef: createRef(),
};

export const actions = {
  setDuration: createAction<number, "@media/setDuration">("@media/setDuration"),
  setProgress: createAction<number, "@media/setProgress">("@media/setProgress"),
  play: createAction<void, "@media/play">("@media/play"),
  stop: createAction<void, "@media/stop">("@media/stop"),
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
    .addCase(actions.play, (state) => {
      state.playing = true;
    })
    .addCase(actions.stop, (state) => {
      state.playing = false;
    })
);
