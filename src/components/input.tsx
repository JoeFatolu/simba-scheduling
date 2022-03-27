import React, { InputHTMLAttributes } from "react";

interface InputPros extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: boolean;
  id: string;
  helperText?: string;
}

export default function Input({ label, id, error, helperText, ...props }: InputPros) {
  return (
    <div className="flex flex-col mb-8">
      <label htmlFor={id} className="mb-4 font-medium">
        {label}
      </label>
      <input id={id} name={id} className="h-[40px] p-4 border-2 rounded-lg border-blue-400 hover:border-t-blue-500" {...props} />
      {helperText && <div className="helpertext">{helperText}</div>}
    </div>
  );
}
