import React, { Component, ComponentType } from "react";

export interface WithDrawerHOCProps {
  openDrawer: string;
  toggleActiveDrawer: (view: string, drawer: string) => void;
}

export default <P extends object>(WrappedComponent: ComponentType<P>) => (
  class extends Component<P & {[key: string]: any}> {
    constructor(props: any) {
      super(props);
      this.state = {
        openDrawer: "",
      };
    }

    public handleToggle = (view: string, drawer = "") => {
      // NOTE: If we were to use redux for drawers,
      // we could move this logic to DrawerLabel or Drawer.
      this.setState({ openDrawer: drawer });
    }

    public render() {
      return (
        <WrappedComponent
          toggleActiveDrawer={this.handleToggle}
          openDrawer={this.state.openDrawer}
          {...this.props}
        />
      );
    }
  }
);
