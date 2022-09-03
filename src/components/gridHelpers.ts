import React from "react";

function copyGrid(grid: boolean[][]) {
  return JSON.parse(JSON.stringify(grid));
}

function getAliveNeighborsCount({
  rowIndex,
  columnIndex,
  grid,
}: {
  rowIndex: number;
  columnIndex: number;
  grid: boolean[][];
}) {
  const row = grid[rowIndex];
  const totalRows = grid.length;
  const totalCells = row.length;

  const northernRowIndex = (rowIndex - 1) % totalRows;
  const southernRowIndex = (rowIndex + 1) % totalRows;

  const easternColumnIndex = (columnIndex + 1) % totalCells;
  const westernColumnIndex = (columnIndex - 1) % totalCells;

  const northernRow = grid.at(northernRowIndex);
  const centralRow = row;
  const southernRow = grid.at(southernRowIndex);

  const northernNeighbor = northernRow?.at(columnIndex);

  const northEasternNeighbor = northernRow?.at(easternColumnIndex);

  const easternNeighbor = centralRow.at(easternColumnIndex);

  const southEasternNeighbor = southernRow?.at(easternColumnIndex);

  const southernNeighbor = southernRow?.at(columnIndex);

  const southWesternNeighbor = southernRow?.at(westernColumnIndex);

  const westernNeighbor = centralRow?.at(westernColumnIndex);

  const northWesternNeighbor = northernRow?.at(westernColumnIndex);

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

  return totalAliveNeighbors;
}

function createNextGeneration(grid: boolean[][]) {
  const gridCopy = copyGrid(grid);

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const isCellAlive = grid[rowIndex][columnIndex];

      const totalAliveNeighbors = getAliveNeighborsCount({
        rowIndex,
        columnIndex,
        grid,
      });

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

export { copyGrid, createNextGeneration, getAliveNeighborsCount, useInterval };
