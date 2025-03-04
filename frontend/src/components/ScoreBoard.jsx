import React, { useState, useEffect } from 'react';

const ScoreBoard = ({ paintedCells, playerColor, gameStarted, winner }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      console.log(winner)
      setTimer(0);
    }
  }, [gameStarted, winner]);

  const redCellCount = paintedCells.filter(cell => cell === "red").length;
  const blueCellCount = paintedCells.filter(cell => cell === "blue").length;

  return (
    <div className="text-lg flex justify-between">
      <div>
        <p className={`font-bold text-red-500 ${playerColor === "red" ? "underline" : ""} text-left`}>
          <span>Red</span>: {redCellCount}
        </p>
        <p className={`font-bold text-blue-500 ${playerColor === "blue" ? "underline" : ""} text-left`}>
          <span>Blue</span>: {blueCellCount}
        </p>
      </div>
      <p className="font-bold text-gray-700">
        {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
      </p>
    </div>
  );
};

export default ScoreBoard; 