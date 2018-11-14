import { path } from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Prompt } from "react-router";

interface ViewProps {
  props: {
    unsaved: boolean;
  };
  setUnsaved: () => void;
}

const setUnsaved = () => {
  // TODO:  toggle unsaved state;
};

class NewView extends Component<ViewProps> {
  public handleClick = () => {
    this.props.setUnsaved();
  }

  public render() {
    const { props: { unsaved } } = this.props;
    return (
      <>
        <Prompt
          when={unsaved}
          message="You have unsaved changes, are you sure you want to leave?"
        />
        <div>Create new appliance</div>
        <button onClick={this.handleClick}>Toggle unsaved</button>
      </>
    );
  }
}

const mapStateToProps = (state: object) => ({
  props: path(["views", "appliances", "tabs", "new", "props"], state),
});

export default connect<{}, {}, ViewProps>(
  mapStateToProps,
  {
    setUnsaved,
  }
)(NewView);
