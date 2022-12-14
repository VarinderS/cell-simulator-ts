import React from "react";
import classNames from "classnames";
import { copyGrid, createNextGeneration, useInterval } from "./gridHelpers";

const INITIAL_GRID = [
  [false, false, false, false, false, false],
  [false, false, true, false, false, false],
  [false, false, false, true, false, false],
  [false, true, true, true, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
];

function Grid() {
  const [grid, setGrid] = React.useState<boolean[][]>(INITIAL_GRID);
  const [isSimulationRunning, setIsSimulationRunning] =
    React.useState<boolean>(false);

  useInterval(
    () => {
      const nextGenerationGrid = createNextGeneration(grid);
      setGrid(nextGenerationGrid);
    },
    isSimulationRunning ? 200 : null,
  );

  function toggleCellAtLocation({
    rowIndex,
    columnIndex,
  }: {
    rowIndex: number;
    columnIndex: number;
  }) {
    const gridCopy = copyGrid(grid);
    const currentCellState = grid[rowIndex][columnIndex];
    const toggledCellState = currentCellState ? false : true;
    gridCopy[rowIndex][columnIndex] = toggledCellState;
    setGrid(gridCopy);
  }

  function onNextGenerationButtonClick() {
    const nextGenerationGrid = createNextGeneration(grid);
    setGrid(nextGenerationGrid);
  }

  function onResetClick() {
    setGrid(INITIAL_GRID);
  }

  function onToggleSimulationClick() {
    const toggledState = isSimulationRunning ? false : true;
    setIsSimulationRunning(toggledState);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex gap-2">
        <button onClick={onToggleSimulationClick}>
          {isSimulationRunning ? "Stop" : "Start"}
        </button>
        <button onClick={onNextGenerationButtonClick}>Next</button>
        <button onClick={onResetClick}>Reset</button>
      </div>

      <div className="flex flex-col gap-0.5">
        {grid.map((gridCells, rowIndex) => {
          const rowName = `row-${rowIndex}`;
          return (
            <div key={rowName} className="flex gap-0.5">
              {gridCells.map((cell, columnIndex) => {
                const cellName = `cell-${columnIndex}`;
                const testid = `${rowIndex}-${columnIndex}`;
                return (
                  <button
                    key={cellName}
                    data-testid={testid}
                    className={classNames(
                      "transition",
                      "flex items-center justify-center",
                      "w-12 h-12",
                      { "bg-gray-100 text-black": !cell },
                      { "bg-blue-500 text-white": cell },
                    )}
                    onClick={() =>
                      toggleCellAtLocation({ rowIndex, columnIndex })
                    }
                  ></button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Grid };
