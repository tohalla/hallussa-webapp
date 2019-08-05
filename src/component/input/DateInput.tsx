import { format as dateFNSFormat } from "date-fns";
import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DayPickerInputProps } from "react-day-picker/types/props";

interface Props {
  onDayChange: DayPickerInputProps["onDayChange"];
  placeholder: DayPickerInputProps["placeholder"];
}

const formatDate = (date: Date, f: string, locale: string) => dateFNSFormat(date, f, {locale});

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
