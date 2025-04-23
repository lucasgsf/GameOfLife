import { renderHook, act } from '@testing-library/react';
import { useGameOfLife } from '.';
import { gameService } from '@/services/GameService';

jest.mock('../../services/GameService', () => ({
  gameService: {
    initializeBoard: jest.fn(),
    toggleCell: jest.fn(),
    calculateNextState: jest.fn(),
    calculateStates: jest.fn()
  }
}));

describe('useGameOfLife', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (gameService.initializeBoard as jest.Mock).mockReturnValue([
      [false, false],
      [false, false]
    ]);
    
    (gameService.toggleCell as jest.Mock).mockImplementation((board, row, col) => {
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[row][col] = !newBoard[row][col];
      return newBoard;
    });
    
    (gameService.calculateNextState as jest.Mock).mockImplementation(board => {
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[0][0] = !newBoard[0][0];
      return newBoard;
    });
    
    (gameService.calculateStates as jest.Mock).mockImplementation((board, steps) => {
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[0][0] = steps % 2 === 1;
      return newBoard;
    });
    
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('initializes with correct default values', () => {
    const { result } = renderHook(() => useGameOfLife());
    
    expect(result.current.board).toEqual([
      [false, false],
      [false, false]
    ]);
    expect(result.current.generation).toBe(0);
    expect(result.current.isPlayingForever).toBe(false);
    
    expect(gameService.initializeBoard).toHaveBeenCalledWith(20);
  });

  test('initializes with custom config', () => {
    renderHook(() => useGameOfLife({ initialSize: 10, initialSpeed: 500 }));
    
    expect(gameService.initializeBoard).toHaveBeenCalledWith(10);
  });

  test('handleCellClick toggles cell and updates board', () => {
    const { result } = renderHook(() => useGameOfLife());
    
    act(() => {
      result.current.handleCellClick(0, 0);
    });
    
    expect(gameService.toggleCell).toHaveBeenCalledWith(
      [
        [false, false],
        [false, false]
      ],
      0,
      0
    );
  });

  test('handleCellClick does nothing when game is playing', () => {
    const { result } = renderHook(() => useGameOfLife());
    
    act(() => {
      result.current.handlePlayForever();
    });
    
    act(() => {
      result.current.handleCellClick(0, 0);
    });
    
    expect(gameService.toggleCell).not.toHaveBeenCalled();
  });

  test('handleNext advances the game by one generation', () => {
    const { result } = renderHook(() => useGameOfLife());
    
    act(() => {
      result.current.handleNext();
    });
    
    expect(gameService.calculateNextState).toHaveBeenCalled();
    expect(result.current.generation).toBe(1);
  });

  test('handleAdvance advances the game by multiple generations', () => {
    const { result } = renderHook(() => useGameOfLife());
    
    act(() => {
      result.current.handleAdvance(5);
    });
    
    expect(gameService.calculateStates).toHaveBeenCalledWith(
      [
        [false, false],
        [false, false]
      ],
      5
    );
    expect(result.current.generation).toBe(5);
  });

  test('handlePlayForever starts automatic simulation', () => {
    const { result } = renderHook(() => useGameOfLife());
    
    act(() => {
      result.current.handlePlayForever();
    });
    
    expect(result.current.isPlayingForever).toBe(true);
    
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    expect(gameService.calculateNextState).toHaveBeenCalled();
    expect(result.current.generation).toBe(1);
    
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    expect(result.current.generation).toBe(2);
  });

  test('handleStopPlayingForever stops automatic simulation', () => {
    const { result } = renderHook(() => useGameOfLife());
    
    act(() => {
      result.current.handlePlayForever();
    });
    
    expect(result.current.isPlayingForever).toBe(true);
    
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    act(() => {
      result.current.handleStopPlayingForever();
    });
    
    expect(result.current.isPlayingForever).toBe(false);
    
    (gameService.calculateNextState as jest.Mock).mockClear();
    
    act(() => {
      jest.advanceTimersByTime(400);
    });
    
    expect(gameService.calculateNextState).not.toHaveBeenCalled();
  });

  test('handleReset stops simulation and resets the board and generation', () => {
    const { result } = renderHook(() => useGameOfLife());
    
    act(() => {
      result.current.handleAdvance(10);
    });
    act(() => {
      result.current.handlePlayForever();
    });
    
    expect(result.current.generation).toBe(10);
    expect(result.current.isPlayingForever).toBe(true);
    
    act(() => {
      result.current.handleReset();
    });
    
    expect(result.current.generation).toBe(0);
    expect(result.current.isPlayingForever).toBe(false);
    expect(gameService.initializeBoard).toHaveBeenCalledTimes(2);
  });

  test('cleans up interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
    
    const { unmount } = renderHook(() => {
      const hook = useGameOfLife();
      if (!hook.isPlayingForever) {
        hook.handlePlayForever();
      }
      return hook;
    });
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});