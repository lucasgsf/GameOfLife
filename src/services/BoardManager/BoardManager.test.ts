import { BoardManager } from '.';

describe('BoardManager', () => {
  let boardManager: BoardManager;

  beforeEach(() => {
    boardManager = new BoardManager();
  });

  describe('initializeBoard', () => {
    it('should create an empty board with the specified size', () => {
      const size = 3;
      const board = boardManager.initializeBoard(size);

      expect(board.length).toBe(size);
      expect(board[0].length).toBe(size);

      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          expect(board[row][col]).toBe(false);
        }
      }
    });

    it('should create a board of size 0 when 0 is passed', () => {
      const board = boardManager.initializeBoard(0);
      expect(board.length).toBe(0);
    });
  });

  describe('toggleCell', () => {
    it('should toggle a cell from dead to alive', () => {
      const board = boardManager.initializeBoard(3);
      const row = 1;
      const col = 1;

      expect(board[row][col]).toBe(false);

      const newBoard = boardManager.toggleCell(board, row, col);
      expect(newBoard[row][col]).toBe(true);

      expect(board[row][col]).toBe(false);
    });

    it('should toggle a cell from alive to dead', () => {
      const board = boardManager.initializeBoard(3);
      const row = 1;
      const col = 1;

      const aliveBoard = boardManager.toggleCell(board, row, col);
      expect(aliveBoard[row][col]).toBe(true);

      const deadBoard = boardManager.toggleCell(aliveBoard, row, col);
      expect(deadBoard[row][col]).toBe(false);
    });

    it('should not modify the board for out-of-bounds coordinates', () => {
      const board = boardManager.initializeBoard(3);
      
      const newBoard1 = boardManager.toggleCell(board, -1, 1);
      expect(newBoard1).toEqual(board);
      
      const newBoard2 = boardManager.toggleCell(board, 1, 3);
      expect(newBoard2).toEqual(board);
    });
  });

  describe('isWithinBounds', () => {
    it('should return true for valid coordinates', () => {
      const board = boardManager.initializeBoard(3);
      
      expect(boardManager.isWithinBounds(board, 0, 0)).toBe(true);
      expect(boardManager.isWithinBounds(board, 2, 2)).toBe(true);
      expect(boardManager.isWithinBounds(board, 1, 1)).toBe(true);
    });

    it('should return false for out-of-bounds coordinates', () => {
      const board = boardManager.initializeBoard(3);
      
      expect(boardManager.isWithinBounds(board, -1, 0)).toBe(false);
      expect(boardManager.isWithinBounds(board, 0, -1)).toBe(false);
      expect(boardManager.isWithinBounds(board, 3, 0)).toBe(false);
      expect(boardManager.isWithinBounds(board, 0, 3)).toBe(false);
    });
  });

  describe('cloneBoard', () => {
    it('should create a deep copy of the board', () => {
      const board = boardManager.initializeBoard(3);
      board[1][1] = true;
      
      const clonedBoard = boardManager.cloneBoard(board);
      
      expect(clonedBoard).toEqual(board);
      
      expect(clonedBoard).not.toBe(board);
      
      // Modifying the clone shouldn't affect the original
      clonedBoard[0][0] = true;
      expect(board[0][0]).toBe(false);
    });
  });
});