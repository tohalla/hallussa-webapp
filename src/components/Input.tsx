import classnames from "classnames";
import React, {
  ChangeEventHandler,
  Component,
  FocusEventHandler,
  RefObject
} from "react";

import { error as errorStyle } from "emotion-styles/inline";
import input, { invalid } from "emotion-styles/input";
import { stackedLayout } from "emotion-styles/layout";

export interface InputProps {
  autoComplete: "off" | "on";
  error?: string;
  disabled?: boolean;
  name?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  type: "text" | "password" | "number" | "date";
  value: string;
}

export default class Input extends Component<InputProps> {
  public static defaultProps = {
    autoComplete: "on",
    type: "text",
  };

  public element: RefObject<HTMLInputElement>;
  public visited: boolean = false;

  constructor(props: InputProps) {
    super(props);
    this.element = React.createRef();
  }

  public handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const {onBlur} = this.props;
    this.visited = true;
    if (typeof onBlur === "function") { onBlur(event); }
  }

  public handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    const {onFocus} = this.props;
    if (typeof onFocus === "function") { onFocus(event); }
    this.forceUpdate(); // re-render to remove error
  }

  public render() {
    const {error, onBlur, onFocus, ...props} = this.props;
    const displayError = Boolean(error) && this.visited && document.activeElement !== this.element.current;
    const className = classnames(input, {[invalid]: displayError});
    return (
      <div className={stackedLayout}>
        <input
          className={className}
          ref={this.element}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          {...props}
        />
        {displayError && <span className={errorStyle}>{error}</span>}
      </div>
    );
  }
}
