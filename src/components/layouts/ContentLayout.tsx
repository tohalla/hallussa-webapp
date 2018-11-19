import { leftContainer } from "emotion-styles/sidebar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default (props: Props) => {
  return (
    <div className={leftContainer}>
      {props.children}
    </div>
  );
};
