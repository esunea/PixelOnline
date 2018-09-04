import 'phaser';
import BootScene from './scenes/BootScene';
import {PaneManager} from './ui/PaneManager';

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: window.innerWidth,
    height: window.innerHeight
};

const PM = new PaneManager();
PM.create(300, 400, 'test', "Test")
PM.createLogin()
console.log(PM);
// const game = new Phaser.Game(config);
