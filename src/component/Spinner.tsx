import React from "react";

import Spinner from "../../assets/img/spinner.svg";
import { spinner } from "../style/container";

export default () => {
  return (
    <div className={spinner}>
      <Spinner />
    </div>
  );
};
