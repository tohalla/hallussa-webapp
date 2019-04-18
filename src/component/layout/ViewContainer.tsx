import classNames from "classnames";
import React, { ReactNode } from "react";

import { viewContainer } from "style/container";

interface Props {
  className?: string;
  children: ReactNode;
}

export default ({className, ...props}: Props) => (
  <div className={classNames(viewContainer, className)} {...props} />
);
