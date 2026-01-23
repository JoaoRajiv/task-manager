export default function Button({
  children,
  variant,
  size,
  className,
  ...rest
}) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-brand-primary text-white";
      case "secondary":
        return "bg-brand-light-gray text-brand-dark-blue hover:bg-brand-gray";
      case "danger":
        return "bg-transparent text-brand-text-gray hover:bg-brand-danger hover:text-white";
      default:
        return "bg-brand-primary text-white";
    }
  };
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "py-1 text-xs";
      case "large":
        return "py-2 text-sm";
      default:
        return "py-1 text-xs";
    }
  };
  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-md px-2 ${getSizeClasses()} font-semibold transition hover:opacity-80 ${getVariantClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
