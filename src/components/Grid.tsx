import React from "react";
import classNames from "classnames";

interface GridProps {
  gridColumns?: number;
  gridRows?: number;
  debug?: boolean;
}

function Grid({ gridColumns = 6, gridRows = 6, debug = true }: GridProps) {
  const [grid, setGrid] = React.useState<boolean[][]>([
    [false, true, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
  ]);

  function toggleCellAtLocation({
    rowIndex,
    columnIndex,
  }: {
    rowIndex: number;
    columnIndex: number;
  }) {
    const gridCopy = [...grid];
    const currentCellState = grid[rowIndex][columnIndex];
    const toggledCellState = currentCellState ? false : true;
    gridCopy[rowIndex][columnIndex] = toggledCellState;
    setGrid(gridCopy);
  }

  return (
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
                      {columnIndex} {rowIndex}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export { Grid };
