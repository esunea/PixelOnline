import 'phaser';
import BootScene from './scenes/BootScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: window.innerWidth,
    height: window.innerHeight
};

// const game = new Phaser.Game(config);
