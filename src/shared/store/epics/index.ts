import { combineEpics } from "redux-observable";

import playerEpic from "./player";

const epics = combineEpics(...playerEpic);

export default epics;
