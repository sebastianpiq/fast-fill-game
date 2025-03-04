import React from "react";
import { useGameSocket } from "../hooks/useGameSocket";
import Grid from "./Grid";
import GameStatus from "./GameStatus";
import ScoreBoard from "./ScoreBoard";

export default function GameGrid() {
  const {
    paintedCells,
    pendingCells,
    playerColor,
    winner,
    gameStarted,
    handleCellClick,
  } = useGameSocket();

  return (
    <div>
      <GameStatus
        winner={winner}
      />
      
      <Grid
        paintedCells={paintedCells}
        pendingCells={pendingCells}
        playerColor={playerColor}
        onCellClick={handleCellClick}
      />

      <ScoreBoard
        paintedCells={paintedCells}
        playerColor={playerColor}
        gameStarted={gameStarted}
        winner={winner}
      />
    </div>
  );
}