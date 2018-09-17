import {PixelOnline} from './PixelOnline';
import $ from 'webpack-zepto'
import css from './css/style.css'
var io = require('socket.io-client');
window.io = io;

window.onload = () => {
  window.game = new PixelOnline(io("http://localhost:8080"));
}
