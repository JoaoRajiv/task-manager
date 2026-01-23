import InputErrorMessage from "./InputErrorMessage";
import InputLabel from "./InputLabel";
import { forwardRef } from "react";

export const TimeSelect = forwardRef(({ errorMessage, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Período do dia</InputLabel>
      <select
        id="time"
        className={`focus:border-brand-blue rounded-lg border border-solid border-brand-light-gray px-4 py-3 placeholder:text-sm placeholder:text-brand-text-gray focus:outline-brand-primary ${errorMessage ? "border-red-500" : "border-brand-light-gray"}`}
        ref={ref}
        {...props}
      >
        <option value="" default>
          Selecione o período
        </option>
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
      {props.errorMessage && (
        <InputErrorMessage>{props.errorMessage}</InputErrorMessage>
      )}
    </div>
  );
});

TimeSelect.displayName = "TimeSelect";

export default TimeSelect;
