import { useObservableCallback, useSubscription } from "observable-hooks";
import React, { KeyboardEvent } from "react";
import { race, timer } from "rxjs";
import { debounce, filter, map } from "rxjs/operators";

interface InputProps {
  onChange: (s: string) => void;
}

const Input: React.FC<InputProps> = ({ onChange }) => {
  const [_onChange, onChange$] = useObservableCallback<
    string,
    React.ChangeEvent<HTMLInputElement>
  >((event$) => event$.pipe(map((e) => e.currentTarget.value)));

  const [_onEnter, onEnter$] = useObservableCallback<
    string,
    KeyboardEvent<HTMLInputElement>
  >((event$) =>
    event$.pipe(
      filter((e) => e.key === "Enter"),
      map((e) => e.currentTarget.value)
    )
  );

  const onActualChange$ = onChange$.pipe(
    debounce(() => race(timer(1000), onEnter$))
  );

  useSubscription(onActualChange$, onChange);

  return <input onChange={_onChange} onKeyPress={_onEnter} />;
};

export default Input;
