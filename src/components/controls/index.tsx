import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

interface ControlProps {
  onPlayStop: VoidFunction;
  onRecord: VoidFunction;
}

const Controls: React.FC<ControlProps> = ({ onPlayStop, onRecord }) => {
  return (
    <Container>
      <button onClick={onPlayStop}>PLAY</button>
      <button onClick={onRecord}>Record</button>
    </Container>
  );
};

export default Controls;