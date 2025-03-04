import { useState, useEffect } from 'react';
import useSocket from './useSocket';
import { useErrorHandler } from './useErrorHandler';

export const useGameSocket = () => {
  const { socket, isConnected, reconnect } = useSocket();
  const { error, handleError } = useErrorHandler();
  const [paintedCells, setPaintedCells] = useState([]);
  const [pendingCells, setPendingCells] = useState([]);
  const [playerColor, setPlayerColor] = useState("");
  const [playerStatus, setPlayerStatus] = useState("waiting");
  const [playersCount, setPlayersCount] = useState(0);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setPaintedCells([]);
      setPendingCells([]);
      setPlayerColor("");
      setPlayerStatus("waiting");
      setPlayersCount(0);
      setWinner(null);
      setGameStarted(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (!socket) {
      handleError('Unable to connect to game server');
      return;
    }

    const setupSocketListeners = () => {
      socket.on("error", handleError);

      socket.on("connect_error", () => {
        handleError('Failed to connect to game server');
      });

      socket.on("disconnect", () => {
        handleError('Disconnected from game server. Attempting to reconnect...');
        setTimeout(reconnect, 2000);
      });

      socket.on("gameState", ({ players, gameState }) => {
        setPaintedCells(gameState);
        setPendingCells([]);
        setPlayersCount(players.length);
        setWinner(null);
        if (gameState.some(cell => cell !== null)) {
          setGameStarted(true);
        } else {
          setGameStarted(false);
        }
      });

      socket.on("joinGame", ({ color }) => {
        setPlayerColor(color);
        setPlayerStatus("playing");
        setWinner(null);
      });

      socket.on("gameFinished", ({ winner }) => {
        setWinner(winner);
        setGameStarted(false);
      });
    };

    setupSocketListeners();

    if (isConnected && playerStatus === "waiting") {
      socket.emit("playerJoin", socket.id, ({ color }) => {
        setPlayerColor(color);
        setPlayerStatus("playing");
      });
    }

    return () => {
      if (socket) {
        socket.off("error");
        socket.off("connect_error");
        socket.off("disconnect");
        socket.off("gameState");
        socket.off("joinGame");
        socket.off("gameFinished");
      }
    };
  }, [socket, playerStatus, handleError, isConnected, reconnect, gameStarted]);

  const handleCellClick = (index) => {
    if (!socket || !isConnected) {
      handleError('No connection to game server');
      return;
    }

    if (!playerColor) {
      return;
    }
    
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    if (!paintedCells[index] && !pendingCells.includes(index)) {
      setPendingCells((prev) => [...prev, index]);
      socket.emit("clickSquare", { 
        color: playerColor,
        index,
        time: Date.now()
      });
    }
  };

  return {
    socket,
    isConnected,
    paintedCells,
    pendingCells,
    playerColor,
    playerStatus,
    playersCount,
    winner,
    gameStarted,
    handleCellClick,
    error
  };
}; 