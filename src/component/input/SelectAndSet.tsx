import { eqBy, isNil, prop } from "ramda";
import React, { ReactFragment, useState } from "react";

import { Field, FieldConfig, FieldProps, Form, Formik, FormikConfig } from "formik";
import { Omit } from "../../../misc";
import { rowContainer } from "../../style/container";
import Button from "../button/Button";
import Select, { SelectProps } from "./Select";

type Value<T> = undefined | T | T[] | null;
export interface SelectAndSetProps<T = {label: string, value: any}> extends
  Omit<SelectProps<T>, keyof FieldProps>, FieldConfig {
  onChange?: SelectProps<T>["onChange"];
  initialValue: Value<T>;
  setLabel: string;
  noOptions?: ReactFragment;
  formClassName?: string;
  onSet: FormikConfig<{[key: string]: any}>["onSubmit"];
  equalValue?(stateValue: Value<T>, value: Value<T>): boolean;
}

const SelectAndSet = <T extends {label: string, value: any}>({
  initialValue,
  onSet,
  onChange,
  setLabel,
  name,
  noOptions,
  containerClassName,
  formClassName,
  equalValue,
  ...props
}: SelectAndSetProps<T>) => {
  const Component = () => {
    if (!Array.isArray(props.options) && props.options.length <= 1) {
      return <>{noOptions}</>;
    }

    return (
      <Formik initialValues={{[name]: initialValue}} onSubmit={onSet}>
        {({initialValues, values}) => (
          <Form className={formClassName}>
            <Field {...props} component={Select} name={name} onChange={onChange} />
            {
              (typeof equalValue === "function" ?
                equalValue(initialValues[name], values[name]) : initialValues[name] === values[name]
              ) ||
              <Button type="submit">
                {setLabel}
              </Button>
            }
          </Form>
        )}
      </Formik>
    );
  };

  return <div className={containerClassName}><Component /></div>;
};

const defaultProps: Partial<SelectAndSetProps> = {
  equalValue: eqBy<any>((p) => {
    const val = prop("value", p);
    return isNil(val) ? null : val;
  }),
  formClassName: rowContainer,
};

SelectAndSet.defaultProps = defaultProps;

export default SelectAndSet;
