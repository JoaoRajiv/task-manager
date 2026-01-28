import { tv } from "tailwind-variants";
import PropTypes from "prop-types";

export default function Button({ children, color, size, className, ...rest }) {
  const button = tv({
    base: `flex items-center justify-center gap-1 rounded-md px-2 font-semibold transition hover:opacity-80`,
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        secondary:
          "hover:bg-brand-gray bg-brand-light-gray text-brand-dark-blue",
        danger:
          "bg-transparent text-brand-text-gray hover:bg-brand-danger hover:text-white",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
      disabled: {
        true: "opacity-50 hover:opacity-50",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "large",
    },
  });
  return (
    <button
      className={button({ color, size, className, disabled: rest.disabled })}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["small", "large"]),
  className: PropTypes.string,
};
