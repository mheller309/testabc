import { createAction, createReducer, Reducer } from "@reduxjs/toolkit";

export interface PlayerState {
  url: string | undefined;
}

const initialState: PlayerState = {
  url: undefined,
};

export const actions = {
  urlChanged: createAction<string, "@input/urlChanged">("@input/urlChanged"),
  inputChanged: createAction<string, "@input/inputChanged">(
    "@input/inputChanged"
  ),
  enterPressed: createAction<string, "@input/enterPressed">(
    "@input/enterPressed"
  ),
};

export const reducer: Reducer<
  PlayerState,
  ReturnType<ValueOf<typeof actions>>
> = createReducer(initialState, (builder) =>
  builder.addCase(actions.urlChanged, (state, action) => {
    state.url = action.payload;
  })
);
