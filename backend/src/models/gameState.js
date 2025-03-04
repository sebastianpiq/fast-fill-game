import GAME_CONSTANTS from '../constants/gameConstants.js';
import logger from '../utils/logger.js';

class GameState {
    constructor() {
        this.players = [];
        this.gameState = new Array(16).fill(null);
        this.pendingMoves = [];
    }
  
    addPlayer(id) {
        if (!id) {
            logger.ERROR('Attempted to add player without ID');
            return null;
        }

        const playersCount = this.players.length;
        let color = null;
        
        const hasRed = this.players.some(player => player.color === GAME_CONSTANTS.PLAYER_COLORS.RED);
        if (!hasRed) {
            color = GAME_CONSTANTS.PLAYER_COLORS.RED;
        } else if (!this.players.some(player => player.color === GAME_CONSTANTS.PLAYER_COLORS.BLUE)) {
            color = GAME_CONSTANTS.PLAYER_COLORS.BLUE;
        }

        if (color) {
            this.players.push({
                id,
                color
            });
            logger.INFO(`Player ${id} added with color ${color}`);
        } else {
            logger.INFO(`Player ${id} could not be added - no available colors`);
        }

        return color;
    }
    
    getPlayerColor(id) {
        if (!id) {
            logger.ERROR('Attempted to get player color without ID');
            return null;
        }

        const player = this.players.find(player => player.id === id);
        return player ? player.color : null;
    }

    isInQueue(id) {
        return this.queue.includes(id);
    }

    getQueuePosition(id) {
        return this.queue.indexOf(id) + 1;
    }
  
    removePlayer(id) {
        if (!id) {
            logger.ERROR('Attempted to remove player without ID');
            return;
        }

        const disconnectedColor = this.getPlayerColor(id);
        this.players = this.players.filter(player => player.id !== id);
        logger.INFO(`Player ${id} removed with color ${disconnectedColor}`);
        
        if (disconnectedColor) {
            this.reassignColor(disconnectedColor);
        }
    }

    reassignColor(color) {
        if (!color) {
            logger.ERROR('Attempted to reassign undefined color');
            return;
        }

        const playerWithoutColor = this.players.find(player => !player.color);
        if (playerWithoutColor) {
            playerWithoutColor.color = color;
            logger.INFO(`Color ${color} reassigned to player ${playerWithoutColor.id}`);
        }
    }

    resetGameState() {
        this.gameState = new Array(16).fill(null);
        this.pendingMoves = [];
        this.updating = false;
        logger.INFO(`Game state reset. Players count: ${this.players.length}`);
    }

    saveMoves({ index, color, time }) {
        if (typeof index !== 'number' || !color || !time) {
            logger.ERROR('Invalid move data provided');
            return false;
        }

        this.updating = true;
        this.pendingMoves.push({ index, color, time });
        logger.DEBUG(`Move saved - Index: ${index}, Color: ${color}, Time: ${time}`);
        return true;
    }
  
    updateGameState() {
        this.pendingMoves.sort((a, b) => a.time - b.time);
        
        this.pendingMoves.forEach(move => {
            this.gameState[move.index] = move.color;
            logger.DEBUG(`Cell ${move.index} filled with ${move.color}`);
        });
        
        this.pendingMoves = [];
        
        if (this.isGridFull()) {
            const winner = this.determineWinner();
            return { finished: true, winner };
        }
        
        return { finished: false };
    }

    isGridFull() {
        return this.gameState.every(cell => cell !== null);
    }

    determineWinner() {
        const redCount = this.gameState.filter(cell => cell === GAME_CONSTANTS.PLAYER_COLORS.RED).length;
        const blueCount = this.gameState.filter(cell => cell === GAME_CONSTANTS.PLAYER_COLORS.BLUE).length;
        
        if (redCount === blueCount) {
            return 'tie';
        }
        return redCount > blueCount ? GAME_CONSTANTS.PLAYER_COLORS.RED : GAME_CONSTANTS.PLAYER_COLORS.BLUE;
    }
  
    getGameState() {
        return { 
            players: this.players, 
            gameState: this.gameState,
            updating: this.updating
        };
    }

    gameUpdated() {
        this.updating = false;
        logger.DEBUG('Game state update completed');
    }

    isUpdating() {
        return this.updating;
    }
}
  
export const gameState = new GameState(); 