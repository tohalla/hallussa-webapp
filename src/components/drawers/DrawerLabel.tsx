import classNames from "classnames";
import React, { Component } from "react";

import { label as labelStyle } from "emotion-styles/drawer";

interface Props {
  label: string;
  expand: boolean;
  handleToggle(): any;
}

export default class DrawerLabel extends Component<Props> {
  public render() {
    const { expand, label, handleToggle } = this.props;
    const className = classNames(labelStyle, {
      open: expand,
    });
    return (
      <div onClick={handleToggle}>
        <p className={className}>{label}</p>
      </div>
    );
  }
}
