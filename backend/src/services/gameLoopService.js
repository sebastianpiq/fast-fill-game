import { io } from "../config/socketConfig.js";
import { gameState } from "../models/gameState.js";
import SOCKET_EVENTS from "../constants/socketConstants.js";
import logger from "../utils/logger.js";

const TICK_RATE = 100;
const TIME_TO_RESTART_GAME = 3000;

setInterval(() => {
    try {
        if (gameState.isUpdating()) {
            logger.DEBUG('Processing game state update');
            const result = gameState.updateGameState();
            gameState.gameUpdated();
            io.emit("gameState", gameState.getGameState());

            if (result.finished) {
                logger.INFO(`Game finished - Winner: ${result.winner}`);
                io.emit(SOCKET_EVENTS.GAME_FINISHED, { winner: result.winner });
                setTimeout(() => {
                    try {
                        logger.INFO('Resetting game state after finish');
                        gameState.resetGameState();
                        io.emit(SOCKET_EVENTS.GAME_STATE, gameState.getGameState());
                    } catch (error) {
                        logger.ERROR('Error in game reset timeout:', error);
                    }
                }, TIME_TO_RESTART_GAME);
            }
        }
    } catch (error) {
        logger.ERROR('Error in game loop:', error);
    }
}, TICK_RATE);