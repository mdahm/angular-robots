import {HostListener, Injectable} from '@angular/core';
import {GridProviderService} from '../grid/grid-provider-service';

@Injectable({
  providedIn: 'root',
})
export class GameController {
  private gridProvider: GridProviderService;

  constructor(gridprovider: GridProviderService) {
    this.gridProvider = gridprovider;
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
  }
}
