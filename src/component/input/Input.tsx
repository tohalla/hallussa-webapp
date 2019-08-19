import classnames from "classnames";
import React, {
  FocusEventHandler,
  useState
} from "react";

import { FieldProps } from "formik";
import { inputRow } from "../../style/form";
import input, {
  inputContainer,
  inputLabel,
  inputLabelContainer,
  inputLabelError,
  inputLabelFocused,
  inputLabelHidden,
  wide as wideStyle
 } from "../../style/input";

export interface InputProps {
  autoComplete: "off" | "on";
  disabled?: boolean;
  autoFocus: boolean;
  error: string;
  touched: boolean;
  label: string;
  required: boolean;
  row: boolean;
  wide: boolean;
}

const getInputElement = ({
  label,
  placeholder,
  focused,
  error,
  ...props
}: any) => (
  props.type === "checkbox" ? (
    <label>
      <input
        {...props}
        type="checkbox"
      />
      <span>{label}</span>
    </label>
  ) : (
    <label className={inputLabelContainer}>
      {
        props.type === "textarea" ?
          <textarea {...props} placeholder={focused ? "" : placeholder} />
        : <input {...props} placeholder={focused ? "" : placeholder} />
      }
      <span
        className={classnames(inputLabel, {
          [inputLabelFocused]: focused,
          [inputLabelError]: !focused && error,
          [inputLabelHidden]: !error && !focused && !props.value,
        })}
        title={typeof error === "string" ? error : undefined}
      >
        {label}
      </span>
    </label>
  )
);

const Input = ({
  wide,
  row,
  name,
  onBlur,
  onChange,
  value,
  error,
  touched,
  ...props
}: FieldProps["field"] & InputProps) => {
  const [focused, setFocused] = useState();

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    onBlur(event);
    setFocused(false);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
    setFocused(true);
  };

  const renderInput = () => (
    <div className={classnames(inputContainer, {[wideStyle]: wide})}>
      {getInputElement({
        className: input,
        error: touched && error,
        focused,
        name,
        onBlur: handleBlur,
        onChange,
        onFocus: handleFocus,
        placeholder: props.label,
        size: 1,
        value,
        ...props,
      })}
    </div>
  );

  return row ? <div className={inputRow}>{renderInput()}</div> : renderInput();
};

Input.defaultProps = {
  autoComplete: "on",
  autoFocus: false,
  required: false,
  row: true,
  wide: false,
};

export default Input;
