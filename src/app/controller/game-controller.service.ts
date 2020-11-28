import {Injectable} from '@angular/core';
import {GridProviderService} from '../grid/grid-provider-service';
import {FigureType, Position, Robot} from '../grid/cell.model';

@Injectable({
  providedIn: 'root',
})
export class GameController {
  private gridProvider: GridProviderService;

  constructor(gridprovider: GridProviderService) {
    this.gridProvider = gridprovider;
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    const newPlayerPosition: Position = this.checkMove(event);
    const grid = this.gridProvider.grid;

    if (newPlayerPosition != null && !grid.gameOver()) {
      grid.updatePlayerPosition(newPlayerPosition);
      this.updateRobotPositions();
    }
  }

  private updateRobotPositions() {
    const grid = this.gridProvider.grid;
    const handled: Robot[] = [];

    do {
      const robots: Robot[] = this.robots(handled);
      const robot: Robot = robots[0];
      const newRobotPosition = GameController.computeNextMove(robot.cell.position, grid.player.cell.position);

      grid.updateRobotPosition(robot, newRobotPosition);
      handled.push(robot);
    } while (this.robots(handled).length > 0);
  }

  private robots(handled: Robot[]): Robot[] {
    const grid = this.gridProvider.grid;
    const robotIds: String[] = handled.map((robot: Robot) => robot.identity);

    return grid.allCells().filter((cell) => cell.content.type == FigureType.ROBOT_ALIVE)
      .filter((cell) => !robotIds.includes(cell.content.identity))
      .map((cell) => cell.content);
  }

  private static computeNextMove(robot: Position, player: Position): Position {
    if (robot.row < player.row) {
      return new Position(robot.row + 1, robot.column);
    } else if (robot.row > player.row) {
      return new Position(robot.row - 1, robot.column);
    } // rows are equal
    else if (robot.column > player.column) {
      return new Position(robot.row, robot.column - 1);
    } else {
      return new Position(robot.row, robot.column + 1);
    }
  }

  private checkMove(event: KeyboardEvent): Position {
    const grid = this.gridProvider.grid;
    const cell = grid.player.cell;
    const actionMap = {
      // Stay
      '.': () => cell.position,
      // Teleport
      't': () => grid.findEmptyPosition(),
      'ArrowLeft': () => cell.mayMoveLeft(),
      'ArrowRight': () => cell.mayMoveRight(),
      'ArrowUp': () => cell.mayMoveUp(),
      'ArrowDown': () => cell.mayMoveDown()
    }[event.key];

    return actionMap?.();
  }
}
