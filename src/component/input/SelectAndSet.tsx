import { equals } from "ramda";
import React, { ReactFragment, useState } from "react";
import { Props as SelectProps } from "react-select/lib/Select";

import { Field, Form, Formik, FormikConfig } from "formik";
import { Omit } from "../../../misc";
import { rowContainer } from "../../style/container";
import Button from "../button/Button";
import Select from "./Select";

type Value<T> = undefined | T | T[] | null;
export interface SelectAndSetProps<
  T = {label: string, value: any}
> extends Omit<SelectProps<T>, "className" | "components"> {
  onChange?: SelectProps<T>["onChange"];
  value: Value<T>;
  setLabel: string;
  noOptions: ReactFragment;
  formClassName?: string;
  onSet: FormikConfig<{option: Value<T>}>["onSubmit"];
  equalValue(stateValue: Value<T>, value: Value<T>): boolean;
}

const SelectAndSet = <T extends {} = {label: string, value: any}>({
  value,
  onSet,
  onChange,
  setLabel,
  noOptions,
  className,
  formClassName,
  equalValue,
  ...props
}: SelectAndSetProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<Value<T>>(value);

  const handleChange: SelectProps<T>["onChange"] = (option, ...rest) => {
    setSelectedValue(option);
    if (typeof onChange === "function") {
      onChange(option, ...rest);
    }
  };

  if (!Array.isArray(props.options) && props.options.length <= 1) {
    return <>{noOptions}</>;
  }

  if (equalValue(selectedValue, value)) {
    return <Select value={value} {...props} onChange={handleChange} />;
  }
  return (
    <Formik<{option: Value<T>}> initialValues={{option: value}} onSubmit={onSet}>
      <Form className={formClassName}>
        <Field {...props} component={Select} value={selectedValue} onChange={handleChange} />
        <Button type="submit">
          {setLabel}
        </Button>
      </Form>
    </Formik>
  );
};

SelectAndSet.defaultProps = {
  equalValue: equals,
  formClassName: rowContainer,
};

export default SelectAndSet;
