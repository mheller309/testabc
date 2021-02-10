import React, { useCallback, useReducer, useRef } from "react";
import ReactPlayer from "react-player";

import Player from "../components/player";
import Input from "../components/input";
import Timebar from "../components/timebar";
import Controls from "../components/controls";

import { initialState, reducer } from "./state";

function App() {
  const playerRef = useRef<ReactPlayer>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const onTimebarClick = useCallback(
    (fraction) => {
      dispatch({ type: "setProgress", payload: fraction });
      playerRef.current?.seekTo(fraction, "fraction");
    },
    [playerRef, dispatch]
  );

  const onUrlChange = useCallback(
    (newUrl) => dispatch({ type: "setUrl", payload: newUrl }),
    [dispatch]
  );

  const onDuration = useCallback(
    (newDuration) => dispatch({ type: "setDuration", payload: newDuration }),
    [dispatch]
  );

  const onProgress = useCallback(
    (newProgress) => dispatch({ type: "setProgress", payload: newProgress }),
    [dispatch]
  );

  const onRegion = useCallback(
    (newRegion) => dispatch({ type: "setRegion", payload: newRegion }),
    [dispatch]
  );

  const onPlayStop = useCallback(() => dispatch({ type: "togglePlaying" }), [
    dispatch,
  ]);

  return (
    <div>
      <Input onChange={onUrlChange} />
      <p>url: {state.url}</p>
      <Timebar
        duration={state.duration}
        progress={state.progress}
        onClick={onTimebarClick}
        onRegion={onRegion}
      />
      <Controls onPlayStop={onPlayStop} />
      <Player
        ref={playerRef}
        url={state.url}
        onDuration={onDuration}
        onProgress={onProgress}
        playing={state.playing}
        volume={1}
      />
    </div>
  );
}

export default App;
