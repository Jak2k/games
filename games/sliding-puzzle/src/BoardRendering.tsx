import { Action } from "./App";
import { Board } from "./board";

export default function BoardRendering({
  board,
  reduce,
}: {
  board: Board;
  reduce: (action: Action) => void;
}) {
  const correctTiles = board.filter(
    (tile) => tile.id === tile.row * 4 + tile.col
  );

  let win = false;
  if (correctTiles.length === 16) {
    win = true;
  }
  return (
    <>
      {win && <h1>YOU WIN!</h1>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
          gap: "1em",
        }}
      >
        {board.map((tile) => {
          const isAtCorrectPosition = tile.id === tile.row * 4 + tile.col;
          return (
            <div
              style={{
                border: "1px solid black",
                borderRadius: "0.5em",
                padding: "0.5em",
                textAlign: "center",
                backgroundColor:
                  tile.id === 15
                    ? "transparent"
                    : isAtCorrectPosition
                    ? "green"
                    : "darkgray",
              }}
              key={tile.id}
              onClick={() => reduce({ row: tile.row, col: tile.col })}
            >
              {tile.id + 1}
            </div>
          );
        })}
      </div>
    </>
  );
}
