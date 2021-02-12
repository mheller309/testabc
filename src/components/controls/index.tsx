import React, { useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

interface ControlProps {
  onPlayStop: (playing: boolean) => void;
  playing: boolean;
}

const Controls: React.FC<ControlProps> = ({ onPlayStop, playing }) => {
  const onClick = useCallback(() => onPlayStop(playing), [onPlayStop, playing]);
  return (
    <Container>
      <button onClick={onClick}>PLAY/STOP</button>
      {/* <button onClick={onStop}>STOP</button>
      <button onClick={onRecord}>Record</button> */}
    </Container>
  );
};

export default Controls;
