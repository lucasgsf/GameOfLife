import { memo } from "react";
import BoardCell from "../BoardCell";

interface IBoardProps {
  board: boolean[][];
  onCellClick: (row: number, col: number) => void;
}

const BoardComponent = (props: IBoardProps) => {
  return (
    <div
      className="flex flex-row justify-center"
    >
      {props.board.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="row inline-block border border-gray-400 mb-4"
        >
          {row.map((cell, cellIndex) => (
            <BoardCell
              key={`${rowIndex}-${cellIndex}`}
              isAlive={cell}
              onClick={() => props.onCellClick(rowIndex, cellIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const Board = memo(BoardComponent);

export default Board;