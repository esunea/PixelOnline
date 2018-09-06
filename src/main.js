import 'phaser';
import BootScene from './scenes/BootScene';
import {Database} from './server/Database';
import {PaneManager} from './ui/';
import css from "./css/style.css"

var socket = io("http://localhost:8080");
const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: window.innerWidth,
    height: window.innerHeight
};
const PM = new PaneManager();
PM.createLogin()


document.body.addEventListener('login', event => {
  console.log(event);
  socket.emit('login', JSON.stringify(event.detail));
})
socket.on('loginResponse', function (res) {
  if (res !== "error") {
    PM.remove('panes', 'login-pane')
    PM.createRooms()
    PM.createTchat()
  }
})
// const game = new Phaser.Game(config);
