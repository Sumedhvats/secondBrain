interface IconProps {
  size: "sm" | "md" | "lg";
}
const iconVarients = {
    sm: "16", // ⬅️ Fixed: "sm" should be smallest
    md: "20", // ⬅️ Fixed: "md" should be medium-sized
    lg: "24", // ⬅️ Fixed: "lg" should be largest
};

export const TagsIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconVarients[props.size]|| 22}
      height={iconVarients[props.size]|| 22}
      fill="currentColor"
 className="mr-2"
      viewBox="0 0 16 16"
    >
      <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0" />
      <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z" />
    </svg>
  );
};
