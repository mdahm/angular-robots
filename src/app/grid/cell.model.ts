import {Grid} from './grid.model';
import {v4 as uuid} from 'uuid';

export class Cell {
  private _content: Figure = new Figure(FigureType.EMPTY, this);

  constructor(
    public readonly color: string = 'white',
    public readonly position: Position,
    private readonly grid: Grid,
  ) {
  }

  set content(figure: Figure) {
    this._content = figure;
    figure.cell = this;
  }

  get content(): Figure {
    return this._content;
  }

  public mayMoveLeft(): Position {
    if (this.position.column > 0) {
      return new Position(this.position.row, this.position.column - 1);
    } else {
      return null;
    }
  }

  public mayMoveRight(): Position {
    if (this.position.column < this.grid.columnCount() - 1) {
      return new Position(this.position.row, this.position.column + 1);
    } else {
      return null;
    }
  }

  public mayMoveUp(): Position {
    if (this.position.row > 0) {
      return new Position(this.position.row - 1, this.position.column);
    } else {
      return null;
    }
  }

  public mayMoveDown(): Position {
    if (this.position.row < this.grid.rowCount() - 1) {
      return new Position(this.position.row + 1, this.position.column);
    } else {
      return null;
    }
  }

  name = () => this._content.name();

  imageName = () => this.name().toLowerCase() + '-small.png';

  empty = () => this._content.type == FigureType.EMPTY;
}

export class Figure {
  public readonly identity: String = uuid();

  constructor(public readonly type: FigureType, public cell: Cell) {
  }

  public name(): string {
    switch (this.type) {
      case FigureType.EMPTY:
        return 'empty';
      case FigureType.PLAYER:
        return 'Player';
      case FigureType.ROBOT_ALIVE:
        return 'Robot';
      case FigureType.ROBOT_TRASH:
        return 'Trash';
      default:
        return '???';
    }
  }

  equals(that: Figure): boolean {
    return this.identity == that.identity;
  }
}

export class Player extends Figure {
  constructor(cell: Cell) {
    super(FigureType.PLAYER, cell);
  }
}

export class Robot extends Figure {
  constructor(cell: Cell) {
    super(FigureType.ROBOT_ALIVE, cell);
  }
}

export enum FigureType {
  EMPTY,
  ROBOT_ALIVE,
  ROBOT_TRASH,
  PLAYER
}

export class Position {
  constructor(public readonly row: number, public readonly column: number) {
  }

  public equals(that: Position): boolean {
    return this.row == that.row && this.column == that.column;
  }
}
