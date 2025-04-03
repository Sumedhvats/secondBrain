interface IconProps {
  size: "sm" | "md" | "lg";
}
const iconVarients = {
    sm: "16", // ⬅️ Fixed: "sm" should be smallest
    md: "20", // ⬅️ Fixed: "md" should be medium-sized
    lg: "24", // ⬅️ Fixed: "lg" should be largest
};

export const TweetIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconVarients[props.size]|| 22}
      height={iconVarients[props.size]|| 22}
      fill="currentColor"
      className="mr-2"
      viewBox="0 0 16 16"
    >
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
    </svg>
  );
};
