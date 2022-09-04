import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Grid } from "./Grid";

function renderComponent() {
  render(<Grid />);

  const user = userEvent.setup();

  const getStartButton = () => screen.getByRole("button", { name: /start/i });

  const getStopButton = () => screen.getByRole("button", { name: /stop/i });

  const getNextButton = () => screen.getByRole("button", { name: /next/i });

  const getResetButton = () => screen.getByRole("button", { name: /reset/i });

  const getCell = ({
    rowIndex,
    columnIndex,
  }: {
    rowIndex: number;
    columnIndex: number;
  }) => {
    const testId = `${rowIndex}-${columnIndex}`;
    return screen.getByTestId(testId);
  };

  return {
    user,
    getStartButton,
    getStopButton,
    getNextButton,
    getResetButton,
    getCell,
  };
}

const ALIVE_CELL_CLASS = "bg-blue-500 text-white";
const DEAD_CELL_CLASS = "bg-gray-100 text-black";

describe("Grid", () => {
  it("should toggle cell on or off", async () => {
    const { user, getCell } = renderComponent();

    const firstCell = getCell({ rowIndex: 0, columnIndex: 0 });

    expect(firstCell).not.toHaveClass(ALIVE_CELL_CLASS);
    expect(firstCell).toHaveClass(DEAD_CELL_CLASS);

    await user.click(firstCell);

    expect(firstCell).toHaveClass(ALIVE_CELL_CLASS);
    expect(firstCell).not.toHaveClass(DEAD_CELL_CLASS);

    await user.click(firstCell);

    expect(firstCell).not.toHaveClass(ALIVE_CELL_CLASS);
    expect(firstCell).toHaveClass(DEAD_CELL_CLASS);
  });

  it("should update grid with next generation when next button is clicked", async () => {
    const { user, getNextButton, getCell } = renderComponent();

    const firstGenerationAliveCell = getCell({ rowIndex: 1, columnIndex: 2 });

    expect(firstGenerationAliveCell).toHaveClass(ALIVE_CELL_CLASS);

    await user.click(getNextButton());

    expect(firstGenerationAliveCell).not.toHaveClass(ALIVE_CELL_CLASS);
  });

  it("should reset grid to default state when reset button is clicked", async () => {
    const { user, getNextButton, getResetButton, getCell } = renderComponent();

    const firstGenerationAliveCell = getCell({ rowIndex: 1, columnIndex: 2 });

    await user.click(getNextButton());

    await user.click(getResetButton());

    expect(firstGenerationAliveCell).toHaveClass(ALIVE_CELL_CLASS);
  });

  it("should change start button text when simulation is running", async () => {
    const { user, getStartButton } = renderComponent();

    const startButton = getStartButton();

    expect(startButton).toHaveTextContent("Start");

    await user.click(startButton);

    expect(startButton).toHaveTextContent("Stop");

    await user.click(startButton);

    expect(startButton).toHaveTextContent("Start");
  });

  it("should update grid with next generation when start simulation button is clicked", async () => {
    const { user, getStartButton, getCell } = renderComponent();

    const firstGenerationAliveCell = getCell({ rowIndex: 1, columnIndex: 2 });

    expect(firstGenerationAliveCell).toHaveClass(ALIVE_CELL_CLASS);

    await user.click(getStartButton());

    await waitFor(() => {
      expect(firstGenerationAliveCell).not.toHaveClass(ALIVE_CELL_CLASS);
    });
  });
});
