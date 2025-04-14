import { memo } from "react";

interface ICellBoardProps {
  isAlive: boolean;
  onClick: () => void;
}

const CellComponent = (props: ICellBoardProps) => {
  return (
    <div
      className={`w-4 h-4 border border-gray-300 ${props.isAlive ? 'bg-blue-500' : 'bg-white'}`}
      onClick={props.onClick}
      data-testid="board-cell"
    >
    </div>
  );
};

const BoardCell = memo(CellComponent);

export default BoardCell;