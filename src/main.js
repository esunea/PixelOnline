import {Game} from './Game';
import $ from 'webpack-zepto'
import css from './css/style.css'
var io = require('socket.io-client');
window.io = io;

window.game = new Game(io("http://localhost:8080"));
setTimeout(() => $('.appear').toggleClass('appear'), 2000)
setTimeout(() => $('.notification').toggleClass('appear'), 4000)
