import { Board } from '../types/board';
import { boardManager, BoardManager } from './BoardManager';
import { GameOfLifeRules, IGameRules } from './GameRules';

export interface IGameService {
  initializeBoard(size: number): Board;
  toggleCell(board: Board, row: number, col: number): Board;
  
  calculateNextState(board: Board): Board;
  calculateStates(board: Board, steps: number): Board;
}

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