import { ReactElement } from "react";

export interface ButtonProps {
  type: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  text: string;
  startIcon: ReactElement;
  endIcon?: ReactElement;
  onclick: () => void;
}
const varient ={
  "primary":"bg-[#5046e4] text-white",
  "secondary":"bg-[#e0e7ff] text-[#5046e4]"
}
const size ={
  "sm":"rounded-lg pr-4 py-1 m-5 pl-3 ",
  "md":"rounded-xl pr-10 py-2.5 text-2xl m-5 pl-4.5",
  "lg":"rounded-2xl pr-14 py-4 text-3xl m-5 pl-6",
}
export const Button = (props: ButtonProps) => {

  return <button className = {`${varient[props.type]} ${size[props.size || "sm"] } flex  `}>{props.startIcon?<div className="flex items-center pr-3 ">{props.startIcon}</div>:null} {props.text} {props.endIcon}</button>
};
