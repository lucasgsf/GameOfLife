import { gameService } from '@/services/GameService';
import { Board } from '@/types/board';
import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Configuration options for the Game of Life hook.
 */
export interface GameOfLifeConfig {
  /** Initial size of the game board (default: 20) */
  initialSize?: number;
  /** Speed of automatic simulation in milliseconds (default: 200) */
  initialSpeed?: number;
}

/**
 * State and controls for the Game of Life simulation.
 */
export interface GameOfLifeState {
  /** Current state of the game board */
  board: Board;
  /** Current generation number */
  generation: number;
  /** Whether the simulation is running automatically */
  isPlayingForever: boolean;
  
  /** Toggles a cell's state at the specified coordinates */
  handleCellClick: (row: number, col: number) => void;
  /** Advances the simulation by one generation */
  handleNext: () => void;
  /** Advances the simulation by multiple generations */
  handleAdvance: (steps: number) => void;
  /** Starts automatic simulation */
  handlePlayForever: () => void;
  /** Stops automatic simulation */
  handleStopPlayingForever: () => void;
  /** Resets the board to initial state */
  handleReset: () => void;
}

/**
 * Custom hook for managing the Game of Life simulation state and controls.
 * Provides a clean interface for components to interact with the game logic
 * while maintaining separation of concerns.
 */
export function useGameOfLife(config: GameOfLifeConfig = {}): GameOfLifeState {
  const { 
    initialSize = 20, 
    initialSpeed = 200 
  } = config;
  
  const [size] = useState(initialSize);
  const [speed] = useState(initialSpeed);
  const [isPlayingForever, setIsPlayingForever] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [board, setBoard] = useState<Board>(() => 
    gameService.initializeBoard(size)
  );
  
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      if (playIntervalRef.current !== null)
        clearInterval(playIntervalRef.current);
    };
  }, []);
  
  const handleCellClick = useCallback((row: number, col: number) => {
    if (isPlayingForever) return;
    setBoard(prevBoard => gameService.toggleCell(prevBoard, row, col));
  }, [isPlayingForever]);
  
  const handleNext = useCallback(() => {
    setBoard(prevBoard => gameService.calculateNextState(prevBoard));
    setGeneration(prev => prev + 1);
  }, []);
  
  const handleAdvance = useCallback((steps: number) => {
    const validSteps = Math.max(1, steps);
    
    setBoard(prevBoard => gameService.calculateStates(prevBoard, validSteps));
    setGeneration(prev => prev + validSteps);
  }, []);
  
  const handlePlayForever = useCallback(() => {
    setIsPlayingForever(true);
    
    if (playIntervalRef.current !== null)
      clearInterval(playIntervalRef.current);
    
    playIntervalRef.current = setInterval(() => {
      setBoard(prevBoard => gameService.calculateNextState(prevBoard));
      setGeneration(prev => prev + 1);
    }, speed);
  }, [speed]);
  
  const handleStopPlayingForever = useCallback(() => {
    setIsPlayingForever(false);
    
    if (playIntervalRef.current !== null) {
      clearInterval(playIntervalRef.current);
      playIntervalRef.current = null;
    }
  }, []);
  
  const handleReset = useCallback(() => {
    handleStopPlayingForever();
    setBoard(gameService.initializeBoard(size));
    setGeneration(0);
  }, [handleStopPlayingForever, size]);
  
  return {
    board,
    generation,
    isPlayingForever,
    
    handleCellClick,
    handleNext,
    handleAdvance,
    handlePlayForever,
    handleStopPlayingForever,
    handleReset
  };
}