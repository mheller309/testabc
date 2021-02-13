import React, { useEffect, useRef } from "react";

import Player from "../components/player";
import Input from "../components/input";
import Timebar from "../components/timebar";
import Controls from "../components/controls";

import { useObservable, useObservableCallback } from "observable-hooks";
import { filter, map, tap, throttleTime, withLatestFrom } from "rxjs/operators";
import { merge, OperatorFunction } from "rxjs";
import ReactPlayer from "react-player";

type Region = { start: number; end: number };
type TRegion = Region | undefined;

function App() {
  const playerRef = useRef<ReactPlayer>(null);

  const [onUrlChange, url$] = useObservableCallback<string | undefined>(
    (u$) => u$,
    undefined
  );

  const [onRegion, region$] = useObservableCallback<TRegion>((d$) => d$);

  const [onDuration, duration$] = useObservableCallback<number | undefined>(
    (d$) => d$
  );

  const [onPlayerProgress, playerProgress$] = useObservableCallback<number>(
    (n$) => n$
  );

  const [onManualProgress, manualProgress$] = useObservableCallback<number>(
    (n$) => n$.pipe(tap((n) => playerRef.current?.seekTo(n)))
  );

  const progress$ = merge(playerProgress$, manualProgress$).pipe(
    throttleTime(200)
  );

  const [onPlayStop, manualPlaying$] = useObservableCallback<boolean>((b$) =>
    b$.pipe(map((v) => !v))
  );
  useEffect(() => onPlayStop(false), [onPlayStop]);

  const regionEndPassedByPlayer$ = useObservable<Region>(() =>
    playerProgress$.pipe(
      withLatestFrom(region$),
      filter(([, r]) => r !== undefined) as OperatorFunction<
        [number, TRegion],
        [number, Region]
      >,
      filter(([v, r]) => v >= r.end),
      map(([, r]) => r)
    )
  );

  const playing$ = merge(
    manualPlaying$,
    regionEndPassedByPlayer$.pipe(
      tap((r) => playerRef.current?.seekTo(r.start)),
      map(() => false)
    )
  );

  return (
    <div>
      <Input onChange={onUrlChange} />
      <Timebar
        duration$={duration$}
        progress={progress$}
        onClick={onManualProgress}
        onRegion={onRegion}
      />
      <Controls onPlayStop={onPlayStop} playing$={playing$} />
      <Player
        ref={playerRef}
        url$={url$}
        onDuration={onDuration}
        onProgress={onPlayerProgress}
        playing$={playing$}
      />
    </div>
  );
}

export default App;
