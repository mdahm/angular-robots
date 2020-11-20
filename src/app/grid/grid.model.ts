import {deepCopy, random, randomEnum} from '../globals';

export const COLUMNS = 30;
export const ROWS = 15;
export const ROBOTS = 5;

export class Grid {
  private readonly cells: Cell[][];

  constructor() {
    const rows = new Array(ROWS);

    for (let i = 0; i < ROWS; i++) {
      rows[i] = new Array<Cell>(COLUMNS);
    }

    this.cells = rows;
  }

  public rows = () => deepCopy(this.cells);

  public columns = (row: number) => deepCopy(this.cells[row]);

  public cell = (row: number, column: number) => this.cells[row][column];

  private setCell = (row: number, column: number, cell: Cell) => this.cells[row][column] = cell;

  public allCells(): Array<Cell> {
    const result = new Array<Cell>();

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        result.push(this.cells[i][j]);
      }
    }

    // Should be copy
    return result;
  }

  public populate(): void {
    for (let x = 0; x < ROWS; x++) {
      for (let y = 0; y < COLUMNS; y++) {
        this.setCell(x, y, new Cell('white', Figure.EMPTY));
      }
    }

    let robotsLeft = ROBOTS;

    while (robotsLeft > 0) {
      let row = random(0, ROWS - 1);
      let column = random(0, COLUMNS - 1);

      if (this.cell(row, column).empty()) {
        this.setCell(row, column, new Cell('white', Figure.ROBOT_ALIVE));
        robotsLeft--;
      }
    }
  }

  public columnCount = () => COLUMNS;
  public rowCount = () => ROWS;
}

export class Cell {
  constructor(
    public color: string = 'white',
    public content: Figure = Figure.EMPTY
  ) {
  }

  public name(): string {
    switch (this.content) {
      case Figure.EMPTY:
        return 'empty';
      case Figure.PLAYER:
        return 'Player';
      case Figure.ROBOT_ALIVE:
        return 'Robot';
      case Figure.ROBOT_TRASH:
        return 'Trash';
      default:
        return '???';
    }
  }

  imageName = () => this.name().toLowerCase() + '-small.png';

  empty = () => this.content == Figure.EMPTY;
}

export enum Figure {
  EMPTY,
  ROBOT_ALIVE,
  ROBOT_TRASH,
  PLAYER
}
