import React, { useMemo, useRef } from "react";
import { OperatorFunction, timer } from "rxjs";
import {
  useObservableCallback,
  useObservableState,
  useSubscription,
} from "observable-hooks";
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil,
} from "rxjs/operators";
import styled from "styled-components";

interface TimebarProps {
  duration: number | undefined;
  progress: number | undefined;
  onClick: (x: number) => void;
}

const Rect = styled.rect`
  width: 2px;
  height: 100%;
  fill: rgb(10, 10, 10);
`;

const Timebar: React.FC<TimebarProps> = ({ duration, progress }) => {
  const markerPosition = useMemo(() => {
    if (!progress || !duration) return "0px";
    return `${(progress / duration) * 100}%`;
  }, [duration, progress]);

  return <Rect x={markerPosition} />;
};

export default Timebar;
