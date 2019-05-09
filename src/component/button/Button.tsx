import classnames from "classnames";
import React, { Component, MouseEventHandler, ReactFragment } from "react";
import button, { plain as plainStyle } from "style/button";

export interface ButtonProps {
  onClick?: MouseEventHandler;
  className?: string;
  children?: ReactFragment;
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

    if (typeof onClick === "function") {
      onClick(e);
    }
  }

  public render() {
    const { plain, onClick, className, ...props } = this.props;

    return (
      <button
        className={classnames({[button]: !plain, [plainStyle]: plain}, className)}
        onClick={this.handleClick}
        {...props}
      />
    );
  }
}
