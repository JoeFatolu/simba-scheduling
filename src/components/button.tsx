import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="bg-blue-400 rounded-2 h-[40px] hover:bg-blue-500 font-medium text-white" {...props}>
      {children}
    </button>
  );
}
