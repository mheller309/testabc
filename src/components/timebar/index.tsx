import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

interface TimebarProps {
  duration: number | undefined;
  progress: number | undefined;
  onClick: (x: number) => void;
}

const Svg = styled.svg<{ interactable: boolean }>`
  width: 100%;
  height: 2rem;
  background-color: rgb(240, 240, 240);
  cursor: ${({ interactable }) => (interactable ? "pointer" : "auto")};
  pointer-events: ${({ interactable }) => (interactable ? "all" : "none")};
`;

const Marker = styled.rect`
  width: 2px;
  height: 100%;
  fill: rgb(10, 10, 10);
  position: absolute;
`;

const Timebar: React.FC<TimebarProps> = ({ duration, progress, onClick }) => {
  const isAudioLoaded = useMemo(() => duration !== undefined, [duration]);

  const markerPosition = useMemo(() => {
    if (!progress || !duration) return "0px";
    return `${(progress / duration) * 100}%`;
  }, [duration, progress]);

  const _onClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      if (duration !== undefined) {
        const { target, clientX } = e;
        const dim = (target as Element).getBoundingClientRect();
        const x = clientX - dim.left;
        onClick((x / dim.width) * duration);
      }
    },
    [onClick, duration]
  );

  return (
    <>
      <p>DURATION: {duration}</p>
      <Svg onClick={_onClick} interactable={isAudioLoaded}>
        <Marker x={markerPosition} />
      </Svg>
    </>
  );
};

export default Timebar;
