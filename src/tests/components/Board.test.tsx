import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from '../../components/Board';

jest.mock('../../components/BoardCell', () => ({
  __esModule: true,
  default: function MockBoardCell({ isAlive, onClick }: { isAlive: boolean, onClick: () => void }) {
    return (
      <div 
        data-testid="board-cell" 
        data-alive={isAlive ? 'true' : 'false'}
        onClick={onClick}
      />
    );
  }
}));

describe('Board', () => {
  test('renders the correct number of cells based on board size', () => {
    const board = [
      [false, false, false],
      [false, true, false],
      [false, false, false]
    ];
    const handleCellClick = jest.fn();
    
    render(<Board board={board} onCellClick={handleCellClick} />);
    
    const cells = screen.getAllByTestId('board-cell');
    expect(cells).toHaveLength(9);
  });

  test('renders each cell with correct alive state', () => {
    const board = [
      [false, false, false],
      [false, true, false],
      [false, false, false]
    ];
    const handleCellClick = jest.fn();
    
    render(<Board board={board} onCellClick={handleCellClick} />);
    
    const cells = screen.getAllByTestId('board-cell');
    
    expect(cells[4]).toHaveAttribute('data-alive', 'true');
    
    expect(cells[0]).toHaveAttribute('data-alive', 'false');
    expect(cells[1]).toHaveAttribute('data-alive', 'false');
    expect(cells[2]).toHaveAttribute('data-alive', 'false');
    expect(cells[3]).toHaveAttribute('data-alive', 'false');
    expect(cells[5]).toHaveAttribute('data-alive', 'false');
    expect(cells[6]).toHaveAttribute('data-alive', 'false');
    expect(cells[7]).toHaveAttribute('data-alive', 'false');
    expect(cells[8]).toHaveAttribute('data-alive', 'false');
  });

  test('calls onCellClick with correct row and column when cell is clicked', () => {
    const board = [
      [false, false],
      [false, false]
    ];
    const handleCellClick = jest.fn();
    
    render(<Board board={board} onCellClick={handleCellClick} />);
    
    const cells = screen.getAllByTestId('board-cell');
    
    fireEvent.click(cells[0]);
    expect(handleCellClick).toHaveBeenCalledWith(0, 0);
    
    fireEvent.click(cells[1]);
    expect(handleCellClick).toHaveBeenCalledWith(0, 1);
    
    fireEvent.click(cells[2]);
    expect(handleCellClick).toHaveBeenCalledWith(1, 0);
    
    fireEvent.click(cells[3]);
    expect(handleCellClick).toHaveBeenCalledWith(1, 1);
    
    expect(handleCellClick).toHaveBeenCalledTimes(4);
  });

  test('renders an empty board when given an empty array', () => {
    const board: boolean[][] = [];
    const handleCellClick = jest.fn();
    
    render(<Board board={board} onCellClick={handleCellClick} />);
    
    const cells = screen.queryAllByTestId('board-cell');
    expect(cells).toHaveLength(0);
  });
});