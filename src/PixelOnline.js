import {PaneManager} from './ui/';
import {Account} from './Account';
import {Game} from './game';


export class PixelOnline {
  constructor(socket) {
    this.socket = socket;
    window.game = new Game(socket);
  }
}
