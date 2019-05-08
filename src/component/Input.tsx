import classnames from "classnames";
import React, { ChangeEventHandler, FocusEventHandler, memo, ReactFragment, useEffect, useRef, useState } from "react";

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
  type: "text" | "password" | "number" | "date" | "email" | "checkbox" | "textarea";
  required: boolean;
  tabindex?: number;
  rows: number;
  value: string | boolean;
  label?: ReactFragment;
  size?: number;
}

const getInputElement = (type: InputProps["type"], {
  label,
  value,
  placeholder,
  autoFocus,
  size,
  rows,
  ...inputProps
}: any) =>
  type === "checkbox" ? (
    <label>
      <input
        {...inputProps}
        type="checkbox"
      />
      <span>{label}</span>
    </label>
  ) : type === "textarea" ? (
    <textarea {...inputProps} rows={rows} value={value} size={size} placeholder={placeholder} />
  ) : <input {...inputProps} value={value} size={size} placeholder={placeholder} />;

const Input = ({error, onBlur, onFocus, autoFocus, type, disabled, tabindex, ...props}: InputProps) => {
  const inputElement = useRef<HTMLInputElement>();
  const [displayErrorTimer, setDisplayErrorTimer] = useState();

  const [displayError, setDisplayError] = useState(false);

  useEffect(() => () => window.clearTimeout(displayErrorTimer), [displayErrorTimer]);

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
      {getInputElement(type, {
        className: classnames(input, {[invalid]: error && displayError}),
        disabled,
        onBlur: handleBlur,
        onFocus: handleFocus,
        ref: inputElement,
        tabIndex: disabled ? -1 : tabindex, // should not be able to tab focus on disabled
        type,
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
  required: false,
  rows: 1,
  type: "text",
};

export default memo(Input, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));
