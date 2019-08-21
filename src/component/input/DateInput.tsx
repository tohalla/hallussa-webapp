import { format as dateFNSFormat } from "date-fns";
import { enGB, enUS, fi } from "date-fns/locale";
import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DayPickerInputProps } from "react-day-picker/types/props";

const locales = {enUS, fi, enGB};

interface Props {
  onDayChange: DayPickerInputProps["onDayChange"];
  placeholder: DayPickerInputProps["placeholder"];
}

const formatDate = (date: Date, f: string, locale: keyof typeof locales) =>
  dateFNSFormat(date, f, {locale: locales[locale]});

const format = "MM.DD.YYYY";

const DateInput = (props: Props) => (
  <DayPickerInput
    formatDate={formatDate}
    format={format}
    {...props}
  />
);

DateInput.defaultProps = {
  placeholder: format,
};

export default DateInput;
