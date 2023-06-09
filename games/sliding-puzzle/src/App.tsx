import { useReducer } from "react";
import BoardRendering from "./BoardRendering";
import { Board, Tile } from "./board";

const initialBoard: Board = [];

const openTargets: {
  row: number;
  col: number;
}[] = [];

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) openTargets.push({ row: i, col: j });
}

for (let row = 0; row < 4; row++) {
  for (let col = 0; col < 4; col++) {
    const targetIndex = Math.floor(Math.random() * openTargets.length);
    const target = openTargets[targetIndex];
    openTargets.splice(targetIndex, 1);
    initialBoard.push({
      id: target.row * 4 + target.col,
      row,
      col,
    });
  }
}

export type Action = {
  row: number;
  col: number;
};

function App() {
  const reducer = (board: Board, action: Action) => {
    const emptyTile = board.find((tile) => tile.id === 15) as Tile;
    const clickedTile = board.find(
      (tile) => tile.row === action.row && tile.col === action.col
    ) as Tile;

    if (
      (emptyTile?.row === clickedTile?.row &&
        Math.abs(emptyTile.col - clickedTile.col) === 1) ||
      (emptyTile?.col === clickedTile?.col &&
        Math.abs(emptyTile.row - clickedTile.row) === 1)
    ) {
      const newBoard = board.map((tile) => {
        if (tile.id === clickedTile.id) {
          return {
            ...emptyTile,
            row: clickedTile.row,
            col: clickedTile.col,
          };
        } else if (tile.id === emptyTile.id) {
          return {
            ...clickedTile,
            row: emptyTile.row,
            col: emptyTile.col,
          };
        } else {
          return tile;
        }
      });
      return newBoard;
    }

    return board;
  };
  const [board, reduce] = useReducer(reducer, initialBoard);

  return (
    <>
      <h1>Sliding Puzzle</h1>
      <BoardRendering board={board} reduce={reduce} />
    </>
  );
}

export default App;
