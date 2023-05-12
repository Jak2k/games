export type Tile = {
  id: number;
  targetRow: number;
  targetCol: number;
  row: number;
  col: number;
};

export type Board = Tile[];
