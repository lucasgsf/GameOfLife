import { useState, useCallback, useRef, useEffect } from 'react';
import { gameService } from '../services/GameService';
import { Board } from '../types/board';

export interface GameOfLifeConfig {
  initialSize?: number;
  initialSpeed?: number;
}

export interface GameOfLifeState {
  board: Board;
  generation: number;
  isPlayingForever: boolean;
  
  handleCellClick: (row: number, col: number) => void;
  handleNext: () => void;
  handleAdvance: (steps: number) => void;
  handlePlayForever: () => void;
  handleStopPlayingForever: () => void;
  handleReset: () => void;
}

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
  
  const playIntervalRef = useRef<number | null>(null);
  
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