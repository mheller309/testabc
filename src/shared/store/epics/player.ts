import { Epic, ofType } from "redux-observable";
import { race, timer } from "rxjs";
import { map, debounce, distinctUntilChanged } from "rxjs/operators";
import { RootState, actions } from "../reducers";

type AllActions = ReturnType<ValueOf<typeof actions>>;

export const urlChange: Epic<AllActions, AllActions, RootState> = (action$) => {
  return action$.pipe(
    ofType(actions.inputChanged.type),
    debounce(() =>
      race(timer(2000), action$.pipe(ofType(actions.enterPressed.type)))
    ),
    map((a) => actions.urlChanged(a.payload)),
    distinctUntilChanged()
  );
};

const epics = [urlChange];

export default epics;
