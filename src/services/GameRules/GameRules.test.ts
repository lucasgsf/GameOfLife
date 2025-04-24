import { BoardFactory } from '@/tests/factories/BoardFactory';
import { GameOfLifeRules } from '.';
import { createMockBoardManager } from '@/tests/mocks/ServiceMocks';
import { GameRulesTestFactory } from '@/tests/factories/GameRulesFactory';

describe('ConwayGameRules', () => {
  const mockBoardManager = createMockBoardManager();
  let gameRules: GameOfLifeRules;

  beforeEach(() => {
    gameRules = new GameOfLifeRules(mockBoardManager);

    mockBoardManager.initializeBoard.mockImplementation((size: number) => 
      BoardFactory.createEmpty(size)
    );
    mockBoardManager.cloneBoard.mockImplementation(board => board.map(row => [...row]));
    mockBoardManager.isWithinBounds.mockImplementation((board, row, col) => 
      row >= 0 && col >= 0 && row < board.length && col < board[0].length
    );
  });

  describe('countLiveNeighbors', () => {
    it('should count zero neighbors for an isolated cell', () => {
      const board = mockBoardManager.initializeBoard(3);
      board[1][1] = true;

      const neighbors = gameRules.countLiveNeighbors(board, 1, 1);
      expect(neighbors).toBe(0);
    });

    it('should count all neighbors correctly', () => {
      const board = mockBoardManager.initializeBoard(3);
      
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
      const board = mockBoardManager.initializeBoard(3);
      
      board[0][0] = true;
      board[1][0] = true;
      board[2][2] = true;

      const neighbors = gameRules.countLiveNeighbors(board, 1, 1);
      expect(neighbors).toBe(3);
    });

    it('should handle edge cells correctly', () => {
      const board = mockBoardManager.initializeBoard(3);
      
      board[0][1] = true;
      board[1][0] = true;
      board[1][1] = true;

      const neighbors = gameRules.countLiveNeighbors(board, 0, 0);
      expect(neighbors).toBe(3);
    });
  });

  describe('calculateNextState', () => {
    it('should kill a live cell with 0 neighbors (underpopulation)', () => {
      const board = GameRulesTestFactory.createUnderpopulationCaseWithZeroNeighbors();
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(false);
    });

    it('should kill a live cell with 1 neighbor (underpopulation)', () => {
      const board = GameRulesTestFactory.createUnderpopulationCaseWithOneNeighbor();
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(false);
    });

    it('should keep a live cell with 2 neighbors alive (survival)', () => {
      const board = GameRulesTestFactory.createSurvivalCaseWithTwoNeighbors();
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(true);
    });

    it('should keep a live cell with 3 neighbors alive (survival)', () => {
      const board = GameRulesTestFactory.createSurvivalCaseWithThreeNeighbors();
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(true);
    });

    it('should kill a live cell with 4 neighbors (overpopulation)', () => {
      const board = GameRulesTestFactory.createOverpopulationCase();
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(false);
    });

    it('should bring a dead cell to life with exactly 3 neighbors (reproduction)', () => {
      const board = GameRulesTestFactory.createReproductionCase();
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(true);
    });

    it('should keep a dead cell dead with 2 neighbors', () => {
      const board = GameRulesTestFactory.createDeadCellWithTwoNeighbors();
      const nextBoard = gameRules.calculateNextState(board);
      expect(nextBoard[1][1]).toBe(false);
    });

    it('should correctly evolve a "blinker" pattern', () => {
      const board = BoardFactory.createPattern('blinker');
      const result = gameRules.calculateNextState(board);
      const nextResult = gameRules.calculateNextState(result);
      expect(nextResult).toEqual(BoardFactory.createPattern('blinker'));
    });
  });
});