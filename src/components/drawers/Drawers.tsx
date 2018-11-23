import { assocPath, map } from "ramda";
import React from "react";
import Drawer from "./Drawer";

interface Props {
  drawers: {[key: string]: {label: string, content: JSX.Element}};
}

interface State {
  expand: {
    [key: string]: boolean;
  };
}

export default class Drawers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expand: map(() => false, props.drawers),
    };
  }

  public handleToggle = (drawer: string) => () =>
    this.setState(assocPath(["expand", drawer], !this.state.expand[drawer]))

  public render() {
    const {drawers} = this.props;
    return (
      map(
        (d) => {
          const {content, ...drawerProps} = drawers[d];
          return (
            <Drawer
              key={d}
              expand={this.state.expand[d]}
              handleToggle={this.handleToggle(d)}
              {...drawerProps}
            >
              {content}
            </Drawer>
          );
        },
        Object.keys(drawers)
      )
    );
  }
}
