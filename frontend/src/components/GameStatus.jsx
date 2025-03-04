import React from 'react';

const GameStatus = ({ winner }) => {
  return (
    <div className="h-8 mb-4">
      {winner && (
        <div className={`text-lg font-bold ${winner === 'red' ? 'text-red-500' : 'text-blue-500'}`}>
          {winner.charAt(0).toUpperCase() + winner.slice(1)} wins!
        </div>
      )}
    </div>
  );
};

export default GameStatus; 