import { io } from "../config/socketConfig.js";
import { gameState } from "../models/gameState.js";
import logger from "../utils/logger.js";
import GAME_CONSTANTS from '../constants/gameConstants.js';
import SOCKET_EVENTS from "../constants/socketConstants.js";

io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
  try {
    socket.on(SOCKET_EVENTS.PLAYER_JOIN, (playerId, callback) => handlePlayerJoin(socket, playerId, callback));
    socket.on(SOCKET_EVENTS.DISCONNECT, () => handleDisconnect(socket));
    logger.INFO(`New socket connection: ${socket.id}`);
  } catch (error) {
    logger.ERROR(`Error in socket connection handler: ${error.message}`);
  }
});

const handlePlayerJoin = (socket, playerId, callback) => {
  try {
    if (!playerId) {
      logger.ERROR('Player join attempted without playerId');
      return;
    }

    logger.INFO(`Player ${playerId} join attempt`);
    io.emit(SOCKET_EVENTS.GAME_STATE, gameState.getGameState());

    const playerColor = gameState.addPlayer(socket.id);

    if (playerColor) {
      socket.on(SOCKET_EVENTS.CLICK_SQUARE, (playerInfo) => handleClickSquare(socket, playerInfo));
      callback({ color: playerColor, status: GAME_CONSTANTS.GAME_STATES.PLAYING });
      logger.INFO(`Player ${playerId} joined successfully with color ${playerColor}`);
    } else {;
      logger.INFO(`Player ${playerId} could not join - game is full`);
    }
  } catch (error) {
    logger.ERROR(`Error in handlePlayerJoin: ${error.message}`);
  }
};

const handleClickSquare = (socket, playerInfo) => {
  try {
    if (!playerInfo || typeof playerInfo.index !== 'number' || !playerInfo.color || !playerInfo.time) {
      logger.ERROR(`Invalid click square data received from ${socket.id}`);
      return;
    }
    gameState.saveMoves({
      index: playerInfo.index,
      color: playerInfo.color,
      time: playerInfo.time
    });
    logger.DEBUG(`Move processed for player ${socket.id} at index ${playerInfo.index}`);
  } catch (error) {
    logger.ERROR(`Error in handleClickSquare: ${error.message}`);
  }
};

const handleDisconnect = (socket) => {
  try {
    const playerId = socket.id;
    logger.INFO(`Player ${playerId} disconnected`);
    const color = gameState.getPlayerColor(playerId);

    if (color) {
      gameState.removePlayer(playerId);
      gameState.resetGameState();
      io.emit(SOCKET_EVENTS.GAME_STATE, gameState.getGameState());
      logger.INFO(`Game state reset after player ${playerId} disconnection`);
    }
  } catch (error) {
    logger.ERROR(`Error in handleDisconnect: ${error.message}`);
  }
};
