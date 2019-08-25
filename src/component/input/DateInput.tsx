import { format as dateFNSFormat } from "date-fns";
import { enGB, enUS, fi } from "date-fns/locale";
import { css } from "emotion";
import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DayPickerInputProps } from "react-day-picker/types/props";

import { greyscale } from "../../style/variables/colors";
import { minor } from "../../style/variables/spacing";

const locales = {enUS, fi, enGB};

interface Props {
  onDayChange: DayPickerInputProps["onDayChange"];
  placeholder: DayPickerInputProps["placeholder"];
}

const formatDate = (date: Date, f: string, locale: keyof typeof locales) =>
  dateFNSFormat(date, f, {locale: locales[locale]});

const format = "dd.MM.yyyy";

const DateInput = (props: Props) => (
  <DayPickerInput
    classNames={{
      container: "",
      overlay: "",
      overlayWrapper: css`
        position: fixed;
        margin: ${minor} 0 0 ${minor};
        background: ${greyscale[9]};
        border: 1px solid ${greyscale[5]};
      `,
    }}
    formatDate={formatDate}
    format={format}
    inputProps={{placeholder: ""}}
    {...props}
  />
);

DateInput.defaultProps = {
  placeholder: format,
};

export default DateInput;
