import { tv } from "tailwind-variants";

export default function SidebarButton({ children, color }) {
  const sidebar = tv({
    base: "flex items-center gap-2 rounded-lg px-4 py-2",
    variants: {
      color: {
        unselected: "text-brand-dark-blue hover:bg-brand-primary/10",
        selected: "bg-brand-primary/10 text-brand-primary",
      },
    },
  });
  return (
    <a href="#" className={sidebar({ color })}>
      {children}
    </a>
  );
}
