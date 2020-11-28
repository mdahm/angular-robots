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

    if(this.allRobots().length == 0){
      alert('YOU WIN!!!!!');
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
    const robotIds: String[] = handled.map((robot: Robot) => robot.identity);

    return this.allRobots()
      .filter((cell) => !robotIds.includes(cell.content.identity))
      .map((cell) => cell.content);
  }

  private allRobots() {
    const grid = this.gridProvider.grid;
    return grid.allCells().filter((cell) => cell.content.type == FigureType.ROBOT_ALIVE);
  }

  private static computeNextMove(robot: Position, player: Position): Position {
    const rowDistance = Math.abs(robot.row - player.row);
    const columnDistance = Math.abs(robot.column - player.column);
    const preferRow = rowDistance > columnDistance;

    if (preferRow) {
      if (robot.row < player.row) {
        return new Position(robot.row + 1, robot.column);
      } else if (robot.row > player.row) {
        return new Position(robot.row - 1, robot.column);
      }
    } else {
      if (robot.column > player.column) {
        return new Position(robot.row, robot.column - 1);
      } else if (robot.column < player.column) {
        return new Position(robot.row, robot.column + 1);
      }
    }

    return robot;
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
