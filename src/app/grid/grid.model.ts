import {deepCopy, random} from '../globals';
import {Cell, Figure, Player, Position} from './cell.model';

export const COLUMNS = 30;
export const ROWS = 15;
export const ROBOTS = 5;

export class Grid {
  private readonly cells: Cell[][];
  private player: Player;

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

    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS; column++) {
        result.push(this.cells[row][column]);
      }
    }

    // Should be copy
    return result;
  }

  public populate(): void {
    this.clear();

    this.placeFigures(ROBOTS, (position: Position) => new Cell('white', Figure.ROBOT_ALIVE, position, this));
    this.player = this.placeFigures(1, (position: Position) => new Player(position, this));
  }

  private clear() {
    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS; column++) {
        this.setCell(row, column, new Cell('white', Figure.EMPTY, new Position(row, column), this));
      }
    }
  }

  private placeFigures(number: number, creator: (position: Position) => Cell): Cell {
    let figuresLeft = number;

    while (figuresLeft > 0) {
      let row = random(0, ROWS - 1);
      let column = random(0, COLUMNS - 1);

      if (this.cell(row, column).empty()) {
        this.setCell(row, column, creator(new Position(row, column)));
        figuresLeft--;
      }

      if (figuresLeft == 0) {
        return this.cell(row, column);
      }
    }
  }

  public columnCount = () => COLUMNS;
  public rowCount = () => ROWS;
}

