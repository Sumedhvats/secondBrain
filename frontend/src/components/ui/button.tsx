import { ReactElement } from "react";

export interface ButtonProps {
  type: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onclick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const variant = {
  primary: "bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] text-white hover:shadow-lg hover:shadow-[rgb(var(--color-primary))]/30 hover:scale-[1.02] active:scale-[0.98]",
  secondary: "bg-[rgb(var(--color-primary-light))] text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary-light))]/80 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
};

const size = {
  sm: "rounded-lg px-4 py-2 text-sm",
  md: "rounded-xl px-10 py-2.5 text-base shadow-md",
  lg: "rounded-2xl px-14 py-4 text-lg shadow-lg",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onclick}
      className={`
        ${variant[props.type]} 
        ${size[props.size || "sm"]} 
        flex items-center justify-center gap-2
        font-medium
        cursor-pointer 
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus-ring
      `}
      disabled={props.loading || props.disabled}
      aria-busy={props.loading}
    >
      {props.loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        props.startIcon && <div className="flex items-center">{props.startIcon}</div>
      )}
      {props.text}
      {props.endIcon && <div className="flex items-center">{props.endIcon}</div>}
    </button>
  );
};
