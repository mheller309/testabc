import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

interface ControlProps {
  onPlay: VoidFunction;
  onStop: VoidFunction;
  onRecord: VoidFunction;
}

const Controls: React.FC<ControlProps> = ({ onPlay, onStop, onRecord }) => {
  return (
    <Container>
      <button onClick={onPlay}>PLAY</button>
      <button onClick={onStop}>STOP</button>
      <button onClick={onRecord}>Record</button>
    </Container>
  );
};

export default Controls;
