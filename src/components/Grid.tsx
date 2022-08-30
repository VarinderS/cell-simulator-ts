import React from "react";
import classNames from "classnames";

interface GridProps {
  gridColumns?: number;
  gridRows?: number;
  debug?: boolean;
}

function Grid({ gridColumns = 6, gridRows = 6, debug = true }: GridProps) {
  const [grid] = React.useState<boolean[][]>([
    [false, true, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
  ]);

  return (
    <div className="flex flex-col gap-0.5">
      {grid.map((gridCells, rowIndex) => {
        const rowName = `row-${rowIndex}`;
        return (
          <div key={rowName} className="flex gap-0.5">
            {gridCells.map((isAlive, cellIndex) => {
              const cellName = `cell-${cellIndex}`;
              const xAxisValue = cellIndex;
              const yAxisValue = rowIndex;
              const testid = `${xAxisValue}-${yAxisValue}`;
              return (
                <button
                  key={cellName}
                  data-testid={testid}
                  className={classNames(
                    "flex items-center justify-center",
                    "w-12 h-12",
                    "bg-gray-100",
                    { "bg-blue-500 text-white": isAlive },
                  )}
                >
                  {debug && (
                    <span>
                      {xAxisValue} {yAxisValue}
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
