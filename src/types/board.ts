/**
 * Represents the state of a single cell in the Game of Life board.
 * true = alive, false = dead
 */
export type Cell = boolean;

/**
 * Represents the game board as a 2D array of cells.
 * The first dimension represents rows, the second represents columns.
 */
export type Board = Cell[][];

/**
 * Defines the dimensions of the game board.
 */
export interface BoardDimensions {
  /** Number of rows in the board */
  rows: number;
  /** Number of columns in the board */
  cols: number;
}

/**
 * Array of vectors representing the 8 possible neighbor positions
 * relative to any cell on the board.
 */
export const NEIGHBORS_DIRECTIONS = [
  { row: -1, col: -1 }, // top-left
  { row: -1, col: 0 },  // top
  { row: -1, col: 1 },  // top-right
  { row: 0, col: -1 },  // left
  { row: 0, col: 1 },   // right
  { row: 1, col: -1 },  // bottom-left
  { row: 1, col: 0 },   // bottom
  { row: 1, col: 1 },   // bottom-right
];