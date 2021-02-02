import React, { useCallback } from "react";
import Player from "../components/player";
import Input from "../components/input";
import { useAppDispatch } from "../shared/store";
import { actions } from "../shared/store/reducers";
import { useSelector } from "react-redux";
import { selectUrl } from "../shared/store/selectors/input";
import { selectDuration } from "../shared/store/selectors/media";
import Timebar from "../components/timebar";
import Controls from "../components/controls";

function App() {
  const dispatch = useAppDispatch();
  const url = useSelector(selectUrl);
  const duration = useSelector(selectDuration);

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

  const onPlayStop = useCallback(() => dispatch(actions.togglePlayStop()), [
    dispatch,
  ]);

  const onRecord = useCallback(() => dispatch(actions.toggleRecording()), [dispatch]);

  return (
    <div>
      <Input onChange={onInputChange} onEnter={onEnter} />
      <p>url: {url}</p>
      <Timebar duration={duration} />
      <Controls onPlayStop={onPlayStop} onRecord={onRecord} />
      <Player
        url={url}
        onDuration={onDuration}
        onProgress={onProgress}
        playing={false}
        volume={1}
      />
    </div>
  );
}

export default App;
