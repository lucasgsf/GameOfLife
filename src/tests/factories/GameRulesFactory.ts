import { Board } from '@/types/board';
import { BoardFactory } from './BoardFactory';

export class GameRulesTestFactory {
  static createUnderpopulationCaseWithZeroNeighbors(): Board {
    const board = BoardFactory.createEmpty(3);
    board[1][1] = true;
    return board;
  }

  static createUnderpopulationCaseWithOneNeighbor(): Board {
    const board = BoardFactory.createEmpty(3);
    board[1][1] = true;
    board[0][0] = true;
    return board;
  }

  static createSurvivalCaseWithTwoNeighbors(): Board {
    const board = BoardFactory.createEmpty(3);
    board[1][1] = true;
    board[0][0] = true;
    board[0][1] = true;
    return board;
  }

  static createSurvivalCaseWithThreeNeighbors(): Board {
    const board = BoardFactory.createEmpty(3);
    board[1][1] = true;
    board[0][0] = true;
    board[0][1] = true;
    board[0][2] = true;
    return board;
  }

  static createOverpopulationCase(): Board {
    const board = BoardFactory.createEmpty(3);
    board[1][1] = true;
    board[0][0] = true;
    board[0][1] = true;
    board[0][2] = true;
    board[1][0] = true;
    return board;
  }

  static createReproductionCase(): Board {
    const board = BoardFactory.createEmpty(3);
    board[1][1] = false;
    board[0][0] = true;
    board[0][1] = true;
    board[0][2] = true;
    return board;
  }

  static createDeadCellWithTwoNeighbors(): Board {
    const board = BoardFactory.createEmpty(3);
    board[1][1] = false;
    board[0][0] = true;
    board[0][1] = true;
    return board;
  }
}