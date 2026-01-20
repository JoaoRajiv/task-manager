export default function SidebarButton({ children, variant, icon }) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'selected':
        return 'bg-[#E6F7F8] text-[#00ADb5]';
      case 'default':
      default:
        return 'hover:bg-[#e0f7f9]';
    }
  };
  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-4 py-2 ${getVariantClasses()}`}
    >
      {icon}
      {children}
    </a>
  );
}
