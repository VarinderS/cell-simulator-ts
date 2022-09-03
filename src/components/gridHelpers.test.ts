import { createNextGeneration, getAliveNeighborsCount } from "./gridHelpers";

describe("getAliveNeighborsCount", () => {
  it("should return correct alive neighbors count", () => {
    const grid = [
      [true, true, true], // row index: 0
      [true, true, true], // row index: 1
      [true, true, true], // row index: 2
    ];

    const result = getAliveNeighborsCount({
      rowIndex: 1,
      columnIndex: 1,
      grid,
    });

    expect(result).toBe(8);
  });
});

describe("createNextGeneration", () => {
  it("should kill cell when it has less than two alive neighbors", () => {
    const grid = [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ];

    const nextGeneration = createNextGeneration(grid);
    const centerCell = nextGeneration[1][1];

    expect(centerCell).toBe(false);
  });

  it("should kill cell when it has more than three alive neighbors", () => {
    const grid = [
      [false, true, false],
      [true, true, true],
      [false, true, false],
    ];

    const nextGeneration = createNextGeneration(grid);
    const centerCell = nextGeneration[1][1];

    expect(centerCell).toBe(false);
  });

  it("should make a cell alive when it has exactly three alive neighbors", () => {
    const grid = [
      [false, true, false],
      [true, false, true],
      [false, false, false],
    ];

    const nextGeneration = createNextGeneration(grid);
    const centerCell = nextGeneration[1][1];

    expect(centerCell).toBe(true);
  });
});
