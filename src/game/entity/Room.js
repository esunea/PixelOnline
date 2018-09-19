import {Sprite, IsoSprite, Player, Ball, BallBis, BallMini} from '../';
import {Point, Pathfinder} from '../../utils/math';
export class Room {
  constructor(game) {
    this.map = [1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1];
    this.floor = new Sprite(document.querySelector('#img-tile'), 0, 0)
    this.widthTile = 7;
    this.heightTile = 8;
    this.width = (this.widthTile + this.heightTile) * this.floor.width / 2;
    this.height = (this.widthTile + this.heightTile) * this.floor.height / 2;
    this.x = game.renderer.canvas.width / 2 - this.width / 2
    this.y = game.renderer.canvas.height / 2 - this.height / 2
    this.cursor = new IsoSprite(document.querySelector('#img-cursor'), 0, 0, this)
    this.entities = []
    this.paths = []
    this.start = new Ball(0, 0, this)
    this.end = new BallBis(6, 7, this)
    this.createPath()
  }
  setCursor (point) {
    if (point.x >= 0 &&
        point.x < this.widthTile &&
        point.y >= 0 &&
        point.y < this.heightTile){
      this.cursor.setIsoXY(point.x, point.y)
      this.cursor.setVisible(true)
    } else {
      this.cursor.setVisible(false)
    }
  }
  createPath () {
    let p = new Pathfinder(this.getMap2d()).findPath(this.start.isoY, this.start.isoX, this.end.isoY, this.end.isoX, 100)
    if(p !== false)
    p.forEach(step => {
      if ((step.x !== this.start.isoY || step.y !== this.start.isoX) && (step.x !== this.end.isoY || step.y !== this.end.isoX))
        this.paths.push(new BallMini(step.y, step.x, this))
    })
  }
  onClick () {
    this.map[this.cursor.isoX * this.heightTile + this.cursor.isoY] = (this.map[this.cursor.isoX * this.heightTile + this.cursor.isoY] === 0) ? 1 : 0;
    if (this.cursor.visible) {
      this.paths = []
      //this.start.setIsoXY(this.cursor.isoX, this.cursor.isoY)
      this.createPath()
    }
  }
  getMap2d () {
    let map2d = [];
    for (var i = 0; i < this.widthTile; i++) {
      for (var j = 0; j < this.heightTile; j++) {
        if (!map2d[i]) map2d[i] = []
        map2d[i][j] = this.map[i * this.heightTile + j]
      }
    }
    return map2d
  }
  update () {
    this.start.update()
    this.cursor.update()
    this.entities.forEach(entity => entity.update())
    this.paths.forEach(path => path.update())
    this.end.update()
  }
  render (ctx) {
    for (var i = 0; i < this.widthTile; i++) {
      for (var j = 0; j < this.heightTile; j++) {
        if (this.map[i * this.heightTile + j] !== 0) {
          this.floor.x = this.x + (this.widthTile * this.floor.width / 2) + (i - j) * this.floor.width / 2
          this.floor.y = this.y + (i + j) * this.floor.height / 2
          this.floor.render(ctx)
        }
      }
    }
    this.start.render(ctx, this)
    this.cursor.render(ctx, this)
    this.entities.forEach(entity => entity.render(ctx, this))
    this.paths.forEach(path => path.render(ctx, this))
    this.end.render(ctx, this)
  }
}
