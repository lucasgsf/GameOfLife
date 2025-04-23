import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameOfLife from '.';
import { useGameOfLife } from '@/hooks/useGameOfLife';

jest.mock('../../hooks/useGameOfLife');

jest.mock('../Board', () => ({
  __esModule: true,
  default: function MockBoard({ board, onCellClick }: { board: boolean[][], onCellClick: (row: number, col: number) => void }) {
    return (
      <div data-testid="board" data-board-size={board.length}>
        {/* Render a button to test cell click */}
        <button onClick={() => onCellClick(1, 1)} data-testid="cell-button">
          Click Cell
        </button>
      </div>
    );
  }
}));

jest.mock('../../components/BoardControls', () => ({
  __esModule: true,
  default: function MockBoardControls({
    onNext,
    onAdvance,
    onPlayForever,
    onStopPlayingForever,
    onReset,
    isPlayingForever
  }: { 
    onNext: () => void,
    onAdvance: (steps: number) => void,
    onPlayForever: () => void,
    onStopPlayingForever: () => void,
    onReset: () => void,
    isPlayingForever: boolean
  }) {
    return (
      <div data-testid="board-controls" data-playing={isPlayingForever ? 'true' : 'false'}>
        <button onClick={onNext} data-testid="next-button">Next</button>
        <button onClick={() => onAdvance(5)} data-testid="advance-button">Advance</button>
        <button onClick={onPlayForever} data-testid="play-button">Play</button>
        <button onClick={onStopPlayingForever} data-testid="pause-button">Pause</button>
        <button onClick={onReset} data-testid="reset-button">Reset</button>
      </div>
    );
  }
}));

describe('GameOfLife', () => {
  // Set up mock implementation of useGameOfLife
  const mockGameHook = {
    board: [[false, false], [false, false]],
    generation: 5,
    isPlayingForever: false,
    handleCellClick: jest.fn(),
    handleNext: jest.fn(),
    handleAdvance: jest.fn(),
    handlePlayForever: jest.fn(),
    handleStopPlayingForever: jest.fn(),
    handleReset: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameOfLife as jest.Mock).mockReturnValue(mockGameHook);
  });

  test('renders with the correct title and generation', () => {
    render(<GameOfLife />);
    
    expect(screen.getByText('Game of Life')).toBeInTheDocument();
    expect(screen.getByText('Current Generation: 5')).toBeInTheDocument();
  });

  test('renders the Board component with correct props', () => {
    render(<GameOfLife />);
    
    const board = screen.getByTestId('board');
    expect(board).toHaveAttribute('data-board-size', '2');
  });

  test('renders the BoardControls component with correct props', () => {
    render(<GameOfLife />);
    
    const controls = screen.getByTestId('board-controls');
    expect(controls).toHaveAttribute('data-playing', 'false');
  });

  test('calls handleCellClick when a cell is clicked', () => {
    render(<GameOfLife />);
    
    const cellButton = screen.getByTestId('cell-button');
    cellButton.click();
    
    expect(mockGameHook.handleCellClick).toHaveBeenCalledWith(1, 1);
  });

  test('calls correct handler when Next button is clicked', () => {
    render(<GameOfLife />);
    
    const nextButton = screen.getByTestId('next-button');
    nextButton.click();
    
    expect(mockGameHook.handleNext).toHaveBeenCalledTimes(1);
  });

  test('calls correct handler when Advance button is clicked', () => {
    render(<GameOfLife />);
    
    const advanceButton = screen.getByTestId('advance-button');
    advanceButton.click();
    
    expect(mockGameHook.handleAdvance).toHaveBeenCalledWith(5);
  });

  test('calls correct handler when Play button is clicked', () => {
    render(<GameOfLife />);
    
    const playButton = screen.getByTestId('play-button');
    playButton.click();
    
    expect(mockGameHook.handlePlayForever).toHaveBeenCalledTimes(1);
  });

  test('calls correct handler when Pause button is clicked', () => {
    render(<GameOfLife />);
    
    const pauseButton = screen.getByTestId('pause-button');
    pauseButton.click();
    
    expect(mockGameHook.handleStopPlayingForever).toHaveBeenCalledTimes(1);
  });

  test('calls correct handler when Reset button is clicked', () => {
    render(<GameOfLife />);
    
    const resetButton = screen.getByTestId('reset-button');
    resetButton.click();
    
    expect(mockGameHook.handleReset).toHaveBeenCalledTimes(1);
  });
});