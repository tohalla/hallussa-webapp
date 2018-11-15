import classnames from "classnames";
import React, { ReactChild } from "react";
import { dark } from "../../emotion-styles/src/inline";
import Button from "../Button";
import { TabPayload } from "./actions";

// TODO: Import from styles repository
const styledTabComponent = "";

interface Props extends TabPayload {
  children: ReactChild[] | ReactChild;
  onClose(): any;
}

/**
 * TabComponent - Functional React Component
 * Renders a wrapper for the contents of a Tab.
 * Generic onClick event on a Tab bubbles from this component.
 */
export default (props: Props) => {
  const { children, sticky, onClose } = props;
  const className = classnames({
    // TODO: [activeTabStyle]:
    styledTabComponent,
  });
  return (
    <div className={className}>
      {children}
      {!sticky &&
        <Button onClick={onClose} plain={true}>
          <i className={classnames("material-icons", dark)}>close</i>
        </Button>
      }
    </div>
  );
};
