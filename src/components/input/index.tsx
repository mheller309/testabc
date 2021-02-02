import React, { KeyboardEvent, useCallback } from "react";

interface InputProps {
  onChange: (s: string) => void;
  onEnter: (s: string) => void;
}

const Input: React.FC<InputProps> = ({ onChange, onEnter }) => {
  const _onEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onEnter(e.currentTarget.value);
      }
    },
    [onEnter]
  );

  const _onChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value);
    },
    [onChange]
  );
  return <input onChange={_onChange} onKeyPress={_onEnter} />;
};

export default Input;
