import classnames from "classnames";
import React, { ChangeEventHandler, FocusEventHandler, memo, useEffect, useRef, useState } from "react";

import input, { inputContainer, inputError, invalid } from "style/input";

export interface InputProps {
  autoComplete: "off" | "on";
  error: string | boolean;
  disabled?: boolean;
  autoFocus: boolean;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  type: "text" | "password" | "number" | "date" | "email";
  required: boolean;
  value: string;
  getInputElement(props: any): JSX.Element;
}

const Input = ({error, onBlur, onFocus, autoFocus, getInputElement, ...props}: InputProps) => {
  const inputElement = useRef<HTMLInputElement>();
  const [displayErrorTimer, setDisplayErrorTimer] = useState();

  const [displayError, setDisplayError] = useState(false);

  useEffect(() => window.clearTimeout(displayErrorTimer), [displayErrorTimer]);

  useEffect(() => {
    if (inputElement.current && autoFocus) {
      inputElement.current.focus();
    }
  }, []);

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    if (typeof onBlur === "function") { onBlur(event); }
    setDisplayErrorTimer(window.setTimeout(() => {
      setDisplayError(document.activeElement !== inputElement.current);
    }, 300));
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    if (typeof onFocus === "function") { onFocus(event); }
    setDisplayError(false);
  };

  return (
    <div className={inputContainer}>
      {getInputElement({
        className: classnames(input, {[invalid]: error && displayError}),
        onBlur: handleBlur,
        onFocus: handleFocus,
        ref: inputElement,
        ...props,
      })}
      {displayError && typeof error === "string" && <span className={inputError}>{error}</span>}
    </div>
  );
};

Input.defaultProps = {
  autoComplete: "on",
  autoFocus: false,
  error: false,
  getInputElement: (props: any) => (<input {...props} />),
  required: false,
  type: "text",
};

export default memo(Input, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));
