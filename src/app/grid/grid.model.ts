import {deepCopy, randomEnum} from '../globals';

export const COLUMNS = 20;
export const ROWS = 25;

export class Grid {
  private readonly cells: Cell[][];

  constructor() {
    const rows = new Array(ROWS);

    for (let i = 0; i < ROWS; i++) {
      rows[i] = new Array<Cell>(COLUMNS);
    }

    this.cells = rows;
  }

  public rows(): Cell[][] {
    return deepCopy(this.cells);
  }

  public columns(row: number): Array<Cell> {
    return deepCopy(this.cells[row]);
  }

  public cell(row: number, column: number): Cell {
    return this.cells[row][column];
  }

  public populate(): void {
    for (let x = 0; x < ROWS; x++) {
      for (let y = 0; y < COLUMNS; y++) {
        this.cells[x][y] = new Cell('white', randomEnum(Figure));
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
