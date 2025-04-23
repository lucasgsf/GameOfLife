import { Board } from "@/types/board";

/**
 * Interface defining operations for managing the game board.
 */
export interface IBoardManager {
  /**
   * Creates a new board with the specified dimensions.
   * @param size - The size of the board (both width and height)
   * @returns A new square board of the specified size with all cells dead
   */
  initializeBoard(size: number): Board;

  /**
   * Toggles the state of a cell between alive and dead.
   * @param board - The current game board
   * @param row - The row index of the cell to toggle
   * @param col - The column index of the cell to toggle
   * @returns A new board with the specified cell toggled
   */
  toggleCell(board: Board, row: number, col: number): Board;

  /**
   * Checks if given coordinates are within the board boundaries.
   * @param board - The game board to check against
   * @param row - The row index to check
   * @param col - The column index to check
   * @returns true if coordinates are valid, false otherwise
   */
  isWithinBounds(board: Board, row: number, col: number): boolean;

  /**
   * Creates a deep copy of the board.
   * @param board - The board to clone
   * @returns A new board with the same cell states
   */
  cloneBoard(board: Board): Board;
}

export class BoardManager implements IBoardManager {
  initializeBoard(size: number): Board {
    return Array(size).fill(null).map(() => Array(size).fill(false));
  }

  toggleCell(board: Board, row: number, col: number): Board {
    if (!this.isWithinBounds(board, row, col))
      return board;
    
    const newBoard = this.cloneBoard(board);
    newBoard[row][col] = !newBoard[row][col];
    return newBoard;
  }

  isWithinBounds(board: Board, row: number, col: number): boolean {
    return (
      row >= 0 && 
      col >= 0 && 
      row < board.length && 
      col < board[0].length
    );
  }

  cloneBoard(board: Board): Board {
    return board.map(row => [...row]);
  }
}

export const boardManager = new BoardManager();