import {deepCopy, randomEnum} from "../globals";

export const COLUMNS = 20;
export const ROWS = 25;

export class Grid {
  private readonly cells: Cell[][];

  constructor() {
    let rows = new Array(ROWS);

    for (let row of rows) {
      row.push(new Array<Cell>(COLUMNS))
    }

    this.cells = rows
  }

  public rows() {
    return deepCopy(this.cells);
  }

  public columns(row: number): Array<Cell> {
    return deepCopy(this.cells[row]);
  }

  public cell(row: number, column: number) {
    return this.cells[row][column];
  }

  public populate() {
    for (let x = 0; x < COLUMNS; x++) {
      for (let y = 0; y < ROWS; y++) {
        this.cells[x][y] = new Cell('white', randomEnum(Figure))
      }
    }
  }
}

export class Cell {
  constructor(
    public color: string = 'white',
    public content: Figure = Figure.EMPTY
  ) {
  }
}

enum Figure {
  EMPTY,
  ROBOT_ALIVE,
  ROBOT_TRASH,
  PLAYER
}
