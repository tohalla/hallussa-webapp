import React from "react";
import ReactSelect from "react-select";
import { Props } from "react-select/lib/Select";
import { greyscale } from "style/variables/colors";
import { inputHeight } from "style/variables/sizes";
import { minimal } from "style/variables/spacing";
import { contentHorizontalSpacing } from "../style/container";
import { noWrap } from "../style/inline";

export default function Select<T = {label: string, value: any}>(
  props: Pick<Props<T>, Exclude<keyof Props<T>, "className" | "components">>
) {
  return (
    <label className={contentHorizontalSpacing}>
      {props.label && <span className={noWrap}>{props.label}</span>}
      <ReactSelect
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
          menu: (base) => ({...base, borderRadius: 0, marginTop: minimal}),
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
      />
    </label>
  );
}
