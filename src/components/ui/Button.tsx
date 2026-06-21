import type { ButtonHTMLAttributes } from "react";

const Button = ({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`rounded-xl bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;