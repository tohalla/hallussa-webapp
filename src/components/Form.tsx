import React, { Component, FormEventHandler, ReactFragment } from "react";

import { actionsRow, form, inputRow } from "emotion-styles/form";
import Button from "./Button";

export interface FormProps {
  onSubmit: FormEventHandler;
  secondary: Node;
  submitText: string;
  children: ReactFragment;
}

export default class Form extends Component<FormProps> {
  public static defaultProps = {
    secondary: <span />,
    submitText: "Submit",
  };

  // We're using fetch to dispatch form actions, therefore default functionality of form submitting is prevented.
  public handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    this.props.onSubmit(event);
  }

  public render() {
    const { secondary, submitText, children } = this.props;

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
          <Button type="submit">{submitText}</Button>
        </div>
      </form>
    );
  }
}
