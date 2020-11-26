import {Grid} from './grid.model';

export class Cell {
  constructor(
    public readonly color: string = 'white',
    public readonly content: Figure = Figure.EMPTY,
    public readonly position: Position,
    private readonly grid: Grid
  ) {
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

export class Player extends Cell {
  constructor(position: Position, grid: Grid) {
    super('white', Figure.PLAYER, position, grid);
  }
}

export enum Figure {
  EMPTY,
  ROBOT_ALIVE,
  ROBOT_TRASH,
  PLAYER
}

export class Position {
  constructor(public readonly row: number, public readonly column: number) {
  }
}
