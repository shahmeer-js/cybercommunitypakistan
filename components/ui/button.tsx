import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "font-mono tracking-wider font-semibold transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent-main/50";

  const variants = {
    primary:
      "bg-accent-main text-bg-main hover:bg-foreground-main/90 active:scale-[0.98]",
    secondary:
      "border border-card-stroke bg-card-main text-foreground-main hover:bg-card-hover hover:border-accent-muted/40",
    outline:
      "border border-accent-main text-accent-main bg-transparent hover:bg-accent-main hover:text-bg-main active:scale-[0.98]",
    ghost: "text-accent-muted hover:text-foreground-main bg-transparent",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 border-[0.5px]",
    md: "text-sm px-5 py-2.5",
    lg: "text-sm md:text-base px-8 py-3.5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
