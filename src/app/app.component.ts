import {Component, OnInit} from '@angular/core';
import {Grid} from './grid/grid.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly grid = new Grid();

  ngOnInit(): void {
    this.grid.populate();
  }
}
