import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ["aria-label"]: string;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type = "button", className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        {...rest}
        className={twMerge(
          "inline-flex items-center justify-center gap-x-1 text-sm font-medium uppercase sm:gap-x-2",
          className
        )}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
