import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

interface ControlProps {
  onPlayStop: VoidFunction;
}

const Controls: React.FC<ControlProps> = ({ onPlayStop }) => {
  return (
    <Container>
      <button onClick={onPlayStop}>PLAY/STOP</button>
      {/* <button onClick={onStop}>STOP</button>
      <button onClick={onRecord}>Record</button> */}
    </Container>
  );
};

export default Controls;
