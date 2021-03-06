import { FieldProps } from "formik";
import React from "react";
import ReactSelect from "react-select";

import { Props } from "react-select/src/Select";
import { greyscale } from "style/variables/colors";
import { inputHeight } from "style/variables/sizes";
import { minimal } from "style/variables/spacing";
import { Omit } from "../../../misc";
import { contentHorizontalSpacing } from "../../style/container";
import { noWrap } from "../../style/inline";

export interface SelectProps<
  T = {label: string, value: any}
> extends Partial<FieldProps>, Omit<Props<T>, "className" | "components"> {}

export default function Select<T = {label: string, value: any}>({
  name,
  onValueSelected,
  value,
  setFieldValue,
  onBlur,
  ...props
}: SelectProps<T>) {
  const handleChange: Props<T>["onChange"] = (option) => {
    // handle formik field updates
    if (typeof setFieldValue === "function") {
      setFieldValue(name, option);
    }
    if (typeof onValueSelected === "function") {
      onValueSelected(option);
    }
  };

  const element = (
    <ReactSelect
      menuPortalTarget={document.querySelector("body")}
      styles={{
        control: (base) => ({
          ...base,
          ["&:hover"]: {boxShadow: "none"},
          border: `1px solid ${greyscale[5]}`,
          borderRadius: 0,
          boxShadow: "none",
          height: `${inputHeight} !important`,
          minHeight: "auto",
        }),
        dropdownIndicator: (base) => ({...base, padding: `0 ${minimal}`}),
        input: (base) => ({...base, minWidth: "150px", textOverflow: "ellipsis"}),
        menu: (base) => ({...base, borderRadius: 0, marginTop: minimal, zIndex: 1000}),
        option: (base, {isFocused, isSelected}) => ({
          ...base,
          [":active"]: {background: greyscale[8]},
          background: greyscale[9],
          color: greyscale[2],
          ...(
            isSelected ?  {fontWeight: 900}
            : isFocused ? {background: greyscale[7], color: greyscale[1]}
            : {}
          ),
        }),
      }}
      {...props}
      onChange={handleChange}
      value={value}
    />
  );
  return props.label ? (
    <label className={contentHorizontalSpacing}>
      {props.label && <span className={noWrap}>{props.label}</span>}
      {element}
    </label>
  ) : element;
}
