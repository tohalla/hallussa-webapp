import classnames from "classnames";
import React, { FC, MouseEventHandler, ReactFragment } from "react";
import { useTranslation } from "react-i18next";

import { alertIndication } from "../../style/inline";
import Button, { ButtonProps } from "./Button";

interface Props extends Partial<ButtonProps> {
  children?: ReactFragment;
  delayInSeconds?: number;
  onClick: MouseEventHandler;
  secondaryClassName: string;
  DeletionConfirmation: FC<{time?: number}>;
}

export default class DoubleClickButton extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    DeletionConfirmation: ({time}) => {
      const {t} = useTranslation();
      return <>{t<string>("general.misc.confirmTimed", {time})}</>;
    },
    delayInSeconds: 3,
    secondaryClassName: alertIndication,
  };

  public state = {
    timer: undefined,
  };

  public counter?: NodeJS.Timeout;

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

  public render() {
    const {
      DeletionConfirmation,
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
        className={classnames(className, {[secondaryClassName]: typeof timer !== "undefined"})}
        onClick={this.handleClick}
      >
        {typeof timer === "undefined" ? children : <DeletionConfirmation time={timer} />}
      </Button>
    );
  }
}
