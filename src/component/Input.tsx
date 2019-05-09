import classnames from "classnames";
import { equals, pick } from "ramda";
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  memo,
  MouseEventHandler,
  ReactFragment,
  useEffect,
  useRef,
  useState
} from "react";

import input, {
  inputContainer,
  inputError,
  inputLabel,
  inputLabelContainer,
  inputLabelFocused,
  wide as wideStyle
 } from "style/input";

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
  rows: number;
  value: string | boolean;
  label?: ReactFragment;
  wide: boolean;
}

const getInputElement = (type: InputProps["type"], {
  label,
  value,
  placeholder,
  autoFocus,
  size,
  rows,
  error,
  displayError,
  focused,
  ...inputProps
}: any) => (
  type === "checkbox" ? (
    <label>
      <input
        {...inputProps}
        type="checkbox"
      />
      <span>{label}</span>
    </label>
  ) : (
    <label className={inputLabelContainer}>
      {
        type === "textarea" ?
          <textarea {...inputProps} rows={rows} value={value} size={size} placeholder={focused ? "" : placeholder} />
        : <input {...inputProps} value={value} size={size} placeholder={focused ? "" : placeholder} />
      }
      <span className={classnames(inputLabel, {[inputLabelFocused]: focused})}>
        {label || placeholder}
      </span>
      {
        displayError && error && (
          <span className={inputError} title={typeof error === "string" ? error : undefined}>
            <i className="material-icons">error</i>
          </span>
        )
      }
    </label>
  )
);

const Input = ({error, onBlur, onFocus, autoFocus, type, disabled, wide, ...props}: InputProps) => {
  const inputElement = useRef<HTMLInputElement>();
  const [displayErrorTimer, setDisplayErrorTimer] = useState();
  const [focused, setFocused] = useState();

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
    setFocused(false);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    if (typeof onFocus === "function") { onFocus(event); }
    setDisplayError(false);
    setFocused(true);
  };

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    if (inputElement.current) {
      inputElement.current.focus();
    }
  };

  return (
    <div className={classnames(inputContainer, {[wideStyle]: wide})} onMouseDown={handleClick}>
      {getInputElement(type, {
        className: input,
        disabled,
        displayError,
        error,
        focused,
        onBlur: handleBlur,
        onFocus: handleFocus,
        ref: inputElement,
        size: 1,
        type,
        ...props,
      })}
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
  wide: false,
};

export default memo(Input, (prev, next) => {
  const props = pick<keyof InputProps>(["error", "value", "disabled", "rows"]);
  return equals(props(prev), props(next));
});
