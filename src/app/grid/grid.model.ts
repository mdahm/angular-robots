export class Grid {


  constructor() {
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
