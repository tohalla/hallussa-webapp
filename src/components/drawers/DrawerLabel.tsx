import classNames from "classnames";
import React, { Component } from "react";

const styledDrawer = "";

interface Props {
  label: string;
  view: string;
  drawerId: string;
  isActive: boolean;
  toggleActiveDrawer: (view: string, drawerId: string) => void;
}

export default class DrawerLabel extends Component<Props> {
  public handleToggle = () => {
    const { view, drawerId } = this.props;
    this.props.toggleActiveDrawer(view, drawerId);
  }

  public render() {
    const { isActive, label } = this.props;
    const className = classNames({
      active: isActive,
      styledDrawer,
    });
    return (
      <div onClick={this.handleToggle}>
        <p className={className}>{label}</p>
      </div>
    );
  }
}
