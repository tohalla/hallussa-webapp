import classNames from "classnames";
import React from "react";

import inlineBlock, { numberBlock } from "emotion-styles/block";

interface Props {
  number: string | number;
  label: string;
  size: string;
  alert?: boolean;
}

const NumberComponent = (props: Props) => {
  const { number: n, size, label, alert } = props;
  const outerCn = classNames(inlineBlock, "padded");
  const innerCn = classNames(size, numberBlock, {
    alert,
  });
  return (
    <div className={outerCn}>
      <div className={innerCn}>
        {n}
      </div>
      <p>{label}</p>
    </div>
  );
};

NumberComponent.defaultProps = {
  alert: false,
};

export default NumberComponent;
