import button, { plain as plainStyle } from "emotion-styles/button";
import React, { Component, MouseEventHandler } from "react";

export interface ButtonProps {
  onClick: MouseEventHandler;
  children: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  plain: boolean;
}

export default class Button extends Component<ButtonProps> {
  public static defaultProps = {
    plain: false,
    type: "button",
  };

  public handleClick: MouseEventHandler = (e) => {
    const {onClick, type} = this.props;

    if (type === "button") {
      e.preventDefault();
    }
    e.stopPropagation();

    onClick(e);
  }

  public render() {
    const { plain, onClick, ...props } = this.props;
    const classname = plain ? plainStyle : button;

    return <button className={classname} onClick={this.handleClick} {...props} />;
  }
}