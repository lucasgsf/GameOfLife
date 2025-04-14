import { BoardManager } from '../../services/BoardManager';
import { GameOfLifeRules } from '../../services/GameRules';

describe('ConwayGameRules', () => {
  let boardManager: BoardManager;
  let gameRules: GameOfLifeRules;

  beforeEach(() => {
    boardManager = new BoardManager();
    gameRules = new GameOfLifeRules(boardManager);
  });

  describe('countLiveNeighbors', () => {
    it('should count zero neighbors for an isolated cell', () => {
      const board = boardManager.initializeBoard(3);
      board[1][1] = true;

      const neighbors = gameRules.countLiveNeighbors(board, 1, 1);
      expect(neighbors).toBe(0);
    });

    it('should count all neighbors correctly', () => {
      const board = boardManager.initializeBoard(3);
      
      board[0][0] = true;
      board[0][1] = true;
      board[0][2] = true;
      board[1][0] = true;
      board[1][2] = true;
      board[2][0] = true;
      board[2][1] = true;
      board[2][2] = true;

      const neighbors = gameRules.countLiveNeighbors(board, 1, 1);
      expect(neighbors).toBe(8);
    });

    it('should count only some neighbors correctly', () => {
      const board = boardManager.initializeBoard(3);
      
      board[0][0] = true;
      board[1][0] = true;
      board[2][2] = true;

      const neighbors = gameRules.countLiveNeighbors(board, 1, 1);
      expect(neighbors).toBe(3);
    });

    it('should handle edge cells correctly', () => {
      const board = boardManager.initializeBoard(3);
      
      board[0][1] = true;
      board[1][0] = true;
      board[1][1] = true;

      const neighbors = gameRules.countLiveNeighbors(board, 0, 0);
      expect(neighbors).toBe(3);
    });
  });

  describe('calculateNextState', () => {
    it('should kill a live cell with 0 neighbors (underpopulation)', () => {
      const board = boardManager.initializeBoard(3);
      board[1][1] = true;
      
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(false);
    });

    it('should kill a live cell with 1 neighbor (underpopulation)', () => {
      const board = boardManager.initializeBoard(3);
      board[1][1] = true;
      board[0][0] = true;
      
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(false);
    });

    it('should keep a live cell with 2 neighbors alive (survival)', () => {
      const board = boardManager.initializeBoard(3);
      board[1][1] = true;
      board[0][0] = true;
      board[0][1] = true;
      
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(true);
    });

    it('should keep a live cell with 3 neighbors alive (survival)', () => {
      const board = boardManager.initializeBoard(3);
      board[1][1] = true;
      board[0][0] = true;
      board[0][1] = true;
      board[0][2] = true;
      
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(true);
    });

    it('should kill a live cell with 4 neighbors (overpopulation)', () => {
      const board = boardManager.initializeBoard(3);
      board[1][1] = true;
      board[0][0] = true;
      board[0][1] = true;
      board[0][2] = true;
      board[1][0] = true;
      
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(false);
    });

    it('should bring a dead cell to life with exactly 3 neighbors (reproduction)', () => {
      const board = boardManager.initializeBoard(3);
      board[1][1] = false;
      board[0][0] = true;
      board[0][1] = true;
      board[0][2] = true;
      
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(true);
    });

    it('should keep a dead cell dead with 2 neighbors', () => {
      const board = boardManager.initializeBoard(3);
      board[1][1] = false;
      board[0][0] = true;
      board[0][1] = true;
      
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(false);
    });

    it('should correctly evolve a "blinker" pattern', () => {
      const board = boardManager.initializeBoard(5);
      board[2][1] = true;
      board[2][2] = true;
      board[2][3] = true;
      
      // After one generation, the blinker should become vertical
      const nextBoard = gameRules.calculateNextState(board);
      
      expect(nextBoard[1][2]).toBe(true);
      expect(nextBoard[2][2]).toBe(true);
      expect(nextBoard[3][2]).toBe(true);
      
      expect(nextBoard[2][1]).toBe(false);
      expect(nextBoard[2][3]).toBe(false);
      
      // After another generation, it should go back to horizontal
      const nextNextBoard = gameRules.calculateNextState(nextBoard);
      
      expect(nextNextBoard[2][1]).toBe(true);
      expect(nextNextBoard[2][2]).toBe(true);
      expect(nextNextBoard[2][3]).toBe(true);
      
      expect(nextNextBoard[1][2]).toBe(false);
      expect(nextNextBoard[3][2]).toBe(false);
    });
  });
});