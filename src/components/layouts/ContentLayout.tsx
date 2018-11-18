import React, { ReactNode } from "react";

const styledContentLayout = "";

interface Props {
  children: ReactNode;
}

export default (props: Props) => {
  return (
    <div className={styledContentLayout}>
      {props.children}
    </div>
  );
};
