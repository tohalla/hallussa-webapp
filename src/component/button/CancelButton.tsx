import React from "react";
import { useTranslation } from "react-i18next";

import { History } from "history";
import { link } from "../../style/inline";
import Button from "./Button";

export default (props: {history: History}) => {
  const {t} = useTranslation();
  return (
    <Button className={link} plain={true} onClick={props.history.goBack}>
      {t("cancel")}
    </Button>
  );
};
