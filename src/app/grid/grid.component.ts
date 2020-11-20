import { Component, OnInit } from '@angular/core';
import {Grid} from './grid.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  readonly grid = new Grid();

  constructor() { }

  ngOnInit(): void {
    this.grid.populate();
  }
}
