import {Sprite} from '../';
import {Point} from '../../utils/math';
export class Room {
  constructor() {
    this.map = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    this.floor = new Sprite(document.querySelector('#img-tile'), 0, 0)
    this.cursor = new Sprite(document.querySelector('#img-cursor'), 0, 0)
    this.widthTile = 7;
    this.heightTile = 8;
    this.width = (this.widthTile + this.heightTile) * this.floor.width / 2;
    this.height = (this.widthTile + this.heightTile) * this.floor.height / 2;
    this.x = window.innerWidth / 2 - this.width / 2
    this.y = window.innerHeight / 2 - this.height / 2
    this.cursorPos = null
  }
  setCursor (point) {
    if (point.x >= 0 &&
        point.x < this.widthTile &&
        point.y >= 0 &&
        point.y < this.heightTile &&
      this.map[point.x * this.heightTile + point.y] !== 0){
      this.cursorPos = point
    } else {
      this.cursorPos = null
    }
  }
  render (ctx) {
    for (var i = 0; i < this.widthTile; i++) {
      for (var j = 0; j < this.heightTile; j++) {
        if (this.map[i * this.widthTile + j] !== 0) {
          this.floor.x = this.x + (this.widthTile * this.floor.width / 2) + (i - j) * this.floor.width / 2
          this.floor.y = this.y + (i + j) * this.floor.height / 2
          this.floor.render(ctx)
        }
      }
    }
    // ctx.fillStyle = "rgba(255,0,0,.2)";
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    if (this.cursorPos !== null) {
      this.cursor.x = this.x + (this.widthTile * this.floor.width / 2) + (this.cursorPos.x - this.cursorPos.y) * this.floor.width / 2
      this.cursor.y = this.y + (this.cursorPos.x + this.cursorPos.y) * this.floor.height / 2
      this.cursor.render(ctx)
    }
  }
}
