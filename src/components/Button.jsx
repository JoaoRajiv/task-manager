export default function Button({ children, variant }) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-brand-primary text-white";
      case "danger":
        return "bg-brand-danger text-white";
      default:
        return "bg-brand-primary text-white";
    }
  };
  return (
    <button
      className={`flex items-center gap-1 rounded-md px-3 py-2 text-xs font-semibold transition hover:opacity-80 ${getVariantClasses()}`}
    >
      {children}
    </button>
  );
}
