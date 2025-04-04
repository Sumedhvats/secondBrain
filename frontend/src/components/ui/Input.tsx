
export const InputElement = ({
  placeholder,
  type = "text",
  reference
}: {
  placeholder: string;
  type?: string;
  reference?:any
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2 inset-shadow-2xs rounded-md focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
        ref={reference}
      />
    </div>
  );
};
