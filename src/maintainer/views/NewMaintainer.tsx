import React, { Component } from "react";
import { connect } from "react-redux";
import { Prompt } from "react-router";

interface Props {
  unsaved: boolean;
  setUnsaved: () => void;
}

const setUnsaved = () => {
  // TODO:  toggle unsaved state;
};

class NewMaintainer extends Component<Props> {
  public static defaultProps = {
    unsaved: false,
  };

  public handleClick = () => {
    this.props.setUnsaved();
  }

  public render() {
    const { unsaved = false } = this.props;
    return (
      <>
        <Prompt
          when={unsaved}
          message="You have unsaved changes, are you sure you want to leave?"
        />
        <div>Create new maintainer</div>
        <button onClick={this.handleClick}>Toggle unsaved</button>
      </>
    );
  }
}

export default connect(
  undefined,
  {
    setUnsaved,
  }
)(NewMaintainer);
