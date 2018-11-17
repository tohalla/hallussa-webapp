import React, { Component, FormEventHandler, ReactFragment } from "react";

import { actionsRow, form, inputRow } from "emotion-styles/form";
import Button from "./Button";

export interface FormProps {
  onSubmit: FormEventHandler;
  secondary: JSX.Element;
  submitText: string;
  children: ReactFragment;
  isValid: boolean;
}

export default class Form extends Component<FormProps> {
  public static defaultProps = {
    isValid: true,
    secondary: <span />,
    submitText: "Submit",
  };

  // We're using fetch to dispatch form actions, therefore default functionality of form submitting is prevented.
  public handleSubmit: FormEventHandler = (event) => {
    const {isValid, onSubmit} = this.props;
    event.preventDefault();
    if (isValid) {
      onSubmit(event);
    }
  }

  public render() {
    const { secondary, submitText, children, isValid } = this.props;

    // Map children to separate row elements
    const rows = (Array.isArray(children) ? children : [children]).map(
      (child, index) => (
        <div className={inputRow} key={index}>
          {child}
        </div>
      )
    );

    return (
      <form className={form} onSubmit={this.handleSubmit}>
        {rows}
        <div className={actionsRow}>
          {secondary}
          <Button type="submit" disabled={!isValid}>{submitText}</Button>
        </div>
      </form>
    );
  }
}
