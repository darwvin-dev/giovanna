"use client";

import * as React from "react";

export function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
        checked ? "bg-amber-500" : "bg-gray-300 dark:bg-gray-700"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
