import React, { Component, ComponentType } from "react";

// TODO: This is just silly...
const calcMaxHeight = (drawerCount: number) => {
  return `calc(100% - 5rem - ${51 * drawerCount}px)`;
};

export default <P extends object>(WrappedComponent: ComponentType<P>, drawerCount: number) => (
  class extends Component<P & {[key: string]: any}> {
    constructor(props) {
      super(props);
      this.maxHeight = calcMaxHeight(drawerCount);
    }

    public render() {
      return (
        <WrappedComponent maxHeight={this.maxHeight} />
      );
    }
  }
);
