export type CellID = `${number}-${number}`; // e.g., "2-3"

export interface CellData {
  id: CellID;
  row: number;
  col: number;
  regionId: number;
  value: number | null;     // Final number in the cell (if any)
  scribbles: number[];      // Player notes (possible values)
}

export interface Puzzle {
  width: number;            // Grid width
  height: number;           // Grid height
  cells: CellData[][];      // 2D matrix of cells [row][col]
}
