import {Game} from './Game';
var io = require('socket.io-client');
window.io = io;

window.game = new Game(io("http://localhost:8080"));
