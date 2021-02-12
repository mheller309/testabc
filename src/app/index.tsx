import React, { useCallback, useReducer } from "react";

import Player from "../components/player";
import Input from "../components/input";
import Timebar from "../components/timebar";
import Controls from "../components/controls";

import { initialState, reducer } from "./state";
import { useObservableCallback, useObservableState } from "observable-hooks";
import { debounceTime, map, tap, throttleTime } from "rxjs/operators";
import { merge } from "rxjs";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onUrlChange = useCallback(
    (newUrl) => dispatch({ type: "setUrl", payload: newUrl }),
    [dispatch]
  );

  const onDuration = useCallback(
    (newDuration) => dispatch({ type: "setDuration", payload: newDuration }),
    [dispatch]
  );

  const onRegion = useCallback(
    (newRegion) => dispatch({ type: "setRegion", payload: newRegion }),
    [dispatch]
  );

  const [playing, onPlayStop] = useObservableState<boolean>(
    (e$) => e$.pipe(map((v) => !v)),
    false
  );

  const [onPlayerProgress, playerProgress$] = useObservableCallback<number>(
    (n$) => n$
  );

  const [onManualProgress, manualProgress$] = useObservableCallback<number>(
    (n$) =>
      n$.pipe(
        tap((n) => {
          state.playerRef.current?.seekTo(n);
        })
      )
  );

  const progress$ = merge(playerProgress$, manualProgress$).pipe(throttleTime(200));

  console.warn("RENDER");
  return (
    <div>
      <Input onChange={onUrlChange} />
      <p>url: {state.url}</p>
      <Timebar
        duration={state.duration}
        progress={progress$}
        onClick={onManualProgress}
        // onClick={onTimebarClick}
        onRegion={onRegion}
      />
      <Controls onPlayStop={onPlayStop} playing={playing} />
      <Player
        ref={state.playerRef}
        url={state.url}
        onDuration={onDuration}
        onProgress={onPlayerProgress}
        playing={playing}
        volume={1}
      />
    </div>
  );
}

export default App;
