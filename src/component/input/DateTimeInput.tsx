import classnames from "classnames";
import { format, parse, setDate, setHours, setMinutes, setMonth, setYear } from "date-fns";
import { enGB, enUS, fi } from "date-fns/locale";
import { css } from "emotion";
import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DayPickerProps } from "react-day-picker/types/props";

import { contentHorizontalSpacing, rowContainer } from "../../style/container";
import { greyscale } from "../../style/variables/colors";
import { minor } from "../../style/variables/spacing";
import TimePicker, { TimePickerProps } from "./TimePicker";

const locales = {enUS, fi, enGB};

interface Props {
  dayPickerProps?: Partial<Omit<DayPickerProps, "classNames" | "formatDate" | "format" | "onDayChange" | "value">>;
  timePickerProps?: Partial<Omit<TimePickerProps, "value" | "onChange">>;
  value?: Date;
  selectTime: boolean;
  onChange(value: Date): void;
}

const dateFormat = "dd.MM.yyyy"; // TODO: derive from locale
const timeFormat = "HH:mm"; // TODO: derive from locale

const setTime = (date: Date, time: string | Date) => {
  const t = typeof time === "string" ? parse(time, timeFormat, new Date()) : time;
  return setMinutes(setHours(date, t.getHours()), t.getMinutes());
};

const DateTimeInput = ({onChange, value, selectTime, dayPickerProps, timePickerProps}: Props) => {
  const formatDate = (date: Date, f: string, locale: keyof typeof locales) =>
    format(date, f, {locale: locales[locale]});

  return (
    <div className={classnames(rowContainer, contentHorizontalSpacing)}>
      <DayPickerInput
        classNames={{
          container: "",
          overlay: "",
          overlayWrapper: css`
            position: fixed;
            margin: ${minor} 0 0 ${minor};
            background: ${greyscale[9]};
            border: 1px solid ${greyscale[5]};
            z-index: 9;
          `,
        }}
        formatDate={formatDate}
        format={dateFormat}
        onDayChange={(date) =>
          onChange(setDate(setMonth(setYear(
            value || setTime(date, new Date()),
            date.getFullYear()
          ), date.getMonth()), date.getDay()))
        }
        placeholder={format(new Date(), dateFormat)}
        {...dayPickerProps}
      />
      {selectTime && (
        <TimePicker
          value={format(value || new Date(), timeFormat)}
          onChange={(time) => onChange(setTime(value || new Date(), time || new Date()))}
          {...timePickerProps}
          disabled={(timePickerProps && timePickerProps.disabled) || !value}
          required={true}
        />
      )}
    </div>
  );
};

DateTimeInput.defaultProps = {
  selectTime: true,
};

export default DateTimeInput;
