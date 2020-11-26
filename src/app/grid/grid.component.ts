import {Component, OnInit} from '@angular/core';
import {GridProviderService} from './grid-provider-service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  constructor(private readonly gridProvider: GridProviderService) {
  }

  public grid = () => this.gridProvider.grid

  ngOnInit(): void {
    this.gridProvider.grid.populate();
  }
}
