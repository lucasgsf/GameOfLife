import { Board } from '../types/board';

export interface IBoardManager {
  initializeBoard(size: number): Board;
  toggleCell(board: Board, row: number, col: number): Board;
  isWithinBounds(board: Board, row: number, col: number): boolean;
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