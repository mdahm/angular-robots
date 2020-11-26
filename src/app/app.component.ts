import {Component, HostListener, OnInit} from '@angular/core';
import {GridProviderService} from './grid/grid-provider-service';
import {GameController} from './controller/game-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private controller: GameController;

  constructor(controller: GameController) {
    this.controller = controller;
  }

  @HostListener('window:keydown', ['$event'])
  // @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.controller.handleKeyboardEvent(event);
  }

  ngOnInit(): void {
  }
}
