import { BoardManager } from '../../services/BoardManager';
import { GameOfLifeRules, IGameRules } from '../../services/GameRules';
import { GameService } from '../../services/GameService';

class MockGameRules implements IGameRules {
  calculateNextState = jest.fn();
  countLiveNeighbors = jest.fn();
}

describe('GameService', () => {
  let boardManager: BoardManager;
  let mockGameRules: MockGameRules;
  let gameService: GameService;

  beforeEach(() => {
    boardManager = new BoardManager();
    mockGameRules = new MockGameRules();
    gameService = new GameService(boardManager, mockGameRules);
    
    jest.clearAllMocks();
  });

  describe('initializeBoard', () => {
    it('should delegate to BoardManager', () => {
      const spy = jest.spyOn(boardManager, 'initializeBoard');
      const size = 5;
      
      gameService.initializeBoard(size);
      
      expect(spy).toHaveBeenCalledWith(size);
    });
  });

  describe('toggleCell', () => {
    it('should delegate to BoardManager', () => {
      const spy = jest.spyOn(boardManager, 'toggleCell');
      const board = boardManager.initializeBoard(3);
      const row = 1;
      const col = 1;
      
      gameService.toggleCell(board, row, col);
      
      expect(spy).toHaveBeenCalledWith(board, row, col);
    });
  });

  describe('calculateNextState', () => {
    it('should delegate to GameRules', () => {
      const board = boardManager.initializeBoard(3);
      
      gameService.calculateNextState(board);
      
      expect(mockGameRules.calculateNextState).toHaveBeenCalledWith(board);
    });
  });

  describe('calculateStates', () => {
    it('should return original board if steps <= 0', () => {
      const board = boardManager.initializeBoard(3);
      
      const result = gameService.calculateStates(board, 0);
      
      expect(result).toBe(board);
      expect(mockGameRules.calculateNextState).not.toHaveBeenCalled();
    });

    it('should calculate multiple generations correctly', () => {
      const board = boardManager.initializeBoard(3);
      const steps = 3;
      
      const board1 = boardManager.initializeBoard(3);
      board1[0][0] = true;
      
      const board2 = boardManager.initializeBoard(3);
      board2[1][1] = true;
      
      const board3 = boardManager.initializeBoard(3);
      board3[2][2] = true;
      
      mockGameRules.calculateNextState
        .mockReturnValueOnce(board1)
        .mockReturnValueOnce(board2)
        .mockReturnValueOnce(board3);
      
      const result = gameService.calculateStates(board, steps);
      
      expect(mockGameRules.calculateNextState).toHaveBeenCalledTimes(steps);
      expect(result).toEqual(board3);
    });
  });

  describe('integration with GameOfLifeRules', () => {
    let realGameService: GameService;
    
    beforeEach(() => {
      const realGameRules = new GameOfLifeRules(boardManager);
      realGameService = new GameService(boardManager, realGameRules);
    });
    
    it('should correctly advance a blinker pattern by multiple steps', () => {
      const board = boardManager.initializeBoard(5);
      board[2][1] = true;
      board[2][2] = true;
      board[2][3] = true;
      
      const result = realGameService.calculateStates(board, 2);
      
      expect(result[2][1]).toBe(true);
      expect(result[2][2]).toBe(true);
      expect(result[2][3]).toBe(true);
      
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          if (!(row === 2 && (col === 1 || col === 2 || col === 3))) {
            expect(result[row][col]).toBe(false);
          }
        }
      }
    });
  });
});