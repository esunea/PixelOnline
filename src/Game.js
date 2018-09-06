import {PaneManager} from './ui/';
import {Account} from './Account';

// const game = new Phaser.Game(config);


export class Game {
  constructor(socket) {
    this.panemanager = new PaneManager();
    this.panemanager.createLogin()
    this.account = new Account(socket);
    this.socket = socket;
    this.phaserConfig = {
        type: "Phaser.WEBGL",
        pixelArt: true,
        roundPixels: true,
        parent: 'content',
        width: window.innerWidth,
        height: window.innerHeight
    }
  }
}
