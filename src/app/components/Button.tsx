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
  className,
  ...rest
}: ButtonProps) => {
  const base =
    "w-full cursor-pointer rounded-full font-medium duration-400 ease-in-out transition-colors py-3 px-6";
  const variants = {
    primary:
      "bg-[var(--primary-cta)] text-white hover:bg-[var(--primary-cta-hover)]",
    secondary:
      "bg-transparent border border-[var(--neutral-muted)] text-[var(--neutral-ink)] hover:bg-[var(--neutral-surface)]",
  };

  return (
    <button {...rest} className={`${base} ${variants[variant]} ${className}`}>
      {isLoading ? "Loading..." : children}
    </button>
  );
};
