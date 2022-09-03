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
