import 'phaser';
import BootScene from './scenes/BootScene';
import {Database} from './server/Database';
import {PaneManager} from './ui/';
import css from "./css/style.css"

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: window.innerWidth,
    height: window.innerHeight
};

const DB = new Database();
console.log('login', DB.login("leodesigaux@gmail.com", "1234"));
const PM = new PaneManager();
PM.createLogin()
PM.createRooms()
PM.createTchat()
console.log(PM);
var socket = io("http://localhost:8080");
// const game = new Phaser.Game(config);
