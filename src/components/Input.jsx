import { forwardRef } from "react";
import InputLabel from "./InputLabel";
import InputErrorMessage from "./InputErrorMessage";

export const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className={`focus:border-brand-blue rounded-lg border border-solid px-4 py-3 placeholder:text-sm placeholder:text-brand-text-gray focus:outline-brand-primary ${errorMessage ? "border-red-500" : "border-brand-light-gray"}`}
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  );
});

export default Input;
