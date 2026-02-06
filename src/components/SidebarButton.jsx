import { tv } from "tailwind-variants";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function SidebarButton({ children, color, to }) {
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
    <NavLink
      to={to}
      className={({ isActive }) =>
        sidebar({ color: isActive ? "selected" : "unselected" })
      }
    >
      {children}
    </NavLink>
  );
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["unselected", "selected"]).isRequired,
  to: PropTypes.string.isRequired,
};
