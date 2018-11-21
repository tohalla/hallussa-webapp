import classnames from "classnames";
import React, {
  ChangeEventHandler,
  Component,
  FocusEventHandler,
  RefObject
} from "react";

import input, { inputContainer, inputError, invalid } from "emotion-styles/input";

export interface InputProps {
  autoComplete: "off" | "on";
  error: string | boolean;
  disabled?: boolean;
  autoFocus: boolean;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  type: "text" | "password" | "number" | "date";
  required: boolean;
  value: string;
}

export default class Input extends Component<InputProps> {
  public static defaultProps = {
    autoComplete: "on",
    autoFocus: false,
    error: false,
    required: false,
    type: "text",
  };

  public element: RefObject<HTMLInputElement>;
  public visited: boolean = false;

  public displayError?: NodeJS.Timer;

  constructor(props: InputProps) {
    super(props);
    this.element = React.createRef();
  }

  public componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  public componentWillUnmount() {
    if (this.displayError) {
      clearTimeout(this.displayError);
    }
  }

  public focus = (options?: FocusOptions) =>
    (this.element.current as HTMLInputElement).focus(options)

  public handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const {onBlur} = this.props;
    if (typeof onBlur === "function") { onBlur(event); }
    this.displayError = setTimeout(() => {
      this.visited = true;
      this.forceUpdate(); // re-render to render error
    }, 300);
  }

  public handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    const {onFocus} = this.props;
    if (typeof onFocus === "function") { onFocus(event); }
    this.forceUpdate(); // re-render to remove error
  }

  public render() {
    const {error, onBlur, onFocus, autoFocus, ...props} = this.props;
    const displayError = Boolean(error) && this.visited && document.activeElement !== this.element.current;
    const className = classnames(input, {[invalid]: displayError});
    return (
      <div className={inputContainer}>
        <input
          className={className}
          ref={this.element}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          {...props}
        />
        {displayError && typeof error === "string" && <span className={inputError}>{error}</span>}
      </div>
    );
  }
}
