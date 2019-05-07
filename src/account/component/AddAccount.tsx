import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../component/button/Button";
import Input from "../../component/Input";
import { rowContainer } from "../../style/container";

export default () => {
  const [email, setEmail] = useState("");
  const {t} = useTranslation();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => setEmail(e.target.value);
  const handleClick: MouseEventHandler = () => false;

  return (
    <div className={rowContainer}>
      <Input
        value={email}
        name="email"
        type="email"
        onChange={handleChange}
        placeholder={t("organisation.account.field.email")}
        size={30}
      />
      <Button type="button" onClick={handleClick}>
        {t("organisation.account.addAccount")}
      </Button>
    </div>
  );
};
