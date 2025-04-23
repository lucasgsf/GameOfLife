import { useGameOfLife } from "@/hooks/useGameOfLife";
import Board from "../Board";
import BoardControls from "../BoardControls";

export default function GameOfLife() {
  const {
    board,
    generation,
    isPlayingForever,
    handleCellClick,
    handleNext,
    handleAdvance,
    handlePlayForever,
    handleStopPlayingForever,
    handleReset
  } = useGameOfLife({
    initialSize: 20,
    initialSpeed: 200
  });

  return (
    <div className="flex flex-col justify-center gap-2 mb-4">
      <h1 className="text-center text-3xl font-bold">Game of Life</h1>
      <h2 className="text-center text-xl font-bold">Current Generation: {generation}</h2>
      <Board
        board={board}
        onCellClick={handleCellClick}
      />
      <BoardControls
        onNext={handleNext}
        onAdvance={handleAdvance}
        onPlayForever={handlePlayForever}
        onStopPlayingForever={handleStopPlayingForever}
        onReset={handleReset}
        isPlayingForever={isPlayingForever}
      />
    </div>
  );
}