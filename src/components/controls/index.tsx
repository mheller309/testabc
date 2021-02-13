import {  useObservableState } from "observable-hooks";
import React, { useCallback } from "react";
import { Observable } from "rxjs";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

interface ControlProps {
  onPlayStop: (playing: boolean) => void;
  playing$: Observable<boolean>;
}

const Controls: React.FC<ControlProps> = ({ onPlayStop, playing$ }) => {
  const playing = useObservableState(playing$, false)
  // const [onClick] = useObservableCallback<boolean, void>(() => playing$.pipe(tap((v) => onPlayStop(!v))))
  const onClick = useCallback(() => onPlayStop(playing), [onPlayStop, playing]);
  return (
    <Container>
      <button onClick={onClick as VoidFunction}>PLAY/STOP</button>
      {/* 
      <button onClick={onRecord}>Record</button> */}
    </Container>
  );
};

export default Controls;
