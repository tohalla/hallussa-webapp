import React from "react";
import { useTranslation } from "react-i18next";

import { History } from "history";
import { withRouter } from "react-router";
import Button from "./Button";

export default withRouter((props: {history: History}) => {
  const {t} = useTranslation();
  return (
    <Button plain={true} onClick={props.history.goBack}>
      {t("cancel")}
    </Button>
  );
});
