import { ReactElement } from "react";

export interface ButtonProps {
  type: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onclick: () => void;
  loading?: boolean;  // New loading prop
}

const variant = {
  primary: "bg-[#7755c5] text-white",
  secondary: "bg-[#e0e7ff] text-[#7755c5]",
};

const size = {
  sm: "rounded-lg pr-4 py-1 pl-3",
  md: "rounded-xl px-10 py-2.5 text-lg shadow-lg",
  lg: "rounded-2xl pr-14 py-4 text-3xl pl-6",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onclick}
      className={`${variant[props.type]} ${size[props.size || "sm"]} flex items-center justify-center cursor-pointer hover:scale-105 transition disabled:opacity-50`}
      disabled={props.loading}
    >
      {props.loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      ) : (
        props.startIcon && <div className="flex items-center pr-3">{props.startIcon}</div>
      )}
      {props.text}
      {props.endIcon}
    </button>
  );
};
