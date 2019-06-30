import classnames from "classnames";
import { contains, equals, path, pick } from "ramda";
import React, {
  FocusEventHandler,
  memo,
  MouseEventHandler,
  useRef,
  useState
} from "react";

import { FieldProps } from "formik";
import input, {
  inputContainer,
  inputLabel,
  inputLabelContainer,
  inputLabelError,
  inputLabelFocused,
  inputLabelHidden,
  wide as wideStyle
 } from "style/input";
import { inputRow } from "../../style/form";

export interface InputProps {
  autoComplete: "off" | "on";
  disabled?: boolean;
  autoFocus: boolean;
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
  form: {errors, touched},
  row,
  field: {name, onBlur, onChange, value},
  ...props
}: FieldProps & InputProps) => {
  const inputElement = useRef<HTMLInputElement>();
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
        error: touched[name] && errors[name],
        focused,
        name,
        onBlur: handleBlur,
        onChange,
        onFocus: handleFocus,
        placeholder: props.label,
        ref: inputElement,
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

export default memo(Input, (prev, next) => !contains(false, [
  path(["field", "value"]),
  path(["form", "errors", prev.field.name]),
  path(["form", "touched", next.field.name]),
  pick(["wide", "disabled"]),
].map((p) => equals(p(prev), p(next)))));
