import classnames from "classnames";
import React, { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { TabPayload } from "./actions";

interface Props extends TabPayload {
  onClose: MouseEventHandler<HTMLElement>;
}

const icons = ["add"]; // labels that should be displayed as material icon

/**
 * TabComponent - Functional React Component
 * Renders a wrapper for the contents of a Tab.
 * Generic onClick event on a Tab bubbles from this component.
 */
export default (props: Props) => {
  const {label, sticky, onClose} = props;
  const {t} = useTranslation();
  return (
    <>
      <span className={classnames({"material-icons": typeof label === "string" && icons.indexOf(label) > -1})}>
        {typeof label === "function" ? label({t}) : label}
      </span>
      {!sticky && <i className={classnames("material-icons")} onClick={onClose}>close</i>}
    </>
  );
};
