import { memo } from "react";
import { useState } from "react";

interface IBoardControls {
  onNext: () => void;
  onAdvance: (steps: number) => void;
  onPlayForever: () => void;
  onStopPlayingForever: () => void;
  onReset: () => void;
  isPlayingForever: boolean;
}

const BoardControlsComponent = (props: IBoardControls) => {
  const [stepsToAdvance, setStepsToAdvance] = useState(1);

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={props.onNext}
      >
        Next State
      </button>

      <div className="flex items-center gap-2">
        <input
          className="w-16 px-2 py-2 border border-gray-300 rounded"
          type="number"
          min="1"
          value={stepsToAdvance}
          onChange={(e) => setStepsToAdvance(Number(e.target.value))}
        />
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          onClick={() => props.onAdvance(stepsToAdvance)}
        >
          Advance {stepsToAdvance} states
        </button>
      </div>

      {!props.isPlayingForever ? (
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={props.onPlayForever}
        >
          Play
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={props.onStopPlayingForever}
        >
          Pause
        </button>
      )}

      <button
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        onClick={props.onReset}
      >
        Reset
      </button>
    </div>
  );
}

const BoardControls = memo(BoardControlsComponent);

export default BoardControls;