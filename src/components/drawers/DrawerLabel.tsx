import classNames from "classnames";
import React, { Component } from "react";

import { label as labelStyle } from "emotion-styles/drawer";

interface Props {
  label: string;
  view: string;
  drawerId: string;
  isOpen: boolean;
  toggleDrawer: (view: string, drawerId: string) => void;
}

export default class DrawerLabel extends Component<Props> {
  public handleToggle = () => {
    const { view, drawerId, isOpen } = this.props;
    const drawer = isOpen ? "" : drawerId;
    this.props.toggleDrawer(view, drawer);
  }

  public render() {
    const { isOpen, label } = this.props;
    const className = classNames(labelStyle, {
      open: isOpen,
    });
    return (
      <div onClick={this.handleToggle}>
        <p className={className}>{label}</p>
      </div>
    );
  }
}
