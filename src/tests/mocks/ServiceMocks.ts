import { IBoardManager } from '@/services/BoardManager';
import { IGameRules } from '@/services/GameRules';

export const createMockBoardManager = (): jest.Mocked<IBoardManager> => ({
  initializeBoard: jest.fn(),
  toggleCell: jest.fn(),
  isWithinBounds: jest.fn(),
  cloneBoard: jest.fn()
});

export const createMockGameRules = (): jest.Mocked<IGameRules> => ({
  calculateNextState: jest.fn(),
  countLiveNeighbors: jest.fn()
});