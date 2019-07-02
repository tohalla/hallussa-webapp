import { eqBy, isNil, prop } from "ramda";
import React, { memo, ReactFragment } from "react";

import { Field, FieldConfig, FieldProps, Form, Formik, FormikConfig, FormikValues } from "formik";
import { Omit } from "../../../misc";
import { rowContainer } from "../../style/container";
import Button from "../button/Button";
import Select, { SelectProps } from "./Select";

type Value<T> = undefined | T | T[] | null;
export interface SelectAndSetProps<T = {label: string, value: any}> extends
  Omit<SelectProps<T>, keyof FieldProps>, FieldConfig {
  onValueSelected?: SelectProps<T>["onChange"];
  initialValue?: Value<T>;
  setLabel: string;
  noOptions?: ReactFragment;
  formClassName?: string;
  onSet(values: FormikValues): any;
  equalValue?(stateValue: Value<T>, value: Value<T>): boolean;
}

const SelectAndSet = <T extends {label: string, value: any}>({
  initialValue,
  onSet,
  onValueSelected: onChange,
  setLabel,
  name,
  noOptions,
  containerClassName,
  formClassName,
  equalValue,
  ...props
}: SelectAndSetProps<T>) => {
  const handleSubmit: FormikConfig<any>["onSubmit"]  = async (state) => {
    if (typeof onSet === "function") {
      await onSet(state);
    }
  };

  return (
    <div className={containerClassName}>
      {
        Array.isArray(props.options) && props.options.length > 0 ?
          <Formik initialValues={{[name]: initialValue}} onSubmit={handleSubmit}>
            {({initialValues, values, isSubmitting, setFieldValue}) => (
              <Form className={formClassName}>
                <Field
                  {...props}
                  isDisabled={isSubmitting}
                  as={Select}
                  name={name}
                  onValueSelected={onChange}
                  setFieldValue={setFieldValue}
                />
                {
                  (typeof equalValue === "function" ?
                    equalValue(initialValues[name], values[name]) : initialValues[name] === values[name]
                  ) ||
                  <Button disabled={isSubmitting} type="submit">
                    {setLabel}
                  </Button>
                }
              </Form>
            )}
          </Formik>
        : <>{noOptions}</>
      }
    </div>
  );
};

const defaultProps: Partial<SelectAndSetProps> = {
  equalValue: eqBy<any>((p) => {
    const val = prop("value", p);
    return isNil(val) ? null : val;
  }),
  formClassName: rowContainer,
};

SelectAndSet.defaultProps = defaultProps;

export default memo(SelectAndSet);
