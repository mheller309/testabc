import React, { useCallback } from "react";
import Player from "../components/player";
import Input from "../components/input";
import { useAppDispatch } from "../shared/store";
import { actions } from "../shared/store/reducers";
import { useSelector } from "react-redux";
import { selectUrl } from "../shared/store/selectors/input";

function App() {
  const dispatch = useAppDispatch();
  const url = useSelector(selectUrl)

  const onInputChange = useCallback(
    (str) => dispatch(actions.inputChanged(str)),
    [dispatch]
  );
  const onEnter = useCallback((str) => dispatch(actions.enterPressed(str)), [
    dispatch,
  ]);

  return (
    <div>
      <Input onChange={onInputChange} onEnter={onEnter} />
      <p>url: {url}</p>
      <Player
        url={url}
        onDuration={(payload) => {}}
        playing={false}
        volume={1}
      />
    </div>
  );
}

export default App;
