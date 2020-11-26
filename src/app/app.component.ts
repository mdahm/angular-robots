import {Component, OnInit} from '@angular/core';
import {GridProviderService} from './grid/grid-provider-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  gridProvider: GridProviderService;

  constructor(gridprovider: GridProviderService) {
    this.gridProvider = gridprovider;
  }

  ngOnInit(): void {
  }
}
