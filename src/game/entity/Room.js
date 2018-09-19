import {Sprite, IsoSprite} from '../';
import {Point} from '../../utils/math';
export class Room {
  constructor(game) {
    this.map = [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    this.floor = new Sprite(document.querySelector('#img-tile'), 0, 0)
    this.widthTile = 7;
    this.heightTile = 8;
    this.width = (this.widthTile + this.heightTile) * this.floor.width / 2;
    this.height = (this.widthTile + this.heightTile) * this.floor.height / 2;
    this.x = game.renderer.canvas.width / 2 - this.width / 2
    this.y = game.renderer.canvas.height / 2 - this.height / 2
    this.cursor = new IsoSprite(document.querySelector('#img-cursor'), 0, 0, this)
    this.entities = []
  }
  setCursor (point) {
    if (point.x >= 0 &&
        point.x < this.widthTile &&
        point.y >= 0 &&
        point.y < this.heightTile &&
      this.map[point.x * this.heightTile + point.y] !== 0){
      this.cursor.setIsoXY(point.x, point.y)
      this.cursor.setVisible(true)
    } else {
      this.cursor.setVisible(false)
    }
  }
  getMap2d () {
    let map2d = [];
    for (var i = 0; i < this.widthTile; i++) {
      for (var j = 0; j < this.heightTile; j++) {
        if (!map2d[j]) map2d[j] = []
        map2d[j][i] = this.map[i * this.widthTile + j]
      }
    }
    return map2d
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
    this.cursor.render(ctx)

    this.entities.forEach(entity => entity.render())
  }
}
