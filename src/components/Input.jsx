export default function Input({ label, errorMessage, ...rest }) {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <label
        className="text-sm font-semibold text-brand-dark-blue"
        htmlFor={rest.id}
      >
        {label}
      </label>
      <input
        className={`focus:border-brand-blue rounded-lg border border-solid px-4 py-3 placeholder:text-sm placeholder:text-brand-text-gray focus:outline-brand-primary ${errorMessage ? "border-red-500" : "border-brand-light-gray"}`}
        {...rest}
      />
      {errorMessage && (
        <p className="text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
