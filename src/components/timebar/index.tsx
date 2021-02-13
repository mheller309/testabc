import React, { useRef } from "react";
import { merge, Observable, OperatorFunction, timer } from "rxjs";
import {
  useObservableCallback,
  useObservableState,
  useSubscription,
} from "observable-hooks";
import {
  debounceTime,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  withLatestFrom,
} from "rxjs/operators";
import styled from "styled-components";
import * as mouse from "../../shared/obs/mouse";

import Region, { TRegion } from "./region";

const CLICK_HOLD_TIMEOUT = 150;

interface TimebarProps {
  duration$: Observable<number | undefined>;
  progress: Observable<number>;
  onClick: (x: number) => void;
  onRegion: (r: TRegion) => void;
}

const Svg = styled.svg<{ interactable: boolean }>`
  width: 100%;
  height: 2rem;
  background-color: rgb(240, 240, 240);
  cursor: ${({ interactable }) => (interactable ? "pointer" : "auto")};
  /* pointer-events: ${({ interactable }) =>
    interactable ? "all" : "none"}; */
`;

const Marker = styled.rect`
  width: 2px;
  height: 100%;
  fill: rgb(10, 10, 10);
`;

const Timebar: React.FC<TimebarProps> = ({
  duration$,
  progress,
  onClick,
  onRegion,
}) => {
  const svgRef = useRef(null);
  const duration = useObservableState(duration$);
  const [markerPosition] = useObservableState<string>(
    () =>
      progress.pipe(
        map((v) => {
          if (!v) return "0px";
          return `${v * 100}%`;
        })
      ),
    "0px"
  );

  const [onMouseDown, mouseDown$] = useObservableCallback<
    React.MouseEvent<SVGSVGElement, MouseEvent>
  >((e$) => e$.pipe(map(mouse.preventDefault)));

  const [onMouseUp, mouseUp$] = useObservableCallback<
    React.MouseEvent<SVGSVGElement, MouseEvent>
  >((e$) => e$.pipe(map(mouse.preventDefault)));

  const mousePosRelative$ = mouse.globalMouseMove$.pipe(
    map(mouse.globalMouseEventToXDistance(svgRef)),
    filter((v) => v !== undefined) as OperatorFunction<
      number | undefined,
      number
    >
  );

  const click$ = mouseDown$.pipe(
    debounceTime(10),
    switchMap(() =>
      mouseUp$.pipe(take(1), takeUntil(timer(CLICK_HOLD_TIMEOUT)))
    )
  );

  const leftClick$ = click$.pipe(
    filter((e) => e.button === 0),
    map(mouse.globalMouseEventToXDistance(svgRef))
  );

  const rightClick$ = click$.pipe(filter((e) => e.button === 2));

  const holdClick$ = mouseDown$.pipe(
    switchMap((e) =>
      timer(CLICK_HOLD_TIMEOUT).pipe(
        takeUntil(mouseUp$),
        map(() => mouse.globalMouseEventToXDistance(svgRef)(e))
      )
    )
  );

  const regionClear$ = rightClick$.pipe(map(() => undefined));

  const region$: Observable<TRegion> = merge(
    holdClick$.pipe(
      switchMap((x1) =>
        mousePosRelative$.pipe(
          map((x2) => {
            if (x1 > x2) return { start: x2, end: x1 };
            else return { start: x1, end: x2 };
          }),
          takeUntil(mouseUp$)
        )
      )
    ),
    regionClear$
  );

  const regionEnd$ = holdClick$.pipe(
    switchMap(() => mouseUp$.pipe(take(1))),
    withLatestFrom(region$),
    map(([_, r]) => r)
  );

  useSubscription(leftClick$, onClick);
  useSubscription(regionEnd$, onRegion);
  useSubscription(regionClear$, onRegion);

  return (
    <>
      <p>DURATION: {duration}</p>
      <Svg
        ref={svgRef}
        onContextMenu={(e) => e.preventDefault()}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        interactable={duration !== undefined}
      >
        <Marker x={markerPosition} />
        <Region region$={region$} />
      </Svg>
    </>
  );
};

export default Timebar;
