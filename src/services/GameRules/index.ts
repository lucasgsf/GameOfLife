import { Board, NEIGHBORS_DIRECTIONS } from '@/types/board';
import { boardManager, BoardManager } from '../BoardManager';

/**
 * Interface defining the rules engine for Conway's Game of Life.
 */
export interface IGameRules {
  /**
   * Calculates the next state of the board based on Conway's Game of Life rules.
   * @param board - The current state of the game board
   * @returns A new board representing the next generation
   */
  calculateNextState(board: Board): Board;

  /**
   * Counts the number of live neighbors for a given cell.
   * @param board - The game board
   * @param row - The row index of the cell
   * @param col - The column index of the cell
   * @returns The number of live neighbors (0-8)
   */
  countLiveNeighbors(board: Board, row: number, col: number): number;
}

export class GameOfLifeRules implements IGameRules {
  constructor(private boardManager: BoardManager) {}

  /**
   * Calculates the next state of the board based on Conway's Game of Life rules:
   * 1. Any live cell with fewer than two live neighbors dies (underpopulation)
   * 2. Any live cell with two or three live neighbors survives
   * 3. Any live cell with more than three live neighbors dies (overpopulation)
   * 4. Any dead cell with exactly three live neighbors becomes alive (reproduction)
   */
  calculateNextState(board: Board): Board {
    const size = board.length;
    const newBoard = this.boardManager.initializeBoard(size);
    
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const isAlive = board[row][col];
        const liveNeighbors = this.countLiveNeighbors(board, row, col);
        
        if (isAlive)
          newBoard[row][col] = liveNeighbors === 2 || liveNeighbors === 3;
        else
          newBoard[row][col] = liveNeighbors === 3;
      }
    }
    
    return newBoard;
  }

  countLiveNeighbors(board: Board, row: number, col: number): number {
    let count = 0;
    
    for (const direction of NEIGHBORS_DIRECTIONS) {
      const newRow = row + direction.row;
      const newCol = col + direction.col;
      
      if (this.boardManager.isWithinBounds(board, newRow, newCol) && board[newRow][newCol])
        count++;
    }
    
    return count;
  }
}

export const gameRules = new GameOfLifeRules(boardManager);