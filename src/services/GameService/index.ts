import { Board } from '@/types/board';
import { boardManager, BoardManager } from '../BoardManager';
import { GameOfLifeRules, IGameRules } from '../GameRules';

/**
 * Interface defining the core game operations.
 * Coordinates interactions between board management and game rules.
 */
export interface IGameService {
  /**
   * Creates a new empty game board with specified dimensions.
   * @param size - The size of the board (both width and height)
   * @returns A new square board initialized with all cells dead
   */
  initializeBoard(size: number): Board;

  /**
   * Toggles the state of a cell between alive and dead.
   * @param board - Current game board
   * @param row - Row index of the cell to toggle
   * @param col - Column index of the cell to toggle
   * @returns A new board with the specified cell toggled
   */
  toggleCell(board: Board, row: number, col: number): Board;

  /**
   * Calculates the next generation of the game board.
   * @param board - Current game board
   * @returns A new board representing the next generation
   */
  calculateNextState(board: Board): Board;

  /**
   * Advances the game by multiple generations.
   * @param board - Current game board
   * @param steps - Number of generations to advance
   * @returns A new board after advancing specified steps
   */
  calculateStates(board: Board, steps: number): Board;
}

/**
 * Implementation of the game service coordinating board operations and game rules.
 * Uses dependency injection for better testability and flexibility.
 */
export class GameService implements IGameService {
  constructor(
    private boardManager: BoardManager,
    private gameRules: IGameRules
  ) {}

  initializeBoard(size: number): Board {
    return this.boardManager.initializeBoard(size);
  }

  toggleCell(board: Board, row: number, col: number): Board {
    return this.boardManager.toggleCell(board, row, col);
  }

  calculateNextState(board: Board): Board {
    return this.gameRules.calculateNextState(board);
  }

  /**
   * Advances the game by multiple generations while maintaining immutability.
   * @param board - Current game board
   * @param steps - Number of generations to advance (minimum 1)
   * @returns A new board after advancing specified steps
   */
  calculateStates(board: Board, steps: number): Board {
    if (steps <= 0) return board;

    let currentBoard = this.boardManager.cloneBoard(board);
    
    for (let i = 0; i < steps; i++)
      currentBoard = this.gameRules.calculateNextState(currentBoard);
    
    return currentBoard;
  }
}

export const gameService = new GameService(
  boardManager,
  new GameOfLifeRules(boardManager)
);