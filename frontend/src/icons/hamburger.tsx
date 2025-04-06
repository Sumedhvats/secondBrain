interface IconProps {
  size: "sm" | "md" | "lg";
}
const iconVarients = {
    sm: "w-4 h-4",   // 16px
    md: "w-5 h-5",   // 20px
    lg: "w-6 h-6",   // 24px
  };

export const HamburgerIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconVarients[props.size]}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
};
