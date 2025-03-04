import React from 'react';

const Cell = ({ index, color, isPending, playerColor, onClick }) => {
  const getCellClassName = () => {
    const baseClasses = 'w-16 h-16 border-2 border-black flex items-center justify-center cursor-pointer transition-colors';
    const colorClasses = color === "blue"
      ? "bg-blue-500"
      : color === "red"
      ? "bg-red-500"
      : isPending
      ? playerColor === "blue"
        ? "bg-blue-300 animate-pulse"
        : "bg-red-300 animate-pulse"
      : "bg-gray-200";

    return `${baseClasses} ${colorClasses} `;
  };

  return (
    <div
      key={index}
      className={getCellClassName()}
      onClick={onClick}
    />
  );
};

export default Cell; 