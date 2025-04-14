export type Cell = boolean;
export type Board = Cell[][];

export interface BoardDimensions {
  rows: number;
  cols: number;
}

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