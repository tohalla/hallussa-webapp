import classNames from "classnames";
import React from "react";

import inlineBlock, { numberBlock } from "emotion-styles/block";

interface Props {
  number: string | number;
  label: string;
  size: string;
}

export default (props: Props) => {
  const { number: n, size, label } = props;
  const outerCn = classNames(inlineBlock, "padded");
  const innerCn = classNames(size, numberBlock);
  return (
    <div className={outerCn}>
      <div className={innerCn}>
        {n}
      </div>
      <p>{label}</p>
    </div>
  );
};
