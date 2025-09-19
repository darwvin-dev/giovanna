import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-300 bg-white/5 px-3 py-2 text-sm 
        placeholder-gray-800 text-black focus:outline-none focus:ring-2 focus:ring-amber-500 ${className}`}
    />
  );
}
