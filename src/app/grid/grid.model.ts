import {random} from '../globals';
import {Cell, Figure, FigureType, Player, Position, Robot} from './cell.model';

export const COLUMNS = 30;
export const ROWS = 15;
export const ROBOTS = 5;

export class Grid {
  private readonly cells: Cell[][];
  private _player: Player;

  constructor() {
    const rows = new Array(ROWS);

    for (let i = 0; i < ROWS; i++) {
      rows[i] = new Array<Cell>(COLUMNS);
    }

    this.cells = rows;
    this._player = null;
  }

  public rows = () => this.cells;

  public columns = (row: number) => this.cells[row];

  public cell = (row: number, column: number) => this.cells[row][column];

  private setCell = (row: number, column: number, cell: Cell) => this.cells[row][column] = cell;

  public allCells(): Array<Cell> {
    const result = new Array<Cell>();

    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS; column++) {
        result.push(this.cells[row][column]);
      }
    }

    return result;
  }

  get player(): Player {
    return this._player;
  }

  public populate(): void {
    this.clear();

    this.placeFigures(ROBOTS, (cell: Cell) => new Robot(cell));
    this._player = this.placeFigures(1, (cell: Cell) => new Player(cell));
  }

  private clear() {
    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS; column++) {
        this.setCell(row, column, new Cell('white', new Position(row, column), this));
      }
    }
  }

  private placeFigures(number: number, creator: (cell: Cell) => Figure): Figure {
    let figuresLeft = number;

    while (figuresLeft > 0) {
      const row = random(0, ROWS - 1);
      const column = random(0, COLUMNS - 1);
      const cell = this.cell(row, column);

      if (cell.empty()) {
        cell.content = creator(cell);
        figuresLeft--;
      }

      if (figuresLeft == 0) {
        return cell.content;
      }
    }
  }

  public findEmptyPosition(): Position {
    while (true) {
      let row = random(0, ROWS - 1);
      let column = random(0, COLUMNS - 1);

      if (this.cell(row, column).empty()) {
        return new Position(row, column);
      }
    }
  }

  public columnCount = () => COLUMNS;
  public rowCount = () => ROWS;

  updatePlayerPosition(newPlayerPosition: Position) {
    const oldPosition = this._player.cell.position;
    const oldCell = this.cell(oldPosition.row, oldPosition.column);
    const newCell = this.cell(newPlayerPosition.row, newPlayerPosition.column);
    oldCell.content = new Figure(FigureType.EMPTY, oldCell);
    newCell.content = this._player;
  }

  updateRobotPosition(robot: Robot, newRobotPosition: Position) {
    const oldPosition = robot.cell.position;
    const oldCell = this.cell(oldPosition.row, oldPosition.column);
    const newCell = this.cell(newRobotPosition.row, newRobotPosition.column);
    const newFigureType = Grid.computeNewFigure(newCell);
    const newFigure = newFigureType == FigureType.ROBOT_ALIVE ? robot : new Figure(newFigureType, newCell);

    oldCell.content = new Figure(FigureType.EMPTY, oldCell);
    newCell.content = newFigure;

    if (newRobotPosition.equals(this._player.cell.position)) {
      alert('Game over!!!');
      this._player = null;
    }
  }

  private static computeNewFigure(cell: Cell): FigureType {
    switch (cell.content.type) {
      case FigureType.ROBOT_TRASH:
      case FigureType.ROBOT_ALIVE:
        return FigureType.ROBOT_TRASH;
      case FigureType.EMPTY:
      case FigureType.PLAYER:
        return FigureType.ROBOT_ALIVE;
      default:
        alert('Ooops');
    }
  }

  gameOver = () => this._player == null;
}

