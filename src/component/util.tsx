import changeCase from "change-case";
import { map } from "ramda";
import React, { ChangeEventHandler, Fragment, ReactFragment } from "react";

import { FormInput } from "./Form";
import Input from "./Input";

export const getFormInput = <Inputs extends string>({state, handleInputChange}: {
  state: any,
  handleInputChange: (key: Inputs) => ChangeEventHandler<HTMLInputElement>
}) => (formInput: FormInput<Inputs> | ReadonlyArray<FormInput<Inputs>>): ReactFragment => {
  const getInput = (input: FormInput<Inputs>) => (
    <Input
      key={input.key}
      error={state.errors && state.errors[input.key]}
      name={changeCase.paramCase(input.key)}
      placeholder={changeCase.titleCase(input.key)}
      onChange={handleInputChange(input.key)}
      value={state[input.key]}
      {...input.validate}
      {...input.props}
    />
  );
  return Array.isArray(formInput) ?
    <Fragment key={formInput[0].key}>{map(getInput, formInput)}</Fragment>
  : getInput(formInput as FormInput<Inputs>);
};
