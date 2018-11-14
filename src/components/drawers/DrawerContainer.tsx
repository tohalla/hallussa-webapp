import { head, path } from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";
import Drawer, { Props as DrawerInterface } from "./Drawer";

interface ExtendedDrawerProps extends DrawerInterface {
  content: Node;
  activeDrawer: string;
}

interface Props {
  drawers: ExtendedDrawerProps[];
  view: string;
  toggleActiveDrawer: (view: string, drawerId: string) => void;
}

const toggleActiveDrawer = (view: string, drawerId: string) => {
  console.log("This would be Redux action");
};

class DrawerContainer extends Component<Props> {
  public toggleActiveDrawer = (drawerId: string) => () => {
    const { view } = this.props;
    this.props.toggleActiveDrawer(view, drawerId);
  }

  public render() {
    const { drawers, view } = this.props;
    return (
      <div>
        {drawers.map((drawer, i) => {
          const {
            content,
            label,
            drawerId,
            activeDrawer,
          } = drawer;
          return (
            <Drawer
              key={`drawer_${i}`}
              label={label}
              drawerId={drawerId}
              isActive={activeDrawer === drawerId}
              toggleActiveDrawer={this.toggleActiveDrawer(drawerId)}
              view={view}
            >
              {content}
            </Drawer>
          );
        })}
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  view: head(path(["location", "pathname"], ownProps) as string),
});

export default connect(
  mapStateToProps,
  {
    toggleActiveDrawer,
  }
)(DrawerContainer as any);
