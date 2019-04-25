import React, { Component } from "react";

import { label as labelStyle, labelExpanded } from "style/drawer";

interface Props {
  label: string;
  expand: boolean;
  handleToggle(): any;
}

export default class DrawerLabel extends Component<Props> {
  public render() {
    const { expand, label, handleToggle } = this.props;
    return (
      <div className={expand ? labelExpanded : labelStyle} onClick={handleToggle}>
        {label}
      </div>
    );
  }
}
