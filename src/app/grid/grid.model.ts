import {deepCopy, randomEnum} from '../globals';

export const COLUMNS = 30;
export const ROWS = 15;

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

  public allCells(): Array<Cell> {
    const result = new Array<Cell>();

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        result.push(this.cells[i][j]);
      }
    }

    return result;
  }

  public populate(): void {
    for (let x = 0; x < ROWS; x++) {
      for (let y = 0; y < COLUMNS; y++) {
        this.cells[x][y] = new Cell('white', randomEnum(Figure));
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
}

export enum Figure {
  EMPTY,
  ROBOT_ALIVE,
  ROBOT_TRASH,
  PLAYER
}
