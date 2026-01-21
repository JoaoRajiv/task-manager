export default function Input({ label, ...rest }) {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <label
        className="text-sm font-semibold text-brand-dark-blue"
        for={rest.id}
      >
        {label}
      </label>
      <input
        className="focus:border-brand-blue rounded-lg border border-solid border-brand-light-gray px-4 py-3 placeholder:text-sm placeholder:text-brand-text-gray focus:outline-brand-primary"
        {...rest}
      />
    </div>
  );
}
