import { ReactElement } from "react";

interface sidebarItemProps {
  icon: ReactElement;
  text: string;
  size?: "lg" | "md" | "sm";
  onclick: () => void;
  active?: boolean;
}

const sizeValues = {
  sm: "px-4 py-2.5 text-base",
  md: "px-5 py-3 text-lg",
  lg: "px-6 py-4 text-xl",
};

export const SidebarItem = (props: sidebarItemProps) => {
  return (
    <button
      onClick={props.onclick}
      className={`
        ${sizeValues[props.size || "md"]}
        flex items-center gap-3 w-full
        rounded-lg
        text-[rgb(var(--color-text-secondary))]
        hover:bg-[rgb(var(--color-bg-tertiary))]
        hover:text-[rgb(var(--color-text-primary))]
        hover:scale-[1.02]
        transition-all duration-200
        ${props.active ? 'bg-gradient-to-r from-[rgb(var(--color-primary-light))] to-[rgb(var(--color-accent-light))] text-[rgb(var(--color-primary))] shadow-sm' : ''}
        focus-ring
      `}
    >
      <div className="flex items-center">{props.icon}</div>
      <span className="font-medium">{props.text}</span>
    </button>
  );
};
