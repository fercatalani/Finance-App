import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
};

export const Button = ({
  children,
  isLoading,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const base =
    "w-full cursor-pointer rounded-full font-medium duration-400 ease-in-out transition-colors py-3 px-6";
  const variants = {
    primary:
      "bg-[var(--charcoal-blue)] text-white hover:bg-[var(--steel-blue)]",
    secondary:
      "bg-transparent border text-[var(--charcoal-blue)] hover:bg-gray-100",
  };

  return (
    <button {...props} className={`${base} ${variants[variant]}`}>
      {isLoading ? "Loading..." : children}
    </button>
  );
};
