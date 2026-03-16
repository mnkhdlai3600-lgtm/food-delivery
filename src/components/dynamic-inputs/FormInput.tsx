import { Input } from "../ui/input";
import { InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputErrorMessage?: string;
  inputError?: string | false;
  name: string;
  placeholder: string;
};

export const FormInput = ({
  inputErrorMessage,
  inputError = false,
  name,
  placeholder,
  ...props
}: FormInputProps) => {
  const inputBorderErrorStyle = inputError
    ? "border-red-500 focus-visible:ring-red-300"
    : "border-slate-200 focus-visible:ring-slate-300";

  return (
    <div className="flex flex-col gap-1.5">
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        className={`h-12 rounded-2xl bg-slate-50 px-4 ${inputBorderErrorStyle}`}
        {...props}
      />
      {inputError && (
        <span className="text-sm font-medium text-red-500">
          {inputErrorMessage}
        </span>
      )}
    </div>
  );
};
