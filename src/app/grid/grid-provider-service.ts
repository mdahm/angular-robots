import {Grid} from './grid.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GridProviderService {
  private _grid = new Grid();

  get grid(): Grid {
    return this._grid;
  }

  public restart(): void {
    this._grid = new Grid();
    this._grid.populate();
  }
}
