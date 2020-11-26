import {Injectable} from '@angular/core';
import {GridProviderService} from '../grid/grid-provider-service';
import {Position} from '../grid/cell.model';

@Injectable({
  providedIn: 'root',
})
export class GameController {
  private gridProvider: GridProviderService;

  constructor(gridprovider: GridProviderService) {
    this.gridProvider = gridprovider;
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    const newPosition: Position = this.checkMove(event);

    if (newPosition != null) {
      const grid = this.gridProvider.grid;

      grid.updatePlayerPosition(newPosition);
    }
  }

  private checkMove(event: KeyboardEvent): Position {
    const grid = this.gridProvider.grid;
    const player = grid.player;
    const actionMap = {
      // Stay
      '.': () => player.position,
      // Teleport
      't': () => grid.findEmptyPosition(),
      'ArrowLeft': () => player.mayMoveLeft(),
      'ArrowRight': () => player.mayMoveRight(),
      'ArrowUp': () => player.mayMoveUp(),
      'ArrowDown': () => player.mayMoveDown()
    }[event.key];

    return actionMap?.();
  }
}
