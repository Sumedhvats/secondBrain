import { ReactElement } from "react";

export interface ButtonProps {
  type: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onclick: () => void;
}
const varient ={
  "primary":"bg-[#7755c5] text-white",
  "secondary":"bg-[#e0e7ff] text-[#7755c5]"
}
const size ={
  "sm":"rounded-lg pr-4 py-1 pl-3 ",
  "md":"rounded-xl px-10 py-2.5 text-lg shadow-lg",
  "lg":"rounded-2xl pr-14 py-4 text-3xl pl-6",
}
export const Button = (props: ButtonProps) => {

  return <button onClick={props.onclick} className = {`${varient[props.type]} ${size[props.size || "sm"] } flex cursor-pointer hover:scale-105 transition`}>{props.startIcon?<div className="flex items-center pr-3 ">{props.startIcon}</div>:null} {props.text} {props.endIcon}</button>
};
