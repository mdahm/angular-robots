import {Component, HostListener, OnInit} from '@angular/core';
import {GameController} from './controller/game-controller.service';
import {GridProviderService} from './grid/grid-provider-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(readonly gridProvider: GridProviderService, private readonly controller: GameController) {
  }

  @HostListener('window:keydown', ['$event'])
  // @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.controller.handleKeyboardEvent(event);
  }

  ngOnInit(): void {
  }
}
