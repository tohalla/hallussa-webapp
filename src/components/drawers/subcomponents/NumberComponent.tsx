import classNames from "classnames";
import React from "react";

import { numberBlock, outerBlock } from "styles/block";
import { small } from "../../../styles/inline";

interface Props {
  number: string | number;
  label: string;
  size: string;
  alert?: boolean;
}

const NumberComponent = (props: Props) => {
  const { number: n, size, label, alert } = props;
  const innerCn = classNames(size, numberBlock, {
    alert,
  });
  return (
    <div className={outerBlock}>
      <div className={innerCn}>
        {n}
      </div>
      <p className={small}>{label}</p>
    </div>
  );
};

NumberComponent.defaultProps = {
  alert: false,
};

export default NumberComponent;
