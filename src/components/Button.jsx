import { tv } from "tailwind-variants";

export default function Button({ children, color, size, className, ...rest }) {
  const button = tv({
    base: "flex items-center justify-center gap-1 rounded-md px-2 font-semibold transition hover:opacity-80",
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        secondary:
          "bg-brand-light-gray text-brand-dark-blue hover:bg-brand-gray",
        danger:
          "bg-transparent text-brand-text-gray hover:bg-brand-danger hover:text-white",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "large",
    },
  });
  return (
    <button className={button({ color, size, className })} {...rest}>
      {children}
    </button>
  );
}
