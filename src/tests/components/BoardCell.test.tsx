import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BoardCell from '../../components/BoardCell';

describe('BoardCell', () => {
  test('renders with correct className when cell is dead', () => {
    const handleClick = jest.fn();
    render(<BoardCell isAlive={false} onClick={handleClick} />);
    
    const cell = screen.getByTestId('board-cell');
    
    expect(cell).toHaveClass('bg-white');
    expect(cell).not.toHaveClass('bg-blue-500');
  });

  test('renders with correct className when cell is alive', () => {
    const handleClick = jest.fn();
    render(<BoardCell isAlive={true} onClick={handleClick} />);
    
    const cell = screen.getByTestId('board-cell');
    
    expect(cell).toHaveClass('bg-blue-500');
    expect(cell).not.toHaveClass('bg-white');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<BoardCell isAlive={false} onClick={handleClick} />);
    
    const cell = screen.getByTestId('board-cell');
    fireEvent.click(cell);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not change its state internally on click', () => {
    const handleClick = jest.fn();
    const { rerender } = render(<BoardCell isAlive={false} onClick={handleClick} />);
    
    const cell = screen.getByTestId('board-cell');
    fireEvent.click(cell);
    
    // Cell should still be dead after click - we haven't changed the prop
    expect(cell).toHaveClass('bg-white');
    expect(cell).not.toHaveClass('bg-blue-500');
    
    rerender(<BoardCell isAlive={true} onClick={handleClick} />);
    
    // Now it should be alive
    expect(cell).toHaveClass('bg-blue-500');
    expect(cell).not.toHaveClass('bg-white');
  });
});