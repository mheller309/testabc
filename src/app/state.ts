import { createRef, Reducer, RefObject } from "react";
import ReactPlayer from "react-player";

type TRegion = { start: number; end: number } | undefined;

export type State = {
  duration: number | undefined;
  progress: number | undefined;
  playing: boolean;
  region: TRegion;
  url: string | undefined;
  playerRef: RefObject<ReactPlayer>;
};

export const initialState: State = {
  duration: undefined,
  progress: undefined,
  playing: false,
  region: undefined,
  url: undefined,
  playerRef: createRef<ReactPlayer>(),
};

type ActionWithoutPayload<T> = { type: T };
type ActionWitPayload<T, P> = { type: T; payload: P };

type Action =
  | ActionWithoutPayload<"togglePlaying">
  | ActionWitPayload<"setUrl", string>
  | ActionWitPayload<"setRegion", TRegion>
  | ActionWitPayload<"setDuration", number>
  | ActionWitPayload<"setManualProgress", number>
  | ActionWitPayload<"setProgress", number>;

export const reducer: Reducer<State, Action> = (s, a) => {
  console.warn("GOT ACTION", a);
  switch (a.type) {
    case "setUrl":
      return { ...s, url: a.payload, playing: false };
    case "togglePlaying":
      return { ...s, playing: !s.playing };
    case "setDuration":
      return { ...s, duration: a.payload };
    case "setProgress":
      if (s.region && a.payload >= s.region.end) {
        s.playerRef.current?.seekTo(s.region.start);
        return { ...s, progress: s.region.start, playing: false };
      }
      return { ...s, progress: a.payload };
    case "setManualProgress":
      if (
        !s.region ||
        (a.payload >= s.region.start && a.payload <= s.region.end)
      ) {
        s.playerRef.current?.seekTo(a.payload, "fraction");
        return { ...s, progress: a.payload };
      }
      return s;
    case "setRegion":
      return { ...s, region: a.payload };
    default:
      return s;
  }
};
