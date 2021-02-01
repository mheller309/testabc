import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { createEpicMiddleware } from "redux-observable";

import epics from "./epics";
import reducer, { RootState } from "./reducers";

const epicMiddleware = createEpicMiddleware<any, any, RootState>();

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(epics);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
