import classnames from "classnames";
import React, { memo, MouseEventHandler, ReactFragment } from "react";
import button, { plain as plainStyle } from "../../style/button";

export interface ButtonProps {
  onClick?: MouseEventHandler;
  className?: string;
  children?: ReactFragment;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  plain: boolean;
}

const Button = ({plain, onClick, className, ...props}: ButtonProps) => {
  const handleClick: MouseEventHandler = (e) => {
    if (props.type === "button") {
      e.preventDefault();
    }
    e.stopPropagation();

    if (typeof onClick === "function") {
      onClick(e);
    }
  };

  return (
    <button
      className={classnames({[button]: !plain, [plainStyle]: plain}, className)}
      onClick={handleClick}
      {...props}
    />
  );
};

Button.defaultProps = {
  plain: false,
  type: "button",
};

export default memo(Button);
