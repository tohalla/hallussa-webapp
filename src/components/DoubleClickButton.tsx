import React, { MouseEventHandler, ReactFragment } from "react";

import Button, { ButtonProps } from "./Button";

export const deletionConfirmation = (timer: number) => `Click again to confirm deletion (${timer})`;

interface Props extends Partial<ButtonProps> {
  children: ReactFragment;
  delayInSeconds?: number;
  onClick: MouseEventHandler;
  secondaryClassName?: string;
  renderSecondaryContent(timer: number): ReactFragment;
}

export default class DoubleClickButton extends React.Component<Props> {
  public static defaultProps = {
    delayInSeconds: 3,
  };

  public state = {
    timer: undefined,
  };

  public counter?: NodeJS.Timer;

  public componentWillUnmount() {
    if (this.counter) {
      clearInterval(this.counter);
    }
  }

  public handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.counter) { clearInterval(this.counter); } // remove interval set before
    if (this.state.timer) {
      this.setState({timer: undefined});
      this.props.onClick(event);
    } else {
      this.setState({timer: this.props.delayInSeconds});
      this.counter = setInterval(() => {
        const {timer = 0} = this.state;
        if (timer) {
          this.setState({timer: timer - 1});
        } else {
          this.setState({timer: undefined});
        }
      }, 1000);
    }
  }

  public render() {
    const {
      renderSecondaryContent,
      className,
      secondaryClassName,
      children,
      delayInSeconds,
      onClick,
      ...props
    } = this.props;
    const {timer} = this.state;
    return (
      <Button
        {...props}
        className={timer ? secondaryClassName : className}
        onClick={this.handleClick}
      >
        {timer ? renderSecondaryContent(timer) : children}
      </Button>
    );
  }
}
