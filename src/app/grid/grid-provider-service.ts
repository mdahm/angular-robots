import {Grid} from './grid.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GridProviderService {
  private internalGrid = new Grid();

  public readonly grid = () => this.internalGrid;

  public restart(): void {
    this.internalGrid = new Grid();
    this.internalGrid.populate();
  }
}
