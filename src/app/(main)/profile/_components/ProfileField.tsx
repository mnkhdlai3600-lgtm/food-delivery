"use client";

type ProfileFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export const ProfileField = ({
  label,
  value,
  placeholder,
  disabled,
  onChange,
}: ProfileFieldProps) => {
  return (
    <div>
      <p className="mb-2 text-sm text-gray-400">{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-700 bg-[#27272A] px-4 py-3 text-white outline-none disabled:cursor-not-allowed disabled:opacity-70"
      />
    </div>
  );
};
