import React from "react";
import styled from "styled-components";

interface TimebarProps {
  duration: number | undefined;
}

const Canvas = styled.canvas`
  width: 100%;
  height: 2rem;
`;

const Timebar: React.FC<TimebarProps> = ({ duration }) => (
  <>
    <p>DURATION: {duration}</p>
    <Canvas>
    </Canvas>
  </>
);

export default Timebar;
