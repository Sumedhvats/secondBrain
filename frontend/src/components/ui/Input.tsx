export const InputElement = ({
  onChange,
  placeholder,
  type = "text",
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2 inset-shadow-2xs rounded-md focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
        onChange={onChange}
      />
    </div>
  );
};
