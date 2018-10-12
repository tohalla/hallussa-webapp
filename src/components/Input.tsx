import input from "emotion-styles/input";
import React, { ChangeEventHandler, Component } from "react";

export interface InputProps {
  autocomplete: "off" | "on";
  disabled?: boolean;
  name?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type: "text" | "password" | "number" | "date";
  value: string;
}

export default class Input extends Component<InputProps> {
  public static defaultProps = {
    autocomplete: "on",
    type: "text",
  };

  public render() {
    return <input className={input} {...this.props} />;
  }
}
