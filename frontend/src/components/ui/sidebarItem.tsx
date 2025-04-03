import { ReactElement } from "react";

interface sidebarItemProps {
  icon: ReactElement;
  text: string;
  size?: "lg" | "md" | "sm";
}
const sizeValues = {
  sm: "rounded-lg pr-10 py-1 m-5 pl-3 ",
  md: "rounded-xl pr-14 py-2.5 text-2xl m-5 pl-4.5",
  lg: "rounded-2xl pr-18 py-4 text-3xl m-5 pl-6",
};
export const SidebarItem = (props: sidebarItemProps) => {
  return (
    <div className={`${sizeValues[props.size || "sm"]} flex items-center`}>
      <div>{props.icon}</div>
      {props.text}
    </div>
  );
};
