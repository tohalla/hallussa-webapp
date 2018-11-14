import classNames from "classnames";
import React from "react";

const styledNumberBlock = "";

interface Props {
  number: string | number;
  label: string;
  size: string;
}

export default (props: Props) => {
  const { number: n, size, label } = props;
  const cn = classNames({
    size,
    styledNumberBlock,
  });
  return (
    <div>
      <div className={cn}>
        {n}
      </div>
      <p>{label}</p>
    </div>
  );
};
