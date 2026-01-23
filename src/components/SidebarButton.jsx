export default function SidebarButton({ children, variant }) {
  const getVariantClasses = () => {
    switch (variant) {
      case "selected":
        return "bg-brand-primary/10 text-brand-primary";
      case "default":
      default:
        return "hover:bg-brand-primary/10";
    }
  };
  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-4 py-2 ${getVariantClasses()}`}
    >
      {children}
    </a>
  );
}
