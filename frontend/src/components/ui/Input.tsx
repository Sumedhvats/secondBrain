interface InputProps {
  placeholder: string;
  type?: string;
  reference?: any;
  onBlur?: () => void;
  label?: string;
  error?: string;
}

export const InputElement = ({
  placeholder,
  type = "text",
  reference,
  onBlur,
  label,
  error,
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1.5 text-[rgb(var(--color-text-primary))]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2.5 rounded-lg
          bg-[rgb(var(--color-bg-primary))]
          border border-[rgb(var(--color-border))]
          text-[rgb(var(--color-text-primary))]
          placeholder:text-[rgb(var(--color-text-tertiary))]
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]/30 focus:border-[rgb(var(--color-primary))]
          hover:border-[rgb(var(--color-border-hover))]
          ${error ? 'border-[rgb(var(--color-error))] focus:ring-[rgb(var(--color-error))]/30' : ''}
        `}
        ref={reference}
        onBlur={onBlur}
      />
      {error && (
        <p className="mt-1 text-sm text-[rgb(var(--color-error))]">{error}</p>
      )}
    </div>
  );
};
