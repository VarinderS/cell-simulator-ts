import React from "react";
import classNames from "classnames";

interface GridProps {
  gridColumns?: number;
  gridRows?: number;
  debug?: boolean;
}

function copyGrid(grid: boolean[][]) {
  return JSON.parse(JSON.stringify(grid));
}

function createNextGeneration(grid: boolean[][]) {
  const gridCopy = copyGrid(grid);

  const totalRows = grid.length;

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    const totalCells = row.length;
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const isCellAlive = grid[rowIndex][columnIndex];

      const northernRowIndex = (rowIndex - 1) % totalRows;
      const northernRow = grid.at(northernRowIndex);

      const centralRow = row;

      const southernRowIndex = (rowIndex + 1) % totalRows;
      const southernRow = grid.at(southernRowIndex);

      const northernNeighbor = northernRow?.at(columnIndex);

      const northEasternColumnIndex = (columnIndex + 1) % totalCells;
      const northEasternNeighbor = northernRow?.at(northEasternColumnIndex);

      const easternColumnIndex = (columnIndex + 1) % totalCells;
      const easternNeighbor = centralRow.at(easternColumnIndex);

      const southEasternColumnIndex = (columnIndex + 1) % totalCells;
      const southEasternNeighbor = southernRow?.at(southEasternColumnIndex);

      const southernNeighbor = southernRow?.at(columnIndex);

      const southWesternColumnIndex = (columnIndex - 1) % totalCells;
      const southWesternNeighbor = southernRow?.at(southWesternColumnIndex);

      const westernColumnIndex = (columnIndex - 1) % totalCells;
      const westernNeighbor = centralRow?.at(westernColumnIndex);

      const northWesternColumnIndex = (columnIndex - 1) % totalCells;
      const northWesternNeighbor = northernRow?.at(northWesternColumnIndex);

      const totalAliveNeighbors = [
        northernNeighbor,
        northEasternNeighbor,
        easternNeighbor,
        southEasternNeighbor,
        southernNeighbor,
        southWesternNeighbor,
        westernNeighbor,
        northWesternNeighbor,
      ].filter(Boolean).length;

      if (isCellAlive) {
        if (totalAliveNeighbors < 2) {
          gridCopy[rowIndex][columnIndex] = false;
        }

        if (totalAliveNeighbors > 3) {
          gridCopy[rowIndex][columnIndex] = false;
        }
      } else {
        if (totalAliveNeighbors === 3) {
          gridCopy[rowIndex][columnIndex] = true;
        }
      }
    }
  }

  return gridCopy;
}

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = React.useRef(callback);

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const INITIAL_GRID = [
  [false, false, false, false, false, false],
  [false, false, true, false, false, false],
  [false, false, false, true, false, false],
  [false, true, true, true, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
];

function Grid({ gridColumns = 6, gridRows = 6, debug = false }: GridProps) {
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
    <div>
      <button onClick={onToggleSimulationClick}>
        {isSimulationRunning ? "Stop" : "Start"}
      </button>
      <button onClick={onNextGenerationButtonClick}>Next</button>
      <button onClick={onResetClick}>Reset</button>

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
                      "bg-gray-100",
                      { "bg-blue-500 text-white": cell },
                    )}
                    onClick={() =>
                      toggleCellAtLocation({ rowIndex, columnIndex })
                    }
                  >
                    {debug && (
                      <span>
                        {rowIndex} {columnIndex}
                      </span>
                    )}
                  </button>
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
