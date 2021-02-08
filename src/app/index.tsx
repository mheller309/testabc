import React, { useCallback } from "react";
import Player from "../components/player";
import Input from "../components/input";
import { useAppDispatch } from "../shared/store";
import { actions } from "../shared/store/reducers";
import { useSelector } from "react-redux";
import { selectUrl } from "../shared/store/selectors/input";
import * as sMedia from "../shared/store/selectors/media";
import Timebar from "../components/timebar";
import Controls from "../components/controls";

function App() {
  const dispatch = useAppDispatch();
  const url = useSelector(selectUrl);
  const duration = useSelector(sMedia.selectDuration);
  const progress = useSelector(sMedia.selectProgress);
  const playing = useSelector(sMedia.selectPlaying);
  const playerRef = useSelector(sMedia.selectPlayerRef);

  const onInputChange = useCallback(
    (str) => dispatch(actions.inputChanged(str)),
    [dispatch]
  );

  const onEnter = useCallback((str) => dispatch(actions.enterPressed(str)), [
    dispatch,
  ]);

  const onDuration = useCallback((n) => dispatch(actions.setDuration(n)), [
    dispatch,
  ]);

  const onProgress = useCallback((n) => dispatch(actions.setProgress(n)), [
    dispatch,
  ]);

  const onPlay = useCallback(() => dispatch(actions.play()), [dispatch]);

  const onStop = useCallback(() => dispatch(actions.stop()), [dispatch]);

  const onRecord = useCallback(() => dispatch(actions.toggleRecording()), [
    dispatch,
  ]);

  const onTimebarClick = useCallback((segs) => {
    onProgress(segs);
    playerRef.current?.seekTo(segs, "seconds");
  }, [playerRef, onProgress]);

  return (
    <div>
      <Input onChange={onInputChange} onEnter={onEnter} />
      <p>url: {url}</p>
      <Timebar
        duration={duration}
        progress={progress}
        onClick={onTimebarClick}
      />
      <Controls onPlay={onPlay} onStop={onStop} onRecord={onRecord} />
      <Player
        ref={playerRef}
        url={url}
        onDuration={onDuration}
        onProgress={onProgress}
        playing={playing}
        volume={1}
      />
    </div>
  );
}

export default App;
