import {Component, OnInit} from '@angular/core';
import {GridProviderService} from './grid-provider-service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  private gridProvider: GridProviderService;

  constructor(gridprovider: GridProviderService) {
    this.gridProvider = gridprovider;
  }

  public grid = () => this.gridProvider.grid()

  ngOnInit(): void {
    this.gridProvider.grid().populate();
  }

  keyPress(event: KeyboardEvent) {
    console.log(event);
  }
}
