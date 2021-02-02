import { combineEpics } from "redux-observable";

import input from "./input";

const epics = combineEpics(...input);

export default epics;
