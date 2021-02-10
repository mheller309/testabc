import { RefObject, SyntheticEvent } from "react";
import { fromEvent, OperatorFunction } from "rxjs";
import { distinctUntilChanged, filter, map } from "rxjs/operators";

export const preventDefault = <T extends SyntheticEvent>(e: T): T => {
  e.preventDefault();
  return e;
};

export const globalMouseEventToXDistance = <T extends Element>(
  ref: RefObject<T>
) => (e: React.MouseEvent): number => {
  if (!ref.current) return 0;
  const { clientX } = e;
  const dim = ref.current.getBoundingClientRect();
  const x = clientX - dim.left;
  return x / dim.width;
};

export const localMouseEventToXDistance = <T extends Element>(
  e: React.MouseEvent<T, MouseEvent>
): number => {
  const { target, clientX } = e;
  const dim = (target as Element).getBoundingClientRect();
  const x = clientX - dim.left;
  return x / dim.width;
};

export const globalMouseMove$ = fromEvent<React.MouseEvent>(
  document,
  "mousemove"
);

export const mousePosRelative$ = <T extends Element>(ref: RefObject<T>) =>
  globalMouseMove$.pipe(
    map(globalMouseEventToXDistance(ref)),
    filter((v) => v !== undefined) as OperatorFunction<
      number | undefined,
      number
    >,
    distinctUntilChanged()
  );
