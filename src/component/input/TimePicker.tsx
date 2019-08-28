import React from "react";

export interface TimePickerProps extends Partial<Pick<
  HTMLInputElement,
  "placeholder" | "disabled" | "required"
>> {
  value?: string;
  onChange(value: string): void;
}

const TimePicker = ({value, onChange, ...props}: TimePickerProps) => {
  return (
    <input
      value={value}
      type="time"
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
};

export default TimePicker;
