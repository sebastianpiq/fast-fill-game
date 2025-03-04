import React from 'react';
import Cell from './Cell';

const Grid = ({ paintedCells, pendingCells, playerColor, onCellClick }) => {
  const renderCell = (index) => {
    const cellColor = paintedCells[index];
    const isPending = pendingCells.includes(index);

    return (
      <Cell
        key={index}
        index={index}
        color={cellColor}
        isPending={isPending}
        playerColor={playerColor}
        onClick={() => onCellClick(index)}
      />
    );
  };

  return (
    <div className="grid grid-cols-4 border-2 border-black">
      {[...Array(16)].map((_, index) => renderCell(index))}
    </div>
  );
};

export default Grid; 