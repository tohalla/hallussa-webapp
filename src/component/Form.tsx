import classNames from "classnames";
import { addIndex, assoc, find, forEach, map, mergeWith, pick, values } from "ramda";
import React, { ChangeEvent, Component, FormEventHandler, ReactFragment } from "react";

import { actionsRow, form, inputRow } from "style/form";
import { error as errorStyle } from "style/inline";
import { TranslationProps } from "../../misc";
import Button from "./button/Button";
import { InputProps } from "./Input";
import { getFormInput } from "./util";

export interface ValidationProps {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}

export interface FormInput<Inputs> {
  validate?: ValidationProps;
  key: Inputs;
  props?: Partial<Pick<InputProps, Exclude<keyof InputProps, keyof ValidationProps>>>;
}

export type FormState<Inputs extends string> = {[key in Inputs]: any} & {
  errors: {[key in Inputs]: string | boolean | undefined};
};

export interface FormProps<Inputs extends string> {
  children?: ReactFragment;
  header?: ReactFragment;
  error?: string;
  onSubmit: (state: FormState<Inputs>) => any;
  inputs: ReadonlyArray<FormInput<Inputs> | ReadonlyArray<FormInput<Inputs>>>;
  secondary: ReactFragment;
  submitText: ((p: TranslationProps) => string) | string;
  state?: {[key in Inputs]?: any};
  isValid: boolean;
  validate?: (state: FormState<Inputs>) => {[key in Inputs]?: string | boolean};
}

const getInputState = <Inputs extends string>(
  inputs: ReadonlyArray<FormInput<Inputs> | ReadonlyArray<FormInput<Inputs>>>
) => {
  let state: {[key: string]: any} = {};
  forEach<FormInput<Inputs> | ReadonlyArray<FormInput<Inputs>>>(
    (input) => {
      if (Array.isArray(input)) {
        return state = {...state, ...(getInputState(input) as object)};
      }
      const {key} = input as FormInput<Inputs>;
      state[key] = "";
    },
    inputs
  );
  return {errors: {}, ...state};
};

export default class Form<Inputs extends string> extends Component<FormProps<Inputs>, FormState<Inputs>> {
  public static defaultProps = {
    isValid: true,
    secondary: <span />,
    submitText: "Submit",
  };

  constructor(props: FormProps<Inputs>) {
    super(props);
    this.state = getInputState(props.inputs) as FormState<Inputs>;
    if (props.state) { // if state set in props...
      this.state = mergeWith(
        (as, bs) => bs || as,
        this.state,
        pick(Object.keys(this.state), props.state)
      );
    }
  }

  public componentDidMount() {
    this.setState(assoc("errors", this.validate(this.props.inputs, this.state)));
  }

  // Map children to separate row elements
  public renderInputs = () => {
    const renderInput = getFormInput(this);
    return addIndex<any, ReactFragment>(map)(
      (input, i) => <div className={inputRow} key={i}>{renderInput(input)}</div>,
      this.props.inputs
    );
  }

  public handleInputChange = (key: Inputs) => (event: ChangeEvent<HTMLInputElement>) => {
    const newState = assoc(key, event.target.value, this.state);
    this.setState(assoc("errors", this.validate(this.props.inputs, newState), newState));
  }

  // check via validation prop
  public validate = (
    inputs: ReadonlyArray<FormInput<Inputs> | ReadonlyArray<FormInput<Inputs>>>,
    state: FormState<Inputs>
  ) => {
    let errors: any = {};
    forEach(
      (input) => {
        if (Array.isArray(input)) { // if in array then deeply fetch
          return errors = {...errors, ...(this.validate(input, state) as object)};
        }
        const {validate, key} = input as FormInput<Inputs>;
        if (validate) {
          const {maxLength, minLength, required} = validate;
          if (maxLength && state[key].length > maxLength) {
            errors[key] = `Maximum allowed length is ${maxLength} characters.`;
          } else if (minLength && state[key].length < minLength) {
            errors[key] = `Minimum allowed length is ${minLength} characters.`;
          } else if (required && !state[key]) {
            errors[key] = true;
          }
        }
      },
      inputs
    );
    if (typeof this.props.validate === "function") {
      errors = this.props.validate(assoc("errors", errors, state));
    }
    return errors;
  }

  // We're using fetch to dispatch form actions, therefore default functionality of form submitting is prevented.
  public handleSubmit: FormEventHandler = (event) => {
    const {onSubmit} = this.props;
    event.preventDefault();
    onSubmit(this.state);
  }

  public render() {
    const { children, secondary, submitText, header, error } = this.props;
    const isValid = this.props.isValid && !Boolean(find(Boolean, values(this.state.errors)));
    return (
      <form className={form} onSubmit={this.handleSubmit}>
        {header}
        {this.renderInputs()}
        {children}
        {error && <i className={classNames(inputRow, errorStyle)}>{error}</i>}
        <div className={actionsRow}>
          {secondary}
          <Button type="submit" disabled={!isValid}>{submitText}</Button>
        </div>
      </form>
    );
  }
}
