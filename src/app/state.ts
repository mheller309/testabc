import { Reducer } from "react";

type TRegion = { start: number; end: number } | undefined;

export type State = {
  duration: number | undefined;
  progress: number | undefined;
  playing: boolean;
  region: TRegion;
  url: string | undefined;
};

export const initialState: State = {
  duration: undefined,
  progress: undefined,
  playing: false,
  region: undefined,
  url: undefined,
};

type ActionWithoutPayload<T> = { type: T };
type ActionWitPayload<T, P> = { type: T; payload: P };

type Action =
  | ActionWithoutPayload<"togglePlaying">
  | ActionWitPayload<"setUrl", string>
  | ActionWitPayload<"setRegion", TRegion>
  | ActionWitPayload<"setDuration", number>
  | ActionWitPayload<"setProgress", number>;

export const reducer: Reducer<State, Action> = (s, a) => {
  console.warn("GOT ACTION", a);
  switch (a.type) {
    case "setUrl":
      return { ...s, url: a.payload, playing: false };
    case "togglePlaying":
      // if (!s.playing) {
      //   if (!s.region) return
      //   else return { ...s, playing: true, progress: s.region.start };
      // }
      return { ...s, playing: !s.playing };
    case "setDuration":
      return { ...s, duration: a.payload };
    case "setProgress":
      if (s.region && a.payload >= Number(s.region.end)) {
        return { ...s, progress: s.region.start, playing: false };
      }
      return { ...s, progress: a.payload };
    case "setRegion":
      return { ...s, region: a.payload };
    default:
      return s;
  }
};
