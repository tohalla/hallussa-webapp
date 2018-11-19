import classnames from "classnames";
import React, { MouseEventHandler } from "react";
import { TabPayload } from "./actions";

interface Props extends TabPayload {
  label: string;
  onClose: MouseEventHandler<HTMLElement>;
}

const icons = ["add"]; // labels that should be displayed as material icon

/**
 * TabComponent - Functional React Component
 * Renders a wrapper for the contents of a Tab.
 * Generic onClick event on a Tab bubbles from this component.
 */
export default (props: Props) => {
  const { label, sticky, onClose } = props;
  return (
    <>
      <span className={classnames({"material-icons": icons.indexOf(label) > -1})}>{label}</span>
      {!sticky && <i className={classnames("material-icons")} onClick={onClose}>close</i>}
    </>
  );
};
