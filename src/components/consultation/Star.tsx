import React from "react";

export default function Star({
  filled,
  onClick,
}: {
  filled: boolean;
  onClick?: () => void;
}) {
  return (
    <span
      onClick={onClick}
      className={`cursor-pointer text-2xl ${
        filled ? "text-yellow-400" : "text-gray-300"
      }`}
    >
      ★
    </span>
  );
}
