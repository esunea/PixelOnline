import {Sprite} from '../'

export class IsoSprite extends Sprite {
  constructor(img, x, y, room) {
    super(img, x, y)
    this.room = room
    this.setIsoXY(x, y)
  }
  setIsoXY(x, y) {
    this.isoX = x
    this.isoY = y
    this.x = this.room.x + (this.room.widthTile * this.room.floor.width / 2) + (x - y) * this.room.floor.width / 2
    this.y = this.room.y + (x + y) * this.room.floor.height / 2 - (this.height - this.room.floor.height)
  }
}
